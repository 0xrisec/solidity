# Special Functions

## Fallback Function

It is a function in a contract that is automatically executed when the contract receives a message (external function call). A contract can have at most one `fallback` function. It can be used to implement a default behavior for a contract, such as reverting all incoming transactions or logging an event. 

There are two ways to declare a `fallback` function: Both versions of the `fallback` function must have `external` visibility and must not use the `"function"` keyword when they are declared.

**1. fallback () external [payable]:** This fallback function does not have any arguments and does not return any value. It can be marked as `payable`, which means that it can receive `ether`.

```sol
fallback() external payable {
  // code executed when the contract receives a message
}
```

<!-- ```sol
contract MyContract {
    // This function will be executed when the contract receives a message (external function call) that does not match any of the contract's functions
    fallback () external {
        // code here will be executed when contract receives a message with no matching function
    }
}

contract MyContract2 {
    // This function will be executed when the contract receives a message (external function call) that does not match any of the contract's functions
    // It can also receive Ether if the message is sent with a value
    fallback () external payable {
        // code here will be executed
    }
}
``` -->

**2. fallback (bytes calldata input) external [payable] returns (bytes memory output):** This `fallback` function takes an argument of type `"bytes calldata"` and returns a value of type `"bytes memory"`. It can also be marked as `payable`.

```sol
fallback (bytes calldata input) external payable returns (bytes memory output) {
    // code executed when the contract receives a message
}
```

<!-- The fallback function is executed either when a function that does not exist is called, when Ether is sent directly to a contract but the receive() function does not exist, or when msg.data is not empty. -->

The `fallback` function is executed either when a function that does not exist is called or when `msg.data` is not empty. `msg.data` is a built-in global variable that refers to the data associated with a message call. The data can include input parameters for a function call, as well as any additional data that is included in the message. 

<!-- The receive function is executed on a call to the contract with empty calldata. This is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()). If no such function exists, but a payable fallback function exists, the fallback function will be called on a plain Ether transfer. If neither a receive Ether nor a payable fallback function is present, the contract cannot receive Ether through regular transactions and throws an exception. -->

**Example 1:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Fallback {
    // Declare an event for logging purposes
    event Log(string func, address sender, uint value, bytes data);

    // Declare the fallback function
    // It must be declared as external
    fallback() external payable {
        // Emit an event with the function name, sender, value, and data
        emit Log("fallback", msg.sender, msg.value, msg.data);
    }
}
```

The contract `Fallback` has a `fallback` function that is declared with the `fallback` keyword. This function is executed when a message call is made to the contract. The `fallback` function is marked as `external` and `payable`, which means it can accept Ether. It also has an event called `Log` that is emitted with the` function name`, the `sender address`, the value of the `message call`, and the `msg.data`. The fallback function can be used for handling unexpected or default behavior in a contract.

When you deploy a `contract`, you will see that there is no button to call a `fallback` function, but you can still call a contract by doing `low-level interactions`. In the `Remix IDE`, you can use the `Low level interactions` to send funds or `calldata` (or both) to a contract. This allows you to call the fallback function of a `contract`.

<center><img class="image" src="./assets/images/fallback-code-deployed.JPG"></center>
<b><center class="img-label">Low-level interactions</center></b>

In the `CALLDATA` field, enter the `calldata` you want to send to the `contract`. This should be a valid `hexadecimal` value.

Click the `"Transact"` button to send the `calldata` and/or funds to the `contract`.

The `contract` will execute the `fallback` function.

 <center><img class="image" src="./assets/images/fallback-logs.JPG"></center>
 <b><center class="img-label">Console Logs</center></b>

<center><img class="image" src="./assets/images/fallback-logs-object.JPG"></center>
 <b><center class="img-label">Event Log</center></b>
 
The `fallback` function emits an `event` named `Log` with the `function name`, `sender`, `value`, and `data` of the call. Which you can check in the console output.

**Example 2:** Calling a function that does not exist triggers the `fallback` function.

## Receive Ether Function

The `receive` function is a variant of `fallback` function that is executed on a call to the contract with empty calldata. 

<center><img class="image w35" src="./assets/images/fallback.JPG"></center>
<b><center class="img-label"></center></b>

The `fallback` function is executed either when a function that does not exist is called, when Ether is sent directly to a contract but the receive() function does not exist, or when msg.data is not empty.

The `receive` function is executed on a call to the contract with empty calldata. `Receive` is the function that is executed on plain `Ether` transfers (e.g. via `.send()` or `.transfer()`). If no such function exists, but a `payable fallback` function exists, the `fallback` function will be called on a plain `Ether` transfer. If neither a receive `Ether` nor a `payable fallback` function is present, the contract cannot receive `Ether` through regular transactions and throws an exception.

It is declared using the `receive` keyword and must have the `payable` and `external` state mutabilitiy and visibility. This function cannot have any arguments and cannot return anything.

In summary, the `receive` function is a special function that allows a contract to receive `ether` without any data. It is declared using the `receive` keyword and must have the `payable` and `external` state mutabilities. It cannot have any arguments or return anything, and can be marked as `virtual` and can have `modifiers`.

**The receive function is defined as follows:**

```sol
function receive() external payable {
    // code to execute when contract receives Ether
}
```

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Fallback {
    // Declare an event for logging purposes
    event Log(string func, address sender, uint value, bytes data);

    // Declare the fallback function
    // It must be declared as external
    fallback() external payable {
        // Emit an event with the function name, sender, value, and data
        emit Log("fallback", msg.sender, msg.value, msg.data);
    }

   // It is similar to the fallback function,but it can only be called when the contract is receiving funds
    receive() external payable {
        // Emit an event with the function name, sender, value, and an empty data field
        emit Log("receive", msg.sender, msg.value, "");
    }
}
```

In the above code, the contract `Fallback` has two functions: `fallback` and `receive`. The `fallback` function is executed when a function that does not exist is called on the contract, or when` msg.data` is not empty. The `receive` function is similar to the `fallback` function, but it can only be called when the contract is receiving funds. Both functions are declared as `external` and `payable`, which means they can `receive` Ether from external calls. They both also emit an event with different parameters, such as the function name, the sender's address, the value of the transaction, and the data included in the message. The fallback function includes the `msg.data` field in the event, while the `receive` function includes an empty string.

**Example testing scenarios:**

**1.** When` msg.data` is empty and no ether transfer, `receive payable` and `fallback payable` functions are exist.

<center><img class="image" src="./assets/images/receive-example-testing-1.JPG"></center>
<b><center class="img-label"></center></b>

If the msg.data variable is empty and the receive function exists, the receive function will be called.

**2.** When` msg.data` is not empty and no ether transfer, `receive payable` and `fallback payable` functions are exist.

<center><img class="image" src="./assets/images/receive-example-testing-2.JPG"></center>
<b><center class="img-label"></center></b>

If the msg.data variable is not empty and no ether transfer is made, the fallback function will be called.

**3.** When` msg.data` is empty and 1 ether transfer, `receive payable` and `fallback payable` functions are exist.

<center><img class="image" src="./assets/images/receive-example-testing-3.JPG"></center>
<b><center class="img-label"></center></b>

If the msg.data variable is empty and 1 ether is transferred, the receive function will be called.

**4.** When` msg.data` is not empty and 1 ether transfer, `receive payable` and `fallback payable` functions are exist.

<center><img class="image" src="./assets/images/receive-example-testing-4.JPG"></center>
<b><center class="img-label"></center></b>

If the msg.data variable is not empty and 1 ether is transferred, the fallback function will be called.

**5.** When` msg.data` is empty and no ether transfer, `receive payable` is not exist and `fallback payable` functions is exist.

<center><img class="image" src="./assets/images/receive-example-testing-5.JPG"></center>
<b><center class="img-label"></center></b>

**6.**  When` msg.data` is not empty and no ether transfer, `receive payable` is exist and `fallback payable` functions is not exist.

<center><img class="image" src="./assets/images/receive-example-testing-6.JPG"></center>
<b><center class="img-label"></center></b>
