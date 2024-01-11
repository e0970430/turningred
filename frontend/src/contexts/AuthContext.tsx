import React, { createContext, useContext, useEffect, useState } from "react";
import detectProvider from "@portkey/detect-provider";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  const init = async () => {
    try {
      const detectedProvider = await detectProvider();
      if (detectedProvider) {
        setProvider(detectedProvider);
      }
    } catch (error) {
      console.error(error, "Error detecting provider");
    }
  };

  const connect = async () => {
    try {
      const accounts = await provider?.request({
        method: MethodsBase.REQUEST_ACCOUNTS,
      });

      if (accounts && Object.keys(accounts).length > 0) {
        let firstAccount = null;
        for (const chain in accounts) {
          if (accounts[chain].length > 0) {
            firstAccount = accounts[chain][0];
            break;
          }
        }

        setUserAccount(firstAccount);
        setIsAuthenticated(true);

        // Save user account and authentication status to localStorage
        localStorage.setItem("userAccount", JSON.stringify(firstAccount));
        localStorage.setItem("isAuthenticated", "true");
      }
    } catch (error) {
      console.error(error, "Error connecting to provider or requesting accounts");
    }
  };

  const logout = () => {
    setUserAccount(null);
    setIsAuthenticated(false);

    // Remove user account and authentication status from localStorage
    localStorage.removeItem("userAccount");
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    setForceUpdate((prev) => !prev);
  }, [userAccount]);

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");

    if (storedAuthStatus === "true") {
      setIsAuthenticated(true);
      const storedUserAccount = localStorage.getItem("userAccount");
      setUserAccount(storedUserAccount ? JSON.parse(storedUserAccount) : null);
    }

    init();
  }, []); // Run only on mount

  const contextValue = {
    provider,
    userAccount,
    isAuthenticated,
    connect,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
