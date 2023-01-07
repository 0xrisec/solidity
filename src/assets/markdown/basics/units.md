# Units & Gas

## Ether Units

On the Ethereum network, Ether (ETH) is the cryptocurrency used for many purposes. In order to refer to smaller amounts of ether, some denominations are available such as `Wei` and `Gwei`.

### What is Wei?

On the Ethereum blockchain network, `Wei` is the smallest denomination of ether which is equivalent to `10^-18 ETH`, the currency used to facilitate transactional operations.

### What is Gwei?

`Gwei` is another unit of measure for `Ether`, the cryptocurrency used on the Ethereum network. It is a blend of the words `wei` and `giga`, with the prefix `giga` meaning billion. `Gwei` is also sometimes referred to as `nanoether` or `Shannon`. It is used to represent smaller amounts of `Ether`, with `1 gwei` being equivalent to `10^-9 ETH`.

| Unit  | Alternative Name | Wei                       | Wei Value  | Gwei Value | Ether Value | Common Usage              |
|-------|------------------|---------------------------|------------|------------|-------------|---------------------------|
| Wei   | -                | 1                         | 1 Wei      | 10^-9 Gwei | 10^-18 ETH  | Technical implementations |
| Gwei  | Shannon          | 1,000,000,000             | 10^-9 Wei  | 1 Gwei     | 10^-9 ETH   | Human-readable gas fees   |
| Ether | -                | 1,000,000,000,000,000,000 | 10^-18 Wei | 10^-9 Gwei | 1 ETH       | Technical implementations |

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    uint public oneWei = 1 wei;
    bool public isOneWei = 1 == 1 wei;
    uint public oneEther = 1 ether;
    bool public isOneEther = 1 ether == 10**18 && 1 ether == 1e18; //where 1e18 = 1 x 10**18
    uint public oneGwei = 1 gwei;
    bool public isOneGwei = 1 gwei == 1e9;
}
```

 `MyContract`, defines several variables to demonstrate the usage of `ether` units. The `oneWei` variable is a `public uint` that is initialized to `1 wei`. The `isOneWei` variable is a `public` `bool` that is initialized to `true`, `as 1 == 1 wei`. The `oneEther` variable is a `public uint` that is initialized to `1 ether`. The `isOneEther` variable is a `public bool` that is initialized to `true`, as `1 ether` is equal to ``10**18` and `1 ether` is also equal to `1e18`, where `1e18` is equal to `1 x 10**18`. The `oneGwei` variable is a `public uint` that is initialized to `1 gwei`. The `isOneGwei` variable is a `public bool` that is initialized to `true`, as `1 gwei` is equal to `1e9`.

## Time Units

Units of time can be specified with suffixes such as `seconds`, `minutes`, `hours`, `days`, and `weeks` after literal numbers where `seconds` are the base unit. It is important to note that the use of `years` as a time unit denomination is deprecated. 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare some variables to represent time units
    uint public sec = 1 seconds;
    uint public min = 60 seconds;
    uint public hour = 60 minutes;
    uint public day = 24 hours;
    uint public week = 7 days;
    uint public twoWeeks = 2 weeks;
    // uint public year = 7 years; //TypeError: Using "years" as a unit denomination is deprecated.

    // Define a function to convert minutes to seconds
    function conversion(uint minute) pure public returns(uint){
        // Convert the input value in minutes to seconds and return the result
        return minute * 60 seconds;
    }
}
```

# Gas

Contracts are compiled into `bytecode`, which consists of `hexadecimal` numbers similar to `opcodes`. `Opcodes` are mnemonic names such as `ADD` for addition or `MUL` for multiplication that refer to specific operations.  All opcodes and descriptions are available on the <a href="https://ethereum.github.io/yellowpaper/paper.pdf" target="blank">Ethereum yellow paper</a> or you can find <a href="https://www.evm.codes/?fork=merge" target="blank">here</a>.

When executing bytecode on the EVM, a `validator (miner)` must use `computational resources`. `Gas` is the unit that measures the amount of computational effort required to execute specific operations on the `Ethereum network`.

<img class="image" src="./assets/images/opcodes-gas.JPG">
<b><center class="img-label"><a href="https://www.evm.codes/?fork=merge" target="blank">Opcode List</a></center></b>

Each `opcode` has its own `gas` cost, for example `ADD` requires `3 gas` units while `MUL` requires `5 gas units`.

Ethereum's native currency, `ether (ETH)`, is used to pay `gas` fees. Prices for `gas` are expressed in `gwei`, which is a  denomination of `ETH`.

You pay `gas spent * gas price` amount of ether for a transaction, where

**Gas spent:** Gas spent is the total amount of gas used in a transaction.

**Gas price:** The `gas` price is the amount of `ether` that you are willing to pay per unit of `gas`. <a href="https://etherscan.io/gastracker" target="blank">Gastracker</a> can be used to track current gas prices.

## Gas Limit

In `Ethereum`, it is difficult to predict in advance how much `gas` a transaction will require. To account for this, transactions have a `gas limit` field that specifies the maximum amount of `gas` the `sender` is willing to use for the `transaction`. 

A standard `ETH` transfer requires a `gas limit` of `21,000 units`, but transactions involving smart contracts may require a higher `gas limit` due to the additional computational work involved. The `gas limit` also protects full nodes from attackers who could potentially make them execute infinite loops by setting the `gas limit` too low. If the gas used during execution exceeds the `gas limit`, processing will be stopped.

It is important to set a `gas limit` that is sufficient to complete the transaction, but not too high, as excess `gas` will not be refunded. If the gas limit is set too low, the transaction may fail due to insufficient `gas`.

**For example:**

If you put a gas limit of `50,000` for a simple ETH transfer, the EVM would consume `21,000`, and you would get back the remaining `29,000`. When you specify too little gas, for example `20,000` for a simple ETH transfer, the EVM will consume your `20,000 gas units` attempting to fulfill the transaction, but `1000 gas units` more are needed so the transaction will not succeed and the EVM reverts any changes. Since the miner has already done `20,000 gas units` worth of work, that gas is consumed. 

**There are two upper bounds on the amount of `gas` that can be used in a transaction:**

- the `gas limit` set by the `sender`
- the block `gas limit` set by the `network`

The block `gas limit` is the maximum amount of `gas` that can be consumed in a single block of `transactions`. If the `gas` used by a transaction exceeds either the` gas limit` or the block `gas limit`, the `transaction` will fail and any changes made by the transaction will be reverted. It is important to carefully consider the `gas limit` of a transaction to ensure its successful execution.