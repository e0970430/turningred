import React, { createContext, useContext, useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  // Initialize the provider
  const init = async () => {
    try {
      const detectedProvider = await detectProvider();
      console.log("Detected Provider:", detectedProvider);
      if (detectedProvider) {
        setProvider(detectedProvider);
      }
    } catch (error) {
      console.error(error, "Error detecting provider");
    }
  };

  // Connect to the provider
  const connect = async () => {
    console.log("Connecting...");
    try {
      const accounts = await provider?.request({
        method: MethodsBase.REQUEST_ACCOUNTS,
      });

      console.log("Connected");
      console.log("Accounts:", accounts);

      if (accounts && Object.keys(accounts).length > 0) {
        let firstAccount = null;
        for (const chain in accounts) {
          if (accounts[chain].length > 0) {
            firstAccount = accounts[chain][0];
            break;
          }
        }

        setUserAccount(firstAccount);
      }
    } catch (error) {
      console.error(error, "Error connecting to provider or requesting accounts");
    }
  };

  // Update the forceUpdate state to trigger a re-render
  useEffect(() => {
    setForceUpdate((prev) => !prev);
  }, [userAccount]);

  // Run the initialization on mount
  useEffect(() => {
    console.log("Initializing...");
    init();
  }, []); // Run only on mount

  // Provide the context values to the components
  const contextValue = {
    provider,
    userAccount,
    connect,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Create a custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
