# Multisig Wallet

Based on [this project](https://github.com/ConsenSys-Academy/multisig-wallet-exercise/blob/master/Multisig_wallet_info.md) by Nate Rush

The solution is based on [this MultiSignature Wallet](https://github.com/ConsenSys/MultiSigWallet) found in the ConsenSys github repository.

You can [view this project repository on the ConsenSys Academy GitHub here](https://github.com/ConsenSys-Academy/multisig-wallet-exercise).

What is a Multisignature wallet?
A multisignature wallet is an account that requires some m-of-n quorum of approved private keys to approve a transaction before it is executed.

Ethereum implements multisignature wallets slightly differently than Bitcoin does. In Ethereum, multisignature wallets are implemented as a smart contract, that each of the approved external accounts sends a transaction to in order to "sign" a group transaction.

Following this project spec designed by the UPenn Blockchain Club, you will now create your own multisignature wallet contract.

Note: It is not suggested that you use this multisignature wallet with any real funds, but rather use a far more deeply audited one such as the [Gnosis multisignature wallet](https://wallet.gnosis.pm/).

## Objectives

- To learn how to handle complex interactions between multiple users on one contract
- Learn how to avoid loops and implement voting
- [To learn to assess possible attacks on contracts](https://github.com/ConsenSys/smart-contract-best-practices).

## Further Reading

- [ConsenSys MultiSig Repo](https://github.com/ConsenSys-Academy/multisig-wallet-exercise)
- [List of MultiSig Contracts on Mainnet](https://medium.com/talo-protocol/list-of-multisig-wallet-smart-contracts-on-ethereum-3824d528b95e)
- [What is a MultiSig Wallet?](https://medium.com/hellogold/ethereum-multi-signature-wallets-77ab926ab63b)
- [Unchained Capital's Multi-Sig](https://blog.unchained-capital.com/a-simple-safe-multisig-ethereum-smart-contract-for-hardware-wallets-a107bd90bb52)
- [Grid+: Toward an Ethereum MultiSig Standard](https://blog.gridplus.io/toward-an-ethereum-multisig-standard-c566c7b7a3f6)
