import { useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";

function Login() {
  const [provider, setProvider] = useState<IPortkeyProvider | null>(null);
  const [userAccount, setUserAccount] = useState<string | null>(null);

  const init = async () => {
    try {
      // Detect blockchain provider
      const detectedProvider = await detectProvider();
      console.log("Detected Provider:", detectedProvider);
      setProvider(detectedProvider);
    } catch (error) {
      console.error(error, "Error detecting provider");
    }
  };

  const connect = async () => {
    console.log("Connecting...");
    try {
      // Request user accounts from the provider
      const accounts = await provider?.request({
        method: MethodsBase.REQUEST_ACCOUNTS,
      });
  
      console.log("Connected");
  
      // Log the accounts received
      console.log("Accounts:", accounts);
  
      // Handle user authentication
      if (accounts && accounts.length > 0) {
        setUserAccount(accounts[0]); // Assume the first account is the user's
      }
    } catch (error) {
      console.error(error, "Error connecting to provider or requesting accounts");
    }
  };
  

  useEffect(() => {
    if (!provider) {
      console.log("Initializing...");
      init();
    }
  }, [provider]);
  
  useEffect(() => {
    console.log("userAccount changed:", userAccount);
  }, [userAccount]);
  

  if (!provider) return <>Provider not found.</>;

  return (
    <>
      {userAccount ? (
        // User is authenticated, show authenticated content
        <>
          <p>Welcome, {userAccount}!</p>
        </>
      ) : (
        // User is not authenticated, show Connect button
        <>
          <button onClick={connect}>Connect</button>
        </>
      )}
    </>
  );
}

export default Login;
