# Contract Structure

- Solidity is similar to other object orientated languages
- Contracts are similar to classes
- Contracts can contain:
    - State variables
    - Functions
    - Function modifiers
    - Events
    - Structs
    - Enums

## Pragma

- The first line of a `.sol` file is a **pragma statement**
- This line indicates the valid compiler version(s)
    ```solidity
    pragma solidity ^0.4.10
    ```
    - The above indicates that the compiler version to be used for this contract to be between `0.4.10` and `0.5.0`
    - The caret specifies that any version greater than the defined compiler version can be used **up to** the next major version
    
## Declaring a Contract

- Contract declaration follows the **pragma statement**
- The contract name should be capitalized
- It's convention to name the file the same as the contracts
    `SimpleStorage.sol`:
    ```solidity
    pragma solidty ^0.4.10

    contract SimpleStorage {
        ...
    }
    ```

## Storage Variables

Declare storage variables at the top of a contract:
```solidity
pragma solidty ^0.4.10

contract SimpleStorage {
    uint value;
    ...
}
```

## Events

- Declared after storage declarations
- Name events so they are clearly events:
```solidity
pragma solidty ^0.4.10

contract SimpleStorage {
    uint value;

    event LogChange(uint newValue);
    ...
}
```

## Modifiers

Declared after **events**
```solidity
pragma solidty ^0.4.10

contract SimpleStorage {
    uint value;

    event LogChange(uint newValue);

    modifier onlyIfZero {
        require(value == 0);
        _;
    }
    ...
}
```

## Functions

- Declare the **constructor** after **modifiers**:
    ```solidity
    pragma solidty ^0.4.10

    contract SimpleStorage {
        uint value;

        event LogChange(uint newValue);

        modifier onlyIfZero {
            require(value == 0);
            _;
        }

        constructor() {
            value = 1;
        }
        ...
    }
    ```
    - Runs when the contract is deployed
    - Uses the keyword `constructor`
- Declare functions after the **constructor**:
    ```solidity
    pragma solidty ^0.4.10

    contract SimpleStorage {
        uint value;

        event LogChange(uint newValue);

        modifier onlyIfZero {
            require(value == 0);
            _;
        }

        constructor() {
            value = 1;
        }

        setStorage(uint newValue) {
            value = newValue;
        }
        ...
    }
    ```

## Inline Assembly

- Inline assembly (EVM bytecode) is available in Solidity
- Offers more control over the EVM stack

## Additional Resources

- [Structure of a Contract](https://solidity.readthedocs.io/en/develop/structure-of-a-contract.html)
- [Smart contracts as a State Machine](https://solidity.readthedocs.io/en/develop/common-patterns.html?#state-machine)
- [Solidity Assembly Code](https://solidity.readthedocs.io/en/latest/assembly.html)
