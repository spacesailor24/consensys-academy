# Security Analysis Tool

## Security Analysis Tools

A quick and easy way to check your Solidity code for common bugs is to use security analysis tools. Static analysis tools will parse your code and highlight potential security vulnerabilities.

**Please note that all issues raised are not necessarily security vulnerabilities and static analysis tools will not catch every possible vulnerability.**

Tools like [SmartCheck](https://tool.smartdec.net/) will do static analysis on your code right in the browser. You can upload a Solidity (or Vyper) file from your computer, paste the code or import your GitHub repository.

## Mythril

[Mythril](https://github.com/ConsenSys/mythril-classic/wiki) is another great tool that detects a range of security issues, including integer underflows owner-overwrite-to-Ether-withdrawal, and others. However, the analysis will not detect business logic issues. It uses concolic analysis, taint analysis and control flow checking to detect a variety of security vulnerabilities. Here is a table outlining [Mythril's detection capabilities](https://github.com/ConsenSys/mythril-classic/wiki/Mythril-Detection-Capabilities).

[Follow this link](https://github.com/ConsenSys/mythril-classic/wiki/Installation-and-Setup) to see installation instructions for your machine. Mythril also requires that solc (the Solidity compiler) is installed. [Reference the Solidity documentation for solc installation instructions](https://solidity.readthedocs.io/en/develop/installing-solidity.html?highlight=install%20solc). And note that installing the node.js package solc will not work with mythril as "the command line options of solcjs [installed via npm] are not compatible with solc and tools (such as geth) expecting the behavior of solc will not work with solcjs."

Let's dig in to using mythril. A great thing about mythril is that you can use it in existing truffle projects.

[Download this Truffle project containing a simple Coin.sol contract](https://github.com/ConsenSys-Academy/simple-coin).

```solidity
pragma solidity ^0.4.21;

contract Coin {
    // The keyword "public" makes those variables
    // readable from outside.
    address public minter;
    mapping (address => uint) public balances;

    // Events allow light clients to react on
    // changes efficiently.
    event Sent(address from, address to, uint amount);

    // This is the constructor whose code is
    // run only when the contract is created.
    constructor() public {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) public {
        require(msg.sender == minter, "Must be minter.");
        balances[receiver] += amount;
    }

    function send(address receiver, uint amount) public {
      // require(balances[msg.sender] >= amount, "Insufficient funds");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Navigate to the project directory in the terminal and compile the contracts with truffle compile. Once the contracts have compiled, run `myth --truffle` to analyze the project contracts.

In this case, it will output something like this:

```bash
josh@josh-Oryx-Pro:~/Documents/ethereum/Coin$ myth --truffle
# Analysis result for Coin:

==== Integer Overflow ====
SWC ID: 101
Type: Warning
Contract: Coin
Function name: mint(address,uint256)
PC address: 758
The arithmetic operation can result in integer overflow.

--------------------
In file: Coin.sol:21

balances[receiver] += amount

--------------------

==== Integer Underflow ====
SWC ID: 101
Type: Warning
Contract: Coin
Function name: send(address,uint256)
PC address: 839
The subtraction can result in an integer underflow.

--------------------
In file: Coin.sol:26

balances[msg.sender] -= amount

--------------------

==== Integer Overflow ====
SWC ID: 101
Type: Warning
Contract: Coin
Function name: send(address,uint256)
PC address: 916
The arithmetic operation can result in integer overflow.

--------------------
In file: Coin.sol:27

balances[receiver] += amount

--------------------
```

Mythril is letting us know that there are 3 arithmetic operations in the contract that could potentially overflow/underflow in certain contract states. Mythril points out the warning including the contract name, the function where there potential vulnerability is, the line number of the file and the expression on that line.

Now, uncomment the `require()` statement in `line 25` of `Coin.sol` and recompile the contracts and run `myth --truffle again`.

```bash
josh@josh-Oryx-Pro:~/Documents/ethereum/Coin$ myth --truffle
# Analysis result for Coin:

==== Integer Overflow ====
SWC ID: 101
Type: Warning
Contract: Coin
Function name: mint(address,uint256)
PC address: 758
The arithmetic operation can result in integer overflow.

--------------------
In file: Coin.sol:21

balances[receiver] += amount

--------------------
```

Now we see that there is only the one warning of potential integer overflow in the `mint()` function. This error persists because we don't have a check against it. The warning of integer underflow in `line 26` is gone, since we check that condition in the `require()` statement in `line 25`. Also note that the warning of integer overflow in `line 27` has disappeared as well, even though the vulnerability is still present.

You can also analyze specific Solidity files using the command `myth -xo ./contracts/coin.sol`. It is also possible to analyze contracts that are already deployed.

Mythril prints the analysis in the terminal in text format, but you can change this to markdown or json format with the `-o` argument.

`myth -xo json underflow.sol`
The maximum recursion depth for the symbolic execution engine can be controlled with the `--max-depth` argument. The default value is `12`. Lowering this value reduces the analysis time as well as the coverage / number of explored states.

**Mythril will not catch every vulnerability, but it is definitely worth adding to your developer toolbox.**

## Additional Resources

- [Mythril platform website](https://mythril.ai/)
- [Practical Smart Contract Security Analysis and Exploitation](https://hackernoon.com/practical-smart-contract-security-analysis-and-exploitation-part-1-6c2f2320b0c)
- [Slither, a Solidity source code analyzer](https://github.com/trailofbits/slither)
- [Smart Check](https://tool.smartdec.net/)
