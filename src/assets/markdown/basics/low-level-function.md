# Low-level functions

`Low-level functions` are functions in Ethereum that allow you to interact directly with `addresses` on the blockchain, rather than with contract instances. These functions include  `.transfer()`,`.send()`,`.call()`, `.delegatecall()`, and `.staticcall()`.

## Send

`.send()` is a low-level function that allows you to send a specified amount of `Ether` to a given address.

If `.send()` fails, the transaction will fail and all changes made by the transaction will be reverted. `.send()` will return `false` if the transfer fails.

`send()` is only available for objects of type `"address payable"`, not `"address"`.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Declares a contract named "MyContract"
contract MyContract {
    // Declare a state variable to store the address of the owner
    // The owner is the account that deployed this contract.
    address payable public owner;

    // Constructor to set the owner address
    // The owner address is set to the caller's address when the contract is deployed.
    constructor(){
        owner = payable(msg.sender);
    }

    // Define a payable function named "deposit" (able to receive ether) 
    function deposit() public payable{
        
    }

    // Define a function named "sendEther" that takes an address and a uint as arguments
    // The function is marked "public", which means it can be called from any other contract or account
    function sendEther(address payable recipient, uint amount) public {
        // Check if the caller is the owner
        require(msg.sender == owner, "Only the owner can Send amount");
        // Check if the contract has sufficient balance to send the specified amount
        require(address(this).balance >= amount, "Insufficient balance");
        // Call the .send() function on the recipient address, passing in the amount as an argument
        // If the .send() function returns false, throw an exception with the message "Send failed"
        require(recipient.send(amount), "Send failed");
    }
}
```

`Contract` defines a contract named `"MyContract"`. It has three functions:

- The `constructor` function is called when the contract is deployed. It sets the value of the `"owner"` state variable to the `caller's address`.

- The `"deposit"` function is a `payable` function that allows the contract to receive `Ether`. When called, it deposits the received `Ether` into the contract's balance.

<center><img class="image" src="./assets/images/send-ether.JPG"></center>
<b><center class="img-label">Output</center></b>

- The `sendEther` function takes an `address` and a `uint` (unsigned integer) as arguments. It checks if the caller is the `owner` of the contract (using the `"msg.sender"` variable) and if the contract has a sufficient balance to send the specified `amount`. If both conditions are met, it calls the `".send()"` function on the recipient address with the amount as an argument. If the `".send()"` function returns `false`, it throws an exception with the message `"Send failed"`.

<div class="doc-note">
		<p class="alert alert-danger">
      <b>There are some dangers in using send:</b> The transfer fails if the call stack depth is at 1024 (this can always be forced by the caller) and it also fails if the recipient runs out of gas. So in order to make safe Ether transfers, always check the return value of `send`, use `transfer` or even better: use a pattern where the recipient withdraws the money.
     </p>
</div>

## Transfer

The `.transfer()` function is a low-level function that is used to send Ether from the contract's balance to another account. `.transfer()` is only available for objects of type `"address payable"`.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Declares a contract named "MyContract"
contract MyContract {
    // Declare a state variable to store the address of the owner
    // The owner is the account that deployed this contract.
    address payable public owner;

    // Constructor to set the owner address
    // The owner address is set to the caller's address when the contract is deployed.
    constructor(){
        owner = payable(msg.sender);
    }

    // Define a payable function named "deposit" (able to receive ether) 
    function deposit() public payable{
        
    }

    // Define a function named "sendEther" that takes an address and a uint as arguments
    // The function is marked "public", which means it can be called from any other contract or account
    function sendEther(address payable recipient, uint amount) public {
        // Check if the caller is the owner of the contract
        require(msg.sender == owner, "Only the owner can Send amount");
        // Check if the contract has sufficient balance to send the specified amount
        require(address(this).balance >= amount, "Insufficient balance");
        // Transfer the specified amount of Ether from the contract's balance to the recipient's account
        recipient.transfer(amount);
    }
}
```
`Contract` defines a contract named `"MyContract"`. It has three functions:

- The `constructor` function is called when the contract is deployed. It sets the value of the `"owner"` state variable to the caller's address.

- The `"deposit"` function is a `payable` function that allows the contract to receive `Ether`. When called, it deposits the received `Ether` into the contract's balance.

- The `"sendEther"` function takes an address and a `uint` (unsigned integer) as arguments. It checks if the caller is the owner of the contract (using the `"msg.sender"` variable) and if the contract has a sufficient balance to send the specified `amount`. If both conditions are met, it transfers the specified amount of `Ether` from the` contract's balance` to the `recipient's account` using the `".transfer()"` function.

## send vs transfer

The `".transfer()"` function and the `".send()"` function are both used to send `Ether` from the `contract's balance` to `another account`. However, there are a few key differences between the two functions:

The `".send()"` function does not stop execution with an exception if the transfer fails. Instead, it returns a `boolean` value indicating whether the transfer was successful or not. If the transfer fails, `".send()"` will return `false`, but the calling contract can still check the return value to handle the failure. The `".transfer()"` function will revert all changes and return false if the transfer fails. This makes it a safer and more predictable option for transferring Ether than `".send()"`, but it may not be suitable in all situations. 

## Call

The `call` function is a `low-level function` that enables you to communicate with other contracts and execute their code.

The `"call"` function is used to execute a function on another contract and to transfer `Ether` to that contract. It takes a single `"bytes memory"` parameter, which is the encoded function call and its arguments, and it returns a boolean value indicating whether the call was successful or not, as well as the returned data (as `"bytes memory"`).

This is the recommended method to use when you're just sending `Ether` via calling the `fallback` function.

However it is not the recommend way to call existing functions.

**Declaration:**
```sol

(bool success, ) = contractAddress.call("functionName(arg1Type,arg2Type,...)");
//the "call" function is being used to execute the "functionName" function on the contract at the "contractAddress" address. The function takes two arguments, "arg1Type" and "arg2Type", and it returns a boolean value indicating whether the call was successful or not. If the call was not successful, the calling contract can handle the error.

(bool sent,memory data) = _to.call("calldata");

(bool sent,memory data) = _to.call{value: msg.value}("");

(bool sent, bytes memory data) = _to.call{gas :10000, value: msg.value}("func_signature(uint256 args)");
```

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// The Receiver contract is defined below.
contract Receiver {
    // This event logs the function name, the sender's address, the value of the message, and a message string
    // whenever it is emitted.
    event Log(string func, address sender, uint value, string message);

    // The fallback function is a function that is called when a contract receives an unknown function call or
    // when no function was called at all. It is marked payable, meaning that it can receive ether.
    fallback() external payable {
        // This line logs the function name, the sender's address, the value of the message, and an empty string.
        emit Log("Fallback was called",msg.sender, msg.value, "");
    }

    // The receive function is similar to the fallback function, but can only be called explicitly.
    receive() external payable {
        // This line logs the function name, the sender's address, and the value of the message.
        emit Log("receive", msg.sender, msg.value, "");
    }

    // The add function takes in two uint arguments, a and b, and a string argument, _message. It returns the sum of a and b.
    function add(uint a, uint b, string memory _message) public returns(uint){
        // This line logs the function name, the sender's address, and the message.
        emit Log("Add func", msg.sender, 0, _message);
        // This line returns the sum of a and b.
        return a + b;
    }

    // The mul function is similar to the add function, but it returns the product of a and b instead.
    function mul(uint a, uint b, string memory _message) public returns(uint){
        // This line logs the function name, the sender's address, and the message.
        emit Log("Mul func", msg.sender, 0, _message);
        // This line returns the product of a and b.
        return a * b;
    }
}

// The Caller contract is defined below.
contract Caller {
     // This event logs the success status and data of a function call whenever it is emitted.
    event Response(bool success, bytes data);

    // The testCallFallback function takes in an address argument, _addr, and calls the fallback function on the contract
    // at that address.
    function testCallFallback(address _addr) public {
        // This line calls the fallback function on the contract at the given address and assigns the success status to the
        // success variable. The "data" argument is not used in the fallback function, so it can be any value.
        (bool success, ) = _addr.call("data");
        // This line checks that the call was successful, and reverts if it was not.
        require(success, "call testCallFallbackfailed!");
        // This line emits the Response event with the success status and an empty string.
        emit Response(success, "");
    }

    // The testCallAdd function takes in an address argument, _addr, and calls the add function on the contract at that
    // address, passing in the arguments 1, 123, and "abcd" to the function.
    function testCallAdd(address _addr) public payable {
        // You can send ether and specify a custom gas amount
        // This line calls the add function on the contract at the given address and passes in the arguments 1, 123, and
        // "abcd". The success status and the result of the function call are stored in the variables success and res,
        // respectively.
        (bool success,bytes memory res) = _addr.call(
            abi.encodeWithSignature("add(uint256,uint256,string)", 1, 123,"abcd")
        );
        // This line checks that the call was successful, and reverts if it was not.
        require(success, "call testCallAdd failed!");
        // This line emits the Response event with the success status and the result of the function call.
        emit Response(success, res);
    }

    // The testCallMul function takes in an address argument, _addr, and calls the mul function on the contract at that
    // address, passing in the arguments 2, 3, and "defg" to the function.
    function testCallMul(address _addr) public payable {
        // You can send ether and specify a custom gas amount
        // This line calls the mul function on the contract at the given address and passes in the arguments 2, 3, and
        // "defg". The success status and the result of the function call are stored in the variables success and res,
        // respectively.
        (bool success,bytes memory res) = _addr.call(
            abi.encodeWithSignature("mul(uint256,uint256,string)", 2, 3,"defg")
        );
        // This line checks that the call was successful, and reverts if it was not.
        require(success, "call testCallMul failed!");
        // This line emits the Response event with the success status and the result of the function call.
        emit Response(success, res);
    }

    // The testCallDoesNotExist function takes in an address argument, _addr, and calls a nonexistent function on the
    // contract at that address.
    function testCallDoesNotExist(address payable _addr) public payable {
        // This line calls a function called "doesNotExist" on the contract at the given address, passing in no arguments. The
        // call is made with the value of the message and the success status and result of the function call are stored in
        // the variables success and res, respectively.
        (bool success, bytes memory res) = _addr.call{value: msg.value}(
            abi.encodeWithSignature("doesNotExist()")
        );
        // This line checks that the call was successful, and reverts if it was not. This is expected to fail since
        // "doesNotExist" is not a function on the contract.
        require(success, "call testCallDoesNotExist failed!");
        // This line emits the Response event with the success status and the result of the function call.
        emit Response(success, res);
    }
}
```

The above code defines two contracts, `Receiver` and `Caller`.

The `Receiver` contract has four functions:

- **fallback:** This function is a catch-all function that is called when a contract receives an unknown function call or when no function was called at all. It is marked `payable`, meaning that it can receive `ether`. It emits an event called `Log` with the function name, the sender's address, the value of the message, and an empty string.

- **receive:** This function is similar to the fallback function, but can only be called explicitly. It emits an event called `Log` with the function name, the sender's address, and the value of the message.

- **add:** This function takes in two `uint` arguments, `a` and `b`, and a `string argument`, `_message`. It returns the sum of `a` and `b`. It also emits an event called `Log` with the function name, the sender's address, and the message.

- **mul:** This function returns the product of `a` and `b`. It also emits an event called `Log` with the function name, the sender's address, and the message.

The `Caller` contract has four functions:

- **testCallFallback:** This function takes in an address argument, `_addr`, and calls the `fallback` function on the contract at that address. It checks that the call was successful and emits an event called Response with the success status and an empty string.

- **testCallAdd:** This function takes in an address argument, `_addr`, and calls the `add` function on the contract at that address, passing in the arguments `1`, `123`, and `"abcd"` to the function. It checks that the call was successful and emits an event called `Response` with the success status and the result of the function call.

- **testCallMul:** This function takes in an address argument, `_addr`, and calls the mul function on the contract at that address, passing in the arguments `2`, `3`, and `"defg"` to the function. It checks that the call was successful and emits an event called `Response` with the success status and the result of the function call.

- **testCallDoesNotExist:** This function takes in an address argument, `_addr`. It checks that the call was successful and emits an event called `Response` with the success status and the result of the function call.

## Delegatecall

Delegatecall is a way for one contract to use another contract's code and make changes to the first contract's storage while using the first contract's msg.sender. It allows a contract to call another contract's functions while keeping the same storage and msg.sender as the first contract.

For example, let's say you have two contracts: Contract A and Contract B. Contract A has a function called "transfer" that allows it to transfer a certain amount of tokens to a specified address. Contract B has a function called "executeTransfer" that calls the "transfer" function from Contract A.
