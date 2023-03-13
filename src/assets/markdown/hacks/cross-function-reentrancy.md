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

Let's begin by assuming the initial state of all accounts. The vulnerable contract belonging to the victim holds 50 ether, while the attacker contract holds 1 ether and has a wallet address with no ether.

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-1.jpg"></center>
<b><center class="img-label">Initial Accounts State</center></b>

The attacker deposits 1 ether into the vulnerable contract using their own malicious contract, with the intention of creating a balance and withdrawing it in order to exploit a vulnerability in the code. 

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-2.jpg"></center>
<b><center class="img-label">Deposited 1 ether to Vulberable Contract</center></b>

After that, they call the `withdraw()` function of the victim contract. The flow of execution is as follows:

**1. Calling the victim contract's withdraw() function:** The attacker's contract sends a request to the victim contract to execute the `withdraw()` function.

**2. Transferring funds to the caller:** The victim contract begins executing the `withdraw()` function and checks if the caller has a positive balance. If so, it transfers the funds through the call() function to the sender (attacker's contract). However, the attacker's malicious contract triggers the `fallback` function when it receives the funds, and the `fallback` function calls the `transfer()` function of the victim contract while the execution of the `withdraw()` function is still in pending. (Note that the victim contract have not updated the caller's balance to zero because the line of code `balances[msg.sender] = 0;` that updates the sender's balance is still pending to execute.) Now accounts state will be as below image.

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-3.jpg"></center>
<b><center class="img-label">Withdraw 1 ether by attacker contract</center></b>

**3. Updating the state variable:** For the `transfer()` function to be called, the attacker's contract must provide the necessary parameters, including the `amount` to transfer and the `destination address`. It's possible for the `amount` to be equal or less than the balance of the attacker's contract. Furthermore, the `destination address` could potentially be the attacker's own wallet address.

**4. Reducing the amount from the caller address:** The victim contract deducts the amount from the attacker's contract address.

**5. Increasing the amount to the wallet address:** The victim contract adds the amount to the attacker's wallet address.

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-4.jpg"></center>
<b><center class="img-label"></center></b>

**6. Updating the caller balance:** Eventually, the execution state returns to the `withdraw()` function, and the attacker's contract's balance is set to  (In our case that is already updated to zero because we have trasffered to other address).

**7. Checking wallet address balance:** Finally, the attacker can check their wallet balance in the victim contract and withdraw additional funds using the `withdraw()` function. In the case we're examining, the balance has already been set to zero because the funds were transferred to wallet address.

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

To summarize `POC-1`, the attacker initially deposited `1 ether` into the vulnerable contract, withdrew it, and simultaneously updated the balances state variable for their wallet account. As a result, the attacker can withdraw another `1 ether` from the vulnerable contract, effectively allowing them to retrieve their initial deposit along with any additional funds deposited by the victim. For instance, if the victim contract holds `50 ether`, the attacker would need to deposit `25 ether` to drain all the funds. If the attacker does not have the necessary amount of ether, they would need to deposit smaller amounts multiple times until they can drain all the funds from the vulnerable contract.

To launch a more precise attack, we will duplicate the attacker contract and utilize two instances of it to exploit the vulnerability.

In the revised approach, the initial attacker contract will deposit `1 ether`, withdraw it, and call upon the transfer function, providing the address of the `second attacker contract` as a parameter. This action will update the `balances` state variable of the victim contract, indicating that the `second attacker contract address` now holds `1 ether`. The `second attacker contract` can subsequently launch an attack by passing the address of the `first attacker contract` to transfer the same amount of funds. Since the `second attacker contract` already has funds in the victim contract, there is no need to deposit any additional funds. With the `first attacker contract` also possessing funds in the balances state variable, it can withdraw and launch another attack. The attacker can alternate between both contracts to drain all the funds while depositing only `1 ether`.

To better comprehend this methodology, refer to the flow of execution presented below.

<center><img class="image" src="./assets/images/cross-function re-entrancy-attack.jpg"></center>
<b><center class="img-label">Output</center></b>

To start, let's assume the starting balance of each account. The victim's vulnerable contract contains `50 ether`, while `ATTACKER CONTRACT 1` holds 1 ether and `ATTACKER CONTRACT 2` with no ether.

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-5.jpg"></center>
<b><center class="img-label">Initial Accounts State</center></b>

To exploit a vulnerability in the code, the attacker deposits 1 ether into the vulnerable contract using `ATTACKER CONTRACT 1`, creating a balance that they can withdraw. 

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-6.jpg"></center>
<b><center class="img-label">Deposit 1 ether</center></b>

Calling the victim contract's `withdraw()` function, initiating the following execution flow:

**1. Calling the victim contract's withdraw() function:** The attacker's contract, `ATTACKER CONTRACT 1`, calls the `withdraw()` function on the victim contract.

**2. Transferring funds to the caller:** During the execution of the` withdraw()` function, the victim contract transfers funds to `ATTACKER CONTRACT 1`. However, the attacker's malicious contract triggers the fallback function upon receiving the funds, which in turn calls the `transfer()` function of the victim contract, while the `withdraw()` function is still being executed. It is important to note that the line of code responsible for updating the caller's balance to zero, `balances[msg.sender] = 0;`, is still awaiting execution in the victim contract.

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-7.jpg"></center>
<b><center class="img-label">Deposit 1 ether</center></b>

**3. Updating the state variable:** The function `transfer()` is called in `ATTACKER CONTRACT 1` with parameters that include the destination address and transfer amount. The destination address refer to `ATTACKER CONTRACT 2`.

**4. Reducing the amount from the caller address:** The victim contract subtracts the transferred amount from the balance of the` ATTACKER CONTRACT 1 address`.

**5. Increasing the amount to the second attacker contract address:** The victim contract adds the transferred amount to the balance of the `ATTACKER CONTRACT 2` address.

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-8.jpg"></center>
<b><center class="img-label">Deposit 1 ether</center></b>

**6.** The `ATTACKER CONTRACT 2` sends a request to execute the withdraw() function on the victim contract without depositing any funds since it was already deposited in the first contract attack.

**7.** The `ATTACKER CONTRACT 2` initiates a request to the victim contract to execute the `withdraw()` function as part of the attack. 

**8.** The victim contract starts to execute the `withdraw()` function once more, which transfers the funds to the caller (`ATTACKER CONTRACT 2`) using the `call()` function. However, the second attacker's malicious contract triggers the fallback function as it receives the funds. Since the fallback function calls the `transfer()` function of the victim contract while the `withdraw()` function is still in progress, the caller's balance is not yet updated to zero. Please note that the line of code `balances[msg.sender] = 0`; that updates the sender's balance is still pending to execute.

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-9.jpg"></center>
<b><center class="img-label">Deposit 1 ether</center></b>

**9.** The transfer call is initiated, with the destination address set to `ATTACKER CONTRACT 1`.

**10.** The victim contract subtracts the transferred amount from the balance of `ATTACKER CONTRACT 2`.

**11.** The victim contract adds the transferred amount to the balance of `ATTACKER CONTRACT 1`.

<center><img class="image" src="./assets/images/accounts-state-cf-reentrancy-10.jpg"></center>
<b><center class="img-label">Deposit 1 ether</center></b>

**12.** The attacker can alternate between both contracts to drain all the funds by just attacking without despoit ethers again and again.

### Code

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
    AttackerContract public attackPeer;
    constructor(IVulnerableContract _vulnerableContract) {
        vulnerableContract = _vulnerableContract;
    }

    function setAttackPeer(AttackerContract _attackPeer) external {
        attackPeer = _attackPeer;
    }

    fallback() external payable {
        if (address(vulnerableContract).balance >= 1 ether) {
            vulnerableContract.transfer(
                address(attackPeer), 
                vulnerableContract.getUserBalance(address(this))
            );
        }
    }

    function initiateAttack() external payable {
        require(msg.value == 1 ether, "Require 1 Ether to attack");
        vulnerableContract.deposit{value: 1 ether}();
        vulnerableContract.withdraw();
    }

    function attackNext() external {
        vulnerableContract.withdraw();
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
```

The attacker contract contains a reference to the vulnerable contract via an interface IVulnerableContract.

The constructor of the AttackerContract takes an instance of the IVulnerableContract interface as an argument and initializes it to an immutable variable. This indicates that the instance cannot be changed once set during the constructor execution.

The attacker contract has a function called setAttackPeer, which is used to set an instance of itself to another attacker contract instance. This function can be used to chain multiple instances of the AttackerContract, allowing the attacker to pass the attack to the next attacker contract in the chain.

The fallback function is the entry point for the reentrancy attack. When the attacker contract receives funds, the fallback function checks if the vulnerable contract has a balance of at least 1 ether. If it does, the attacker contract calls the transfer function of the vulnerable contract and transfers the balance of the attacker contract to the attackPeer address, which is an instance of the AttackerContract.

The initiateAttack function is used to deposit 1 ether into the vulnerable contract and then withdraw it, thereby exposing the reentrancy vulnerability. The attackNext function is used to withdraw the remaining balance from the vulnerable contract.

Finally, the getBalance function returns the balance of the attacker contract. Overall, the AttackerContract aims to exploit the reentrancy vulnerability of the VulnerableContract and steal its funds.

### Exploit

Here's a summary of the steps involved in a re-entrancy attack:

1. Deploy a vulnerable contract and deposit funds using an externally owned account to create a balance that can be attacked.

2. Deploy two instances of the attacker contract, passing the vulnerable contract address as a parameter. Consider these contracts as `ATTACKER CONTRACT 1` and `ATTACKER CONTRACT 2`.

3. Set the `attackPeer` state variable in both attacker contracts, use the `setAttackPeer()` function and pass the address of `ATTACKER CONTRACT 2` for` ATTACKER CONTRACT 1`, and the address of `ATTACKER CONTRACT 1` for `ATTACKER CONTRACT 2`. This address will be used in the `transfer()` function of the vulnerable contract.

4. Call the `initiateAttack()` function of `ATTACKER CONTRACT 1` with a value of `1 ether`. This triggers the deposit function to deposit `1 ether` and the vulnerable contract's withdraw function to withdraw it.

5. The vulnerable contract attempts to transfer funds to `ATTACKER CONTRACT 1` using the call low-level function, which triggers the fallback function in `ATTACKER CONTRACT 1`.

6. The fallback function in `ATTACKER CONTRACT 1` calls the vulnerable contract's `transfer()` function, passing the `attackPeer` value (`ATTACKER CONTRACT 2` address) and the second balance of `ATTACKER CONTRACT 1` address in the vulnerable contract, which is `1 ether`.

7. Call the `attackNext()` function in `ATTACKER CONTRACT 2` to execute the next attack.
   
8. Call `attackNext()` in sequence for `ATTACKER CONTRACT 1` and `ATTACKER CONTRACT 2` in an alternating way until all funds are drained.

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

