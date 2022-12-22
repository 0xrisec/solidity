# Error handling

The term "error" refers to a situation that occurs during the execution of a contract which indicates something went wrong. There are many reasons why an error may occur, including invalid input, an exception being thrown, or a contract that has run out of gas. An error undoes all changes made to the state during a transaction. 

When an error occurs during the execution of a contract, all changes made to the state during the current transaction will be undone. This is known as a "state-reverting error."

The following methods can be used to throw an error and revert all changes made to the state during the current call and its sub-calls:

## require: 

The reuire is a bult-in function that can be enforces conditions on input arguments or contract states. Contract execution is aborted if the condition is not met. The require function takes a boolean expression as an argument and checks if it is true. The contract execution continues as usual if the expression is true. If the expression is false, an error is thrown and the contract execution is halted.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
     // Declare a state variable
    uint public balance;

    function add(uint amount) public {
        // Validate the input
        require(amount > 0, "Amount must be greater than zero");
        // Update the balance
        balance += amount;
    }
}
```

In the example above, the add function uses the require function to validate that the amount argument is greater than zero. 

<img class="image" src="./assets/images/error-require.JPG">
<b><center class="img-label">Error</center></b>

If the amount is not greater than zero, an error is thrown and the contract execution is halted. If the amount is greater than zero, the add function updates the balance state variable by adding the amount to it.

## revert

The revert function is a built-in function that can be used to trigger a revert in a smart contract. It has the following syntax:

<pre style="background: rgba(0,0,0,.05); padding:20px">

revert(); 

or

revert("description");

</pre>

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
// This line specifies the license of the contract.

pragma solidity 0.8.15;
// This line specifies the version of Solidity that the contract is written in.

contract MyContract {
    // This is the definition of the MyContract contract.

    function fun(uint value) public pure {
        // This is the definition of the fun function. It takes a uint256 value as an argument.

        if (value > 5) {
            // This block of code is executed if the value of value is greater than 5.

            revert("Value is too large");
            // The revert function is called with a string argument, causing a revert of the contract's execution.
        }
    }
}
```

<img class="image" src="./assets/images/example-revert-function.JPG">
<b><center class="img-label">Error</center></b>

The function contains an if statement that checks if the value of the value argument is greater than 5. If the condition is true, the revert() function is called with a string argument, causing a revert of the contract's execution. If the condition is false, the contract's execution continues normally.

## Assert

## Try / Catch
Try/catch statements handle exceptions thrown by the throw statement or by assert, require, or revert functions.
