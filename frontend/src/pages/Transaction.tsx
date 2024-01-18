    import { IPortkeyProvider, MethodsBase} from "@portkey/provider-types";
    import { useEffect, useState } from "react";
    import './Transaction.css';
    import { Link } from "react-router-dom";
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
        const [processing, setProcessing] = useState(false);

        // form validation
        const [formErrors, setFormErrors] = useState([] as string[]);

        const validateForm = () => {
            const errors: string[] = [];

            if (senderID == "") {
                errors.push("Sender ID field needs to be filled in.");
            }
            if (itemID == "") {
                errors.push("Item ID field needs to be filled in.");
            }
            if (rfidTag == "") {
                errors.push("RFID Tag field needs to be filled in.");
            }
            if (quantity == "" || isNaN(Number(quantity))) {
                errors.push("Quantity field needs to be filled in.");
            }
            if (transactionAmount == "" || isNaN(Number(transactionAmount))) {
                errors.push("Transaction Amount field needs to be filled in.");
            }

            console.log(errors);
            return errors;
        }

        const onClick = async () => {
            try {
              const errors = validateForm();
          
              if (errors && errors.length > 0) {
                setFormErrors(errors);
                console.log(formErrors);
                return;
              } else {
                setProcessing(true);
          
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
                await transactionContract?.callSendMethod("CreateSCTransaction", account, {
                  recipient: "ELF_joeN4RkRby7eReEKHwUhiAYEE6UYMtjv5BfYfo86UWwkJuMHi_tDVW",
                  item: "book",
                  quantity: quantity,
                  amount: transactionAmount,
                });
                alert(
                  `Successfully recorded!\n Item ID: ${itemID}\nTotal Amount: $${transactionAmount}`
                );
                setFormErrors([] as string[]);
                setProcessing(false);
                // console.log(data);
              }
            } catch (error) {
              console.error(error, "===error");
            }         
          };
          

        return (
            <div className="row">
                <div className="form">
                {formErrors.length > 0 && (
                    <div className="error-message">
                        <br />
                        {formErrors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}

                    <div className="field-group">
                        <h2 className="field-label">Recipient ID</h2>
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

                    <button
                        onClick={onClick}
                        disabled={processing} // Step 2
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: processing ? "#c0c0c0" : "#f1b6ac", // Step 3
                            border: "none",
                            fontSize: 18,
                            lineHeight: 1.5,
                            display: "inline-block",
                            cursor: processing ? "not-allowed" : "pointer", // Step 3
                        }}
                        >
                        Send Transaction
                    </button>
                    <br />
                </div>
                {/* <div className="form" style={{justifyContent: "right", alignItems: "right"}}>
                    <h1 className="field-label">Transaction History</h1>
                    <div className="tx-label">14 December 2023: POFHSW73L</div>
                    <div className="tx-label">16 December 2023: HFWDMA28U</div>
                    <div className="tx-label">27 December 2023: OFKWFN84J</div>
                </div> */}
            </div>
        );
    };

    export default Transaction;