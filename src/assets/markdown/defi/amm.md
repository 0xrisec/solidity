# Automated Market Makers (AMM)

<hr>

An `AMM` is a type of trading mechanism used within a decentralized exchange (DEX) to enable the trading of assets in a decentralized manner without the need for a centralized order book or market maker. It uses a mathematical formula to determine the price of a particular asset.

In a traditional order book-based exchange buyers and sellers place orders at specific prices and the exchange matches those orders determining a price based on supply and demand. In contrast, an `AMM` relies on a mathematical algorithm to automatically determine the price of an asset based on the ratio of assets.

For a clearer understanding, watch this explanatory videos: 

⭐ https://www.youtube.com/watch?v=1PbZMudPP5E

⭐ https://www.youtube.com/watch?v=Ui1TBPdnEJU

## Types of AMM

Here is the basic mathematical formula that is used by most AMMs:

`x * y = k`

where `x` and `y` are the quantities of two different assets in the pool, and `k` is a constant value. This formula is often referred to as the constant product formula, as it assumes that the product of `x` and `y` should remain constant.

Based on this basic formula, there are several variations of `AMMs` that use different mathematical functions and approaches to price determination. Some of the popular types of `AMMs` include:

- Constant Product Market Maker (Uniswap)
- Constant Sum Market Maker (Curve)
- Constant Mean Market Maker (Bancor)
- Weighted Average Market Maker (Balancer)
- Liquidity-Sensitive Automated Market Maker (Curve)
- Order Book Integrated Automated Market Maker (Kyber Network)
- Concentrated Liquidity Market Maker (Balancer)
- Funded Liquidity Market Maker (Bancor)

Each of these `AMMs` uses a different mathematical formula and approach to determine the price of assets being traded, which can impact the level of liquidity and trading efficiency in the market.

Constant function market makers (CFMMs), such as constant product market makers, constant sum market makers, and constant mean market makers, are a class of first-generation AMMs made popular by protocols like `Bancor`, `Curve`, and `Uniswap`. 

In the next section, we will explore liquidity pools.