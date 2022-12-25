# Special Functions

## Fallback Function

It is a function in a contract that is automatically executed when the contract receives a message (external function call). A contract can have at most one fallback function. It can be used to implement a default behavior for a contract, such as reverting all incoming transactions or logging an event. 

There are two ways to declare a fallback function in Solidity: Both versions of the fallback function must have external visibility and must not use the "function" keyword when they are declared.

**1. fallback () external [payable]:** This fallback function does not have any arguments and does not return any value. It can be marked as payable, which means that it can receive ether.

```sol
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
```

- fallback (bytes calldata input) external [payable] returns (bytes memory output): This fallback function takes an argument of type "bytes calldata" and returns a value of type "bytes memory". It can also be marked as payable.

**Declaration:** 
Fallback is declared using `fallback () external [payable]`. (without the function keyword) i.e it is declared using the fallback () keyword and must have external visibility. The fallback function can also be marked as payable, which allows it to receive ether. It cannot have any arguments and cannot return any values.

```sol
fallback() external payable {
  // code executed when the contract receives a message
}
```

 <center><img class="image" src="./assets/images/fallback.JPG"></center>
 <b><center class="img-label"></center></b>


The fallback function is executed either when a function that does not exist is called, when Ether is sent directly to a contract but the receive() function does not exist, or when msg.data is not empty.

 The receive function is executed on a call to the contract with empty calldata. This is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()). If no such function exists, but a payable fallback function exists, the fallback function will be called on a plain Ether transfer. If neither a receive Ether nor a payable fallback function is present, the contract cannot receive Ether through regular transactions and throws an exception.

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
}
```
 <center><img class="image" src="./assets/images/fallback-code-deployed.JPG"></center>
 <b><center class="img-label"></center></b>

When you deploy a contract, you will see that there is no button to call a fallback function, but you can still call a contract by doing low-level interactions. In the Remix IDE, you can use the "Low level interactions" to send funds or calldata (or both) to a contract. This allows you to call the fallback function of a contract.

In the "CALLDATA" field, enter the calldata you want to send to the contract. This should be a valid hexadecimal value.

Click the "Transact" button to send the calldata and/or funds to the contract.

The contract will execute the fallback function.

 <center><img class="image" src="./assets/images/fallback-logs.JPG"></center>
 <b><center class="img-label"></center></b>

  <center><img class="image" src="./assets/images/fallback-logs-object.JPG"></center>
 <b><center class="img-label"></center></b>
 
 The fallback function emits an event named Log with the function name, sender, value, and data of the call. Which you can check in the console output.

/////////    // Calling a function that does not exist triggers the fallback function.

## Receive Ether Function
The receive function is a special fallback function that is executed on a call to the contract with empty calldata. 

The receive function is a special function in Solidity that is called when a contract receives ether without any data. 

It is declared using the `receive` keyword and must have the `payable` and `external` state mutabilitiy and visibility. This function cannot have any arguments and cannot return anything.

calldata refers to the data that is passed to a contract when it is called. It includes the function signature and any arguments that are passed to the function. Calldata is stored in the contract's memory and is used to execute the desired function. The fallback function and the receive function are both called with empty calldata.

In summary, the receive function is a special function in Solidity that allows a contract to receive ether without any data. It is declared using the receive keyword and must have the payable and external state mutabilities. It cannot have any arguments or return anything, and can be marked as virtual and can have modifiers.

The receive function must have external visibility and is defined as follows:

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
The receive function is executed on a call to the contract with empty calldata. This is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()). If no such function exists, but a payable fallback function exists, the fallback function will be called on a plain Ether transfer. If neither a receive Ether nor a payable fallback function is present, the contract cannot receive Ether through regular transactions and throws an exception.



# Low level functions

## call
The call function is a low-level function that enables you to communicate with other contracts and execute their code but it does not modify the contract's state or create a transaction on the blockchain.

It is generally recommended to use the call function, when you just want to send Ether to a contract via the fallback function. This is because low-level interaction does not create a transaction on the blockchain, so it is more efficient and cheaper than creating a transaction.

**Declaration:**

```sol
(bool success, ) = contractAddress.call("functionName(arg1Type,arg2Type,...)");
if (!success) {
    // handle error
}

(bool sent,memory data) = _to.call("calldata");

(bool sent,memory data) = _to.call{value: msg.value}("");

(bool sent, bytes memory data) = _to.call{gas :10000, value: msg.value}("func_signature(uint256 args)");
```

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Fallback {
    // Declare an event for logging purposes
    event Log(string func, address sender, uint value, bytes data);
    uint public num = 0;
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

    function add(uint a, uint b) public {
        num = a + b;
    }

    function mul(uint a, uint b) public {
        num = a * b;
    }
}

contract Call {
    bytes public data;

    function callFallback(address _addr) public {
        (bool success, ) = _addr.call("data");
        require(success, "call failed!");
    }

    function callAdd(address _addr) public{
        (bool success, ) = _addr.call(abi.encodeWithSignature(
            "add(uint,uint)","call add",123
        ));
        require(success, "call failed!");
    }

    function callMul(address _addr) public{
        (bool success, bytes memory _data) = _addr.call{value:1 ether, gas: 5000}(abi.encodeWithSignature(
            "add(uint,uint)","call add",123
        ));
        require(success, "call failed!");
        data = _data;
    }

    function callDoesNotExist(address _addr) external {
        (bool success, ) =  _addr.call(abi.encodeWithSignature("functionDoesNotExist()"));
        require(success, "call failed!");
    }
}
```

## Delegatecall