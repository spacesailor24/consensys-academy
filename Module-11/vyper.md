# Vyper

There is a notable lack of the following features that are present in Solidity:

- Modifiers - Modifiers make it easier to write misleading code. It encourages writing code where execution jumps around the source file, making audits more difficult. Vyper encourages inline checks in each function to improve clarity.

- Class Inheritance - Inheritance also makes it easier to write misleading code. Contracts’ logic is spread across multiple files, decreasing readability and requires additional understanding about how inheritance works in case of conflicts.

- Inline Assembly - Inline assembly makes it possible to manipulate variables without referencing it directly by name. This makes development and auditing more difficult and can obfuscate bugs.

- Function overloading - Contracts with overloaded functions can be confusing. It may not be clear which function is being called in specific situations.

- Operator overloading

- Recursive calling - It is not possible to set an upper bound on gas limits in contracts with recursive calling

- Infinite-length loops - It is not possible to set an upper bound on gas limits in contracts with infinite length loops

- Binary fixed point - In binary fixed point, approximations are required (e.g. in Python 0.3 + 0.3 + 0.3 + 0.1 != 1)

[You can view the latest documentation here.](https://vyper.readthedocs.io/en/latest/)

Vyper compiles to LLL.You can explore examples interactively here: https://vyper.online.

Exercise: Writing Ethereum Smart Contracts in Vyper 

[Follow this link](https://github.com/ConsenSys-Academy/simple-bank-vyper) to access a Vyper version of the Simple Bank Exercise.

Additional Resources:

- [Vyper Documentation](https://vyper.readthedocs.io/en/latest/index.html)
- [Vyper browser IDE](https://vyper.online/)
- [How I learned to stop worrying and love Viper — Part 1](https://medium.com/@daniel.jozsef/why-i-learned-to-stop-worrying-and-love-viper-part-1-c6ba7bda02f5)
- [An Early Look At Vyper](https://medium.com/@maurelian/an-early-look-at-vyper-d101e0c349c1)
