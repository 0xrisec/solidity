# Variables

`Variables` are used to store data within a `smart contract`. They act as placeholder values that can be used and referenced throughout the program.

## Declaration of Variables:

`Variables` are defined by specifying the `data type`, `access modifier` (also known as `visibility`), and the variable name in that order. 

<pre style="background: rgba(0,0,0,.05); padding:20px">
&lt;Type&gt; &lt;Visibility&gt; &lt;Variable Name&gt;;
</pre>

**`<Type>` :** The data type of a variable in Solidity is specified using keywords such as `uint`, `int`, `bool`, etc. These data types determine the type of data that can be stored in the variable. For example, the `int` data type is used to store `integers`.

**`<Visibility>` :** The `visibility` of a variable is specified using keywords such as `public`, `private`, `internal`, or `external`. The `visibility` controls the accessibility of the variable from outside the contract. For example, a variable with `public` visibility can be accessed by anyone, while a variable with `private` visibility can only be accessed within the contract.

**`<Variable Name>` :** The variable name is a label that is used to reference the variable within the contract. Variable names are case-sensitive. The first character must be a letter or an underscore, not a number. Reserved keywords are not allowed to use as variable names.

<!-- <a href="https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.17+commit.e14f2714.js" class="code-link"><i class="fas fa-link"></i></a> -->

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
  // This line starts the definition of a new contract called "MyContract".
  
  int public count = 5;
  // This line declares a public variable called "count" that is of type "int" (integer).
  // The value of the variable is set to 5.
  // The "public" keyword specifies that the variable can be accessed by anyone.
}
```

## Types of Solidity variables:

There are three types of variables::

* State Variables
* Local Variables
* Global Variables


## State Variables

A `state variable` is a variable that is stored in the `contract's storage` and is accessible to all functions within the contract. The value of a state variable is permanently stored in the contract storage, meaning that it will remain even after the contract has finished executing. `EVM` contains contract storage. 

`EVM` is responsible for executing the code of a contract and managing the `contract's storage`. The EVM contains contract storage, which is a data structure that holds the values of all the `state variables` in a contract.


The `state` of a `state variable` changes when the information in the variable changes. The `state` of a `state variable` refers to the current value of the `variable`. When the information in a `state variable` changes, the `state` of the variable also changes to reflect the new value. For example, if a `state variable` holds the balance of a cryptocurrency account and a transaction is made to transfer some of the balance to another account, the `state` of the variable would change to reflect the updated balance.

`State variables` should always be defined outside of the scope of any particular function to ensure that they are visible and accessible to all functions within the contract. This allows all functions to access and modify the `state variables` as needed.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// SimpleStorage contract definition
contract SimpleStorage {
    // State variable to store total money
    int public totalMoney = 1111; 
}
```

## Local Variables

`Local variables` are variables that are only accessible within the function in which they are defined. Their values are temporary and are discarded after the function finishes executing. These variables are commonly used for storing temporary data during the execution of a function, and they are not stored on the `blockchain`.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// MyContract contract definition
contract MyContract {
    // getResult function definition
   function getResult() public pure returns(int){
      // Local variable to store first number
      int num1 = 7; 
      // Local variable to store second number
      int num2 = 3; 
      // Local variable to store result of num1 + num2
      int result = num1 + num2; 

      // Return result
      return result; 
   }
}
```
Inside the function, there are three local variables defined: `num1`, `num2`, and `result`. The `num1` and `num2` variables are used to store the two numbers that will be added together, and the `result` variable is used to store the result of the addition. The `num1` and `num2` variables are initialized to the values `7` and `3`, respectively. The result variable is initialized to the sum of `num1` and `num2`, which is `10`.

## Global Variables

There are certain `special variables` that provide information about the `transactions` and `properties` of the `Ethereum blockchain` and can be accessed globally within a `smart contract`. We will discuss these variables in detail with examples in a separate section.
