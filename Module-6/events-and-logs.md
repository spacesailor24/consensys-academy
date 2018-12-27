# Events and Logs

This is how you declare an event called LogReturnValue. Use the event keyword followed by the event name.
```solidity
contract ExampleContract { 
  event LogReturnValue(address indexed _from, int256 _value);

  function foo(int256 _value) returns (int256) {
     emit LogReturnValue(msg.sender, _value);
     return _value;
  }
}
```

Declaring events require that you specify the parameter type as well as a name for the parameter. This parameter name is the name that will appear in the log, so make it descriptive and clear. 

You can add the indexed keyword to event parameters. Up to **three parameters** can receive the indexed attribute. This increases the searchability of events. It is possible to filter for specific values of indexed arguments in the user interface.

[Here is a link to the solidity documentation](https://solidity.readthedocs.io/en/latest/contracts.html#events) on events.

The common uses for events can be broken down into three main use cases:

1. Events can provide smart contract return values for the UI 
2. They can act as asynchronous triggers with data 
3. They can act a cheaper form of storage.

Logs, which are essentially the same as events (the context dictates which term is more appropriate) can also be used as a cheaper form of storage. Logs cost 8 gas per byte whereas contract storage costs 20,000 per 32 bytes, or 625 gas per byte. Logs are cheaper, but also cannot be accessed from any contracts. Even still, logs can be useful for aggregating historical reference data.

Events are inheritable members of contracts. You can call events of parent contracts from within child contracts.

When called from within a contract, events cause arguments to be stored in the transaction log, a special data structure in the blockchain. The logs are associated with the address of the contract and will be incorporated into the blockchain, persisting as long as a block is accessible.

Log and event data are not accessible from within contracts, not even from the contract that created the log. Events are useful when interacting with an application. They can provide notifications and confirmations of transactions happening in the smart contract. They are also useful for debugging purposes during development.

Logs are not part of the blockchain per se since they are not required for consensus (they are just historical data), but they are verified by the blockchain as the transaction receipt hashes are stored inside the blocks.


**Remember** that events are not emitted until the transaction has been successfully mined.

Logging an event for every state change of the contract is a good heuristic for when you should use events. This allows you to track any and all updates to the state of the contract by setting up event watchers in your javascript files.

## Additional Resources:

- [Technical introduction to Events and Logs in Ethereum by Joseph Chow, Consensys Media](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
- [Events - Solidity Docs](https://solidity.readthedocs.io/en/develop/contracts.html#events)
