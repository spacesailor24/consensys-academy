# Functions

## Declaring Functions

- Declared using the `function` keyword
- Parameters are wrapped in parenthesis E.g.: `function (<parameters>)`
- Function accessibility:
    - Internal / Private
        - Only accessible within the contract
    - External / Public
        - Accessible by any address
        - External functions can be called internally, but the call will mimic an external call
- You **cannot** give a function parameter the same name as a state variable whether is be global or local
```solidity
function <function-name> (<parameters>)
    [internal | external | public | private]
    [pure | constant | view | payable]
    [modifiers]
    [returns (<return-type>)]
{
    <body>
}
```

## Function Accessibility

- Defaulted to `public`
    - A public function will be callable by any externally owned account or contract
    ```solidity
    function setName(string _name) {
        name = _name;
    }
    ```
- A `private` function will only be callable by other functions in the contract or contracts the inherit the contract containing a `private` function
    ```solidity
    function setName(string _name) private {
        name = _name;
    }
    ```
- There are 4 _accessibility modifiers_:
    1. Public
        - Applies no restrictions
    2. External
        - Only accessible from outside the contract
        - However, a contract can call an `external` contract by using the `this` keyword
            - This function call will mimic an external call
    3. Private
        - Only accessible from this contract
    4. Internal
        - Only accessible from this contract and all derived (children) contracts

## Function Returns

- If the function returns a value, it must be declared in the function signature
- The function signature can specify just the type:
    ```solidity
    string name = Wyatt;

    function getName() 
        returns(string) {
            returns name;
    }
    ```
    or the type and name:
    ```solidity
    string name = Wyatt;

    function getName() 
        returns(string _name) {
            _name = name;
    }
    ```
    - Specifying the type and the name does not require a return statement in the function body
- Function can return multiple values

## Constant / View

- Functions that do not modify state
- These are some ways that state can be modified:
    - Writing to state variables
    - Emitting events
    - Creating other contracts
    - Using selfdestruct
    - Sending Ether via calls
    - Calling any function not marked `view` or `pure`
    - Using low-level calls
    - Using inline assembly that contains certain opcodes

# Pure Functions

- Do not **read** or **modify** state
    - Similar to functional programming
- State reads include:
    - Reading from state variables
    - Accessing `this.balance` or `<address>.balance`
    - Accessing any of the member of `block`, `tx`, `msg` (with the exception of `msg.sign` and `msg.data`)
    - Calling any function not marked `pure`
    - Using inline assembly that contains certain opcodes

## Payable Functions

- Functions that handle Ether **must** be marked `payable`
    ```solidity
    uint balance;

    function deposit()
        public
        payable {
            balance += msg.value;
        }
    ```

## Throwing Exceptions

- A thrown exception **reverts the state of the transaction**
- Throw exceptions using:
    - `assert()`
        - Test internal errors and check for invariants
    - `require(condition)`
        - Ensure valid conditions / state
        - Validate return values
    - `revert()` always throws an exception

## Function Modifiers

- Modifiers can be defined with the keyword modifier
- Allows check to be reused across functions
    - This promotes code reuse
- Can be used to define a require statement
    - Indicate that the function body should execute following the modifier with an `_`
    ```solidity
    string name;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setName(string _name)
        onlyOwner {
            name = _name;
    }
    ```

## Fallback Functions

- Contracts can have one unnamed function
    - Takes no arguments and returns nothing
- This function is called if the given function identifier does not match any functions defined by the contract
- Limited gas (2300) when called by another contract
    - When using `.send()` or `.transfer()`
    - Make fallback functions as cheap as possible
- Gas is not limited if called externally

## Overloading Functions

- A contract can have multiple functions with the same name
    - However, each declaration **must** have different arguments
        - If not, than the second / child's function will overwrite the first / parent's function
    - This is also true for inherited functions

## Additional Resources

- [Solidity docs - Functions](https://solidity.readthedocs.io/en/v0.4.21/contracts.html#functions)
- [Solidity docs - Function Types](https://solidity.readthedocs.io/en/v0.4.21/types.html#function-types)
