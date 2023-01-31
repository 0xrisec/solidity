# Globally Available Variables

In the global namespace, there are special variables and functions that provide information about the blockchain or serve as general-purpose utilities.

We are going to be looking at these three properties of global variables

- Block properties
- Message properties
- Transaction properties

## Block properties

`Block properties` are global variables that provide information about the `current block`, such as the `block number`, `timestamp`, `difficulty`, `gas limit`, and `coinbase address`. These variables are part of the block object, which is a global object that is available in all Solidity functions.

| name(type)                      | functionality/what it contains                      | Use Case                                                                                                                                                            |
|---------------------------------|-----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| block.coinbase(address payable) | current block miner’s address                       | Rewarding the miner for mining the block.<br> Using the miner's address to verify the authenticity of transactions on the blockchain.                               |
| block.difficulty(uint)          | current block difficulty                            | Determining the minimum amount of work required to mine a block.<br>Using the block difficulty to verify the authenticity of transactions on the blockchain.        |
| block.gaslimit(uint)            | current block gaslimit                              | Determining the maximum amount of gas that can be used in a transaction.<br>Using the block gas limit to verify the authenticity of transactions on the blockchain. |
| block.number(uint)              | current block number                                | Determining the age of a block.<br>Using the block number to verify the authenticity of transactions on the blockchain.                                             |
| block.timestamp(uint)           | current block timestamp in seconds since Unix epoch | Determining the time at which a block was mined.<br>Using the block timestamp to verify the authenticity of transactions on the blockchain.                         |

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Store the address of the miner
    address public minerAddress;

    // Store the current block's difficulty
    uint public blockDifficulty;

    // Store the gas limit of the current block
    uint public blockGasLimit;

    // Store the number of the current block
    uint public blockNumber;
    
    // Store the timestamp of the current block
    uint public blockTimestamp;

   
    // Function that sets the minerAddress variable to the current block's coinbase
    function setMinerAddress() public {
        minerAddress = block.coinbase;
    }

    // This function sets the blockDifficulty variable to the current block's difficulty
    function setBlockDifficulty() public {
        blockDifficulty = block.difficulty;
    }

    // Sets the blockGasLimit variable to the current block's gas limit
    function setBlockGasLimit() public {
        blockGasLimit = block.gaslimit;
    }

    // Sets the blockNumber variable to the current block's number
    function setBlockNumber() public {
        blockNumber = block.number;
    }

    // Sets the blockTimestamp variable to the current block's timestamp
    function setBlockTimestamp() public {
        blockTimestamp = block.timestamp;
    }    
}
```

Following example shows how the global variable can store and retrieve the miner's address that mined a particular block on the blockchain.

We define global variables such as `minerAddress of type address`, `blockDifficulty of type 256-bit unsigned integer`, `blockGasLimit of type 256-bit unsigned integer`, `blockNumber of type 256-bit unsigned integer`, `blockTimestamp of type 256-bit unsigned integer` and functions such as `setMinerAddress`, `setBlockDifficulty`, `setBlockGasLimit`, `setBlockNumber`, `setBlockTimestamp` to set the value of the variables respectively.

 <img class="image" src="./assets/images/set-block-global-variables.JPG"  >
 <b><center class="img-label"></center></b>

To set the value of the `minerAddress` variable, we call the `setMinerAddress` function, which sets the value of the `minerAddress` variable to the current block's coinbase, which is accessed using the `block.coinbase` global variable. 

To set the value of the `blockDifficulty` variable, we call the `setBlockDifficulty` function, which sets the value of the `blockDifficulty variable` to the current block's difficulty, which is accessed using the `block.difficulty` global variable. 

To set the value of the `blockGasLimit` variable, we call the `setBlockGasLimit` function, which sets the value of the `blockGasLimit` variable to the current block's gas limit, which is accessed using the `block.gaslimit` global variable. 

To set the value of the `blockNumber` variable, we call the `setBlockNumber` function, which sets the value of the `blockNumber` variable to the current block's number, which is accessed using the `block.number` global variable. 

To set the value of the `blockTimestamp` variable, we call the `setBlockTimestamp` function, which sets the value of the `blockTimestamp` variable to the current block's timestamp, which is accessed using the `block.timestamp` global variable. 


 <img class="image" src="./assets/images/get-block-global-variables.JPG"  >
 <b><center class="img-label"></center></b>

To retrieve the variable's current value, we call the getter functions. The Solidity compiler creates getter functions for state variables by default.

## Message properties 

The `msg` keyword is used to access the message properties of a transaction, which are a set of `global variables` that provide information about the transaction that is called the current function. These properties include following `global variable`.

| name(type)           | functionality/what it contains                              | Use Case                                                                   |
|----------------------|-------------------------------------------------------------|----------------------------------------------------------------------------|
| msg.data (bytes)     | complete calldata                                           | Executing specific actions based on the data included with the transaction |
| msg.sender (address) | sender of the message ( representing the address of the account that initiated the call to the current smart contract. )                        |                                                                            |
| msg.sig (bytes4)     | first four bytes of the calldata (i.e. function identifier) |                                                                            |
| msg.value (uint)     | number of wei sent with the message ( representing the amount of Ether transferred to the contract as part of the call. )                        |                                                                            |

Check out the following example to gain a brief understanding of message properties.

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Store the sender of the transaction
    address public txSender;

    // Store the value of the transaction
    uint public txValue;

    // Store the data of the transaction
    bytes public txData;

    // Store the signature of the transaction
    bytes4 public txSignature;

    // Sets the transaction sender, value, and data
    function setMessageProperties() payable public {
        txSender = msg.sender;
        txValue = msg.value;
        txData = msg.data;
        txSignature = msg.sig;
    }
}
```

This Solidity contract defines a contract called MyContract that has four state variables: `txSender`, `txValue`, `txData`, and `txSignature`. These variables are of type `address`, `uint256`, `bytes`, and `bytes4`, respectively, and are used to store the `sender`, `value`, `data`, and `signature` of a transaction.

The contract also defines a single function called `setMessageProperties`, which is marked as `payable` and `public`. This function sets the values of the `txSender`, `txValue`, `txData`, and `txSignature` variables using the `msg.sender`, `msg.value`, `msg.data`, and `msg.sig` message properties, respectively.

<div class="doc-note">
	<p class="alert alert-primary"><b>Note:</b> The payable keyword is used in the setMessageProperties function in the provided Solidity code to indicate that the function can send and receive Ether as part of a transaction. This is necessary because the setMessageProperties function updates the txValue variable with the value of the transaction, which requires the function to be able to receive Ether from the transaction. In the upcoming section, we will discuss the payable in detail.</p>
</div>

When this contract is deployed on the blockchain, it can be called by any Ethereum account to set the values of the `txSender`, `txValue`, `txData`, and `txSignature` variables using the `setMessageProperties` function.

**Example output:**

**Step1:**

 <center><img class="image" src="./assets/images/msg-global-variable-example.JPG"></center>
 <b><center class="img-label">Contract Output</center></b>

Initially, the contract balance is `zero`, and the state variables are loaded with default values when the contract is deployed on the blockchain.

**step 2:**

 <center><img class="image" src="./assets/images/account.JPG"></center>
 <b><center class="img-label">Account</center></b>

Select an account with a balance of `100 ether`. Deployed contracts can be called by any account you select in the `Deploy & Run Transactions` panel of the `remix IDE`. I have chosen an account with the address of `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2`, which has `100 Ether`. Using this account, I will invoke all the functions of the contract.

**Step 3:**

 <center><img class="image" src="./assets/images/amount.JPG"></center>
 <b><center class="img-label">Amount</center></b>

 Set the balance amount and the unit of amount you want to send to the contract account. I have set an amount of `1 ether` in my case.

**Step 4:**

 <center><img class="image" src="./assets/images/msg-global-variable-example-output.JPG"></center>
 <b><center class="img-label">Contract Output</center></b>
 
 Click on the `setMessageProperties` function. This function enables the contract to accept `Ether` by setting it to be `payable`. Additionally, it assigns the values of `txSender`, `txValue`, `txData`, and `txSignature` variables using the `msg.sender`, `msg.value`, `msg.data`, and `msg.sig` properties of the incoming message, respectively.  
 
<center><img class="image center" src="./assets/images/updated-account-balance.JPG"></center>
<b><center class="img-label"></center></b>

<center><img class="image" src="./assets/images/contract-account-balance.JPG"></center>
<b><center class="img-label">Accounts Balance</center></b>
 
 By clicking `setMessageProperties`, contract balance will be updated to `1 ether` and sender account balance will be reduced by `sent ether + transaction fee`.

**Explanation of output:**

<center><img class="image" src="./assets/images/msg-example-tx-sender.png"></center>
<b><center class="img-label">Message Sender</center></b>

**Message Sender :** The variable `txSender` is initialized with `msg.sender`, which shows the account address of the sender who sent `Ether` to our contract or invoked a function within the contract. This address corresponds to the one selected in `step 2`.

`msg.sender` is a built-in variable that refers to the `address` of the `account` that sent the message (transaction or function call) that is currently being executed. This can be used within a contract to determine who called the contract's functions and to perform different actions based on the caller's address.

It is important to note that `msg.sender` will not return the `address` of the account that originally created the contract, but instead the `address` of the account that initiated the current call. This means that if a `contract A` calls another `contract B`, `msg.sender` inside `contract B` will refer to the address of `contract A`, not the `address` of the `account` that originally deployed `contract B`.

<center><img class="image" src="./assets/images/msg-example-msg-value.png"></center>
<b><center class="img-label">Message Value</center></b>

**Message Value :** The variable `txValue` is initialized with `msg.value`, which shows the amount of `Ether` that was included in the transaction specified in `step 3`, measured in `wei`. In my case, `1 Ether` was sent, so the `txValue` received was `1000000000000000000 wei`, which is equivalent to `1 Ether`.

The `msg.value` refers to the amount of `Ether` that was included in the message (transaction or function call) that is currently being executed. The value is measured in `wei`, which is the smallest denomination of `Ether`, and can be used within a contract to determine how much `Ether` a user sent with a particular message.

<center><img class="image" src="./assets/images/msg-example-signature.JPG"></center>
<b><center class="img-label">Message Signature</center></b>

**Message Signature :**  The variable `txSignature` is initialized with `msg.sig`, which shows the signature of the message ( or the function call ). The `msg.sig` global variable is a built-in variable that holds the `signature` of the message that is calling the current function. The `msg.sig` variable is a `bytes4` type, which means it is an array of `4 bytes`. When a function is called in a smart contract, the `signature` of the message (or the function call) is automatically passed along with the calldata ( Calldata is the data that is passed along with a function call in a smart contract. It typically includes the `function signature`, as well as any arguments that are passed to the function. )

The `function signature` is a unique identifier that is used to identify the specific function that is being called. 

Message signature is the first four `bytes` of the `keccak-256` hash of the signature of the function. The `keccak-256` hash algorithm is also used in Ethereum to generate the hash of a transaction or block. For above example, the `message signature` for a function named `setMessageProperties` without any parameters might look something like this: `0x3a652fa2`.

**Message Data :**
The `txData` represents the data payload of a transaction. It is assigned with `msg.data`, which is a bytes variable that holds the data (also known as calldata) included in a transaction sent to a contract. In the `Remix IDE`, this data can be passed through the use of `low-level interactions`, which we will explore in upcoming sections.

<center><img class="image" src="./assets/images/low-level-interaction.JPG"></center>
<b><center class="img-label">Low Level Interaction</center></b>

If a user does not include any `data` (also known as `calldata`) in a transaction sent to a contract, the `msg.data` variable in the contract will still be present but it will only contain the `function selector`. The `function selector` is the first `4 bytes` of the `Keccak-256 hash` of the `function signature` of the function that the user intends to call. Since the `function selector` is unique to a specific function, it can be used to determine which function to execute in the contract.

<div class="doc-note">
	<p class="alert alert-primary"><b>Note:</b> 
    The function signature represents the name of the function and the types of its input parameters. It is a human-readable representation of the function that helps to understand which function is being called. For example, the signature of a function called add that takes two input parameters, a uint8 and a uint256, would be "add(uint8,uint256)".<br><br>
    The message signature, also known as msg.sig, is derived from the function signature, it is the first 4 bytes of the keccak-256 (sha3-256) hash of the function signature. It is used by the Ethereum Virtual Machine (EVM) to determine which function to execute in the contract based on the signature that is included in the transaction. It can be represented in the format bytes4(keccak256("add(uint8,uint256)")).
    <br><br>
    Calldata refer to the data that is included in a transaction that is sent to a smart contract. It includes the function selector and any input parameters or additional data that are required by the function that is being called.
    </p>
</div>

## Transaction properties: 

The `tx` keyword is used to access the transaction properties of a transaction, which are a set of global variables that provide information about the transaction. These properties include following global variable.

| name(type)          | functionality/what it contains              |
|---------------------|---------------------------------------------|
| tx.gasprice (uint)  | gas price of the transaction                |
| tx.origin (address) | sender of the transaction (full call chain) |


Example: 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    
    // Store the gas price of the transaction
    uint public gasPrice;

    // Store the origin of the transaction
    address public origin;

    // sets the transaction properties
    function setTransactionProperties() public {
        gasPrice = tx.gasprice;
        origin = tx.origin;
    }
}
```

The `tx.gasPrice` variable is a uint256 value that represents the gas price of the transaction in `Wei`. The gas price is the amount of Ether that the transaction sender is willing to pay per unit of gas consumed by the transaction. This value is set by the transaction sender and can be accessed by the contract to determine the cost of executing the transaction.

As you may have noticed in the previous code illustration, both `tx.origin` and `msg.sender` produce the same result. The `tx.origin` variable is an address value that represents the Ethereum address that originated the transaction. This is the address that signed and sent the transaction, and is not necessarily the same as the `msg.sender` value, which is the address of the contract that executed the transaction.