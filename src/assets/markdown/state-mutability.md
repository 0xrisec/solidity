# State Mutability

State mutability refers to the ability to read and modify the state variables of a smart contract. 

**Types of state mutability:** 

`State mutability` can be divided into two categories based on the ability to `read` and `modify` the state.

<center><img class="image w50" alt="Geth" src="./assets/images/state-mutability.JPG" ></center>
<b><center class="img-label">Types of state mutability</center></b>

**Declaration:**

<pre style="background: rgba(0,0,0,.05); padding:20px">
function function_name(&lt;Parameters&gt;) &lt;visibility&gt; <b>&lt;state mutability&gt;</b> [returns(&lt;return_type&gt;)]{
    //statements  
}
</pre>

## View state mutability: (read, not modify)

keyword: `view`

By declaring a function as a `view`, it can read the state of the blockchain but promises not to modify the state.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Declares a contract called 'Calculation'
contract MyContract {
    // This line declares a public state variable called `balance` of type `uint` (unsigned integer),
    // and initializes it to the value 100. The `public` keyword makes this variable accessible
    // from outside the contract.
    uint public balance = 100;

    // This function returns the current balance of the contract
    // and has the view modifier, indicating that it does not
    // modify the state of the contract.
    function getBalance() public view returns (uint) {
        return balance;
    }
}
```

In this example, the `getBalance` function is marked with the `view` modifier. This means that calling the `getBalance` function will not change the value of the balance state variable and will not cause any other side effects.

It is good practice to use the view modifier for functions that only read the state of the contract and do not modify it, as it helps to clearly communicate the intended behavior of the function to other developers who may be working on the contract.

An attempt to modify the state of the blockchain will result in an type error and a failure to compile. For example:

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Declares a contract called 'Calculation'
contract MyContract {
    uint public count = 100;
    // This line declares a public state variable called `count` of type `uint` (unsigned integer),
    // and initializes it to the value 100. The `public` keyword makes this variable accessible
    // from outside the contract.

    // This function increments the count state variable by 1 and returns the new value of count.
    function increment() public view returns (uint) {
        count = count + 1; //reading and modifying state variable
        // This line reads the current value of the `count` state variable, adds 1 to it, and then
        // assigns the result back to the `count` state variable.
        
        return count; 
    }
}
```
<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
TypeError: Function declared as view, but this expression (potentially) modifies the state and thus requires non-payable (the default) or payable.
</pre>

## Pure state mutability: (not read ,not modify)

keyword: `pure`

Functions can be declared pure in which case they promise not to read or modify the state. 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Declares a contract called 'Calculation'
contract MyContract {
    // This function adds two unsigned integers and returns the result.
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
```

The `add` function takes two arguments of type `uint` (unsigned integer), called `a` and `b`, and returns the result of adding them together. The `public` keyword makes this function accessible from outside the contract, and the `pure` modifier specifies that the function does not read and modify the state of the contract. The returns (`uint`) clause specifies that the function returns a value of type `uint`.

An attempt to modify and read the state of the blockchain will result in an type error and a failure to compile.

## Important Points:

**1.** State mutability with the `view` modifier is automatically applied to functions that are used to get the values of state variables. These functions are commonly referred to as `getter methods`.

**2.** Functions with the `view` and `pure` modifiers cannot receive or send ether, and cannot modify the state of the blockchain. To perform these actions, we can use the payable or non-payable state mutability modifiers, which will be covered in a later section.

**3.** Functions with the `pure` modifier can only call other functions with the `pure` modifier. Functions with the `view` modifier are not allowed to call functions with the `pure` modifier.

**4.** Functions with the `view` modifier can only call other functions with the `view` or `pure` modifiers.

**5.** The following actions are considered reading the state:
- Reading from state variables.
- Accessing the balance at smart contract address `(this).balance` (this refers to smart contract adress) or at some specific account address `<address>.balance`.
- Calling any function that is not marked with the `pure` modifier.
- Using inline assembly that contains certain opcodes. Inline assembly is a way to access the Ethereum Virtual Machine at a low level. etc. 

**6.** The following statements are considered modifying the state:
- Writing to state variables.
- Emitting events.
- Sending Ether via calls.
- Calling any function not marked with the `view` or `pure` modifier.
- Using low-level calls.
- Creating other contracts.
- Using inline assembly that contains certain opcodes. etc.

**7.** It is not possible to prevent functions from reading the state at the level of the `EVM`, it is only possible to prevent them from writing to the state (i.e. only `view` can be enforced at the EVM level, `pure` can not).

**8.** `view` functions can be overridden by `pure` functions.
