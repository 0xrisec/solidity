# Units & Gas

## Ether Units

On the Ethereum network, Ether (ETH) is the cryptocurrency used for many purposes. In order to refer to smaller amounts of ether, some denominations are available such as `Wei` and `Gwei`.

### What is Wei?

On the Ethereum blockchain network, Wei is the smallest denomination of ether which is equivalent to 10^-18 ETH, the currency used to facilitate transactional operations.

### What is Gwei?

The word `gwei` is a blend of `wei` and `giga`. A unit prefix for billion, is another denomination of `ether`. `Nanoether` or `Shannon` are other names for gwei.


| Unit  | Alternative Name | Wei                       | Wei Value  | Gwei Value | Ether Value | Common Usage              |
|-------|------------------|---------------------------|------------|------------|-------------|---------------------------|
| Wei   | -                | 1                         | 1 Wei      | 10^-9 Gwei | 10^-18 ETH  | Technical implementations |
| Gwei  | Shannon          | 1,000,000,000             | 10^-9 Wei  | 1 Gwei     | 10^-9 ETH   | Human-readable gas fees   |
| Ether | -                | 1,000,000,000,000,000,000 | 10^-18 Wei | 10^-9 Gwei | 1 ETH       | Technical implementations |

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    uint public oneWei = 1 wei;
    bool public isOneWei = 1 == 1 wei;
    uint public oneEther = 1 ether;
    bool public isOneEther = 1 ether == 10**18 && 1 ether == 1e18; //where 1e18 = 1 x 10**18
    uint public oneGwei = 1 gwei;
    bool public isOneGwei = 1 gwei == 1e9;
}
```

## Time Units

Units of time can be specified with suffixes such as `seconds`, `minutes`, `hours`, `days`, and `weeks` after literal numbers where `seconds` are the base unit. Using `years` as a unit denomination is deprecated.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    uint public sec = 1 seconds;
    uint public min = 60 seconds;
    uint public hour = 60 minutes;
    uint public day = 24 hours;
    uint public week = 7 days;
    uint public twoWeeks = 2 weeks;
    // uint public year = 7 years; //TypeError: Using "years" as a unit denomination is deprecated.
    
    //convert the minute into seconds
    function conversion(uint minute) pure public returns(uint){
        return minute * 60 seconds;
    }
}
```

# Gas

The Solidity contracts are compiled into bytecode, which is similar to opcodes but is represented by hexadecimal numbers. Mnemonic names such as `ADD for addition` or `MUL for multiplication` refer to opcodes. All opcodes and descriptions are available on the <a href="https://ethereum.github.io/yellowpaper/paper.pdf" target="blank">Ethereum yellow paper</a> or you can find <a href="https://www.evm.codes/?fork=merge" target="blank">here</a>. The Ethereum virtual machine executes the bytecode.

To execute the bytecode on the EVM a validator (miner) needs computational resources. Gas refers to the unit that measures the amount of computational effort required to execute specific operations on the Ethereum network. 

<img class="image" src="./assets/images/opcodes-gas.JPG">
<b><center class="img-label"><a href="https://www.evm.codes/?fork=merge" target="blank">Opcode List</a></center></b>

As a measure of computational effort, each opcode has its own amount of gas. For example, ADD requires 3 gas units, while MUL requires 5 gas units etc. 

Ethereum's native currency, ether (ETH), is used to pay gas fees. Prices for gas are expressed in `gwei`, which is a  denomination of ETH.

You pay `gas spent * gas price` amount of ether for a transaction, where

Gas spent: Gas spent is the total amount of gas used in a transaction.

Gas price: Gas price is how much ether you are willing to pay per gas. <a href="https://etherscan.io/gastracker" target="blank">Gastracker</a> lets you track current gas prices.

## Gas Limit

In general, it is difficult to predict how much gas a transaction will ultimately need in advance. As a result, transactions have a gas limit field that specifies the maximum amount of gas the sender is willing to use for the transaction.

A standard ETH transfer requires a gas limit of `21,000 units`, but smart contract transactions require more computational work, so they require a higher gas limit. The transaction gas limit also protects full nodes from attackers, who could, without a gas limit, make them execute effective infinity loops. 

Processing is stopped if the gas used during execution exceeds this limit.

**For example:**

If you put a gas limit of `50,000` for a simple ETH transfer, the EVM would consume `21,000`, and you would get back the remaining `29,000`. When you specify too little gas, for example `20,000` for a simple ETH transfer, the EVM will consume your `20,000 gas units` attempting to fulfill the transaction, but `1000 gas units` more are needed so the transaction will not succeed and the EVM reverts any changes. Since the miner has already done `20,000 gas units` worth of work, that gas is consumed. 

There are 2 upper bounds to the amount of gas you can spend
gas limit (set by you)
block gas limit (set by the network)

Due to the block gas limit, transactions can only consume a certain amount of gas. Either explicitly or just due to normal operation, the number of iterations in a loop can grow beyond the block gas limit which can cause the complete contract to be stalled at a certain point.
