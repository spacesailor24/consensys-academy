# Transactions

## Anatomy of A Transaction

- Recipient Address
    - Represented as a hexadecimal
- Nonce
    - Transactions count for the sender
- Cryptographic variables:
    - v
    - r
    - s
    - These make up the sender's signature
- Value
    - An amount of ETH represented in _Wei_
        - _Wei_ is 1/18th of an ETH
- Data (optional)
    - Specifies contract or deployment instructions
    - Represented as a hexadecimal
- Gas Limit or Start Gas
    - The maximum number of computational steps the transactions execution is allowed to take
- Gas Price
    - The fee the sender pay per computational step

## Additional Resources

- [An externally owned account on Etherscan](https://etherscan.io/address/0x1b3947bd020227455563a5df59a06a42bd63f409)
- [A contract account on Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae)
- [How does Ethereum verify contract execution?](https://www.quora.com/How-does-Ethereum-verify-contract-execution)
- [Solidity Docs on Transactions](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html#transactions)
- [What is the difference between a transaction and a contract message?](https://ethereum.stackexchange.com/questions/12065/what-is-the-difference-between-a-call-message-call-and-a-message)
