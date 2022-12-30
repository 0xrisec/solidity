# Payable and Non-payable

There are four types of state mutability: `pure`, `view`, `payable`, and `non-payable`. The first three (`pure`, `view`, and `payable`) have corresponding keywords, but `non-payable` does not have a specific keyword. We have already discussed `pure` and `view` mutability, now we look into `payable` and `non-payable`.

## Payable:

By default, functions are not able to receive or send `Ether`. To enable this capability, you can use the `payable` keyword to mark a function as being able to receive `Ether`. Functions that are marked as `payable` can accept Ether that is sent to the contract as part of the function call.

You can also use the `payable` keyword with the `address` type to create the `address payable` type. An `address payable` is an `address` that is able to receive `Ether` as part of a function call or transaction.

In order to execute a `payable` function, the caller must specify the amount of `gas` they are willing to pay, and the function will only be executed if the `gas price` is sufficient.

**Example 1:** Send ether to contract account

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Define a payable function named "deposit" (able to receive ether) 
    function deposit() public payable{
        
    }
}
```

This code defines a contract named `MyContract` that contains a function called `pay`. The function is marked as `payable`, which means it is able to receive `Ether`.


<center><img class="image" src="./assets/images/payable-example.JPG"></center>
<b><center class="img-label">Initial Contract Account Balance</center></b>

When you deploy the contract, its initial balance will be `zero`, as it has not yet received any Ether. After the contract is deployed
Initially, the balance of the contract is zero.

<center><img class="image" src="./assets/images/account-and-ether.JPG"></center>
<b><center class="img-label">Chosen an account and Set the amount</center></b>

When a contract is deployed, it can be called by any `account` that you specify in the `Deploy & Run Transactions panel` of the `Remix IDE`. To set the `balance` of the `contract`, you can specify the `amount` and unit of the amount you want to send to the `contract account`. You can choose an `account` from the list of available accounts that has a balance of at `100 Ether`. Once you have selected an `account`, you can enter an amount of `2 Ether` in the `"Value"` field and select `"Ether"` as the `unit`. This will specify that you want to send `2 Ether` to the contract account.


<center><img class="image" src="./assets/images/after-payment.JPG"></center>
<b><center class="img-label">Sent Ether to contract account</center></b>

When the `'pay'` button is clicked, the contract balance will be updated to reflect the amount of `Ether` that was sent, and the `sender's account` balance will be reduced by the amount of `Ether sent` plus the `transaction fee`.

**Example 2:** Deposit and Withdraw amount from contract account

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare a state variable to store the address of the owner
    // The owner is the account that deployed this contract.
    address payable public owner;

    // Constructor to set the owner address
    // The owner address is set to the caller's address when the contract is deployed.
    constructor(){
        owner = payable(msg.sender);
    }

    // This function allows users to deposit Ether into the contract.
    // The deposited Ether will be added to the contract's balance.
    function deposit() public payable {}

    // This function allows the owner to withdraw an amount of Ether from the contract.
    function withdraw(uint _amount) public{
        // Check if the caller is the owner
        require(isOwner(), "Only the owner can withdraw amount");

        // Ensure that the amount being withdrawn is greater than 0
        require(_amount > 0, "Cannot withdraw 0 or negative value");

        // Ensure that the contract has sufficient balance to cover the withdrawal
        require(_amount <= address(this).balance, "Insufficient amount");

        // Transfer the specified amount of Ether to the owner's address
        owner.transfer(_amount);
    }

    // A function to check if the caller is the owner
    function isOwner() public view returns (bool) {
        // Return true if the caller's address is the same as the owner's address
        return msg.sender == owner;
    }
}
```

The contract, called MyContract, has three functions: deposit, withdraw, and isOwner. It also has a state variable called owner which stores the address of the account that deployed the contract.


 <center><img class="image" src="./assets/images/owner-adress.JPG" ></center>
 <b><center class="img-label">Owner Account</center></b>

The `constructor` function is a special function that is executed when the contract is deployed. In this case, the `constructor` function sets the value of `owner` to the caller's address, which is the address of the account that deployed the contract.


 <center><img class="image" src="./assets/images/non-owner-address.JPG" ></center>
 <b><center class="img-label">Entering deposit amount from Non owner address</center></b>

  <center><img class="image" src="./assets/images/deposit.JPG" ></center>
 <b><center class="img-label">Deposit 1 ether to contract</center></b>

The `deposit` function allows users to send `Ether` to the contract. The function is marked as `public` and `payable`, which means that it can be called by any external account and that it can receive Ether. The function does not have any further logic, as it simply allows users to send Ether to the contract without doing anything else.

<center><img class="image" src="./assets/images/withdraw.JPG" ></center>
<b><center class="img-label">Selected Owner Address and Withdraw 555 wei from account</center></b>

The `withdraw` function allows the owner of the contract to withdraw a specified amount of `Ether` from the contract. The function checks that the caller is the owner of the contract by calling the `isOwner` function. 

<center><img class="image" src="./assets/images/withdraw-error.JPG" ></center>
<b><center class="img-label">Selected Non Owner Address and try to Withdraw</center></b>

If the caller is not the `owner`, the function aborts and returns an error message. 

If the caller is the `owner`, the function checks that the `amount` being withdrawn is greater than `0` and that the `contract` has sufficient balance to cover the withdrawal. If these checks pass, the function transfers the specified amount of `Ether` to the `owner's address`.

The `transfer` function is used to send `ether` from the `contract` to a `specified address`.

**Example 2 Summary:**

The `withdraw` function in the provided code is not marked as `payable` because it is not intended to receive `Ether` as part of the function call. Instead, the `withdraw` function allows the owner of the contract to `withdraw` a specific amount of `Ether` from the `contract's balance`.

The deposit function, on the other hand, is marked as `payable` because it is intended to receive `Ether` as part of the function call. This allows users to send `Ether` to the contract account by calling the `deposit` function with a value attached.

In general, it is important to carefully consider whether a function should be marked as `payable` based on its intended purpose and the actions it performs. Functions that are not intended to receive `Ether` do not need to be marked as `payable`, while functions that are intended to receive `Ether` or that perform actions that involve the transfer of `Ether` should be marked as `payable`.

The `owner` variable is marked as `payable` because it is intended to store the `address` of an account that is able to receive `Ether`. This allows the contract to send `Ether` to the `owner's address` using the `transfer` function, as seen in the `withdraw` function.

<!-- **Example 3:** Transfer ether from one account to another

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // This declares the MyContract contract.

    // Function to transfer ether from the sender account to the recipient
    function transferEther(address payable _recipient, uint amount) public payable{
        // This declares the transferEther function, which takes an address payable as an input and is marked as payable. It is also marked as public, which means that it can be called by any external contract or account.

        // Check that the contract has enough ether to send
        require(msg.sender.balance >= amount, "Insufficient balance");
        // This uses the require function to check that the contract's balance is greater than or equal to the amount of Ether being sent in the function call (specified by the msg.value variable). If the contract does not have enough Ether to send, it will throw an exception with the message "Insufficient balance".

        // Transfer the ether to the recipient
        _recipient.transfer(amount);
        // This uses the transfer function of the address type to send the amount of Ether specified by the msg.value variable to the recipient's address.
    }
}
```

The contract has one state variable, recipient, which is an address type and is marked as payable, meaning it is able to receive ether payments. The contract also has a constructor function, which is called when the contract is deployed to the Ethereum blockchain. The constructor takes a single argument, _recipient, which is an address type marked as payable. The _recipient argument is used to set the value of the recipient state variable.

The contract also has a function named transferEther, which can be called to transfer ether from the contract to the recipient address. The function is marked as payable, meaning it can receive ether as an input. 

The function includes a require statement that checks that the contract has enough ether to send to the recipient. If the contract does not have enough ether, the require statement will cause the function to throw an error with the message "Insufficient balance". 

If the contract has enough ether, the function will call the transfer function on the recipient address, passing in the value of msg.value as the amount of ether to transfer. This will transfer the ether from the contract to the recipient.

<img class="image" src="./assets/images/payable-exaple-output.JPG">
<b><center class="img-label">Fixed-size Byte Array</center></b>

<img class="image" src="./assets/images/example-payable.JPG">
<b><center class="img-label">Fixed-size Byte Array</center></b> -->

## Non-payable:

`non-payable` functions or methods are those that are not marked with the `payable` keyword, which means that they are unable to receive `Ether` as part of the function call. By default, functions are `non-payable` and are only able to update state variables, but not send or receive `Ether`. This default mutability helps to prevent unintended Ether transfers and ensure the integrity of the contract's balance. There is no specific keyword for it.

If a function is not explicitly marked as `view`, `pure`, or `payable`), it will be considered `non-payable` by default. 

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
  uint256 public counter;

  // This function increments the counter state variable by 1
  function incrementCounter() public {
    counter++;
  }
}
```

In this example, the `incrementCounter` function is not marked as `payable` and does not specify a `state mutability`. As a result, it is considered `non-payable` and is unable to receive `Ether` as part of the function call. However, the function is able to update the `counter` state variable by incrementing it by `1`.