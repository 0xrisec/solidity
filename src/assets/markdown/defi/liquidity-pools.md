# Liquidity Pools

<hr>

## what is Liquidity ?

`Liquidity` is how easily you can sell something and get cash for it. The more liquid something is, the easier and faster it is to sell it.

For example, `cash` is the most liquid asset because you can use it to buy anything immediately. `Stocks` are also very liquid, because you can sell them on a stock exchange at any time.

`Real estate` is less liquid, because it can take longer to find a buyer and sell it for a fair price. Cars are also less liquid than cash or stocks, because it can take some time to find a buyer and sell them without losing money.
<!-- 
## How does the traditional stock market function? 

The traditional stock market functions using an `order book model`, where buyers and sellers place orders to indicate what stocks they want to buy or sell, and at what price. When there is a match between a buyer and a seller's order, a trade is executed. The buyer gets the stock, while the seller gets the cash.

**Example of order book:**

In situations where there are no other buyers or sellers available on the exchange, a market maker can step in to offer to buy stocks from you at a specific price (the bid price) or sell stocks to you at a specific price (the ask price). The bid-ask spread represents the difference between the bid and ask prices, with the market maker making a profit by buying at the bid price and selling to you at the ask price.

Although market makers are crucial to providing liquidity in the market, the traditional system has its limitations. You must wait for a buyer to match your order if you want to sell your stock, or hope that a seller is willing to sell at a price that matches your order if you want to buy immediately. This process can be time-consuming, requiring a long wait for a suitable match.

To gain a clear understanding of the process, it's important to know that trades were traditionally based on Order Books. In essence, the concept of an Order Book is to match a buyer with a seller and facilitate the completion of their transaction.

<center><img class="image" src="./assets/images/order-book.jpg"></center>
<b><center class="img-label">Order Book</center></b>

In traditional order books, buyers and sellers place their buy and sell orders on an exchange platform. These orders are stored in a book with all buy orders listed together and all sell orders listed together.

When a buyer places a buy order for a certain price, it is added to the buy orders list. Similarly, when a seller places a sell order for a certain price, it is added to the sell orders list.

If a buy order's price matches or exceeds a sell order's price, then the exchange automatically matches the orders and the transaction takes place. The buyer gets the desired amount of the asset at the agreed-upon price and the seller gets the payment for the asset.

This process of matching orders continues until there are no more matching orders or until the trader cancels their order. The traditional order book model relies on a centralized exchange to match buyers and sellers and there is usually a fee charged by the exchange for each transaction. -->

## What are Liquidity Pools?

A `liquidity pool` is essentially a pool of funds that contains both assets that users wish to trade. It is essentially a code in a smart contract that holds specific funds and performs calculations on those funds to enable trading. Most liquidity pools use an algorithm called `Constant product Automated market makers`, which comes under `AMM`.

A common example of a `liquidity pool` is a pair of assets on a decentralized exchange (DEX) such as `Uniswap`. For example, there might be a `liquidity pool` for the `ETH/USDT` pair. This pool would contain a certain amount of `ETH` and `USDT`, and traders could use it to swap between the two assets.

## How liquidity pools works

<center><img class="image" src="./assets/images/liquidity-pool.jpg"></center>
<b><center class="img-label">Liquidity Pool</center></b>

**1. Formation of Liquidity Pools:**

When a liquidity pool is initially created, it is typically filled with a 50/50 ratio of two different assets. For example, it may contain 50% Ethereum and 50% DAI. This is done to ensure that there is enough liquidity on both sides of the pool for traders to execute their trades.

To initialize a liquidity pool, users simply need to deposit their two chosen assets into a smart contract. The smart contract will then create a liquidity pool and issue liquidity provider (LP) tokens to the users. LP tokens represent the user's share of the liquidity pool.

**2. Price calculation in liquidity pools:**

The price of tokens in a liquidity pool is determined by an `automated market maker (AMM)`. `AMMs` use a mathematical formula to calculate the price of tokens based on the relative supply and demand for each token in the pool.

The most common `AMM` formula is the `constant product` formula. This formula states that the product of the two token balances in the pool must always be equal to a constant value. This constant value is set when the pool is initialized.

For example, if a liquidity pool contains `100 ETH` and `100 DAI`, the constant value would be `10000`. This means that the price of `ETH` in the pool would be `1 DAI` and the price of `DAI` in the pool would be `1 ETH`.

If a trader wants to buy `ETH` from the pool, they would need to deposit `DAI` into the pool. The `AMM` would then take the `DAI` from the trader and give them `ETH` from the pool. The `AMM` would also adjust the price of `ETH` and `DAI` in the pool to reflect the change in supply and demand.

**Example of a liquidity pool transaction:**

- A trader wants to buy `1 ETH` with `DAI`.

- The liquidity pool contains `100 ETH` and `100 DAI`.

- The `AMM` calculates the new price of `ETH` and `DAI` in the pool using the `constant product` formula. The new price of ETH is `1.01` DAI and the new price of DAI is `0.99` ETH.

- The trader deposits `101` DAI into the pool.

- The AMM takes 101 DAI from the trader and gives them 1 ETH from the pool.

- The new balance of the liquidity pool is 99 ETH and 99 DAI.

- The AMM has adjusted the price of ETH and DAI in the pool to reflect the change in supply and demand.

## What are the components of a Liquidity Pool?

<hr>

### Liquidity Provider

A `liquidity provider` is someone who contributes their own assets to a `liquidity pool`, which is a smart contract that enables automatic trading between two assets. The pool is usually split into two halves: one half of the pool is reserved for one asset, while the other half is reserved for the other asset.

A `liquidity provider` is an individual or entity that adds liquidity to a market or trading platform by depositing assets into a `liquidity pool`. `Liquidity providers` typically earn a share of the trading fees generated by the platform or market in exchange for `providing liquidity`.

### A Pool of Funds

A pool of funds is essentially a collection of assets that can be used by a platform or its users. These assets can be in the form of cryptocurrencies, tokens, or even traditional currencies. A liquidity pool is a specific type of fund pool that provides liquidity to a platform, meaning that there is enough of the assets available for trading, lending, or borrowing.

The structure of a liquidity pool can differ between different platforms. For instance, a lending platform may use a single asset pool, which means that the pool is made up of only one type of asset. This is because lending platforms often require collateral in the form of a specific asset. On the other hand, a decentralized exchange (DEX) generally uses a dual asset pool, which means that the pool is made up of two different assets to create a market for those assets. For example, a BTC/USDT pool would have bitcoin and USDT (a stablecoin) as its two assets.

### Liquidity pool tokens 

Liquidity pool tokens are tokens that represent a share of a liquidity pool on a decentralized exchange (DEX). When you add funds to a liquidity pool, you receive liquidity pool tokens in return, which represent your share of the pool's total liquidity. These tokens are specific to each liquidity pool and can be traded on the DEX or transferred to other wallets.

## What are the Risks and Limitations of a Liquidity Pool?

Like any financial instrument, liquidity pools also come with risks and limitations. Here are some of the most common ones:

Smart Contract Risk: Liquidity pools are based on smart contracts, which are code-based protocols that run on the blockchain. Like any software, smart contracts can be vulnerable to bugs, hacks, or malicious attacks. These risks can result in the loss of funds for LPs, so it's important to choose a reputable platform with a proven track record of security.

Impermanent Loss: One of the primary risks associated with liquidity pools is impermanent loss. This occurs when the price of the assets in the pool changes significantly. As a result, liquidity providers (LPs) can experience a reduction in their returns compared to simply holding the assets. Impermanent loss is inherent to any liquidity pool, but it can be mitigated by choosing assets that are less volatile and by using strategies like impermanent loss protection.

Small liquidity pools always expose traders of a DEX to a higher Slippage Tolerance.

Impermanent loss: Impermanent loss occurs when the price of the tokens in a liquidity pool changes significantly relative to each other. This can result in liquidity providers losing value compared to holding the tokens on their own.

Smart contract risk: Liquidity pools are powered by smart contracts, which are pieces of code that run on a blockchain. If there is a flaw in the smart contract, it could be exploited by hackers to steal funds from the pool.

Rug pull: A rug pull is a type of scam where the developers of a liquidity pool abandon the project and steal the funds deposited by liquidity providers.

Slippage in DeFi is the difference between the expected price of a trade and the price at which the trade is executed. It is a common occurrence, especially during periods of high volatility or when trading large orders.