# Liquidity Pools

<hr>

## what is Liquidity ?

Liquidity in finance refers to the level of ease with which you can sell an asset or easily convert into cash without affecting its market price. For example, if you own a stock that is highly liquid, you can easily sell it without causing the price to drop too much. On the other hand, if you own a piece of real estate, it may take longer to find a buyer and sell it for a fair price, making it less liquid. High liquidity is generally considered good because it means you can easily access your money when you need it.

## How does the traditional stock market function? 

Essentially, the market operates using an order book model where buyers and sellers enter orders to indicate what stocks they want to buy or sell, and at what price. When there is a match between a buyer and a seller's order, a trade is executed. The buyer gets the stock, while the seller gets the cash.

**Example of order book:**

In situations where there are no other buyers or sellers available on the exchange, a market maker can step in to offer to buy stocks from you at a specific price (the bid price) or sell stocks to you at a specific price (the ask price). The bid-ask spread represents the difference between the bid and ask prices, with the market maker making a profit by buying at the bid price and selling to you at the ask price.

Although market makers are crucial to providing liquidity in the market, the traditional system has its limitations. You must wait for a buyer to match your order if you want to sell your stock, or hope that a seller is willing to sell at a price that matches your order if you want to buy immediately. This process can be time-consuming, requiring a long wait for a suitable match.

<!-- However, a solution to these limitations is the liquidity pool, which operates on a smart contract and employs an algorithm to determine asset prices. This system enables the buying and selling of assets at any time, without being limited by market prices or the availability of buyers and sellers. -->

<!-- The solution to these limitations is the liquidity pool which operates on a smart contract and utilizes an algorithm to determine the price of assets. This enables the buying and selling of assets at any time, without being restricted by market prices or the availability of buyers and sellers. -->

To gain a clear understanding of the process, it's important to know that trades were traditionally based on Order Books. In essence, the concept of an Order Book is to match a buyer with a seller and facilitate the completion of their transaction.

<center><img class="image" src="./assets/images/order-book.jpg"></center>
<b><center class="img-label">Order Book</center></b>

In traditional order books, buyers and sellers place their buy and sell orders on an exchange platform. These orders are stored in a book with all buy orders listed together and all sell orders listed together.

When a buyer places a buy order for a certain price, it is added to the buy orders list. Similarly, when a seller places a sell order for a certain price, it is added to the sell orders list.

If a buy order's price matches or exceeds a sell order's price, then the exchange automatically matches the orders and the transaction takes place. The buyer gets the desired amount of the asset at the agreed-upon price and the seller gets the payment for the asset.

This process of matching orders continues until there are no more matching orders or until the trader cancels their order. The traditional order book model relies on a centralized exchange to match buyers and sellers and there is usually a fee charged by the exchange for each transaction.

## What are Liquidity Pools?

A liquidity pool is essentially a pool of funds that contains both assets that users wish to trade. It is essentially a code in a smart contract that holds specific funds and performs calculations on those funds to enable trading. Most liquidity pools use an algorithm called Constant product Automated market makers, which comes under AMM.

The pool is maintained by a smart contract, which automatically performs all the necessary calculations and updates the balances of the users' tokens. When users trade, they do so against the liquidity pool, not against other traders. This means that trades can be executed instantly, without the need for a counterparty.

## How liquidity pools works

<center><img class="image" src="./assets/images/liquidity-pool.jpg"></center>
<b><center class="img-label">Liquidity Pool</center></b>

Liquidity pools are a way for decentralized exchanges (DEXs) to facilitate trading between different cryptocurrency pairs without the need for a centralized order book. In a liquidity pool, users can deposit cryptocurrency tokens into a smart contract which then uses an algorithm to determine the exchange rate between the two tokens.

For example, let's say you have 10 ETH and want to trade them for some DAI. You go to a DEX that uses a liquidity pool and deposit your 10 ETH into the ETH/DAI pool. Other users have also deposited ETH and DAI into the pool, creating a pool of liquidity that is used to facilitate trades between the two tokens.

The smart contract determines the exchange rate between the two tokens based on the amount of liquidity in the pool. Let's say there is currently 100 ETH and 100,000 DAI in the pool. This means the exchange rate is currently 1 ETH = 1,000 DAI.

You then make your trade, exchanging your 10 ETH for 10,000 DAI at the current exchange rate. This transaction is processed by the smart contract, which takes a small fee for facilitating the trade, and the remaining liquidity in the pool is updated accordingly.

When a pool is initially created, it is typically filled with a 50/50 ratio of two different assets. For example, it may contain 50% Ethereum and 50% DAI. As traders begin buying and selling these assets within the pool, the balance of the assets in the pool starts to shift.

The prices of trades in the liquidity pool are adjusted based on the current and historical trades that have taken place within the pool, and this is done automatically by the algorithm that governs the pool. If there is more demand for ETH than there is supply, the algorithm will raise the price of ETH and lower the price of DAI, thus encouraging traders to sell their DAI and buy ETH. This process is self-regulating and automated, with no need for human intervention.

As more users deposit tokens into the liquidity pool and make trades. The exchange rate between the two tokens may fluctuate based on supply and demand. However, the liquidity pool ensures that there is always a pool of tokens available to facilitate trades.

## What are the components of a Liquidity Pool?

<hr>

### Liquidity Provider

However, in decentralized finance (DeFi) markets, liquidity is often provided by liquidity providers. A liquidity provider is someone who contributes their own assets to a liquidity pool, which is a smart contract that enables automatic trading between two assets. The pool is usually split into two halves: one half of the pool is reserved for one asset, while the other half is reserved for the other asset.


A liquidity provider is an individual or entity that adds liquidity to a market or trading platform by depositing assets into a liquidity pool. Liquidity providers typically earn a share of the trading fees generated by the platform or market in exchange for providing liquidity.

For doing this, they get a special token that represents their contribution. This token can be used to get their money back out of the pool or traded with others. The rewards that liquidity providers get for helping out can vary depending on the platform. Some might get a share of the trading fees, while others might get a share of the interest earned from loans.

Liquidity providers earn a fee for providing liquidity to the pool. This fee is usually a percentage of the trading fees generated by the pool. The more liquidity a provider adds to the pool, the more fees they can earn. However, liquidity providers also bear the risk of impermanent loss, which occurs when the price of one asset in the pool changes relative to the other asset. Impermanent loss can result in a loss of value for liquidity providers.

For example, let's say there is a liquidity pool for ETH/USDT. The pool might contain 1,000 ETH and 1,000 USDT. When someone wants to trade ETH for USDT, they can simply send their ETH to the pool and receive an equivalent amount of USDT in return. The price at which the trade occurs is determined by a mathematical formula known as an automated market maker (AMM).

An AMM is a type of algorithm that automatically sets the price of an asset based on the ratio of the two assets in the liquidity pool. The price is determined by a formula that balances the supply and demand of the two assets. This means that the price of an asset in a liquidity pool can fluctuate based on the amount of liquidity in the pool and the amount of trading volume.

### A Pool of Funds

A pool of funds is essentially a collection of assets that can be used by a platform or its users. These assets can be in the form of cryptocurrencies, tokens, or even traditional currencies. A liquidity pool is a specific type of fund pool that provides liquidity to a platform, meaning that there is enough of the assets available for trading, lending, or borrowing.

The structure of a liquidity pool can differ between different platforms. For instance, a lending platform may use a single asset pool, which means that the pool is made up of only one type of asset. This is because lending platforms often require collateral in the form of a specific asset. On the other hand, a decentralized exchange (DEX) generally uses a dual asset pool, which means that the pool is made up of two different assets to create a market for those assets. For example, a BTC/USDT pool would have bitcoin and USDT (a stablecoin) as its two assets.

Some platforms may even use pools made up of up to 8 assets. This means that the structure of a pool is entirely up to the platform itself. Platforms can decide how many assets they want in their pools and what those assets should be.

Liquidity providers can deposit their assets into these pools and earn rewards for providing liquidity. In summary, a pool of funds is a collection of assets that can be used by a platform or its users. 

### Type of platforms using liquidity pools

Liquidity pools are used by different decentralized platforms to provide liquidity. These platforms can be grouped into three main types:

**1. Decentralized exchanges (DEXs):** These platforms allow users to trade cryptocurrencies without the need for a centralized intermediary like a bank. Liquidity pools on DEXs enable traders to buy and sell cryptocurrencies easily.

**2. Automated market makers (AMMs):** These platforms use algorithms to determine the price of cryptocurrencies based on the supply and demand in the liquidity pool. AMMs are often used on DEXs but can also be used in other decentralized finance (DeFi) protocols.

**3. Yield farming platforms:** These platforms allow users to lend or borrow cryptocurrencies and earn rewards for doing so. Liquidity pools on yield farming platforms enable users to lend and borrow cryptocurrencies at competitive rates.

## What are liquidity pool tokens? 

Liquidity pool tokens are tokens that represent a share of a liquidity pool on a decentralized exchange (DEX). When you add funds to a liquidity pool, you receive liquidity pool tokens in return, which represent your share of the pool's total liquidity. These tokens are specific to each liquidity pool and can be traded on the DEX or transferred to other wallets.

## What are the Risks and Limitations of a Liquidity Pool?

Like any financial instrument, liquidity pools also come with risks and limitations. Here are some of the most common ones:

Smart Contract Risk: Liquidity pools are based on smart contracts, which are code-based protocols that run on the blockchain. Like any software, smart contracts can be vulnerable to bugs, hacks, or malicious attacks. These risks can result in the loss of funds for LPs, so it's important to choose a reputable platform with a proven track record of security.

Impermanent Loss: One of the primary risks associated with liquidity pools is impermanent loss. This occurs when the price of the assets in the pool changes significantly. As a result, liquidity providers (LPs) can experience a reduction in their returns compared to simply holding the assets. Impermanent loss is inherent to any liquidity pool, but it can be mitigated by choosing assets that are less volatile and by using strategies like impermanent loss protection.

Small liquidity pools always expose traders of a DEX to a higher Slippage Tolerance.

## Impermanent loss
