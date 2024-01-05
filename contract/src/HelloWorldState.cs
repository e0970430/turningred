using System.Diagnostics.CodeAnalysis;
using AElf.Sdk.CSharp.State;
using AElf.Standards.ACS6;
using AElf.Types;

namespace AElf.Contracts.HelloWorld
{
    // The state class is used to communicate with the blockchain.
    public class HelloWorldState : ContractState
    {
        //create a storage space for Character
        public BoolState Initialized { get; set; }
        public MappedState<Address, Character> Characters { get; set; }

        //encapsulate AEDPoS consensus contract reference state
        internal RandomNumberProvideacsrContractContainer.RandomNumberProvideacsrContractReferenceState
            RandomNumberContract { get; set; }
    }
}