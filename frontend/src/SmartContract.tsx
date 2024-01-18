import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import useSmartContract from "./useSmartContract";
import { useState } from "react";


interface SCTransaction {
  sender: number;
  recipient: number;
  item: number;
  quantity: number;
  amount: number;
}

let accountAddress: string | undefined;

export const currentAccountAddress = async (provider: IPortkeyProvider | null) => {
  try {
    const accounts = await provider?.request({
      method: MethodsBase.ACCOUNTS,
    });
    if (!accounts) throw new Error("No accounts");

    accountAddress = accounts?.tDVW?.[0]!;
    if (!accountAddress) throw new Error("No account");
    
  } catch (error) {
    console.error("Error retrieving account address:", error);
  }
};


export { accountAddress };

function SmartContract({ provider }: { provider: IPortkeyProvider | null }) {
  const transactionContract = useSmartContract(provider);
  const [result, setResult] = useState<SCTransaction>();
  const [initialized, setInitialized] = useState(false);

  // const [sender, setSender] = useState('');

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSender(event.target.value);
  // };

  // Function to handle form submission
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log('Sender:', sender);
  // };

  const onClick = async () => {
    try {
      const accounts = await provider?.request({
        method: MethodsBase.ACCOUNTS,
      });
      if (!accounts) throw new Error("No accounts");

      const account = accounts?.tDVW?.[0]!;
      if (!account) throw new Error("No account");

      // 1. if not initialized, it will be initialized
      if (!initialized) {
        await transactionContract?.callSendMethod("Initialize", account, {});
        setInitialized(true);
      }

      // 2. if a transaction has not been created yet, it will create a transaction
      await transactionContract?.callSendMethod("CreateSCTransaction", account, {});

      // 3. get transaction
      const result = await transactionContract?.callViewMethod<SCTransaction>(
        "GetSCTransaction",
        account
      );

      setResult(result?.data);
    } catch (error) {
      console.error(error, "====error");
    }
    
    console.log(result);
    console.log(accountAddress);
  };

  if (!provider) return null;

  return (
    <div>
      <button onClick={onClick}>Retrieve Transactions</button>
      <div style={{ display: "flex" }}>
        <div>
          Sender ID: {result?.sender ?? 0}
        </div>
      </div>
    </div>
  );
}

export default SmartContract;