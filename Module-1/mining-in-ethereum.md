# Mining in Ethereum

### Mining in POW (Proof of Work)

- Mining in POW is a guessing game where miners in the network are competeing to find a block hash that is below a target difficulty set by the blockchain protocol
  - Trying to find a block hash under the set target difficulty is a computationally expensive task, but verifying that a proposed blockhash is easy
- When a miner belives they have found the next block, they propose the block to the network
  - As other nodes in the network recieve the proposed block, each node will validate the block by:
    - Checking that the block correctly point to the previous block's hash
    - All transactions included in the block are valid
    - The block's hash is correct for all the data included in the block, and the has is below the target difficulty set by the blockchain protocol
  - After succesful verification, the node will add the block to their local copy of the blockchain, and broadcast the block to the rest of the network
- As blocks get added to the blockchain, the blockchain protocol will update the difficulty of the next block based on the amount of time it took to mine the previous block
  - The preferred block time for Ethereum is 15 seconds, while Bitcoin's is 10 minutes
  - Difficulty is how high or low the target value is for the block hash miners are solving for
    - The higher the difficulty, the lower the target value is
- Miners are incentivised to participate on the blockchain that is:
  - 1. the longest, which is considered to be the most accurate
  - 2. the blockchain with the most miners mining for it
- If a miner chooses to mine on a forked blockchain, there is a high probability that whatever work they do will be worthless, as the blockchain they forked from will most likely have more miners, and will produce blocks at a rate that the forked blockchain will be unable to match (kepp in ind that the longest blockchain is considerd to be the most accurate, and will be the blockchain the network uses)

### Block in Ethereum

- Block are consisted of four items:
  - A list of transactions that update the blockchain
  - The hash of the previous block
  - A nonce (number used only once, the is the value the miners are trying to compute)
  - The miner's reward for the block

## Additional Resources

  - [Live visualization of block formation](http://ethviewer.live/)
  - [Ethereum Wiki on Mining](https://github.com/ethereum/wiki/wiki/Mining)