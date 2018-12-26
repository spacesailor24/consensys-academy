# Storage and Memory

## Data locations

- **Storage**
    - Persistent across executions
    - Expensive
    - Stored on every full node
- **Memory**
    - Persists for duration of function call
    - Cheap
- **Call Stack**
    - Cheapest
    - Local variables are stored here
    - Limited call depth of 1024

- Data location will vary depending on the variable type
- Bugs can hide in assumptions about where a variable is being stored
- For most types, data location cannot be specified because the variables are copied every time they are used
    - Not true for arrays and structs
- State variables are stored in **storage**
- Function arguments are stored in **memory**
- Structs, arrays, and mappings are passed by reference
    - Modifying them changes state
    - Copy to memory using the `memory` keyword

## Additional Resources

- [Difference between memory and storage](https://ethereum.stackexchange.com/questions/1232/difference-between-memory-and-storage)
- [Storage, Memory and the Stack](https://solidity.readthedocs.io/en/v0.4.21/introduction-to-smart-contracts.html#storage-memory-and-the-stack)
- [Data location -- Solidity Docs](https://solidity.readthedocs.io/en/v0.4.21/types.html#data-location)
