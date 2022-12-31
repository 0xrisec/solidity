# Low level functions

## Call

The `call` function is a `low-level function` that enables you to communicate with other contracts and execute their code but it does not modify the contract's state or create a transaction on the blockchain.

It is generally recommended to use the `call` function, when you just want to send Ether to a contract via the `fallback` function. This is because `low-level interaction` does not create a transaction on the blockchain, so it is more efficient and cheaper than creating a transaction.

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

**Example:**
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
            "add(uint,uint)","call mul",123
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

Above code defines two contracts: `Fallback` and `Call`. The `Fallback` contract has four functions:

- **The fallback function:** This function is called when the contract receives a message (e.g., a transaction) that does not match any of the other functions in the contract. It is marked as `"external payable"`, which means it can be called from `external` contracts or accounts and can also receive `Ether` (the native cryptocurrency of Ethereum). The fallback function `logs` an event with the `function name`, `sender address`, `value`, and `data` of the message.

- **The receive function:** This function is similar to the `fallback` function, but it is only called when the contract is receiving funds. It `logs` an event with the `function name`, `sender address`, and `value` of the message, but does not include the data field.

- **The add function:** This function takes two `unsigned integers (uint)` as input and sets the value of the public variable `"num"` to their sum.

- **The mul function:** This function takes two `unsigned integers` as input and sets the value of the public variable `"num"` to their product.

The `Call` contract has five functions:

- **The callFallback function:** 



This function takes an address as input and calls the `fallback function` of the contract at that address with the data `"data"`.


- **The callAdd function:** 

<center><img class="image" src="./assets/images/call-example-1.JPG"></center>
<b><center class="img-label">Output</center></b>

This function takes an address as input and calls the add function of the contract at that address with the inputs `123` and `456`.

- **The callMul function:** This function takes an address as input and calls the mul function of the contract at that address with the inputs `123` and `456`. It also includes some additional parameters for the call `(value: 1 ether and gas: 5000)` to specify the amount of `Ether` being sent and the maximum amount of `gas` that can be used in the call.

- **The callDoesNotExist function:** This function takes an address as input and calls a function called `"functionDoesNotExist"` on the contract at that address. This function does not exist in the `Fallback` contract, so the call will fail.

## Delegatecall