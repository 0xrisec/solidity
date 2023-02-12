# Error handling

The term `error` refers to a situation that occurs during the execution of a contract which indicates something went wrong. There are many reasons why an `error` may occur, including invalid input, an exception being thrown, or a contract that has run out of `gas`. An error `undoes` all changes made to the state during a transaction. 

When an `error` occurs during the execution of a contract, all changes made to the state during the current transaction will be undone. This is known as a `state-reverting error`.

The following methods can be used to throw an error and revert all changes made to the state during the current call and its sub-calls:

## Require: 

The `require` is a bult-in function that can be enforces conditions on input arguments or contract states. Contract execution is aborted if the condition is not met. The `require` function takes a boolean expression as an argument and checks if it is `true`. The contract execution continues as usual if the expression is `true`. If the expression is `false`, an `error` is thrown and the contract execution is halted.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
    uint256 public value;

    function setValue(uint256 newValue) public {
        // Using require to check a condition before proceeding
        require(newValue > 0, "Value must be greater than 0");
        value = newValue;
    }
}
```

Here, in `setValue` function, we are using `require` to check that the new value being passed is greater than `0`. If it is not, the `require` statement will return an error message `"Value must be greater than 0"` and stop execution of the function, will not change the state of the contract.

**Use Case:**

The require function is typically used to validate user inputs,  state conditions before executing state-changing operations in a smart contract.

**1. Use require to validate user inputs:** Before executing a function that takes user input, you can use require to check that the input meets certain conditions.

**2. Use require to validate state conditions prior to state-changing operations:** Before executing a function that changes the state of the contract, you can use require to check that certain conditions are met. For example, in an "owned" contract, you can use require to check that the message sender is the owner of the contract before allowing them to execute a function that changes the contract's state.

## Revert

The `revert()` is a function that allows you to check a condition and revert the state of the contract if the condition is not met, while also returning a "revert reason" and refunding any remaining gas to the caller. It has the following syntax:

<pre style="background: rgba(0,0,0,.05); padding:20px">

revert(); 

or

revert("description");

</pre>

When a `revert` happens, the state of the contract is rolled back to the state it was in before the call that caused the `revert` and any changes made to the state during the call are discarded. Additionally, all the gas that was not used during the call is refunded to the caller. The `revert` reason passed can be used to inform the user about the reason for the revert.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
// This line specifies the license of the contract.

pragma solidity 0.8.17;
// This line specifies the version of Solidity that the contract is written in.

contract MyContract {
    // This is the definition of the MyContract contract.

    function fun(uint value) public pure {
        // This is the definition of the fun function. It takes a uint256 value as an argument.

        if (value > 5) {
            // This block of code is executed if the value of value is greater than 5.

            revert("Value is not within the accepted range");
            // The revert function is called with a string argument, causing a revert of the contract's execution.
        }
    }
}
```

The `function` contains an `if` statement that checks if the value of the value argument is greater than `5`. If the condition is `true`, the `revert()` function is called with a `string` argument, causing a revert of the contract's execution. 

<center><img class="image" src="./assets/images/example-revert-function.JPG"></center>
<b><center class="img-label">Error</center></b>

If the condition is `false`, the contract's execution continues normally.

**Use Case:**

The `revert` function can be used to handle the same types of situations as the `require` function, but with more complex logic. `require` is a simple check to see if a certain condition is met, and if not, the transaction is immediately reverted with no further processing.

While `revert` function can be used in situations similar to `require`, it also allows you to add more complex logic before reverting the state. For example, you can use revert to check multiple conditions, or to perform some additional calculations before deciding whether to revert the state.

## Assert

The `assert()` function is typically used to check for conditions that should never be `false`, such as `invariants` or `internal errors`. If an `assert()` statement fails, it means that there is likely a bug in the contract's code or in the input provided to the function.

The `assert()` function is used to check for internal errors, such as overflow/underflow or invariant violations, it is intended to be used to test for conditions that should never be `false`. If the condition is `false`, the function execution is halted, but the state is not rolled back.

`Invariants` are conditions that should always be `true` within a smart contract, and if an assert statement is reached, it means that an invariant has been violated, and the contract has encountered an internal error. This indicates a bug in the contract that should be fixed.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
    uint public totalSupply;
    uint public balance;

    function increaseTotalSupply(uint _value) public {
        // Check for underflow/overflow
        assert(_value > 0);
        assert(totalSupply + _value > totalSupply);

        // Increase the total supply
        totalSupply += _value;
        balance += _value;

        // Check invariants
        assert(balance >= totalSupply);
    }
}
```

In this example, the `increaseTotalSupply()` function takes a single parameter `_value` and increases the total supply of the contract by that value.

The first `assert()` statement is used to check that the value passed to the function is greater than `0`, to prevent `underflow`.

The second `assert()` statement is used to check that the `totalSupply` will not `overflow` after adding `_value` to it.

After the `totalSupply` is increased, the third `assert()` statement is used to check that the balance of the contract is greater than or equal to the total supply, to maintain an invariant of the contract.

If any of the `assert` conditions fail, the execution of the function will be halted, but the state will not be rolled back.

**Use Case:**

`Assert` function is typically used to check for `overflow/underflow`, `check invariants`, validate contract state after making changes, and to prevent conditions that should never be possible.

**1. Use assert to check for overflow/underflow:** Before executing a function that performs arithmetic operations, you can use `assert` to check that the result of the operation will not cause an `overflow` or `underflow`. For example, you can use `assert(c > b)` after performing `c = a+b` to ensure that the result of the addition is not smaller than `b`.

**2. Use assert to check invariants:** Before and after executing a function that changes the state of the contract, you can use `assert` to check that certain invariants are upheld. For example, in a token contract, you can use `assert(this.balance >= totalSupply)` to ensure that the total supply of tokens is always greater than or equal to the number of tokens that have been distributed.

**3. Use assert to validate contract state after making changes:** After executing a function that changes the state of the contract, you can use `assert` to check that the state of the contract is valid. For example, in a voting contract, you can use `assert` to check that the total number of votes cast is less than or equal to the total number of `voters`.

**4. Use assert to prevent conditions which should never be possible:** Use `assert` to check for conditions that should never be `true`.
