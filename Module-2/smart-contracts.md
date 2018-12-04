# Smart Contracts

"A computer protocol to digitally execute terms of a contract"

![Smart Contract](./images/smart-contract.png)

Features of _Smart Contracts_:

- Trustless
    - No 3rd parties or intermediaries are required in order for a _Smart Contracts_ to execute the terms
    - Universally accessible, anyone should be able to view the _Smart Contract_ completely on their own
- Trackable
    - Transactions should be traceable from beginning to end to allow for auditing
- Irreversible
    - Once a transactions is in it's final state, it should be unable to be altered or reverted
- Self-executing
    - _Smart Contracts_ should be able to carry out their terms without the aid of any party
        - This helps:
            - Reduce costs
            - Increase execution speed
            - Increase use case variability

_Smart Contracts_ do not have to exist solely on _blockchains_, but _blockchains_ offer:

- A trustless, universally accessible system
- Trackable, irreversible transactions
- Mechanisms for self-execution

## Some History on Smart Contracts

In the year 1994, much before Satoshi Nakamoto’s [revolutionary white paper](https://bitcoin.org/bitcoin.pdf) introduced the idea of the blockchain, a well respected Computer Science Researcher and Cryptographer named Nick Szabo introduced the concept of a Smart Contract, and in 1996 wrote an entire research paper on it. 

He defined smart contracts as [“a set of promises, specified in digital form, including protocols within which the parties perform on these promises”](https://github.com/ethereum/wiki/wiki/White-Paper).

### Enter Ethereum

Several years after the Bitcoin white paper was released, building on the groundbreaking inventions that Szabo and Nakamoto had created, Vitalik Buterin released the Ethereum white paper titled “A Next-Generation Smart Contract and Decentralized Application Platform”. This paper discussed the implementation of a blockchain protocol with a Turing-complete programming language that would allow for the creation of “complex applications involving having digital assets being directly controlled by a piece of code implementing arbitrary rules”.

Buterin defines Smart Contracts as “cryptographic 'boxes' that contain value that only unlock if certain conditions are met”. 

Meaning that through the use of Smart Contracts, developers can define their own instructions to the Ethereum Virtual Machine, or EVM, allowing digitally binding agreements to be coded on a public ledger. This enables anyone to build a wide array of decentralized applications that have the capability to potentially disrupt numerous industries.

Today, with the tremendous growth of the Ethereum community, developers have several options when deciding on which Turing-complete programming language they would like to use to build their Smart Contracts and decentralized application logic, the most notable being Solidity.

### Programming Languages for Ethereum

[Solidity](https://solidity.readthedocs.io/en/latest/) is a language that is syntactically similar to JavaScript which allows you to develop contracts and compile to EVM bytecode. It is currently the flagship language of Ethereum. It also has the most robust documentation and is by far the most popular amongst the developers in the ecosystem.

In addition to Solidity, there is [Vyper](https://vyper.readthedocs.io/en/latest/), an experimental programming language that is growing in popularity. Vyper was built with three objectives in mind. The first being security - it should be possible and natural to build secure smart contracts in Vyper. The second being language and compiler simplicity - the language and the compiler implementation should strive to be simple. The third being auditability; Vyper code should be maximally human-readable. Furthermore, it should be maximally difficult to write misleading code. Simplicity for the reader is more important than simplicity for the writer, and simplicity for readers with low prior experience with Vyper (and low prior experience with programming in general) is particularly important.

Another important language is [Low-level Lisp-like Language](https://lll-docs.readthedocs.io/en/latest/), or LLL for short, which is used to write assembly code that interacts with the EVM. LLL, therefore has many unique benefits. First, the developer has direct access to memory and storage. This allows you to arrange your contract data in any way you like, optimizing for the most efficient access. Second, you have complete access to all EVM opcodes. When compiled, these LLL operators translate directly to EVM opcodes, giving your contract power and brevity. Third, and expanding on the brevity idea, LLL contracts compile down to much smaller binaries than Solidity contracts. 

## Additional Resources

- [Introduction to Smart Contracts](https://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html#)
- [What is a smart contract?](https://blog.tokenfoundry.com/what-is-a-smart-contract/)
