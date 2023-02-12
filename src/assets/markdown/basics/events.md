# Events

`Events` are a way to log information to the `blockchain`. It means that information about the event is recorded in the blockchain and becomes part of the permanent record of activity on the network. This information can include details about the event itself, such as the time it occurred and any relevant data or parameters.

An `event` is defined using the `event` keyword, followed by the name of the `event` and a list of parameters. The parameters can be of any type, such as int, boolean, uint, address, as well as user-defined types.

**Declaration:** 

<pre style="background: rgba(0,0,0,.05); padding:20px">
event &lt;eventName&gt;(&lt;parameter1Type&gt; &lt;parameter1Name&gt;, &lt;parameter2Type&gt; &lt;parameter2Name&gt;, ...);
</pre>


**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract ClientReceipt {
    bytes32 public asdf;
    // Declare the Deposit event
    // The event has three parameters:
    // - from: indexed address of the account making the deposit
    // - value: uint representing the amount of the deposit
    event Deposit(
        address indexed from,
        uint value
    );

    // Function to allow clients to make deposits
    function makeDeposit() public payable {
        // Emit the Deposit event and log the msg.sender, and msg.value variables as the from, id, and value parameters, respectively
        emit Deposit(msg.sender, msg.value);
    }
}
```
This code defines a contract called `ClientReceipt`. The contract has a single event called `Deposit` and a single function called `makeDeposit`.

The Deposit event has three parameters:
- `from`: an indexed `address` type representing the account address of the account making the deposit.
- `value`: a `uint` type representing the amount of the deposit in `wei`.

The `makeDeposit` function allows clients to make deposits by calling the function. The function is marked as `payable`, which means that it is able to receive Ether as part of the function call.

Inside the function, the contract uses the `emit` keyword to send the `Deposit` event and log the values of the `msg.sender`, and `msg.value` variables as the `from`, and `value` parameters of the `event`, respectively. The `msg.sender` variable is a built-in variable in that represents the Ethereum account address of the account that called the function, and the `msg.value` variable represents the amount of `Ether` being sent as part of the function call.

The `indexed` keyword is used to indicate that a parameter in an event declaration should be `indexed`. When an `event` parameter is `indexed`, it means that it can be used to filter events when they are logged.

<center><img class="image" src="./assets/images/event-logs.JPG"></center>
<b><center class="img-label">Logs of Deposit event</center></b>

So, when the `makeDeposit` function is called and a certain amount of `Ether`, it will emit the `Deposit` event and log the Ethereum account `address` of the caller and the amount of `Ether` being deposited. This information can be accessed or logged by external contracts or applications.



