import { useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import "./App.css";
import detectProvider from "@portkey/detect-provider";
import SmartContract from "./SmartContract";

function App() {
  const [provider, setProvider] = useState<IPortkeyProvider | null>(null);

  const init = async () => {
    try {
      setProvider(await detectProvider());
    } catch (error) {
      console.log(error, "=====error");
    }
  };

  const connect = async () => {
    await provider?.request({
      method: MethodsBase.REQUEST_ACCOUNTS,
    });
  };

  useEffect(() => {
    if (!provider) init();
  }, [provider]);

  if (!provider) return <>Provider not found.</>;

  return (
    <>
      <button onClick={connect}>Connect</button>
      <SmartContract provider={provider} />
    </>
  );
}

export default App;
