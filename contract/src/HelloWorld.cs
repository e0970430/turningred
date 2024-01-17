using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.HelloWorld
{
    // Contract class must inherit the class generated by the proto file
    public class HelloWorld : HelloWorldContainer.HelloWorldBase
    {
        // adding this line is for preparing the contract deployment later,
        // to differentiate each person's contract.
        // This is because our testnet does not allow the deployment of two identical contracts.
        const string author = "your name";
        
        public override Empty Initialize(Empty input)
        {
            Assert(!State.Initialized.Value, "already initialized");
            State.RandomNumberContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            return new Empty();
        }
        public override SCTransaction CreateSCTransaction(Empty input)
        {
            var randomBytes = State.RandomNumberContract.GetRandomBytes
                .Call(new Int64Value { Value = Context.CurrentHeight - 1 }.ToBytesValue()).Value.ToByteArray();
            var hash = HashHelper.ComputeFrom(Context.Sender).Value.ToByteArray();

            var transactionData = new SCTransaction
            {
                Sender = Context.Sender, // sender value is autopopulated
                Recipient = 40 + (randomBytes[3] ^ hash[3]) % 61, 
                Item = 100 + (randomBytes[4] ^ hash[4]) % 101, 
                Quantity = 100 + (randomBytes[5] ^ hash[5]) % 101,
                Amount = 100 + (randomBytes[6] ^ hash[6]) % 101
            };
            State.SCTransactions[Context.Sender] = transactionData;
            return transactionData;
        }

        public override SCTransaction GetSCTransaction(Address input)
        {
            return State.SCTransactions[input] ?? new SCTransaction();
        }
    }
}
