import React, { useEffect, useState } from 'react';
import AElf from 'aelf-sdk';

const TransactionHistoryPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]); // Adjust the type accordingly

  useEffect(() => {
    // Initialize AElf and set the provider
    const aelf = new AElf(new AElf.providers.HttpProvider('https://explorer-test-side02.aelf.io/address/ELF_75nJAjXxhN3WG7sSkFZfR7Hkj6vQHk3Hf3HjEwPBmchkcY7in_tDVW#contract'));

    // Fetch transaction history or perform other relevant operations
    fetchTransactionHistory(aelf);
  }, []);

  const fetchTransactionHistory = async (aelf: any) => {
    try {
      const blockHash = 'latest';
      const offset = 0;
      const limit = 10;

      const transactionResults = await aelf.chain.getTxResults(blockHash, offset, limit);

      // Extract transaction details from the results
      const extractedTransactions = transactionResults.map((result: any) => {
        return {
          transactionId: result.TransactionId,
          status: result.Status,
        };
      });
      setTransactions(extractedTransactions);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  return (
    <div>
      <h1>Transaction History</h1>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>Transaction ID: {transaction.transactionId}</p>
            <p>Status: {transaction.status}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistoryPage;
