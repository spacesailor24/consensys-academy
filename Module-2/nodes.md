# Nodes

## Three Ways A Node Can Participate in Ethereum

1. Run a light client
    - Keeps a shallow copy of the blockchain
    - Takes up less space because it doesn't store a full copy of the blockchain
    - Only verifies a small part of the blockchain
        - Validates block headers
    - Suitable for computers will smaller computer power/footprints
2. Full node
    - Stores and shares a full copy of the blockchain
    - Verify the correct block reward is distributed for each block
    - Validates transactions have the correct signatures
    - Validates transactions and blocks are in the correct data format
    - Validates double spending has not occurred for any of the blocks
3. Mining
    - Stores and shares a full copy of the blockchain and verifies transactions
    - Mine for valid blocks
