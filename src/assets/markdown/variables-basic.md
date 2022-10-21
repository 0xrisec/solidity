# Variables

Smart contracts in Solidity use variables to store information. You can think of variables as placeholders that stores information that you can use throughout your program. 

### Declaration of Variables:

<p>In Solidity, variables have a slightly different declaration. First, the data type must be specified, then the access modifier (visibility), finally variable name. </p>

**Syntax:** `<Type> <Visibility> <Variable Name> ; `

**Type:** Data type such as `uint`, `int`, `bool` etc. We will see data types in the next section. For now, we will use the int data type to store integers in our examples. 

**Visibility:** Visibility such as `public`, `private`,`internal`, `external`. We will see these in a later section. For now in our examples, we will use public visibility that is accessible to all meidum. 

<!-- <a href="https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.15+commit.e14f2714.js" class="code-link"><i class="fas fa-link"></i></a> -->

#### Example:
```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;
contract MyContract {
  int public num = 5; 
}
```
#### Types of Solidity variables:

There are three types of Solidity variables:

* State Variables
* Local Variables
* Global Variables


## State Variables

State variables are variables whose values are permanently stored in `Ethereum blockchain`.

In other words imagine you are using another programming language, such as `Java`, `C#`, `Python`, etc. And you want to store user information for a long time. How would you do it? Connect your application to a database server and then save the data there. With Solidity, you do not need a connection, you can simply use `state variables` to store your data permanently in the `blockchain`.

Each function has its own scope, and `state variables` should always be defined outside of that scope.

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract SimpleStorage {
    int public storedData; // State variable
}
```

<hr>

## Local Variables

This variable's value is present until the function executes, and it cannot be accessed outside of the function. This type of variable is usually used to store `temporary values` and not stored on the `blockchain`.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract SampleContract {
   function getResult() public pure returns(int){
      int num1 = 7;
      int num2 = 3;
      int result = num1 + num2;

      return result; 
   }
}
```
<hr>

## Global Variables

There are some special variables that are used globally and provide information about the `transactions` and `properties` of the `blockchain.` Such as:

  * `block.difficulty` : Current block difficulty
  
  * `block.timestamp` : Current block timestamp
  
  * `block.number` : Current block number

We will discuss these in a separate section with examples.