# Factory Contracts

We can implement a factory design pattern that will ensure that every contract deployed using the factory adheres to a certain standard. 

Let’s look at what a standard Ethereum token implementation might look like. 

Tokens are a great case for a factory pattern because we want all of the token implementations to be compatible and convertible with one another.

Defining a standard interface that all tokens should implement can ease development and benefit the entire ecosystem.

```solidity
pragma solidity ^0.4.18;

contract Token {
    mapping(address => uint256) balances;
    uint256 totalSupply;

    function Token(
        uint256 _initialAmount
    ) public {
        balances[msg.sender] = _initialAmount;
        totalSupply = _initialAmount;
    }

    function transfer(
        address _to,
        uint256 amount
    ) public returns (bool) {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        balances[_to] += amount;
        return true;
    }
    ...
}
```

Here is the start of a basic Token contract. You can imagine that we might want to store more data in our Token contract. This contract does not have functions implemented yet. 

As we add functions and the contract increases in complexity, it will be more difficult to ensure that every Token contract is implementing the same interface and is bug-free.

Deploying all of these standard compliant tokens through a token factory will abstract away many of the implementation details.

We can use the factory design pattern in solidity.

In the factory contract, we need to make the standardized token contract available by importing it. 

```solidity
pragma solidity ^0.4.18;

import "./Token.sol";

contract TokenFactory {
    mapping(address => address[]) created;

    function createToken(uint256 _initialAmount)
        public
        returns(address)
    {
        Token newToken = new Token(_initialAmount);
        created[msg.sender].push(address(newToken));
        newToken.transfer(msg.sender, _initialAmount);
        return address(newToken);
    }
}
```

When we want to create a new token, we can pass the required constructor arguments for the Token contract into the token factory create token function.

In the create token function we specify that we are creating a new Token contract with the new keyword.  

The token contract creation will return the address of the new contract. We know that this contract is of type token and we specify the type of the newToken variable.

We can store the creator of the new token, and transfer all of the newly minted tokens to the caller.

The function returns the address of the new token contract. This new contract has all of the state variables and functions that we specified in the token contract. 

This is a useful design pattern that has numerous potential use cases.

The ConsenSys Github contains an [implementation](https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20.sol) of the EIP20 interface, as well as an [EIP20 token factory](https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20Factory.sol).

## Additional Resources

- [Manage several contracts with Factories](https://ethereumdev.io/manage-several-contracts-with-factories/)
