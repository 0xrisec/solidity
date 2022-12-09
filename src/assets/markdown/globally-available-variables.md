# Globally Available Variables

In the global namespace, there are special variables and functions that provide information about the blockchain or serve as general-purpose utilities.

We are going to be looking at these three properties of global variables

- Block properties
- Message properties
- Transaction properties

## Block properties

Block properties are global variables in Solidity that provide information about the current block, such as the block number, timestamp, difficulty, gas limit, and coinbase address. These variables are part of the block object, which is a global object that is available in all Solidity functions.

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
pragma solidity 0.8.15;


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

To set the value of the `minerAddress` variable, we call the `setMinerAddress` function, which sets the value of the `minerAddress` variable to the current block's coinbase, which is accessed using the `block.coinbase` global variable. To set the value of the `blockDifficulty` variable, we call the `setBlockDifficulty` function, which sets the value of the `blockDifficulty variable` to the current block's difficulty, which is accessed using the `block.difficulty` global variable. To set the value of the `blockGasLimit` variable, we call the `setBlockGasLimit` function, which sets the value of the `blockGasLimit` variable to the current block's gas limit, which is accessed using the `block.gaslimit` global variable. To set the value of the `blockNumber` variable, we call the `setBlockNumber` function, which sets the value of the `blockNumber` variable to the current block's number, which is accessed using the `block.number` global variable. To set the value of the `blockTimestamp` variable, we call the `setBlockTimestamp` function, which sets the value of the `blockTimestamp` variable to the current block's timestamp, which is accessed using the `block.timestamp` global variable. 


 <img class="image" src="./assets/images/get-block-global-variables.JPG"  >
 <b><center class="img-label"></center></b>

To retrieve the variable's current value, we call the getter functions. The Solidity compiler creates getter functions for state variables by default.

## Message properties 

The `msg` keyword is used to access the message properties of a transaction, which are a set of global variables that provide information about the transaction that is called the current function. These properties include following global variable.

| name(type)           | functionality/what it contains                              | Use Case                                                                   |
|----------------------|-------------------------------------------------------------|----------------------------------------------------------------------------|
| msg.data (bytes)     | complete calldata                                           | Executing specific actions based on the data included with the transaction |
| msg.sender (address) | sender of the message (current call)                        |                                                                            |
| msg.sig (bytes4)     | first four bytes of the calldata (i.e. function identifier) |                                                                            |
| msg.value (uint)     | number of wei sent with the message                         |                                                                            |

Example:

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;


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

When this contract is deployed on the Ethereum blockchain, it can be called by any Ethereum account to set the values of the `txSender`, `txValue`, `txData`, and `txSignature` variables using the `setMessageProperties` function.

Example output: 



**Step1:**

 <center><img class="image" src="./assets/images/msg-global-variable-example.JPG"></center>
 <b><center class="img-label">Contract Output</center></b>

Initially, the contract balance is zero, and the state variables are loaded with default values when the contract is deployed on the blockchain.

**step 2:**

 <center><img class="image" src="./assets/images/account.JPG"></center>
 <b><center class="img-label">Account</center></b>

Deployed contracts can be called by any account you select in the Deploy & Run Transactions panel of the remix IDE. Select an account with a balance of 100 ether.

**Step 3:**

 <center><img class="image" src="./assets/images/amount.JPG"></center>
 <b><center class="img-label">Amount</center></b>

 Set the balance amount and the unit of amount you want to send to the contract account. I have set an amount of 1 ether in my case.

**Step 4:**

 <center><img class="image" src="./assets/images/msg-global-variable-example-output.JPG"></center>
 <b><center class="img-label">Contract Output</center></b>
 
 Click on the setTransaction function. This function sets the values of the `txSender`, `txValue`, `txData`, and `txSignature` variables using the `msg.sender`, `msg.value`, `msg.data`, and `msg.sig` message properties, respectively. 

`txSender` shows the account address that sent the transaction you selected in step 2.

`txValue` displays the amount of Ether sent with the transaction which you specified in step 3 (the amount is displayed in wei).

`txData` displays the data payload of the transaction.

`txSignature` displays the signature of the transaction . 

**Step 5:**

 <center><img class="image center" src="./assets/images/updated-account-balance.JPG"></center>
 <b><center class="img-label"></center></b>

 <center><img class="image" src="./assets/images/contract-account-balance.JPG"></center>
 <b><center class="img-label">Accounts Balance</center></b>

 By clicking `setTransaction`, contract balance will be updated to 1 ether and sender account balance will be reduced by `sent ether + transaction fee`.

<div class="doc-note">
	<p class="alert alert-primary"><b>Note:</b> The payable keyword is used in the setMessageProperties function in the provided Solidity code to indicate that the function can send and receive Ether as part of a transaction. This is necessary because the setMessageProperties function updates the txValue variable with the value of the transaction, which requires the function to be able to receive Ether from the transaction. In the upcoming section, we will discuss the payable in detail.</p>
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
pragma solidity 0.8.15;


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