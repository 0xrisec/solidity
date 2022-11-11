# State Mutability

Ethereum is a distributed state machine. State refers to a modified Merkle Patricia Trie data structure that contains information on accounts, balances, and machine state itself, which can vary from block to block according to a pre-defined set of rules. The term mutability refers to the tendency for machine state to change.

**Types of state mutability:** Based on `read` and `modify` of the state, we can divide the state mutability into two categories.

<center><img class="image w50" alt="Geth" src="./assets/images/state-mutability.JPG" ></center>
<b><center class="img-label">Types of state mutability</center></b>

**structure:**

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

pragma solidity 0.8.0;

contract SimpleContract {
    uint public totalAmount = 100;

    //reading state variable
    function addMoney(uint money) public view returns (uint) {
        return totalAmount + money; 
    }

    function getTimeStamp() public view returns (uint) {
        return block.timestamp; // Current block timestamp as seconds since unix epoch
    }
}
```
With the example above, we have a state variable `totalAmount`, which has a value of `100`, and through the `addMoney` function, we are adding more money to the state variable `totalAmount`. We read the blockchain state through the global variable `block.timestamp`, which returns the current block's timestamp.

An attempt to modify the state of the blockchain will result in an type error and a failure to compile.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract SimpleContract {
    uint public totalAmount = 100;

    //updating state variable
    function increment() public view returns (uint) {
        totalAmount = totalAmount + 1; //reading and modifying state variable
        return totalAmount; 
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

pragma solidity 0.8.0;

contract SimpleContract {
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
```

An attempt to modify and read the state of the blockchain will result in an type error and a failure to compile.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract SimpleContract {
    uint public total = 10;
    function add(uint a, uint b) public pure returns (uint) {
        total = total + a + b; // reading and modifying state variable
        return total;
    }
}
```

<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
TypeError: Function declared as pure, but this expression (potentially) modifies the state and thus requires non-payable (the default) or payable.
</pre>

<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
TypeError: Function declared as pure, but this expression (potentially) reads from the environment or state and thus requires "view".
</pre>


## Important Points:

1. `view` state mutability is automatically marked for getter methods.

2. `view `and `pure` functions can not receive or send ether and can not modify the blockchain state. For that, we will use a `payable` and `non-payable` state mutability, which will be covered in a later section. 

3. `pure` function can only call other `pure` functions. `view` function are not allowed to call.

4. `view` functions can only call other view or pure functions.

5. The following statements are considered reading the state:
    - Reading from state variables.
    - Accessing the balance at smart contract address `(this).balance` (this refers to smart contract adress) or at some specific account address `<address>.balance`.
    - Calling any function that is not marked `pure`.
    - Using inline assembly that contains certain opcodes. Inline assembly is a way to access the Ethereum Virtual Machine at a low level. etc. 

6. The following statements are considered modifying the state:
    - Writing to state variables.
    - Emitting events.
    - Sending Ether via calls.
    - Calling any function not marked `view` or `pure`.
    - Using low-level calls.
    - Creating other contracts.
    - Using inline assembly that contains certain opcodes. etc.

7. It is not possible to prevent functions from reading the state at the level of the `EVM`, it is only possible to prevent them from writing to the state (i.e. only `view` can be enforced at the EVM level, `pure` can not).

8. `view` functions can be overridden by `pure` functions.


<!-- 
    Covered in a later sections:
    
    pure functions can be converted to view and non-payable functions

    view functions can be converted to non-payable functions

    payable functions can be converted to non-payable functions 
    
    The state mutability of functions can now be restricted during inheritance. Functions with default state mutability can be overridden by pure and view functions while view functions can be overridden by pure functions. At the same time, public state variables are considered view and even pure if they are constants.

    -->
