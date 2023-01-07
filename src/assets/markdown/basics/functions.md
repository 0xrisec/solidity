# Functions

A function is a specific `set of statements` or a `block of code` that performs a particular task. It eliminates the need to write the same code repeatedly. Solidity's function format is similar to that of any other programming language: such as we write the function keyword, the function name, the parameters, the access modifier(also known as visibility), and return statement. Additionally, solidity functions have the feature of state mutability.

## Function declaration

To declare a function, you use the function keyword followed by the function name and a list of parameters inside parentheses. You can also specify the function's visibility (such as `public`, `private`, `internal`, or `external`) and state mutability (such as `view`, `pure`, or `payable`). If the function returns a value, you can use the returns keyword to specify the return type.

<pre style="background: rgba(0,0,0,.05); padding:20px">
function function_name(&lt;parameters&gt;) &lt;visibility&gt; &lt;state mutability&gt; [returns(&lt;return_type&gt;)]{
    //statements  
}
</pre>

## Function parameters

Function parameters are a list of variables that are accepted by the function. They consist of the type and name of each parameter, separated by a comma. The parameters are optional and the function can be declared without them.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declares a state variable 'result' of type 'uint'
    uint result;
    // Defines a function called 'add' that accepts two 'uint' parameters 'a' and 'b'
    // The function is marked as 'public' and can be called from external contracts or accounts
    function add(uint a, uint b) public {
        // Assigns the result of 'a' plus 'b' to the 'result' state variable
        result = a + b;
    }
}
```
Inside the contract, there is a state variable called `result` of type `uint`. This variable will be used to store the result of an addition operation.

The contract defines a function called `add`. This function accepts two parameters, `a` and `b`, both of which are `uint (unsigned integers)`. The function is marked as `public`, meaning it can be called by any external contract or account.

Inside the function, the result variable is assigned the result of `a` plus `b`. This means that if the `add` function is called with values `3` and `5`, the result variable will be set to `8`.

## Visibility

`Visibility` determines how the function can be accessed. The visibility can be any of the following:

* **public:** The function can be accessed from everywhere.

* **private:** The function can be accessed only from inside the contract.

* **internal:** The function can be accessed from inside the contract as well as the child contracts that inherit it.

* **external:** The function can be accessed only from outside the contract. Other functions of the contract cannot invoke it.

<div class="doc-note"><p class="alert alert-primary">We will discuss variable visibility and function visibility in more detail together in a separate section.</p></div>

## State mutability

`State mutability` determines whether the function can read or modify the state of the contract. The mutability can be any of the following:

* **view:** Functions declared with view can only read the state, but do not modify it.

* **pure:** Functions declared with pure can neither read nor modify the state.

* **payable:** Functions declared with payable can accept Ether sent to the contract, if it’s not specified, the function will automatically reject all Ether sent to it.

<div class="doc-note"><p class="alert alert-primary">We will discuss this in next section with examples.</p></div>

## Return Variables

Functions can accept parameters as input and return an arbitrary number of values as output. There are two ways to return variables from a function:

**1. Using return statement:**

When you use the `returns` keyword to specify the return type of the function at the level of the function definition, you must use the `return` statement inside the function body to return a value. You can use the return statement to return a single value or multiple values.

<pre style="background: rgba(0,0,0,.05); padding:20px">
function function_name(&lt;Parameters&gt;) &lt;visibility&gt; &lt;state mutability&gt; <strong>[returns(&lt;return_type,return_type...&gt;)]</strong>{
    <strong>// return statement</strong>
}
</pre>

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Declares a contract called 'Calculation'
contract Calculation {
    // Defines a function called 'add' that returns a single 'uint' value
    // The function is marked as 'public' and 'pure', which means it can be called from external contracts or accounts, but does not modify the state
    function add() public pure returns(uint) {
        // Declares two 'uint' variables 'a' and 'b' and assigns them values
        uint a = 1;
        uint b = 2;
        // Declares a 'uint' variable 'sum' and assigns it the result of 'a' plus 'b'
        uint sum = a + b;
        // Returns the value of 'sum'
        return sum;
    }
    
    // Defines a function called 'getResult' that returns two 'uint' values
    // The function is marked as 'public' and 'pure', which means it can be called from external contracts or accounts, but does not modify the state
    function getResult() public pure returns(uint, uint) {
        // Declares two 'uint' variables 'a' and 'b' and assigns them values
        uint a = 1;
        uint b = 2;
        // Declares two 'uint' variables 'sum' and 'mul' and assigns them the result of 'a' plus 'b' and 'a' multiplied by 'b', respectively
        uint sum = a + b;
        uint mul = a * b;
        // Returns the values of 'sum' and 'mul'
        return (sum , mul);
        //return(a+b, a*b);  
    }
}
```

`Calculation` contract contains two functions: `add` and `getResult`.

The `add` function is defined to be public and pure, meaning that it can be called from external contracts or accounts, but does not modify the contract's state. It returns a single `uint` value, which is calculated by adding two `uint` variables `a` and `b` and storing the result in a variable `sum`.

The `getResult` function is also defined to be `public` and `pure`, and returns two `uint` values. It calculates the sum of `a` and `b` and stores the result in the variable `sum`, and calculates the product of `a` and `b` and stores the result in the variable `mul`. The values of `sum` and `mul` are then returned by the function.

**2. Using names of the return variables:**

We use the `returns` keyword to specify return parameters at the level of the function definition.

When you define variables as parameters of the `returns` keyword in the function definition, you don't need to use the `return` statement inside the function body. The variables will be returned automatically when the function is called.

<pre style="background: rgba(0,0,0,.05); padding:20px">
function function_name(&lt;Parameters&gt;) &lt;visibility&gt; &lt;state mutability&gt; <strong>[returns(&lt;return parameters&gt;)]</strong>{
    //return statement is optional 
}
</pre>

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Defines a function called 'getResult' that returns two 'uint' values
    // The function is marked as 'public' and 'pure', which means it can be called from external contracts or accounts, but does not modify the state
    function getResult() public pure returns(uint product, uint sum) {
        // Declares two 'uint' variables 'a' and 'b' and assigns them values
        uint a = 1;
        uint b = 2;
        // Declares two 'uint' variables 'product' and 'sum' and assigns them the result of 'a' multiplied by 'b' and 'a' plus 'b', respectively
        product = a * b;
        sum = a + b;
        
        // Optionally, you can use a return statement to return the values of 'product' and 'sum'
        //return(a*b, a+b);
    }
}
```

`MyContract` contains a function called `getResult`. This function is marked as `public` and `pure`, meaning it can be called from external contracts or accounts and does not modify the state of the contract. The function has two `uint` type return variables, `product` and `sum`. When the function is called, it declares two `uint` variables `a` and `b` and assigns them values of `1` and `2`, respectively. It then calculates the product of `a` and `b` and assigns it to the product variable, and calculates the sum of `a` and `b` and assigns it to the sum variable. Finally, the function returns the values of `product` and `sum`. If the function is called, it will return the values of `2` and `3`, respectively.