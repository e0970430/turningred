import { IPortkeyProvider, MethodsBase} from "@portkey/provider-types";
import { useEffect, useState } from "react";
import './TransactionHistory.module.css';
import {Link} from "react-router-dom";
import useSmartContract from "../../useSmartContract";

interface TransactionData {
    sender: string;
    recipient: string;
    item: string;
    quantity: number;
    amount: number;
}

function TransactionHistory({ provider }: { provider: IPortkeyProvider | null }) {
    const transactionContract = useSmartContract(provider);
    const [transactionID, setTransactionID] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [result, setResult] = useState<TransactionData>();

    const retrieveTxn = async () => {
        try {
        const accounts = await provider?.request({
            method: MethodsBase.ACCOUNTS,
        });
        if (!accounts) throw new Error("No accounts");
    
        const account = accounts?.tDVW?.[0]!;
        if (!account) throw new Error("No account");
    
        // 2. if a transaction has not been created yet, it will create a transaction
        const result = await transactionContract?.callViewMethod<TransactionData>("GetSCTransaction", account);
        setResult(result?.data);

        } catch (error) {
            console.error(error, "===error");
        }
    };


    return (
        <div className="row">
            <div className="form">
                <div className="field-group">
                    <h2 className="field-label">Transaction ID</h2>
                    <input type="text" placeholder='' onChange={(e) => setTransactionID(e.target.value)} value={transactionID}/>
                </div>
                <button onClick={retrieveTxn} style={{justifyContent: "left", alignItems:"left", backgroundColor: "#f1b6ac",border: "none",fontSize:18, lineHeight:1.5, display: "inline-block"}}>
                    Retrieve Transaction
                </button>
            </div>
            <div className="form" style={{justifyContent: "right", alignItems: "right"}}>
                <h1 className="field-label">Transaction History</h1>
                <div className="testing">Sender: {result?.sender ?? 0}</div>
                <div className="testing">Recipient: {result?.recipient ?? 0}</div>
                <div className="testing">Item: {result?.item ?? 0}</div>
                <div className="testing">Quantity: {result?.quantity ?? 0}</div>
                <div className="testing">Amount: {result?.amount ?? 0}</div>
            </div>
        </div>
    );
};

export default TransactionHistory;