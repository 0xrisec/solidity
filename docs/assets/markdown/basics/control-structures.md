# Control Structures 

Solidity offers several control structures with the same semantics as those found in C, JavaScript, and other languages. These include: `if`, `else`, `while`, `do`, `for`, `break`, `continue` and `return`.

## if/else and ternary operator

**if statement:** The `if` statement allows you to execute a block of code if a given condition is `true`.

**if-else statement:** The `if` statement allows you to execute a block of code if a given condition is `true`. The `else` statement allows you to execute a different block of code if the condition is not `true`.

**if-else if-else statement:** When a condition of any if block is `true`, the block of code associated with it is executed, rest if blocks are skipped, and the `else` block is executed if none of the conditions are `true`.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This contract defines a function called getNum
// It takes an unsigned integer as an argument and returns an integer
contract MyContract {
    // The function definition
    function getNum(uint number) public pure returns (int) {
        // If the number is greater than 0, return 0
        if(number>0){
            return 0;
            // If the number is less than 0, return -1
        } else if(number<0){
            return -1;
            // If the number is 0, return 1
        } else {
            return 1;
        }
    }
}
```

In above contract, the function `getNum` takes an unsigned integer as an input and returns an integer. It checks the value of the input number and returns a value based on the following conditions:
- `If` the input number is greater than `0`, it returns `0`.
- `If` the input number is less than `0`, it returns `-1`.
- `If` the input number is equal to `0`, it returns `1`.

The `if` statement requires a `boolean` condition to be evaluated. Solidity does not support the statement `if (1) {... }` because there is no type conversion from non-boolean to `boolean` types. The condition must be a `boolean` value. For example:

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This contract defines a function called foo
contract MyContract {
  // The function definition
  function foo() public pure returns(uint){
    // Declare and initialize a uint variable called i
    uint i = 1;
    // If the value of i is true, return 1
    if(i) { 
        return 1;
    }
    // If the value of i is not true, return 0
    return 0;
  }
}
```
<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
TypeError: Type uint256 is not implicitly convertible to expected type bool.
</pre>

**Conditional (ternary) operator:**

The `ternary operator (? :)` can also be used to perform the `if...else` statement. The result of `?` is returned if the condition is `true`. The result of `:` is returned when the condition is `false`.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This is the contract definition for MyContract
contract MyContract {
  // This function checks if the given number is positive or not
  function isPositive(int number) public pure returns (bool) {
    // The ternary operator checks if the number is greater than 0
    // If it is, it returns true
    // If it is not, it returns false
    return (number > 0) ?  true : false;
  }
}
```

## While and For Loop

An `unbounded loop` is a loop that does not have a fixed number of iterations. Instead, it continues to execute until a certain condition is met. If the condition is never met, the loop will continue to execute indefinitely. This can be a problem when executing a transaction on the blockchain because the `gas limit` will eventually be reached, causing the transaction to fail. Therefore, it is important to avoid writing `unbounded loops` in your contract code to ensure that your transactions will not fail due to the `gas limit`.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    function loops() public pure returns(uint){
        // Initialize num with value 2
        uint num = 2;
        
        // Execute the loop body as long as num is less than 4
        while(num < 4){
            // Increment num by 1
            num++;
        }

        // Initialize i with 0. Execute the loop body as long as i is less than 10. Increment i by 1 after each iteration
        for(uint i = 0; i<10 ;i++){
            // Skip to next iteration if i is equal to 1
            if (i == 1) {
                continue;
            }
            // Exit loop if i is equal to 3
            if (i == 3) {
                break;
            }
            // Increment num by 1
            num++;
        }

        // Execute the loop body as long as num is less than 10
        do{
            // Increment num by 1
            num++;
        } while(num<10);
        
        // Return the final value of num
        return num;
    }
}
```

In above contract, the `loops` function demonstrates the use of `while`, `for`, and `do-while` loops.

In the `while` loop, the loop continues to execute as long as the condition `num < 4` is `true`. In this case, `num` starts at `2` and is incremented by `1` each iteration, so the loop will execute until num is equal to `4`.

The for loop iterates `10` times, from `0` to `9`, and includes a couple of `if` statements with `continue` and `break` statements. The continue statement skips to the next iteration of the loop if the condition `i == 1` is `true`. The `break` statement exits the loop if the condition `i == 3` is `true`.

The `do-while` loop continues to execute as long as the condition `num<10` is `true`. In this case, `num` starts at `2` and is incremented by `1` each iteration, so the loop will execute until num is equal to `10`.

Finally, the function returns the final value of `num`, which is `10` after all the loops have completed.