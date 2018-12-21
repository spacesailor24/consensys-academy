# Installing Geth and Setting Up a Private Network

### Attach to A Node

```bash
geth attach ./path-to-ipc-endpoint
```

### Start Geth JavaScript console

```bash
geth console
```

## Create a Private Blockchain

Start by creating a `genesis.json` file

```javascript
{
  "config": {
        "chainId": 4568,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
  "alloc"      : {},
  "difficulty" : "0x400",
  "extraData"  : "",
  "gasLimit"   : "0x7A1200",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00"
}
```

The `config` section defines the settings for the private blockchain.

The `chainId` identifies the blockchain. The Ethereum main net has a chainId of 1. The Ropsten testnet has a chainId of 3, Rinkeby is 4 and Kovan is 42. This genesis file has a chainId of 4568, hopefully nobody else is running a chain with the same chainId.

The Ethereum protocol has hard forked and introduced several backward-incompatible protocol changes. homesteadBlock and eip155/8Block indicate to geth in which blocks the changes are introduced. We set these to zero.

`alloc` allows us to create addresses and fill the accounts with ether upon initializing the blockchain. We will leave this empty and mine ether to fill our accounts.

`difficulty` indicates how difficult it will be to discover a valid hash of the block. It defines the mining target, which can be calculated from the previous block's difficulty level and the timestamp. The higher the difficulty, the more calculations the miner will have to do to find a block (on average). This value fluctuates to maintain a target block generation time (~15 seconds in Ethereum). We keep this value low on our private chain so we can quickly find blocks so we don't have to wait.

`extraData` is an optional 32 byte value where we can add anything.

`gasLimit` is a value that sets the chain-wide limit of gas expenditure per block. We set the value to 8,000,000 as that is the current limit on the main net.

`parentHash` is the keccak256 hash of the parent block's header. This pointer to the parent block builds the chain of blocks.

`timestamp` is the output of Unix time() function at the block's creation. This parameter is used to determine if the difficulty level should be adjust to maintain a consistent average block time. It also allows us to verify the order of the blocks in the chain.

### Initializing a Geth Node with the Custom Genesis File

```javascript
geth --datadir=./test-private-blockchain/ init genesis.json
```

The last line of output in the console should say `Successfully wrote genesis state`.

### Connecting to the JavaScript Console for the Newly Created Network


```javascript
geth --datadir /path_to_your_data_directory/test-private-blockchain --networkid 4568 console
```

List all the available console commands by typing `web3.`

### Create a New Account

To create a new Ethereum account, go to the geth console and type `personal.newAccount()`. You will be prompted for a passphrase to encrypt your new account. If you lose this passphrase, you will not be able to access the account.

You can access all of your geth accounts with `eth.accounts` and it will print them in an array.

You can check the balance of an account with the `eth.getBalance()` method and entering the account.

### Mining in the Private Chain

Since the private blockchain is maintaining consensus using proof of work, we need to mine new blocks in order to process transactions.

To start mining, just run `miner.start()`. Geth needs to build a `DAG` before the miner starts, but once it does that it will start mining blocks on the private chain. After a few blocks are mined, stop it with `miner.stop()`. [See this link](https://ethereum.stackexchange.com/questions/1993/what-actually-is-a-dag) for more information about what is going on when geth is creating a `DAG`.

The first geth account will default to the `coinbase`, or `etherbase` account, which is the account to which mining rewards are sent. You can check this with `eth.coinbase`.

### Sending a Transaction

`eth.sendTransaction()` takes a transaction object that looks like this:

```javascript
{
  from: // String - The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified.

  to: // String - (optional) The destination address of the message, left undefined for a contract-creation transaction.

  value: // Number|String|BigNumber - (optional) The value transferred for the transaction in Wei, also the endowment if it's a contract-creation transaction.

  gas: // Number|String|BigNumber - (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).

  gasPrice: // Number|String|BigNumber - (optional, default: To-Be-Determined) The price of gas for this transaction in wei, defaults to the mean network gas price.

  data: // String - (optional) Either a byte string containing the associated data of the message, or in the case of a contract-creation transaction, the initialisation code.

  nonce: // Number - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
}
```

To send some ether to another account, you just need to specify the send, the recipient and the value.

```javascript
eth.sendTransaction({to: eth.accounts[1], from: eth.accounts[0], value: 100})
```

The above command will throw a `Error: authentication needed: password or unlock` error though if the sending account is not unlocked.

To unlock an account, use `personal.unlockAccount(eth.accounts[0])`
