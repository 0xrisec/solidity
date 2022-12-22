# Events

An event is a way to record information that is intended to be stored on the blockchain. Events are a way to log information to the blockchain.
It means that information about the event is recorded in the blockchain and becomes part of the permanent record of activity on the network. This information can include details about the event itself, such as the time it occurred and any relevant data or parameters.

Logging events to the blockchain has several benefits. Because the blockchain is a decentralized and distributed ledger, the information recorded in it is highly secure and cannot be easily altered or deleted. This makes it a reliable way to record important information that needs to be publicly accessible.

An event is defined using the event keyword, followed by the name of the event and a list of parameters. The parameters can be of any type, including Solidity's built-in types such as uint, address, and bytes, as well as user-defined types.

**Declaration of event:** Events are declared using the event keyword, followed by the name of the event and a list of parameters.

<pre style="background: rgba(0,0,0,.05); padding:20px">
event &lt;eventName&gt;(&lt;parameter1Type&gt; &lt;parameter1Name&gt;, &lt;parameter2Type&gt; &lt;parameter2Name&gt;, ...);
</pre>


**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract ClientReceipt {
    // Declare the Deposit event
    // The event has three parameters:
    // - from: indexed address of the account making the deposit
    // - id: indexed bytes32 representing the unique ID of the deposit
    // - value: uint representing the amount of the deposit
    event Deposit(
        address indexed from,
        bytes32 indexed id,
        uint value
    );

    // Function to allow clients to make deposits
    // The function has a single parameter:
    // - id: bytes32 representing the unique ID of the deposit
    function deposit(bytes32 id) public payable {
        // Emit the Deposit event and log the msg.sender, id, and msg.value variables as the from, id, and value parameters, respectively
        emit Deposit(msg.sender, id, msg.value);
    }
}
```

The indexed keyword is used to indicate that a parameter in an event declaration should be indexed. When an event parameter is indexed, it means that it can be used to filter events when they are logged.

The event, named Deposit, is used to log information about deposits made to the contract. It has three parameters: from, which is the address of the account making the deposit, id, which is a bytes32 representing the unique ID of the deposit, and value, which is a uint representing the amount of the deposit. The from and id parameters are indexed, meaning they can be used to filter events when they are logged.

The contract also includes a function named deposit() that allows clients to make deposits to the contract. The function has a single parameter, id, which is a bytes32 representing the unique ID of the deposit. The function is marked as payable, meaning it can receive Ether as an input.

When the deposit() function is called, it triggers the Deposit event and logs the msg.sender, id, and msg.value variables as the from, id, and value parameters, respectively. This allows the event to log the address of the account making the deposit, the unique ID of the deposit, and the amount of the deposit.

<img class="image" src="./assets/images/event-logs.JPG">
<b><center class="img-label">Fixed-size Byte Array</center></b>