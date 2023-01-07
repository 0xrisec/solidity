# Function Modifier

`Function modifiers` allow you to modify the behavior of functions in a declarative manner by adding additional checks or logic. This can be run before and after a function call and useful for enforcing specific conditions or requirements before a function is permitted to run, and can also help to make your code more modular and reusable. 

By defining `function modifiers`, you can create a set of reusable checks that can be applied to multiple functions as needed, rather than duplicating code across multiple functions. This can simplify maintenance and updates to your contracts.

**Declaration and Example:**

`Modifiers` are defined using the `modifier` keyword, followed by the name of the `modifier` and a set of parentheses. Inside the parentheses, you can specify any number of arguments, just like a regular function. Then, you define the code that you want to execute when the `modifier` is used by enclosing it in curly braces.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {

    // Define a modifier function called "inRange"
    modifier inRange(uint min, uint max, uint value) {
        // Check that the min value is less than or equal to the max value
        require(min <= max, "Invalid range");
        // Check that the value passed to the function is within the specified range
        require(value >= value && value <= max, "Value out of range");
        // If both checks pass, execute the code of the modified function
        _;
    }

    // Define a public function called "setValue"
    function setValue(uint value) public inRange(0, 100, value) {
        // This function will only execute if the value passed to it is between 0 and 100 (inclusive)
        // function code goes here
    }
}
```

The `modifier` keyword defines a `modifier` function called `inRange`. This `modifier` function takes three arguments: `min`, `max`, and `value`. It has two `require` statements that check if the value is within the specified range. 

If either of these checks fails, the transaction will be invalidated and the function will not execute.

A function `setValue`, which takes a single argument `value` of type `uint`. The `inRange` modifier is applied to this function, so it will only execute if the value passed to the function is between `0` and `100` (inclusive).

Finally, the `"_;"` syntax at the end of the modifier function indicates that the code of the modified function should be executed after the checks in the modifier have passed. In this case, the modified function is `setValue`, so the code inside the `setValue` function will only be executed if the value passed to it is between `0` and `100` (inclusive).

**`Modifiers` can be called before or after a function:**

**1.** Function modifiers are executed before the modified function if the `"_;"` syntax is used at the end of the modifier function:

```sol
modifier myModifier {
    // Modifier code goes here
    _;
}
```

**2.** If the `"_;"` syntax is used at the beginning of the modifier function then the modifier function will be executed after the modified function. like this:

```sol
modifier myModifier {
    _;
    // Modifier code goes here
}
```