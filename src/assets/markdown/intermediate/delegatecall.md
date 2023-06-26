# DelegateCall

In Solidity, there are two ways to interact with contracts: `call` and `delegatecall`.

**Call:**

<center><img class="image" src="./assets/images/call-low-level-function.png"></center>

When you use the call function, you can execute the code of another contract from your current contract. However, any changes made to the state during this execution will be stored in the called contract, not in your current contract.

**Delegatecall:**

`delegatecall` is another low-level interface for interacting with contracts. When you use `delegatecall`, the code of another contract is executed in the context of your current contract. This means that any state modifications made during the execution will belong to your current contract, rather than the called contract.

`delegatecall` allows your contract to temporarily borrow and use the functionality of another contract, while still keeping the state modifications within your own contract.

<center><img class="image" src="./assets/images/delegatecall-diagram.png"></center>

The delegatecall function has two important features:

- When delegatecall is used, the state of the contract that initiated the operation (let's call it `contract A`) gets modified, not the state of the target contract (`contract B`). It means that any changes made during the delegatecall will affect `contract A's` state.

- `delegatecall` keeps the original context of the message call intact. This means that the values of `msg.sender` (the address of the caller), `msg.data` (the function call data), and `msg.value` (the amount of Ether sent) remain the same during the execution of `delegatecall`. 

<!-- <center><img class="image" src="./assets/images/delegatecall.jpeg"></center>
<b><center class="img-label">delegatecall [<a href="https://slowmist.medium.com/c-delegatecall-i-c55c911ec2d0" target="_blank">Image src</a>]</center></b> -->

## Example Scenario: how storage works in delegatecall ?

Let's consider a scenario where we have two contracts: `Student.sol` and `Calculator.sol`. The `Student.sol` contract wants to utilize the `add` function from `Calculator.sol` to perform addition operations.

While we don't have the ABI (Application Binary Interface) of `Calculator.sol`, we are aware that it contains an `add` function that accepts two `uint` (unsigned integer) parameters and adds them together within the contract.

Now, let's explore how we can utilize `delegateCall` to invoke this function from `Student.sol`.

```sol
pragma solidity ^0.8.20;

contract Student {
    uint public mySum;
    address public studentAddress;
    
    function addTwoNumbers(address calculator, uint a, uint b) public returns (uint)  {
        (bool success, bytes memory result) = calculator.delegatecall(abi.encodeWithSignature("add(uint256,uint256)", a, b));
        require(success, "The call to calculator contract failed");
        return abi.decode(result, (uint));
    }
}
```

```sol
pragma solidity ^0.8.20;

contract Calculator {
    uint public result;
    address public user;
    
    function add(uint a, uint b) public returns (uint) {
        result = a + b;
        user = msg.sender;
        return result;
    }
}
```

In our `Student` contract, we have a function called `"addTwoNumbers"` which accepts an address along with two numbers to be added together. Instead of directly executing the addition, this function employs a `delegatecall` on the provided address to invoke the `"add"` function, which takes two numbers as parameters.

To generate the function signature, we use `abi.encodeWithSignature` which hashes the function name and argument types and extracts the first `4 bytes` of the resulting hash. In this case, it generates `(bytes4(keccak256(add(uint,uint))` and appends the parameters `"a"` and `"b"` to these `4 bytes`. Each parameter is `32 bytes` long (`256 bits`, the size of a `uint256`).

When concatenated, this encoded data is passed to the `delegatecall` method, which executes the function within the Calculator contract.

The actual addition process is not particularly noteworthy. However, what's interesting is that the `Calculator` contract modifies some state variables. It's essential to remember that when these values are assigned in the `Calculator` contract, they are actually stored in the storage of the `Student` contract. This behavior arises because `delegatecall` uses the storage of the original contract when executing functions in the target contract.

Here's how the storage slots are utilized in this scenario:

<center><img class="image" src="./assets/images/delegatecall-example.png"></center>
<b><center class="img-label">[<a href="https://github.com/LearnWeb3DAO/Delegate-Call" target="_blank">Image src</a>]</center></b>

To summarize, the following steps occur:

- When using delegatecall from `Student` to `Calculator`, we utilize the storage of the `Student` contract instead of the `Calculator` contract. However, the slot numbers correspond to the `Calculator` contract. Consequently, when assigning a value to `"result"` in the `"add"` function of `Calculator.sol`, we are effectively assigning it to `"mySum"` in the `Student` contract.

## Use Cases of Delegatecall

**Reusable Libraries:**

`Delegatecall` allows for the creation of library contracts containing useful functions and utilities that can be shared across multiple contracts. By using `delegatecall`, these contracts can reuse the library's code at runtime, eliminating the need for code duplication. This approach promotes modularity and helps optimize gas consumption.

**Enhanced Code Modularity:**

With `delegatecall`, contracts can run code stored inside another contract as if they were calling internal functions. This enables contracts to access and utilize functionality from external contracts seamlessly. By delegating execution through `delegatecall`, contracts can effectively compartmentalize their code and avoid the need for duplicating or embedding code from other contracts.

**Proxy Patterns and Contract Upgrades:**

Delegatecall plays a crucial role in proxy patterns utilized for upgrading smart contracts. In this scenario, a proxy contract holds the contract state, while a separate logic contract contains the business logic. By leveraging delegatecall, the proxy contract can delegate the execution of functions to the logic contract. This allows for protocol upgrades by simply pointing the proxy contract to a new logic contract, simulating an upgrade while keeping the proxy contract immutable.

<!-- ### Examples

#### Example 1 : Gas-efficient Upgradeable Contracts

Delegatecall is commonly utilized to implement proxy contracts that enable gas-efficient contract upgrades, known as upgradeable contracts.

The fundamental concept behind this approach is to segregate the contract state from the contract logic, enabling upgrades to the logic without impacting the state.

Here's an example of an upgradeable proxy contract that utilizes delegatecall: -->

<!-- ### Exploiting the Delegatecall Function

However, if the implementation of the .delegatecall() function is not handled properly, it can lead to malicious attacks that manipulate the storage of the calling contract. In the following scenario, we will simulate an attack utilizing the .delegatecall() function.

**Wrong way to use delegatecall:**

```
contract Example {
    uint public sum;
    function add(uint _a) public {
        sum = _a + 5;
    }
} 

contract Delegate {
    uint8 public a;
    bool public flag;    
    function delegate(address payable addr, uint _num1) payable public returns(bool,bytes memory){
        bytes memory data = abi.encodeWithSignature("add(uint256)",_num1);
        (bool success, bytes memory result) = addr.delegatecall(data);
        return (success, result);
    }
}
```

Resources:

https://blog.finxter.com/delegatecall-or-storage-collision-attack-on-smart-contracts/ -->