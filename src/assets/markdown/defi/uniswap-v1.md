# Uniswap v1

<hr>

Uniswap v1 is a decentralized exchange (DEX) that was introduced on the Ethereum network in 2018.

Uniswap is based on a mathematical model called a Constant Function Market Maker (CFMM), and more specifically, a Constant Product Market Maker (CPMM). This means that the ratio of tokens in every liquidity pool must always maintain a fixed product, which is determined by a mathematical formula.

The formula used by Uniswap's CPMM is (x*y=k), where x and y represent the quantity of two different tokens in a liquidity pool and k is the constant product of those tokens. This means that as the quantity of one token in the pool increases then the quantity of the other token must decrease in order to maintain a constant product.

For example, if the liquidity pool contains 100 tokens of token A and 10 tokens of token B, the constant product k would be 1000. If a user wants to trade 20 tokens of token A for token B then the formula would adjust the ratio to 80 tokens of token A and 12.5 tokens of token B (80*12.5=1000).

This system ensures that prices are automatically adjusted according to supply and demand and liquidity providers are incentivized to maintain a balanced ratio of tokens in the pool.

Uniswap v1 initially only supported ETH-ERC20 trading pairs which meant that users could only swap Ether (ETH) for a single ERC20 token at a time. For example, if someone wanted to swap USDC for DAI, they would first have to swap USDC for ETH and then use the ETH to get DAI by swapping it in the ETH-DAI pool.

Uniswap v1 introduced a feature called LP tokens that allowed people to contribute funds to the platform and get tokens in return. The number of tokens given to each person was based on the amount of funds they contributed. These tokens represented the person's contribution and could be sold, traded, or used to withdraw the funds later.

In addition, every trade on Uniswap incurred a 0.30% trading fee. This fee was automatically given to the liquidity providers as a reward for providing liquidity to the platform. In other words, it was a way to compensate them for contributing funds that allowed others to trade on the platform.

## Limitions of Uniswap V1 :

One of the main limitations of Uniswap v1 was its lack of support for trading pairs beyond ETH-ERC20 pairs. This meant that in order to trade between two ERC20 tokens, users had to first trade one of the tokens for ETH and then trade ETH for the other token. This process could be cumbersome and expensive due to high gas fees on the Ethereum network.

Another limitation of Uniswap v1 was the fixed 0.30% trading fee. While this fee was designed to incentivize liquidity providers, it could also be seen as high for some users, especially those trading small amounts of tokens.

Finally, Uniswap v1 had limited user interface options, which made it difficult for users to visualize and understand the liquidity pool mechanics. This could create confusion and deter some potential users from participating in the platform.

This limitation was due to the technical constraints of the initial version of Uniswap which was built to be a simple and decentralized exchange for ERC20 tokens.