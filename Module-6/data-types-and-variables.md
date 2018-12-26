# Solidity Data Types and Variables

## Features of Solidity

- Statically typed
- Is a compiled language
- Supports elementary value types:
    - [Boolean](#booleans)
    - [Integer](#integers)
    - [Address](#addresses)
    - [Byte Arrays](#byte-arrays)
    - [Enums](#enums)
- Support complex value types:
    - [Arrays](#arrays)
    - [Structs](#structs)
- Allows for [Mappings](#mappings)

## All Types

- Adding the public attribute will automatically create a `getter function` to retrieve the variable's value
    - E.g. `bool public <variable-name>`
- All types initialize to `0`, or the equivalent for their type
    - `bool` initializes to `false`
    - `integer` initializes to `0`

## Booleans

- Are declared with `bool <variable-name>`
- Can either be `true` or `false`
- Used as logical operators to control flow in condition statements
- Allow for:
    - Logical negation (not): `!`
    - Logical conjunction (and): `&&`
    - Logical disjunction (or): `||`
    - Equality (is): `==`
    - Inequality (is not): `!=`

## Integers

- Can be **signed** (`int`) or **unsigned** (`unit`)
    - **Signed** means the integer can be positive or negative
    - **Unsigned** means the integer can only be positive
- The maximum size for an integer is **256 bits**
- Can be declared with or without the **number suffix**es E.g.:
    - `uint8`
    - `int16`
    - `uint24`
    - `int32`
    - ...
    - `uint256`
    - These **number suffix**es designate the size of the integer, and **must** be a multiple of **8**

## Addresses

- **20 byte** hexadecimal value
- Addresses have **member functions** that can be called on any address:
    - Balance - queries the balance of the address
    - Transfer - transfers Ether (in units of **wei**) to a specified address
    - Send - a low level counterpart to transfer, it's recommended to use transfer
    - Call - can be used to call other contracts
        - Returns true if the function terminated successfully or false if an exception was encountered
        - Use `.gas()` or `.value()` modifiers to specify gas and any value to send along with the funciton call
    - Callcode - recommended to use `delegatecall()` instead, this modifier will be removed in future versions of Solidity
    - Delegatecall - delegates a function call to the specified address, maintaining all the aspects of the calling address (storage, balance, etc.)

## Byte Arrays

### Fixed Sized Byte Arrays

- Defined with byte followed by a number between **1** and **32**
    - E.g. `byte[4] <variable-name>`
- Function member `.length` returns the length of the byte array
- Much cheaper in terms of gas costs than dynamic arrays

### Dynamic Sized Byte Arrays

- Defined with bytes: `bytes[]`
- Equivalent to using `byte[]`
- Not actually a value type
    - They are actually **array types** that specify they're containing **byte types**

## Enums

- A user defined type
- E.g.
    - Define the enum called `ActionChoices`:
        ```solidity
        enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
        ```
    - Declare a variable called `choice` of type `ActionChoices`:
        ```solidity
        ActionChoices choice;
        ```
    - Set a variable called `defaultChoice` of type `ActionChoice` to `GoStraight`:
        ```solidity
        ActionChoice constant defaultChoice = ActionChoices.GoStraight
        ```
- Enum members are **explicitly** convertible to **integer types**
- Enums require **at least one** member

## Function Types

- Used to pass functions as parameters to other functions or return functions
- Function types come in two forms:
    1. Internal (by default)
        - Can only be called from within the current contract
    2. External
        - Can be called with a transaction from any account / contract
- Function types are defined with the following components:
    - function (<parameter-types>)
    - internal | external
    - pure | constant | view | payable
    - return (<return-types>)

## Arrays

- Can be defined with either a:
    - fixed size (length): `T[K]`
    - dynamic size (length): `T[]`
        - Can be resized on the fly, but are expensive in terms of gas
- Can be allocated to storage or memory
    - Storing an array could be costly
    - Storage arrays can hold any type, **including** mapping
    - Memory arrays can hold any type, **except** mapping
- After declaring an array to be `public` the getter function that is generated require an `index` of the desired value as a parameter
- Array members
    - `.length` - returns the length of the array - dynamic arrays in storage can be resized by assigning the length
    - `.push` - dynamic storage arrays and bytes (not string) have member `.push()` that append a value to the array - the new length is returned
- Memory arrays **cannot** be resized on the fly
    - In order to create an array of variable length in memory requires the `new` keyword E.g.:
        - `unit[] memory a = new uint[](<variable-length>);`
    - Once the array is defined, it is of fixed size, but the variable length can be determined at runtime
    - Much cheaper to use than storage arrays

## Structs

- A way to define new types created from existing data types E.g.:
    ```solidity
    struct Funder {
        address addr;
        uint amount;
    }

    struct Campaign {
        address beneficiary;
        uint fundingGoal;
        uint numFunders;
        uint amount;
        mapping (uint => Funder) funders;
    }
    ```
- Structs **cannot** contain members of it's own type
- Struct values stored as local variables in functions are **not** copied, they are passed by reference

## Mappings

- Can be thought of as a _hash table_
- Declared by: `mapping(<key-type> => <value-type>)`
- `<key-type>` can be any type **except** mapping, dynamic array, contract, enum, or struct
- `<value-type>` can by any type
- Every possible value is initialized to it's default
    - As a result, Mappings **don't** have a length
- Key data is not stored in the mapping, rather it's **keccack256** hash
- A mapping declared public will create a getter requiring the `<key-type>` as a parameter and will return the `<value-type>`

## Units

- Ether units is a simple conversion for globally accessible variables
    - The recognized units for Solidity are:
        - `wei`
        - `finney`
        - `szabo`
        - `ether`
- Solidity also allows for the conversion of time using suffixes
    - `1 == 1 seconds`
    - `1 minutes == 60 seconds`
    - `1 hours == 60 minutes`
    - `1 days == 24 hours`
    - `1 weeks == 7 days`
    - `1 years == 365 days`
    - Leap seconds and years are **not** taken into account

## List of Always Available Global Variables

- `msg.data` (bytes): complete calldata
- `msg.gas` (unint): remaining gas
    - Would be worthwhile to check this value **before** attempting to execute an expensive operation
- `msg.sender` (address): sender of the message for the current call
- `msg.sig` (bytes4): first four bytes of the calldata (i.e. function identifier)
- `msg.value` (uint): number of wei sent with the message
- `now` (uint): current block timestamp (alias for `block.timestamp`)
- `tx.gasprice` (uint): gas price of the transaction
- `tx.origin` (address): sender of the transaction (full call chain)
- `block.blockhash` (uint blockNumber) returns (bytes32): hash of the given block - only works for 256 most recent blocks excluding current block
- `block.coinbase` (address): current block miner's address
- `block.difficulty` (uint): current block difficulty
- `block.gaslimit` (uint): current block gas limit
- `block.number` (uint): current block number
- `block.timestamp` (uint): current block timestamp as seconds since unix epoch
    - Block miners can alter this value to some degree

## Additional Resources

- [Solidity Docs - Types](https://solidity.readthedocs.io/en/latest/types.html)
