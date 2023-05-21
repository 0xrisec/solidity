# Crowdsale Smart Contract

## Introduction

<hr>

`Crowdsale` is a way for blockchain startups to raise money. They make their own cryptocurrency tokens and sell them to early supporters in exchange for fiat currency or another cryptocurrency. The goal is to raise money for the project while giving investors a chance to buy tokens early. If the project succeeds, the tokens' value may increase, and investors can make a profit.

Here's a simple example of a `crowdsale`:

A startup creates a cryptocurrency token for a decentralized sharing economy platform. To raise funds for development, they hold a `crowdsale` and sell `50 million` tokens at a price of `$0.10` each, aiming to raise `$5 million`.

Investors can buy tokens by sending fiat currency or Ethereum to the startup's wallet and receive a corresponding number of tokens in return. For instance, an investor sending `$1,000` gets `10,000` tokens.

The startup uses the raised money to improve the platform. If the platform succeeds, the tokens' demand may increase, and their value may rise. Early investors may then sell their tokens at a higher price, making a profit.

### Types of crowdsale

There are several types of `crowdsale smart contracts` that can be created depending on the specific needs and requirements of the project. Here are a few examples:

**1. Core Crowdsale:** The `core crowdsale` is the most basic type of crowdsale. It involves a smart contract that holds a certain amount of tokens, and people can purchase these tokens by sending Ether to the contract. The tokens are then transferred to the buyer's Ethereum address. This type of crowdsale is useful for small projects with straightforward token sales.

**2. Emission Crowdsale:** Emission crowdsales have the same basic structure as core crowdsales, but they allow for more flexibility in token issuance. There are two subtypes of emission crowdsales: allowance and minted.

**3. Validation Crowdsale:** Validation crowdsales implement certain validation checks to limit the number of tokens sold, prevent spamming, or control the price of tokens. There are several subtypes of validation crowdsales:

**4. Distribution Crowdsale:** Distribution crowdsales control how tokens are distributed after the token sale is complete.

We will be focusing on creating a `core crowdsale smart contract`, which is the simplest type of crowdsale where tokens are sold in exchange for Ether or other cryptocurrencies at a fixed or tiered rate.


## Prerequistes

<hr>

To create a `crowdsale contract`, you need to have a good understanding of the following prerequisites:

**1. ERC20 Token Standard:** The `crowdsale contract` requires an `ERC20 token` standard to enable investors to purchase tokens using Ethereum. The ERC20 standard is a widely used token standard that enables interoperability between different Ethereum-based projects. You can learn more about the `ERC20 token` standard here: <a href=">https://rootbabu.github.io/basics/ERC20.md#top" target="_blank">https://rootbabu.github.io/basics/ERC20.md#top</a>

**2. OpenZeppelin Library:** `OpenZeppelin` is a smart contract library that offers various useful features such as <a href="https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath" target="_blank">SafeMath</a>, <a href="https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable" target="_blank">Ownable</a>, and <a href="https://docs.openzeppelin.com/contracts/4.x/erc20" target="_blank">ERC20</a>. It's recommended to utilize `OpenZeppelin` to make your `crowdsale contract` more secure and robust.

## Objectives

<hr>

This guide aims to provide a comprehensive introduction to the process of creating a `crowdsale contract`. The objectives of this guide are:
  
**1. Create a Token Smart Contract:**

- Write a smart contract that utilizes the `ERC20 standard` of the `OpenZeppelin` library for creating a token.
- Use the `mint` function to set the total supply of the token.

**2. Create a Crowdsale Contract:**

- Import and use the `ERC20`, `SafeMath`, and `Ownable` contracts from the `OpenZeppelin` library.
- Write a smart contract that will handle the distribution of the token during the `crowdsale`.
- Set the rate at which tokens will be sold during the `crowdsale`.
- Write a `buyTokens` function that will allow investors to purchase tokens with `ETH`.
- Add any necessary functions to manage the distribution of tokens during and after the `crowdsale`.

This is a high-level overview of the steps involved in creating a crowdsale contract. The exact process will vary depending on the specific requirements of the project and the blockchain platform used. 

## Create a Token Smart Contract

<hr>

Here's a step-by-step guide on how to create a token smart contract for a `crowdsale`:

**Step 1: Token Name and Symbol**

When creating a new token for a crowdsale, the first step is to decide on the `name` and `symbol` of the token. The token name is a descriptive name for the token (e.g. `"ROOTBABU"`), while the token symbol is a shorter code that represents the token (e.g. `"RB"`).

These values will be used to create the `CrowdsaleToken` contract, which will be used to create and manage the tokens for the crowdsale.

**Step 2: Importing Contracts**

Create a new contract in your development environment and import the necessary contracts. To use the `ERC20` and `Ownable` contracts in our `CrowdsaleToken` contract, we need to import them using the `import` statement. The `@openzeppelin/contracts` package is a popular library of smart contract code that provides many useful contracts, including `ERC20` and `Ownable`.

```sol
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

**Step 3: Inheriting Contracts**

The `CrowdsaleToken` contract is created by defining a new contract and then inheriting from the `ERC20` and `Ownable` contracts. This is done using the `is` keyword, which tells the compiler that the `CrowdsaleToken` contract is an `ERC20` and `Ownable` contract.

```sol
contract CrowdsaleToken is ERC20, Ownable {
    // contract code goes here
}
```

By inheriting from these contracts, the `CrowdsaleToken` contract inherits all of the functions and properties defined in both contracts. This enables us to create a token that is both fungible (using the `ERC20 standard`) and has restricted access (using the `Ownable contract`).

**Step 4: Constructor Function**

The constructor function is a designated function that is invoked upon the deployment of a smart contract onto the blockchain. Its purpose is to establish initial values for the contract, including the token's `name` and `symbol`.

In the `CrowdsaleToken` contract, the constructor function takes two string arguments (`_name` and `_symbol`) and passes them to the constructor of the `ERC20` contract using the `ERC20(_name, _symbol)` syntax:

```sol
contract CrowdsaleToken is ERC20, Ownable {
    // This is the constructor for the CrowdsaleToken contract. It takes two string arguments: the name and symbol of the token.
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        // constructor code goes here
    }
}
```

This creates a new instance of the `ERC20` contract with the specified `name` and `symbol`, and sets the `totalSupply` of the token to `0`.

**Step 5: Mint Function**

The `mint` function is a custom function that we define in the `CrowdsaleToken` contract. It allows the `owner` of the contract to create new tokens and transfer them to a specified address.

The `mint` function takes two arguments: the address to send the newly minted tokens to (`_to`) and the amount of tokens to mint (`_amount`). The function is marked as `external`, which means that it can be called from outside the contract.
   
```sol
function mint(address _to, uint _amount) external onlyOwner {
    _mint(_to, _amount);
}
```

The `onlyOwner` modifier ensures that only the `owner` of the contract can call the `mint` function, which is important for security purposes. 

### CrowdsaleToken Contract Full Code Snippet

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // Import the ERC20 contract from OpenZeppelin.
import "@openzeppelin/contracts/access/Ownable.sol"; // Import the Ownable contract from OpenZeppelin to set up an owner-controlled contract.

// Define the CrowdsaleToken contract, which is a token that is sold through a crowdsale.
contract CrowdsaleToken is ERC20, Ownable {

    // Constructor function for the CrowdsaleToken contract. It takes two string arguments: the name and symbol of the token.
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        // No code is necessary for the constructor since it is inherited from the ERC20 contract.
    }

    // Function to mint new tokens and transfer them to a specified address. Only the contract owner can call this function.
    function mint(address _to, uint _amount) external onlyOwner {
        // Call the _mint function from the ERC20 contract to create new tokens and transfer them to the specified address.
        _mint(_to, _amount);
    }
}
```

## Create a Crowdsale Contract:

<hr>

**Step 1: Importing the Required Libraries**

The first few lines of code import necessary libraries and contracts that the smart contract needs to function properly. Specifically, the `SafeMath` library from `OpenZeppelin` is imported to handle safe arithmetic operations, and the `Ownable` contract from `OpenZeppelin` is imported to set up an owner-controlled contract. Additionally, the local directory is searched for the `CrowdsaleToken` smart contract, which is imported as well to interact with ERC20-compliant tokens through the ERC20 interface.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "./CrowdsaleToken.sol"; // Import the CrowdsaleToken smart contract from the local directory.
import "@openzeppelin/contracts/utils/math/SafeMath.sol"; // Import the SafeMath library from OpenZeppelin to handle safe arithmetic operations.
import "@openzeppelin/contracts/access/Ownable.sol"; // Import the Ownable contract from OpenZeppelin to set up an owner-controlled contract.
```

**Step 2: Defining the Contract**

Next, the code defines the `Crowdsale contract`, which inherits from the Ownable contract. The `Ownable` contract is a contract that defines an owner address, which has certain privileges in the contract, such as the ability to withdraw funds. The `Crowdsale contract` uses the `Ownable contract` to ensure that only the owner can withdraw funds from the contract.

```sol
contract Crowdsale is Ownable{
    using SafeMath for uint;
    //...
}
```
**Step 3: Defining Contract variables and events**

After defining the `Crowdsale contract`, the code defines several variables that will be used throughout the contract. These variables include:

- `token:` A public state variable of type `CrowdsaleToken` that represents the token being sold in the crowdsale.
  
- `wallet:` A public state variable of type` address payable` that represents the address where funds will be collected.
  
- `rate:` A public state variable of type `uint256` that represents how many token units a buyer gets per `wei`. This is used by a function to calculate the amount of tokens that a buyer will receive when they send a certain amount of `wei` to the contract.

- `weiRaised:` A public state variable of type `uint256` that represents the total amount of `wei` raised so far. This variable will be updated by the function that is used to receive payments.

In addition, the contract uses the `SafeMath` library for `uint`, which provides protection against integer overflow and underflow vulnerabilities. The `using` keyword is used to import the library, and the `for` keyword specifies the type that the library is being used for. This allows for safe mathematical operations on unsigned integers in the contract, such as addition and multiplication.

The `TokenPurchase` event is defined to be emitted when a purchase is made, with relevant information such as the buyer's address, the value in `wei` of the purchase, and the amount of tokens bought.

```sol
contract Crowdsale is Ownable{
    using SafeMath for uint;

    // The token being sold
    CrowdsaleToken public token; // Declare a state variable 'token' of type 'CrowdsaleToken' to represent the token being sold.

    // Address where funds are collected
    address payable public wallet; // Declare a state variable 'wallet' of type 'address payable' to represent the address where funds will be collected.

    // How many token units a buyer gets per wei
    uint256 public rate; // Declare a state variable 'rate' of type 'uint256' to represent the rate at which token units are sold per wei.

    // Amount of wei raised
    uint256 public weiRaised; // Declare a state variable 'weiRaised' of type 'uint256' to represent the total amount of wei raised so far.

    event TokenPurchase(address indexed beneficiary, uint256 value, uint256 amount); // Declare an event 'TokenPurchase' that will be emitted when a purchase is made, with relevant information such as the buyer's address, the value in wei of the purchase, and the amount of tokens bought.
}
```

**Step 4: Defining the Constructor**

The next part of the code defines the `constructor` function, which is used to initialize the contract with the initial values for the `rate`, `wallet`, and `token`. The constructor function takes three parameters:

- `_intialRate:` The initial rate of the crowdsale.
- `_wallet:` The address where funds are collected.
-` _token:` The ERC20 token being sold in the crowdsale.

```sol
// Constructor function that initializes the Crowdsale contract with the initial values for rate, wallet and token.
// It takes in three parameters: _intialRate, _wallet and _token.
constructor(uint _intialRate , address payable _wallet, CrowdsaleToken _token){

    // Check that the _intialRate is greater than zero
    require(_intialRate > 0, "Crowdsale: rate is 0");

    // Check that the _wallet is not the zero address
    require(_wallet != address(0), "Crowdsale: wallet is the zero address");

    // Check that the _token is not the zero address
    require(address(_token) != address(0), "Crowdsale: token is the zero address");

    // Set the rate to the _intialRate
    rate = _intialRate;

    // Set the wallet to the _wallet
    wallet = _wallet;

    // Set the token to the _token
    token = _token;
}
```

**Step 5: Fallback Function**

After defining the `constructor` function, Now we will create a `receive` function. This `receive` function simply calls the `buyTokens` function with the `msg.sender` address as the `beneficiary`. The` msg.sender` is the address of the person who is sending the transaction to the contract. This allows someone to purchase tokens by simply sending ether to the contract without the need to call the `buyTokens` function directly.

```sol
// Fallback receive function can be used to buy tokens
receive() external payable {
    buyTokens(msg.sender);
}
```

**Step 6: Defining the buyTokens Function**

Next, we will create the `buyTokens` function that allows anyone to buy tokens by sending Ether to the contract. This function takes a single argument `beneficiary`, which is the address of the account that will receive the tokens, and is declared as payable because it will receive Ether.

```sol
function buyTokens(address beneficiary) public payable {
```

The first thing the function does is check whether the `beneficiary` address is not the `zero address` and whether the amount of Ether sent is not `zero`. If either of these checks fail, the function will revert the transaction and return the appropriate error message.

```sol
require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
require(msg.value != 0, "Crowdsale: wei amount is 0");
```

If both checks pass, the function will then calculate the number of tokens to be given to the buyer based on the amount of Ether sent and the current `rate` of the token. The `rate` is determined by the contract creator and can be adjusted to change the price of the token during the crowdsale.

```sol
uint weiAmount = msg.value;
uint tokens = weiAmount.mul(rate);
```

The function then updates the state of the contract to reflect the amount of Ether raised in the crowdsale, transfers the tokens from the `crowdsale contract` to the buyer's address, emits an event to indicate that a token purchase has occurred, and finally transfers the Ether from the buyer to the `crowdsale contract` owner's wallet.

```sol
weiRaised = weiRaised.add(weiAmount);
token.transfer(beneficiary, tokens);
emit TokenPurchase(beneficiary, weiAmount, tokens);
wallet.transfer(msg.value);
```

**Full function code snippet:**

```sol
// This function allows anyone to buy tokens by sending Ether to the contract.
function buyTokens(address beneficiary) public payable {
    // Check if the beneficiary address is not the zero address.
    require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
    // Check if the amount of Ether sent is not zero.
    require(msg.value != 0, "Crowdsale: wei amount is 0");

    // Calculate the number of tokens to be given to the buyer.
    uint weiAmount = msg.value;
    uint tokens = weiAmount.mul(rate);
    
    // Update the state to reflect the amount of Ether raised in the crowdsale.
    weiRaised = weiRaised.add(weiAmount);

    // Transfer the tokens from the crowdsale contract to the buyer's address.
    token.transfer(beneficiary, tokens);

    // Emit an event to indicate that a token purchase has occurred.
    emit TokenPurchase(beneficiary, weiAmount, tokens);

    // Transfer the Ether from the buyer to the crowdsale contract owner's wallet.
    wallet.transfer(msg.value);
}
```

**Step 7: Defining the withdrawTokens Function**

Next, we will create a new function called `withdrawTokens`. This function will allow the owner of the `crowdsale contract` to withdraw any unsold tokens from the contract. This is useful in case there are any tokens left over after the crowdsale has ended.

The function will be marked as `external`, which means that it can be called from outside of the contract, and will only be accessible to the contract owner because of the `onlyOwner` modifier.

Inside the function, we will first retrieve the number of unsold tokens by calling the `balanceOf` function on the token contract and passing in the address of the crowdsale contract as an argument.

We then transfer the unsold tokens to the contract owner's address by calling the `transfer` function on the token contract and passing in the `owner's address` as the recipient and the number of unsold tokens as the value.

```sol
// This function allows the owner of the contract to withdraw any unsold tokens from the contract.
function withdrawTokens() external onlyOwner {
    // Retrieve the number of unsold tokens by calling the balanceOf function on the token contract.
    uint256 unsoldTokens = token.balanceOf(address(this));

    // Transfer the unsold tokens to the contract owner's address.
    token.transfer(owner(), unsoldTokens);
}
```

This will ensure that any unsold tokens are transferred to the `contract owner`, and can be used for other purposes such as future sales or as a reserve for the project.

**Step 8: Defining the setRate Function**

Next, we will create the `setRate` function. This function will allow the owner of the contract to update the `rate` of the crowdsale. The `rate` is used to calculate the number of tokens a buyer will receive for a given amount of `Wei`. We will add a check to ensure that the new rate is greater than `0`. Once the check passes, we will update the `rate` of the crowdsale with the new `rate` provided by the `owner`.

When a buyer sends a certain amount of `wei` to the contract, the function multiplies that amount by the current rate to determine how many token units the buyer will receive. For example, if the current rate is `100`, then a buyer who sends `50 wei` will receive `5000` token units.

```sol
// This function allows the owner of the contract to update the rate of the crowdsale.
function setRate(uint256 _rate) external onlyOwner {
    // Check if the new rate is greater than 0.
    require(_rate > 0, "Crowdsale: rate is 0");

    // Update the rate of the crowdsale.
    rate = _rate;
}
```

Overall, the Crowdsale contract defines a basic crowdsale that allows buyers to purchase tokens with ether, tracks the amount of ether raised, and allows the owner to withdraw unsold tokens and funds.

### Crowdsale Contract Full Code Snippet

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "./CrowdsaleToken.sol"; // Import the CrowdsaleToken smart contract from the local directory.
import "@openzeppelin/contracts/utils/math/SafeMath.sol"; // Import the SafeMath library from OpenZeppelin to handle safe arithmetic operations.
import "@openzeppelin/contracts/access/Ownable.sol"; // Import the Ownable contract from OpenZeppelin to set up an owner-controlled contract.

contract Crowdsale is Ownable{
    using SafeMath for uint;

    // The token being sold
    CrowdsaleToken public token; // Declare a state variable 'token' of type 'CrowdsaleToken' to represent the token being sold.

    // Address where funds are collected
    address payable public wallet; // Declare a state variable 'wallet' of type 'address payable' to represent the address where funds will be collected.

    // How many token units a buyer gets per wei
    uint256 public rate; // Declare a state variable 'rate' of type 'uint256' to represent the rate at which token units are sold per wei.

    // Amount of wei raised
    uint256 public weiRaised; // Declare a state variable 'weiRaised' of type 'uint256' to represent the total amount of wei raised so far.

    event TokenPurchase(address indexed beneficiary, uint256 value, uint256 amount); // Declare an event 'TokenPurchase' that will be emitted when a purchase is made, with relevant information such as the buyer's address, the value in wei of the purchase, and the amount of tokens bought.

    // Constructor function that initializes the Crowdsale contract with the initial values for rate, wallet and token.
    // It takes in three parameters: _intialRate, _wallet and _token.
    constructor(uint _intialRate , address payable _wallet, CrowdsaleToken _token){

        // Check that the _intialRate is greater than zero
        require(_intialRate > 0, "Crowdsale: rate is 0");

        // Check that the _wallet is not the zero address
        require(_wallet != address(0), "Crowdsale: wallet is the zero address");

        // Check that the _token is not the zero address
        require(address(_token) != address(0), "Crowdsale: token is the zero address");

        // Set the rate to the _intialRate
        rate = _intialRate;

        // Set the wallet to the _wallet
        wallet = _wallet;

        // Set the token to the _token
        token = _token;
    }

    // Fallback function can be used to buy tokens
    receive() external payable {
        buyTokens(msg.sender);
    }

    // This function allows anyone to buy tokens by sending Ether to the contract.
    function buyTokens(address beneficiary) public payable {
        // Check if the beneficiary address is not the zero address.
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        // Check if the amount of Ether sent is not zero.
        require(msg.value != 0, "Crowdsale: wei amount is 0");

        // Calculate the number of tokens to be given to the buyer.
        uint weiAmount = msg.value;
        uint tokens = weiAmount.mul(rate);
        
        // Update the state to reflect the amount of Ether raised in the crowdsale.
        weiRaised = weiRaised.add(weiAmount);

        // Transfer the tokens from the crowdsale contract to the buyer's address.
        token.transfer(beneficiary, tokens);

        // Emit an event to indicate that a token purchase has occurred.
        emit TokenPurchase(beneficiary, weiAmount, tokens);

        // Transfer the Ether from the buyer to the crowdsale contract owner's wallet.
        wallet.transfer(msg.value);
    }

    // This function allows the owner of the contract to withdraw any unsold tokens from the contract.
    function withdrawTokens() external onlyOwner {
        // Retrieve the number of unsold tokens by calling the balanceOf function on the token contract.
        uint256 unsoldTokens = token.balanceOf(address(this));

        // Transfer the unsold tokens to the contract owner's address.
        token.transfer(owner(), unsoldTokens);
    }

    // This function allows the owner of the contract to update the rate of the crowdsale.
    function setRate(uint256 _rate) external onlyOwner {
        // Check if the new rate is greater than 0.
        require(_rate > 0, "Crowdsale: rate is 0");

        // Update the rate of the crowdsale.
        rate = _rate;
    }
}
```

## Output

<hr>

To create a `Crowdsale Token`, we first deploy the `CrowsSaleToken` contract using an EOA address, and provide two parameters - the name of the token (`ROOTBABU` in this case) and its symbol (`RB`). 

<center><img class="image" src="./assets/images/crowdsale-token-contract.JPG"></center>
<b><center class="img-label">Deploy CrowdsaleToken Contract</center></b>

The `CrowdsaleToken` contract is based on the `ERC20` implementation by OpenZeppelin, which allows us to interact with multiple public functions.

<center><img class="image" src="./assets/images/crowdsale-erc20-contract.JPG"></center>
<b><center class="img-label">CrowdsaleToken Contract</center></b>

When we deploy the `CrowdsaleToken` contract, the constructor code sets the token `name`, `symbol`, and `owner address`, while the `totalSupply` is set to zero initially.

<center><img class="image" src="./assets/images/crowdsale-erc20-contract-values.JPG"></center>
<b><center class="img-label">CrowdsaleToken Contract State</center></b>

Next, we deploy the `Crowdsale` contract, passing in three arguments - the `initialRate`, `wallet address` (which in this case is also the owner address - `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`), and `CrowdsaleToken contract address`. The `initialRate` is set to `100` tokens per `wei`, which means that for every `1 wei` sent to the crowdsale contract, the buyer will receive `100 token units`. 

<center><img class="image" src="./assets/images/crowdsale-contract-deployment.JPG"></center>
<b><center class="img-label">Deploy Crowdsale Contract</center></b>

After deployment we will see some function which comes because some are written in own contract and some are comes because we have inherited `ownable openzeplin contract`.

<center><img class="image" src="./assets/images/crowsale-contract-deployment-output.JPG"></center>
<b><center class="img-label">Crowdsale Contract</center></b>

After deployment, we can check the `owner`, `rate`, `token`, `wallet`, and `weiRaised` values of the Crowdsale contract.

<center><img class="image" src="./assets/images/crowdsale-contract-values.JPG"></center>
<b><center class="img-label">Crowdsale Contract State</center></b>

To increase the `totalSupply` of the token, we can use the `mint` function defined in the `CrowdsaleToken contract`. This function takes two parameters: the address of the account that will receive the minted tokens, and the amount of tokens to be minted. In this case, we pass the address of the `crowdsale contract` and mint `1000` tokens. As a result, the crowdsale contract now holds an additional `1000 tokens` in its balance. These tokens can be sold to buyers who purchase tokens during the `crowdsale`, at the rate specified by the rate variable in the `Crowdsale contract`.W

<center><img class="image" src="./assets/images/crowdsale-contract-mint.JPG"></center>
<b><center class="img-label">Minting Token</center></b>

<center><img class="image" src="./assets/images/crowdsale-balanceOf.JPG"></center>
<b><center class="img-label">Token Balance of Crowdsale contract</center></b>

<center><img class="image" src="./assets/images/crowdsale-token-supply.JPG"></center>
<b><center class="img-label">Total Supply</center></b>

After mint new tokens and increase the total supply, anyone can purchase the token by interacting with the contract's `buyTokens` function. This function requires an address parameter representing the `buyer's Ethereum address`, and a payable value in Ether. For instance, if a buyer sends `5 wei` to the contract with the address `0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db` as the beneficiary address, they will receive `500 units` of the token in return. The amount of tokens a buyer will receive is determined by the current rate of the crowdsale and the amount of Ether they sent.

<center><img class="image" src="./assets/images/crowdsale-buy-token-amount.JPG"></center>
<b><center class="img-label">Enter Token Amount</center></b>

<center><img class="image" src="./assets/images/crowsale-buy-tokens.JPG"></center>
<b><center class="img-label">Buy Tokens</center></b>

After making a purchase, the token balance for a specific address can be checked by calling the `balanceOf` function in the token contract and passing the address as a parameter. This will return the number of tokens held by that address.

<center><img class="image" src="./assets/images/crowsale-balanceof.JPG"></center>
<b><center class="img-label">Token Balance of EOA</center></b>

After a buyer interacts with the `Crowdsale contract` to purchase tokens, the contract first receives the payment of `5 wei`. The contract then transfers the payment to the `wallet` state variable address (`0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`).

In addition to the `buyTokens` function, the Crowdsale contract includes other functions such as `setRate` which allows the owner to update the rate of tokens, and `withdrawTokens`, which allows the owner to withdraw any remaining tokens at the end of the crowdsale. These functions can be called using `external` transactions to interact with the crowdsale and perform various actions.

## Important Points

<hr>

**1. Crowdsale Rate** 

There are different ways to set the `rate` in a `crowdsale smart contract`. One way is to set a `fixed rate`, where the rate remains constant throughout the crowdsale. Another way is to set a dynamic rate, where the `rate` changes based on certain conditions, such as the number of tokens already sold or the amount of time that has passed since the start of the crowdsale. 

Here's a list of different ways to set the rate in a crowdsale smart contract:

- `Fixed rate :` where the rate remains constant throughout the crowdsale
- `Tiered rate :` where the rate changes at different stages of the crowdsale
- `Progressive rate :` where the rate increases as more tokens are sold
- `Dutch auction rate :`  where the rate decreases over time until all tokens are sold
- `Market-based rate :` where the rate is determined by market demand and supply

**2. Token Emission**

In a `Crowdsale contract`, the process of `token emission` can be an important consideration. `Token emission` refers to the creation of new tokens and how those tokens are distributed to buyers during the `Crowdsale`.

There are three common ways to implement token emission in a `crowdsale smart contract`:

- `(Default) :` The `Crowdsale contract` owns the tokens and simply `transfers` them from its own ownership to users who purchase them. This is the most straightforward way to distribute tokens during a crowdsale.

- `MintedCrowdsale :` The `Crowdsale` mints new tokens as purchases are made. This means that the total supply of tokens is not fixed, but rather increases as more tokens are sold. The `CrowdsaleToken` contract needs to implement the mint function in order to create new tokens.

- `AllowanceCrowdsale :` The `Crowdsale` is granted an allowance to another wallet, such as a multisig wallet, that already owns the tokens to be sold in the `crowdsale`. This allows for greater flexibility in token distribution, as the token owner can retain control over the total supply of tokens and decide how many tokens to allocate for the crowdsale.

By understanding these different mechanisms for token `emission` and `rate setting`, you can create a `crowdsale smart contract` that fits the needs of your specific use case. For more information on implementing these mechanisms in a `crowdsale smart contract`, check out the `OpenZeppelin` documentation on <a href="https://docs.openzeppelin.com/contracts/2.x/crowdsales#token-emission" target="_blank">token emission</a> and <a href="https://docs.openzeppelin.com/contracts/2.x/crowdsales#crowdsale-rate" target="_blank">rate setting</a>.

## External Resources

<hr>

Listed four categories of crowdsale contracts: Core, Emission, Validation, and Distribution. Each category contains several specific crowdsale contracts with unique features and functions. Highlighting their key characteristics, purpose, and the variables, functions, and events defined in their OpenZeppelin links.
  
👉 **[Core Crowdsale](https://rootbabu.github.io/basics/variables-basic.md#state-variables)**

👉 **[Emission](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#emission)**

- [Allowance Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#AllowanceCrowdsale)
  
- [Minted Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#MintedCrowdsale)

👉 **[Validation](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#validation)**

- [Capped Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#CappedCrowdsale)
  
- [Individually Capped Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#IndividuallyCappedCrowdsale)
  
- [Pausable Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#PausableCrowdsale)
  
- [TimedCrowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#TimedCrowdsale)
  
- [Whitelist Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#WhitelistCrowdsale)

👉 **[Distribution](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#distribution)**

- [Finalizable Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#FinalizableCrowdsale)
  
- [PostDelivery Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#PostDeliveryCrowdsale)
  
- [Refundable Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#RefundableCrowdsale)
  
- [Refundable PostDelivery Crowdsale](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#RefundablePostDeliveryCrowdsale)