
# Types of Re-Entrancy Attacks

<hr> 

- Single-Function Reentrancy
- Cross-Function Reentrancy
- Cross-Contract Reentrancy
- Cross-Chain Reentrancy
- Read-Only Reentrancy

## Single-Function Reentrancy

<hr>

Single-Function Reentrancy is a type of attack where an attacker repeatedly calls the same function within a single transaction, exploiting the fact that the function may not have completed execution before the next call is made. This allows the attacker to execute their own malicious code in between calls, potentially resulting in unintended behavior or even financial loss.

We have already covered the Single-Function Reentrancy attack in a previous blog. It involves a vulnerable function in a smart contract that allows an attacker to withdraw more funds than they actually have. The attack is possible because the function first updates the attacker's balance and then sends the funds to the attacker's account, allowing the attacker to repeatedly call the function and withdraw funds multiple times before the previous withdrawal has completed.

To prevent this type of attack, we have written the noReentrant modifier in an ReentrancyGuard contract. This modifier ensures that a function can only be called once at a time, preventing an attacker from calling it multiple times before the first call has completed.

## Cross-Function Reentrancy

<hr>

Cross-function reentrancy can occur when two or more functions in a program share the same state variable and one or more of these functions update the variable in an insecure manner. This creates a situation where one function can be called multiple times by another function before the state changes are propagated through the program, causing unexpected behavior.

In the context of smart contracts, cross-function reentrancy can lead to security vulnerabilities. An attacker can exploit this vulnerability by calling a function multiple times before the state changes are propagated through the contract. This can enable the attacker to steal funds, perform unauthorized transactions, or even crash the contract. Therefore, it is important for developers to understand and prevent cross-function reentrancy attacks in their smart contracts.

<center><img class="image" src="./assets/images/cross function re-entrancy.jpg"></center>
<b><center class="img-label">Output</center></b>