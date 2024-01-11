import { IPortkeyProvider, MethodsBase} from "@portkey/provider-types";
import { useEffect, useState } from "react";
import React from 'react';
import './Transaction.css';
import Landing from './Landing';
import {Link} from "react-router-dom";

function Transaction({ provider }: { provider: IPortkeyProvider | null }) {
    const [senderID, setSenderID] = useState("");
    const [itemID, setItemID] = useState("");
    const [rfidTag, setRfidTag] = useState("");
    const [quantity, setQuantity] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [remarks, setRemarks] = useState("");

    return (
        <div className="row">
            <colgroup className="form">
                <div className="field-group">
                    <h2 className="field-label">Sender ID</h2>
                    <input type="text" id="sender-id" placeholder='' onChange={(e) => setSenderID(e.target.value)} value={senderID}/>
                </div>
                <div className="field-group">
                    <h2 className="field-label">Item ID</h2>
                    <input type="text" id="item-id" placeholder='' onChange={(e) => setItemID(e.target.value)} value={itemID}/>
                </div>
                <div className="field-group">
                    <h2 className="field-label">RFID Tag No.</h2>
                    <input type="text" id="rfid" placeholder='' onChange={(e) => setRfidTag(e.target.value)} value={rfidTag}/>
                </div>
                <div className="field-group">
                    <h2 className="field-label">Quantity</h2>
                    <input type="number" id="quantity" min="0" placeholder='' onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
                </div>
                <div className="field-group">
                    <h2 className="field-label">Transaction Amount</h2>
                    <input type="number" id="transaction-amount" min="0" placeholder='' onChange={(e) => setTransactionAmount(e.target.value)} value={transactionAmount}/>
                </div>
                <div className="field-group">
                    <h2 className="field-label">Remarks</h2>
                    <input type="text" id="remarks" placeholder='' onChange={(e) => setRemarks(e.target.value)} value={remarks}/>
                </div>
                <Link to={'/landing'} style={{justifyContent: "center", alignItems:"center"}}>
                    <button style={{justifyContent: "left", alignItems:"left", backgroundColor: "#f1b6ac",border: "none",fontSize:18, lineHeight:1.5, display: "inline-block"}}>
                        Send Transaction
                    </button>
                </Link>
            </colgroup>
            <colgroup className="form" style={{justifyContent: "right", alignItems: "right"}}>
                <h1 className="field-label">Transaction History</h1>
                <text className="tx-label">14 December 2023: POFHSW73L</text>
                <text className="tx-label">16 December 2023: HFWDMA28U</text>
                <text className="tx-label">14 December 2023: OFKWFN84J</text>
            </colgroup>
        </div>
    );
}

export default Transaction;