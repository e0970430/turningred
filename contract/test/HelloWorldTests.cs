using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;
using System;
using AElf.Sdk.CSharp;

namespace AElf.Contracts.HelloWorld
{
    // This class is unit test class, and it inherit TestBase. Write your unit test code inside it.
    public class HelloWorldTests : TestBase
    {
        [Fact]
        public async Task Rng_Test()
        {
            await HelloWorldStub.Initialize.SendAsync(new Empty());
            var result = await HelloWorldStub.CreateSCTransaction.SendAsync(new Empty());
            var transactionData = await HelloWorldStub.GetSCTransaction.CallAsync(Accounts[0].Address);
            
            Assert.NotEqual(new SCTransaction(), transactionData);
            Assert.Equal(result.Output, transactionData);
        }
    }
    
}