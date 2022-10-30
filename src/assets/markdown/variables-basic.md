# Variables

Smart contracts in Solidity use variables to store information. You can think of variables as placeholders that stores information that you can use throughout your program. 

## Declaration of Variables:

<p>In Solidity, variables have a slightly different declaration. First, the data type must be specified, then the access modifier (visibility), finally variable name. </p>

**Syntax:** `<Type> <Visibility> <Variable Name> ; `

`<Type>:` Data type such as `uint`, `int`, `bool` etc. We will see data types in the next section. In our examples, we will use the int data type to store integers.

`<Visibility>:` Visibility such as `public`, `private`,`internal`, `external`. We will see these in a later section. Throughout our examples, we will use public visibility which means the variable is accessible to all.

`<Variable Name>:` Variable names are case-sensitive. The first character must be a letter or an underscore, not a number (0-9). Reserved keywords are not allowed to use as variable names.

<!-- <a href="https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.15+commit.e14f2714.js" class="code-link"><i class="fas fa-link"></i></a> -->

**Example:**
```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;
contract MyContract {
  int public count = 5; 
}
```

## Types of Solidity variables:

There are three types of Solidity variables:

* State Variables
* Local Variables
* Global Variables


## State Variables

In general object-oriented programming languages such as `Java`, `C#`, `Python`, variables are used to manipulate information using different functions, and once the application is closed, all the variables are destroyed. Whenever you need to store user information for a long period of time. We establish a connection between the application and the database server and send data to the database server. 

`State variables` are variables whose values are permanently stored in contract storage. `EVM` contains contract storage. The state of a state variable changes when the information in the variable changes. 

The state consists of all account `balances` and `storage values`. When a transaction is processed, the state is updated to reflect the changes in account balances and storage values. Such as the balance of an NFT token within a specific address or the balance of a given token at a specific address etc. 

Each function has its own scope, and `state variables` should always be defined outside of that scope.

**Example:**
```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract SimpleStorage {
    int public totalMoney; // State variable
}
```

## Local Variables

This variable's value is present until the function executes, and it cannot be accessed outside of the function. This type of variable is usually used to store `temporary values` and not stored on the `blockchain`.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract SampleContract {
   function getResult() public pure returns(int){
      int num1 = 7; //Local Variable
      int num2 = 3; //Local Variable
      int result = num1 + num2; //Local Variable

      return result; 
   }
}
```
## Global Variables

There are some special variables that are used globally and provide information about the `transactions` and `properties` of the `blockchain.` Such as:

  * `block.difficulty` : Current block difficulty
  
  * `block.timestamp` : Current block timestamp
  
  * `block.number` : Current block number

We will discuss these in a separate section with examples.