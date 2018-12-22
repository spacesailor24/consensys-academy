# Connecting to Testnets and Exploring the Blockchain

`geth` is your portal to any Ethereum network. It can take a long time and a lot of storage to sync a full geth node, so there are several sync options that geth comes with.

A `full` sync gets the block headers, the block bodies, and validates every element from genesis block. This runs a full node on your machine, which keeps the entire current state of the blockchain and validates incoming blocks. This is not to be confused with an archive node, which does this but also stores the entire transaction history of the blockchain.

A `fast` sync gets the block headers, the block bodies, it processes no transactions until current block - 64. Then it gets a snapshot state and goes like a full synchronization. During a fast sync, you can get all of the blocks while still not be completely in sync because the account state may still not be available (ie. balances, nonces, smart contract code and data). These need to be downloaded separately and cross checked with the latest blocks. This phase is called the state trie download and it actually runs concurrently with the block downloads and it can take a lot longer nowadays than downloading the blocks.

A `light` sync gets only the current state. To verify elements, it needs to ask to full (archive) nodes for the corresponding tree leaves.

**NOTE** to silence the terminal logs, use `debug.verbosity(0)`

## Connecting to a Testnet

To connect to the Rinkeby testnet, simply run the following in the command line:

```bash
geth --rinkeby --syncmode fast console
```

This command will also launch the JavaScript console.

Wait for the terminal to say that the blockchain is syncing:

`INFO [09-11|14:14:28.922] Block synchronisation started`

Once block synchronization has started, you can start investigating the blockchain up to the point at which your node is synced.

Check the status of your node with `eth.syncing`. You should see something like this:

```javascript
{
  currentBlock: 1846452,
  highestBlock: 2970863,
  knownStates: 0,
  pulledStates: 0,
  startingBlock: 1841089
}
```

This data will be updated as your node syncs with the network.

## Retrieving Block Data

You can retrieve information about a given block by using `eth.getBlock(<block_number>)`. This will output something similar to:

```javascript
{
  difficulty: 2,
  extraData: "0xd783010802846765746887676f312e392e34856c696e7578000000000000000042eb768f2244c8811c63729a21a3569731535f066635f83421bf059cd8111f180f0727128685bae47ffc57839b00206d1ad20c69a1981b489f772031b279182d99e65703f0076e4812653aab85fca0f0d6ae8250b8348c94847280928c79fb3b63ca453efc18cbc391de84dbd87db83b20935d3e89f5dd91b239241f4286de636a1c1d431d162611438e5fe8a148b6ff13c4422ff4212ac94a35b271da789fa309f485e7be631f5322cc9ac22eedc9986414dd089afd92f800",
  gasLimit: 7212968,
  gasUsed: 741031,
  hash: "0xa20b9701c16c2c17cf5a844dba59b33530913bb227bbf17cf5ecb052d2b287b7",
  logsBloom: "0x00000000000000000000008000000000000000000000200080000000000000000000000000000000000000000000000000000000000000000000008200000000000000000000000000000008000000000000000000000400000000000000000800001000000000400000008000000000000000100000040000000010000000000400000000000000000000000000000000010000020000000000000000000200000000000000400000000000000000000001000000000000000000400000000000000002000000000001000000000000000020000000000000000000000000000000000000000400000000001000000400000000000000000000000020020100",
  miner: "0x0000000000000000000000000000000000000000",
  mixHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  nonce: "0x0000000000000000",
  number: 1830000,
  parentHash: "0x61aceb1112c79f12fd4acae7d5c263f58c0cfc23cabf996d0f81d3426c9db5fc",
  receiptsRoot: "0x18cd5444fbc45c3b45536ee1c0d66ff1498a43425ca8f4e7594af25bd87ad2fe",
  sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  size: 2092,
  stateRoot: "0x84c27ff36faabd161a5c850906581df27fa758bccdf9ac660602399ecca39972",
  timestamp: 1519519986,
  totalDifficulty: 3388435,
  transactions: ["0x77dd615bcc63322f436a747f43d02f7ad15ebbf7867c7dbb065e6a1a4d58a2cf", "0xa367a991aaa44b602247d5d12e748dc216fc71a8cd1408107076643094d83377", "0xf6dc6e3cbca47eaee35f7368372e2fb4336d4c7869ba4447d785c2af63545caf", "0xab50463b9617b6fdea0b4c6f8c80607608c36918a33c3b45dfd2d336ced7d50a"],
  transactionsRoot: "0x130985bb247d15b853dca099ad8d9f900a1d24ea2a68828b63530ef7090b7dad",
  uncles: []
}
```

Notice that the miner address is `0x0000...0000` and the nonce is also zeros. This is because the Rinkeby network does not run on proof of work. Rinkeby is a _proof-of-authority_ test network running the **Clique consensus protocol**. A _proof-of-authority_ network relies on _trusted nodes_ designated as _signers_ that have the ability to create blocks. A majority of signers on the network are required to validate the chain. Rinkeby has _seven designated signers_ maintained by the following groups:

- Ethereum Foundation (3)
- Infura (1)
- Oraclize (1)
- Augur (1)
- Akasha (1)

## Retrieving Transaction data

To get information about a particular transaction, use:

```javascript
eth.getTransaction(eth.getBlock(<block_number>.transaction[<index_of_transaction>]))
```

You should see something similar to:

```javascript
{
  blockHash: "0xa20b9701c16c2c17cf5a844dba59b33530913bb227bbf17cf5ecb052d2b287b7",
  blockNumber: 1830000,
  from: "0xb840f68af2624c761adc42a365d99dd470f73d08",
  gas: 47197,
  gasPrice: 15000000000,
  hash: "0x77dd615bcc63322f436a747f43d02f7ad15ebbf7867c7dbb065e6a1a4d58a2cf",
  input: "0xde5f72fd",
  nonce: 11,
  r: "0x53b2e2bd0f77701d697d7d7579f86ff433bfc87cf50b1f0f53da62f2b0b2f9d8",
  s: "0x2adc0b0a3dbd8719eb1d994a4fac0fa11fb3d74b8c51a480142056a202dac7c6",
  to: "0x832b52302b89fa8e703cc12db1b6049984d6fef7",
  transactionIndex: 0,
  v: "0x2c",
  value: 0
}
```

## Retrieving Contract data

You can also retrieve the code of any deployed contract, so long as you have the address. Use:

```javascript
eth.getStorageAt("<address_of_contract")
```

The output is the storage of the contract. The layout of the contract depends on how the smart contract is written. You can [learn more about the details here](https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/).

Note that this storage value changes as users interact with and update contract storage. The current value reflects the state of the contract at the highest block that you are currently synced with, so if you are not fully synced with the blockchain you are looking at a historical state of the blockchain. This is also true with account balances. Checking your account balance on a node that is not fully synced with the network will reflect a historical account balance.

## Get Ether on the Testnet

- [Rinkeby Faucet](https://faucet.rinkeby.io/)
- [Ropsten Faucet](https://faucet.ropsten.be/)
