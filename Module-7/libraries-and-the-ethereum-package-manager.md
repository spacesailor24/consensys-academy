# Library and the Ethereum Package Manager

## Drawbacks of Solidity

- Transactions are executed and verified by every node
    - This is:
        - Expensive
        - Not scalable
- Few standard libraries exist
    - Managing arrays and strings can be painful
- Isolated environment
    - Makes it hard to obtain data as there are no APIs
        - Instead, you must use an Oracle to accomplish similar functionality
- Immutability of contracts makes upgradability difficult

## What are libraries?

- Ease some of the pain of contract development
- What is it? (as of now, may change in the future)
    - A contract without storage
    - Cannot hold ether
    - Cannot inherit or be inherited
    - "Libraries can be seen as implicit base contracts of the contracts that use them"
- Other contracts can call library functions without having to deploy them itself
    - Encourage code reuse
    - More secure as it uses already audited code
- Defined with `library` keyword instead of `contract`
    ```solidity
    pragma solidity ^0.4.18;

    library SafeMath {
        function mul(uint256 a, uint256 b) internal pure returns (unint256) {
            if (a ==0) {
                return 0;
            }

            uint256 c = a * b;
            assert(c / a == b);
            return c;
        }

        ...
    }
    ```
- By importing the library you can use methods defined in the library
- You can call a method on the first parameter by using the `using for` syntax:
    ```solidity
    pragma solidity ^0.4.18;

    import "./SafeMath.sol";

    contract Contract {
        using SafeMath for uint;

        uint num = 2;

        function multiply(uint b) public view returns(uint) {
            return SafeMath.mul(num, b);
        }

        // This works because of the above "using SafeMath for uint"
        function divide(uint b) public view returns(uint) {
            return num.div(b);
        }
    }
    ```
- Libraries use the DELEGATECALL opcode of the EVM
    - This means execution remains in the context of the calling contract
- Libraries can modify the calling contract's storage
    - Must be passed a storage reference
    - Modifications will persist in the calling contract's storage
    ```solidity
    pragma solidity ^0.4.16;

    library Set {
        // We define a new struct datatype that will be used to
        // hold it's data in the calling contract.
        struct Data { mapping(uint => bool) flags; }

        // Note that the first parameter is of type "storage
        // reference" and thus only it's storage address and not
        // it's contents are passed as part of the call. This is a
        // special feature of library functions. It is idiomatic
        // to call the first parameter "self", if the function can
        // be seen as a method of that object.
        function insert(Data storage self, uint value) public returns(bool) {
            if (self.flags[value])
            return false; // already exists
            self.flags[value] = true;
            return true;
        }

        function remove(Data storage self, uint value) public returns(bool) {
            if(!self.flags[value])
                return false; // doesn't exist
            self.flags[value] = false;
            return true;
        }
    }
    ```

Libraries are contracts that do not have storage, they cannot hold ether and they cannot inherit or be inherited by other contracts. Libraries can be seen as implicit base contracts of the contracts that use them.

They exist for the purpose of code reuse. Contracts can call library functions without having to implement or deploy the functions for itself - [allowing the library functions to modify the state of the calling contract](https://solidity.readthedocs.io/en/latest/contracts.html#libraries). This is made possible by the **DELEGATECALL** opcode of the EVM. This enables developers to use code that has already been audited and battle-tested in the wild.

To create a library contract we simply use the library keyword in place of the contract keyword. You will notice in this example that no storage variables are defined. Remember that libraries do not have a state, although it is possible for libraries to modify the calling contracts’ state. We will get to that in a moment.

Once you have defined a library, you can import it with an import statement at the top of the solidity file. Now you can call the functions defined in the library as methods on the library name. You can also use the 'using for' syntax shown, which allows you to call the library function as a method on the first parameter defined in the library’s function.

Libraries use the DELEGATECALL opcode of the EVM which preserves the context of the contract from which the library method is being called. This allows libraries to modify the state of calling contracts. The library can define the struct data type, but it will not be saved in storage until it is actually implemented in a contract. This implemented struct can be passed to the library and modified, and the modifications will persist in the contracts’ storage. This is a seldom-used feature of libraries in solidity, but it is good to be aware of.

Libraries offer some other benefits in terms of contract system design.

In the contract factory design pattern, a contract can have functionality to deploy additional contracts. If the contracts deployed from the factory contract are declaring the same functions, moving the functions to a library can reduce the size of the contract created by the factory. Reducing the size of the factory output contracts can save a lot of gas in deployment costs over the lifetime of the contract.

A caveat - calling a library function from a contract is a bit more expensive than calling internal functions, so there is a trade-off to consider. If the contract functions calling the library are frequently called, it may be better to pay the higher deployment cost to get cheaper function calls. You will have to run tests to determine which is best for your use case.

to run tests to determine which is best for your use case.

## Connecting to a Library

- The compiler cannot know where existing libraries are deployed
- The addresses have to be added to the byte code by a linker
- This can be managed by the command line
    - Truffle can also manage linking libraries
- Manually with Truffle:
    - Compile the library contract
    - Specify the network and address of the deployed contract in the artifact
    - Use `deployer.link()` in the migration script
- Ethereum package manager
    - Only currently on Ropsten (12/30/2018)

To connect to a library, you need the library contract as well as the address of the deployed instance.

Oftentimes you will deploy the library yourself, so the address management will be handled by truffle automatically.

Otherwise, the address of the deployed library has to be added to the bytecode by a linker. You can do this manually in your truffle project by adding the library contract to your contracts directory and compiling to get the artifact. You can modify the truffle artifact to specify the correct network and address where the library is deployed. [See the Truffle docs on linking to libraries](https://truffleframework.com/docs/truffle/getting-started/running-migrations#deployer-link-library-destinations-).

## EthPM and Truffle

- EthPM is the Ethereum Package Manager
    - `truffle install <package-name>`
- `ethpm.json` file tracks packages
- `import "<package-name>/<file-name>";`
- Only deploy if the contract is not already deployed
    - Truffle makes this easy with the `{overwrite: false}` property

Library and contract package management can be simplified by using EthPM. EthPM is essentially npm for Ethereum contracts. Truffle has support for EthPM so you can install a package with truffle install and the package name.

`truffle install <package-name>`
You can go to [ethpm.com](https://www.ethpm.com/) to browse the available packages. You should add an ethpm.json file to your project to track which packages and versions you are using.

Importing an ethpm package into a solidity file simply requires the file path reference at the top of your solidity file.

Truffle comes with an option for migrating contracts that enables you to only deploy contracts if there isn’t already a deployed instance. For example, MyContract requires an instance of the Ethereum Name Service contract. The following deployment script will only deploy an instance of the ENS (Ethereum Name Service) contract if there is not one on the detected network.

```javascript
var ENS = artifacts.require("ens/ENS");
var MyContract = artifacts.require("MyContract");

module.exports = function(deployer) {
  // Only deploy ENS if there's not already an address already.
  // i.e., don't deploy if we're using the canonical ENS address,
  // but do deploy it if we're on a test network and ENS doesn't exist.
  deployer.deploy(ENS, {overwrite: false}).then(function() {
    return deployer.deploy(MyContract, ENS.address);
  });
};
```

Like NPM, configuration options for EthPM go in a separate JSON file called `ethpm.json`. This file sits alongside your Truffle configuration and gives Truffle all the information it needs to publish your package.

## Save Gas

- Delegating function calls to libraries can be cheaper to deploy
- Function calls can be more expensive
- Useful for keeping contracts with frequent deployments small
    - Contract factory design patterns
    - Delegate function calls to library

## Additional Resources

- [Library Driven Development in Solidity](https://blog.aragon.one/library-driven-development-in-solidity-2bebcaf88736)
- [Libraries in the Solidity Docs](https://solidity.readthedocs.io/en/develop/contracts.html#libraries)
- [What are the steps to compile and deploy a library in solidity?](https://ethereum.stackexchange.com/questions/6927/what-are-the-steps-to-compile-and-deploy-a-library-in-solidity)
- [Package Management with EthPM in Truffle](http://truffleframework.com/docs/getting_started/packages-ethpm)
- [EthPM: Reusable Smart Contract Packages](https://medium.com/@gnidan/ethpm-smart-contract-packages-for-developers-81c77481c491)
