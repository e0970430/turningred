    import { IPortkeyProvider, MethodsBase} from "@portkey/provider-types";
    import { useEffect, useState } from "react";
    import './Transaction.css';
    import {Link} from "react-router-dom";
    import useSmartContract from "../useSmartContract";

    interface TransactionData {
        sender: string;
        recipient: string;
        item: string;
        quantity: number;
        amount: number;
      }

    function Transaction({ provider }: { provider: IPortkeyProvider | null }) {
        const transactionContract = useSmartContract(provider);
        const [senderID, setSenderID] = useState("");
        const [itemID, setItemID] = useState("");
        const [rfidTag, setRfidTag] = useState("");
        const [quantity, setQuantity] = useState("");
        const [transactionAmount, setTransactionAmount] = useState("");
        const [remarks, setRemarks] = useState("");
        const [transactionID, setTransactionID] = useState("");
        const [initialized, setInitialized] = useState(false);
        const [result, setResult] = useState<TransactionData>();

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
            await transactionContract?.callSendMethod("CreateSCTransaction", account, {"recipient": "ELF_joeN4RkRby7eReEKHwUhiAYEE6UYMtjv5BfYfo86UWwkJuMHi_tDVW", "item": "book", "quantity": quantity, "amount": transactionAmount});
            //console.log(data);
            } catch (error) {
                console.error(error, "===error");
            }
        };

        return (
            <div className="row">
                <div className="form">
                    <div className="field-group">
                        <h2 className="field-label">Sender ID</h2>
                        <input type="text" placeholder='' onChange={(e) => setSenderID(e.target.value)} value={senderID}/>
                    </div>
                    <div className="field-group">
                        <h2 className="field-label">Item ID</h2>
                        <input type="text" placeholder='' onChange={(e) => setItemID(e.target.value)} value={itemID}/>
                    </div>
                    <div className="field-group">
                        <h2 className="field-label">RFID Tag No.</h2>
                        <input type="text" placeholder='' onChange={(e) => setRfidTag(e.target.value)} value={rfidTag}/>
                    </div>
                    <div className="field-group">
                        <h2 className="field-label">Quantity</h2>
                        <input type="number" min="0" placeholder='' onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
                    </div>
                    <div className="field-group">
                        <h2 className="field-label">Transaction Amount</h2>
                        <input type="number" min="0" placeholder='' onChange={(e) => setTransactionAmount(e.target.value)} value={transactionAmount}/>
                    </div>
                    <div className="field-group">
                        <h2 className="field-label">Remarks</h2>
                        <input type="text" placeholder='' onChange={(e) => setRemarks(e.target.value)} value={remarks}/>
                    </div>

                    <Link to={'/'} onClick={onClick} style={{justifyContent: "center", alignItems:"center"}}>
                        <button style={{justifyContent: "left", alignItems:"left", backgroundColor: "#f1b6ac",border: "none",fontSize:18, lineHeight:1.5, display: "inline-block"}}>
                            Send Transaction
                        </button>
                    </Link>
                </div>
                <div className="form" style={{justifyContent: "right", alignItems: "right"}}>
                    <h1 className="field-label">Transaction History</h1>
                    <div className="tx-label">14 December 2023: POFHSW73L</div>
                    <div className="tx-label">16 December 2023: HFWDMA28U</div>
                    <div className="tx-label">27 December 2023: OFKWFN84J</div>
                </div>
            </div>
        );
    };

    export default Transaction;