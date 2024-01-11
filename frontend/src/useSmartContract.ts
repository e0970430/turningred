import { IPortkeyProvider, IChain } from "@portkey/provider-types";
import { useEffect, useState } from "react";

function useSmartContract(provider: IPortkeyProvider | null) {
  const [smartContract, setSmartContract] =
    useState<ReturnType<IChain["getContract"]>>();

  useEffect(() => {
    (async () => {
      if (!provider) return null;

      try {
        // 1. get the sidechain tDVW using provider.getChain
        const chain = await provider?.getChain("tDVW");
        if (!chain) throw new Error("No chain");

        const address = "6qeCHKMU3ctAxKbu26AiTHZWjr3WwLnTdcqf3FnBPd3soV6qi";
        // const address = "ELF_75nJAjXxhN3WG7sSkFZfR7Hkj6vQHk3Hf3HjEwPBmchkcY7in_tDVW";

        // 2. get the character contract
        const transactionContract = chain?.getContract(address);
        setSmartContract(transactionContract);
      } catch (error) {
        console.log(error, "====error");
      }
    })();
  }, [provider]);

  return smartContract;
}

export default useSmartContract;