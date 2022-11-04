# Functions

A function is a specific set of statements or a `block of code` that performs a particular task. It eliminates the need to write the same code repeatedly. Solidity's function format is similar to that of any other programming language: such as we write the function keyword, the function name, the parameters, the access modifier(also known as visibility), and return statement. Additionally, solidity functions have the feature of state mutability.

## Function declaration

Functions can be declared using the function keyword, followed by the function name, parameters wrapped inside `()`, function visibility , state mutability , return values, and the function body. 

**structure:**

<pre style="background: rgba(0,0,0,.05); padding:20px">
function function_name(&lt;Parameters&gt;) &lt;visibility&gt; &lt;state mutability&gt; [returns(&lt;return_type&gt;)]{
    //statements  
}

//visibility: internal/external/public/private
//state mutability: view/pure/payable
</pre>

## Function parameters

It specifies a list of parameters that are accepted by the function. It contains the type and the name of each parameter separated by a comma. It can be empty as well. 

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;
contract Example{
    uint result;
    function add(uint a, uint b) public {
        result = a + b;
    }
}
```

## Visibility

The visibility can be any of the following:

* **public:** The function can be accessed from everywhere.

* **private:** The function can be accessed only from inside the contract.

* **internal:** The function can be accessed from inside the contract as well as the child contracts that inherit it.

* **external:** The function can be accessed only from outside the contract. Other functions of the contract cannot invoke it.

<div class="doc-note"><p class="alert alert-primary">We will discuss variable visibility and function visibility in more detail together in a separate section.</p></div>

## State mutability

The mutability can be any of the following:

* **view:** Functions declared with view can only read the state, but do not modify it.

* **pure:** Functions declared with pure can neither read nor modify the state.

* **payable:** Functions declared with payable can accept Ether sent to the contract, if it’s not specified, the function will automatically reject all Ether sent to it.

<div class="doc-note"><p class="alert alert-primary">We will discuss this in next section with examples.</p></div>

## Return Variables

Just like in Other programming languages, functions accept parameters as input. As output, Functions can deliver an arbitrary number of values.

Variables can be returned from functions in two ways:

**1. Using return statement:**

We use the `returns` keyword to specify the type of return value at the level of the function definition. In function blocks, use the `return` keyword to return something.

<pre style="background: rgba(0,0,0,.05); padding:20px">
function function_name(&lt;Parameters&gt;) &lt;visibility&gt; &lt;state mutability&gt; <strong>[returns(&lt;return_type,return_type...&gt;)]</strong>{
    <strong>// return statement</strong>
}
</pre>

If we use return type with `returns` keyword we must required to return some value at the end of function with the help of `return` statement. Using return statement you can return multiple values as well.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.15;
contract Calculation {

    //return only single value 
    function add() public pure returns(uint){
       uint a = 1; 
       uint b = 2; 
       uint sum = a + b;
       return sum;
    }
   
   //return multiple values
   function getResult() public pure returns(uint,uint){
       uint a = 1;
       uint b = 2;
       uint sum = a + b;
       uint mul = a * b;       
       return (sum , mul);
      //return(a+b, a*b);     
   }
}
```
**2. Using names of the return variables:**

We use the `returns` keyword to specify return parameters at the level of the function definition.

<pre style="background: rgba(0,0,0,.05); padding:20px">
function function_name(&lt;Parameters&gt;) &lt;visibility&gt; &lt;state mutability&gt; <strong>[returns(&lt;return parameters&gt;)]</strong>{
    //return statement is optional 
}
</pre>

When you define variables as parameters of the returns keyword in the function definition, then return statement is optional.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract Example {
   function getResult() public pure returns(uint product, uint sum){
      uint a = 1;
      uint b = 2;
      product = a * b;
      sum = a + b;
      
      //you can use return stament as well
      //return(a*b, a+b);
   }
}
```
