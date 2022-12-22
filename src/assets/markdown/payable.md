# Payable and Non-payable

There are four types of state mutability: pure, view, payable, and non-payable. The first three (pure, view, and payable) have corresponding keywords, but non-payable does not have a specific keyword. We have already discussed pure and view mutability, now we look into payable and non-payable.

## Payable:

By default, functions cannot send or receive Ether. To enable this capability, we use the 'payable' mutability. Functions marked as 'payable' can accept Ether that is sent to the contract.

In order to execute a `payable` function, the caller must specify the amount of gas they are willing to pay, and the function will only be executed if the gas price is sufficient.

**Example 1:** Send ether to contract account

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    // Define a payable function named "deposit" (able to receive ether) 
    function deposit() public payable{
        
    }
}
```

This code defines a contract named "MyContract" that contains a function called "pay." The function is marked as "payable," which means it is able to receive Ether.

<img class="image" src="./assets/images/account-and-ether.JPG">
<b><center class="img-label">Fixed-size Byte Array</center></b>

Initially, the balance of the contract is zero. When a contract is deployed, it can be called by any account that you specify in the Deploy & Run Transactions panel of the Remix IDE. To set the balance of the contract, you can specify the amount and unit of the amount you want to send to the contract account.


<img class="image" src="./assets/images/after-payment.JPG">
<b><center class="img-label">Fixed-size Byte Array</center></b>

When the 'pay' button is clicked, the contract balance will be updated to reflect the amount of Ether that was sent, and the sender's account balance will be reduced by the amount of Ether sent plus the transaction fee.

**Example 2:** Deposit ether to contract and Transfer from contract account to external account address

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

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

The deposit function allows users to send `Ether` to the contract. The function is marked as `public` and `payable`, which means that it can be called by any external account and that it can receive Ether. The function does not have any further logic, as it simply allows users to send Ether to the contract without doing anything else.

<center><img class="image" src="./assets/images/withdraw.JPG" ></center>
<b><center class="img-label">Selected Owner Address and Withdraw 555 wei from account</center></b>

The `withdraw` function allows the owner of the contract to withdraw a specified amount of Ether from the contract. The function checks that the caller is the owner of the contract by calling the `isOwner` function. 

<center><img class="image" src="./assets/images/withdraw-error.JPG" ></center>
<b><center class="img-label">Selected Non Owner Address and try to Withdraw</center></b>

If the caller is not the owner, the function aborts and returns an error message. 

If the caller is the owner, the function checks that the amount being withdrawn is greater than 0 and that the contract has sufficient balance to cover the withdrawal. If these checks pass, the function transfers the specified amount of Ether to the owner's address.

**Example 3:** Transfer ether from one account to another

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    // Declare a state variable to store the address of the recipient
    address payable public recipient;

    // Constructor to set the recipient address
    constructor(address payable _recipient){
        recipient = _recipient;
    }

    // Function to transfer ether from the contract to the recipient
    function transferEther() public payable{
        // Check that the contract has enough ether to send
        require(address(this).balance >= msg.value, "Insufficient balance");

        // Transfer the ether to the recipient
        recipient.transfer(msg.value);
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
<b><center class="img-label">Fixed-size Byte Array</center></b>

## Non-payable:

If a function is payable, this means that it also accepts a payment of zero Ether, so it also is non-payable. 

On the other hand, a non-payable function will reject Ether sent to it, so non-payable functions cannot be converted to payable functions. The default mutability ‘non-payable’ is assumed if no mutability is specified.