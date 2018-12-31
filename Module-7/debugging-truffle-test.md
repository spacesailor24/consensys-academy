# Debugging Truffle Test

[View and clone this project repository on GitHub here](https://github.com/ConsenSys-Academy/truffle-debug)

[Truffle Debugger](https://truffleframework.com/docs/truffle/getting-started/debugging-your-contracts)

## Getting Started

Navigate to the project-dir. This directory is the example project directory. In it you will find a SimpleStorage contract, a migrations script to deploy the SimpleStorage contract and a test to make sure that the SimpleStorage contract is behaving as expected.

Read the simpleStorageTest.js file so you understand how the test is operating.

```solidity
contract('SimpleStorage', async (accounts) => {
    it('Calling set(x) should set storedData in storage to x', async() => {
        let newValue = 2;
        let instance = await SimpleStorage.deployed()

        instance.set(newValue, {from: accounts[0]})
        let returnedValue = await instance.storedData.call()

        assert.equal(newValue, returnedValue, "The returned value should equal the new value.")
    })
})
```

In the test we are updating the storedData storage variable in the `SimpleStorage.sol` contract and then retrieving the variable to make sure that it updated correctly.

To run the test, in a new terminal window, start ganache-cli, or use the [Ganache GUI](https://truffleframework.com/ganache). With ganache-cli running, deploy the contract and run the tests by typing $ truffle test.
