# Crowdsale Smart Contract

## INTRODUCTION

<hr>

Crowdsale is a way for blockchain startups to raise money. They make their own cryptocurrency tokens and sell them to early supporters in exchange for fiat currency or another cryptocurrency. The goal is to raise money for the project while giving investors a chance to buy tokens early. If the project succeeds, the tokens' value may increase, and investors can make a profit.

Here's a simple example of a crowdsale:

A startup creates a cryptocurrency token for a decentralized sharing economy platform. To raise funds for development, they hold a crowdsale and sell 50 million tokens at a price of $0.10 each, aiming to raise $5 million.

Investors can buy tokens by sending fiat currency or Ethereum to the startup's wallet and receive a corresponding number of tokens in return. For instance, an investor sending $1,000 gets 10,000 tokens.

The startup uses the raised money to improve the platform. If the platform succeeds, the tokens' demand may increase, and their value may rise. Early investors may then sell their tokens at a higher price, making a profit.

## Prerequistes

<hr>

To create a crowdsale contract, you need to have a good understanding of the following prerequisites:

**1. ERC20 Token Standard:** The crowdsale contract requires an ERC20 token standard to enable investors to purchase tokens using Ethereum. The ERC20 standard is a widely used token standard that enables interoperability between different Ethereum-based projects. You can learn more about the ERC20 token standard here: <a href=">https://rootbabu.github.io/basics/ERC20.md#top" target="_blank">https://rootbabu.github.io/basics/ERC20.md#top</a>

**2. OpenZeppelin Library:** OpenZeppelin is a smart contract library that offers various useful features such as <a href="https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath" target="_blank">SafeMath</a>, <a href="https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable" target="_blank">Ownable</a>, and <a href="https://docs.openzeppelin.com/contracts/4.x/erc20" target="_blank">ERC20</a>. It's recommended to utilize OpenZeppelin to make your crowdsale contract more secure and robust.

## Objectives

<hr>

This guide aims to provide a comprehensive introduction to the process of creating a crowdsale contract. The objectives of this guide are:
  
**1. Create a Token Smart Contract:**

- Write a smart contract that utilizes the ERC20 standard of the OpenZeppelin library for creating a token.
- Use the "mint" function to set the total supply of the token.

**2. Create a Crowdsale Contract:**

- Import and use the ERC20, SafeMath, and Ownable contracts from the OpenZeppelin library.
- Write a smart contract that will handle the distribution of the token during the crowdsale.
- Set the rate at which tokens will be sold during the crowdsale.
- Write a "buyTokens" function that will allow investors to purchase tokens with ETH.
- Add any necessary functions to manage the distribution of tokens during and after the crowdsale.

This is a high-level overview of the steps involved in creating a crowdsale contract. The exact process will vary depending on the specific requirements of the project and the blockchain platform used. It is important to seek professional guidance and support throughout the development process to ensure the success of the crowdsale.

## Create a Token Smart Contract

<hr>

Here's a step-by-step guide on how to create a token smart contract for a crowdsale using the CrowdSaleToken contract:

Step 1: Token Name and Symbol

Decide on the token name and symbol that you want to use for your crowdsale. These will be passed as arguments to the CrowdSaleToken contract when it is created.

When creating a new token for a crowdsale, the first step is to decide on the name and symbol of the token. The token name is a descriptive name for the token (e.g. "MyCrowdSaleToken"), while the token symbol is a shorter code that represents the token (e.g. "MCT").

These values will be used to create the CrowdSaleToken contract, which will be used to create and manage the tokens for the crowdsale.


Step 2: Importing Contracts

Create a new contract in your development environment and import the necessary contracts.
To use the ERC20 and Ownable contracts in our CrowdSaleToken contract, we need to import them using the import statement. The @openzeppelin/contracts package is a popular library of smart contract code that provides many useful contracts, including ERC20 and Ownable.

```sol
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

Step 3: Inheriting Contracts

The CrowdSaleToken contract is created by defining a new contract and then inheriting from the ERC20 and Ownable contracts. This is done using the is keyword, which tells the compiler that the CrowdSaleToken contract is an ERC20 and Ownable contract.

```sol
contract CrowdSaleToken is ERC20, Ownable {
    // contract code goes here
}
```

By inheriting from these contracts, the CrowdSaleToken contract automatically has access to all of the functions and properties defined in both contracts. This allows us to create a token that is both fungible (using the ERC20 standard) and has restricted access (using the Ownable contract).

Step 4: Constructor Function

The constructor function is a special function that is called when the contract is deployed to the blockchain. It is used to set initial values for the contract, such as the name and symbol of the token.

In the CrowdSaleToken contract, the constructor function takes two string arguments (_name and _symbol) and passes them to the constructor of the ERC20 contract using the ERC20(_name, _symbol) syntax:

```sol
contract CrowdSaleToken is ERC20, Ownable {
    // This is the constructor for the CrowdSaleToken contract. It takes two string arguments: the name and symbol of the token.
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        // constructor code goes here
    }
}
```

This creates a new instance of the ERC20 contract with the specified name and symbol, and sets the totalSupply of the token to 0.


Step 5: Mint Function

The mint function is a custom function that we define in the CrowdSaleToken contract. It allows the owner of the contract to create new tokens and transfer them to a specified address.

The mint function takes two arguments: the address to send the newly minted tokens to (_to) and the amount of tokens to mint (_amount). The function is marked as external, which means that it can be called from outside the contract.
   
```sol
function mint(address _to, uint _amount) external onlyOwner {
    _mint(_to, _amount);
}
```

The onlyOwner modifier ensures that only the owner of the contract can call the mint function, which is important for security purposes. The _mint function is a built-in function from the ERC20 contract that creates new tokens and transfers them to the specified address.


## Create a Crowdsale Contract:

<hr>

Step 1: Importing the Required Libraries

The first few lines of the code import the necessary libraries for the smart contract to function properly. In this case, the code uses the SafeMath library for safe mathematical operations and the ERC20 interface to interact with ERC20-compliant tokens.

```sol
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
```

Step 2: Defining the Contract
Next, the code defines the CrowdSale contract, which inherits from the Ownable contract. The Ownable contract is a contract that defines an owner address, which has certain privileges in the contract, such as the ability to withdraw funds. The CrowdSale contract uses the Ownable contract to ensure that only the owner can withdraw funds from the contract.

```sol
contract CrowdSale is Ownable{
    using SafeMath for uint;
    //...
}
```
Step 3: Defining Contract variables and events

After defining the CrowdSale contract, the code defines several variables that will be used throughout the contract. These variables include:

- token: The token being sold in the crowdsale.
  
- wallet: The address where funds are collected.
  
- rate: How many token units a buyer gets per wei. When a buyer sends a certain amount of wei to the contract, the function multiplies that amount by the current rate to determine how many token units the buyer will receive.

- weiRaised: The amount of wei raised so far.

```sol
contract CrowdSale is Ownable{
    using SafeMath for uint;

    // The token being sold
    ERC20 public token;

    // Address where funds are collected
    address payable public wallet;

    // How many token units a buyer gets per wei
    uint256 public rate;

    // Amount of wei raised
    uint256 public weiRaised;

    event TokenPurchase(address indexed beneficiary, uint256 value, uint256 amount);
    //...
}
```

Step 4: Defining the Constructor

The next part of the code defines the constructor function, which is used to initialize the contract with the initial values for the rate, wallet, and token. The constructor function takes three parameters:

    _intialRate: The initial rate of the crowdsale.
    _wallet: The address where funds are collected.
    _token: The ERC20 token being sold in the crowdsale.

The constructor function then sets the initial values for rate, wallet, and token.

```sol
constructor(uint _intialRate , address payable _wallet, CrowdSaleToken _token){
    require(_intialRate > 0, "Crowdsale: rate is 0");
    require(_wallet != address(0), "Crowdsale: wallet is the zero address");
    require(address(_token) != address(0), "Crowdsale: token is the zero address");

    rate = _intialRate;
    wallet = _wallet;
    token = _token;
}
```

Step 5: Fallback Function

After defining the constructor function, the code defines a fallback function. The fallback function is called when someone sends ether to the contract without calling a specific function. In this case, the fallback function calls the buyTokens function with the sender's address as the beneficiary.

```sol
// Fallback function can be used to buy tokens
receive() external payable {
    buyTokens(msg.sender);
}
```

Step 6: Defining the buyTokens Function

The buyTokens function is called when someone sends ether to the contract and wants to buy tokens. The function takes one parameter:

    beneficiary: The address of the person who will receive the tokens.

The function first checks that the beneficiary address is not the zero address and that the amount of wei sent is not zero. If these conditions are met, the function calculates the amount of tokens the buyer will receive based on the current rate and the amount of wei sent.

Next, the function updates the weiRaised variable to reflect the amount of wei raised in the crowdsale. It then transfers the appropriate number of tokens to the beneficiary and emits a TokenPurchase event to record the transaction. Finally, the function transfers the ether sent to the contract to the wallet address.

```sol
function buyTokens(address beneficiary) public payable{
    require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
    require(msg.value != 0, "Crowdsale: wei amount is 0");

    uint weiAmount = msg.value;
    uint tokens = weiAmount.mul(rate);
    
     // update state
    weiRaised = weiRaised.add(weiAmount);

    token.transfer(beneficiary, tokens);
    emit TokenPurchase(beneficiary, weiAmount, tokens);
    wallet.transfer(msg.value);
}
```

Step 7: Defining the withdrawTokens Function

The withdrawTokens function is called by the owner of the contract to withdraw any unsold tokens after the crowdsale is over. The function first checks the balance of the contract and transfers any unsold tokens to the owner's address.

```sol
// Withdraw the unsold tokens
function withdrawTokens() external onlyOwner {
    uint256 unsoldTokens = token.balanceOf(address(this));
    token.transfer(owner(), unsoldTokens);
}
```

Step 8: Defining the withdraw Function
The withdraw function is called by the owner of the contract to withdraw any ether raised in the crowdsale. The function first checks that there are funds to withdraw and then transfers the ether to the wallet address.

```sol
function withdraw() external onlyOwner{
    require(address(this).balance > 0, "Crowdsale: no funds to withdraw");
    wallet.transfer(address(this).balance);
}
```

Step 9: Defining the setRate Function
The setRate function is called by the owner of the contract to update the rate of the crowdsale. The function first checks that the new rate is greater than zero and then updates the rate variable with the new value.

How many token units a buyer gets per wei. When a buyer sends a certain amount of wei to the contract, the function multiplies that amount by the current rate to determine how many token units the buyer will receive. For example, if the current rate is 100, then a buyer who sends 1 ether (1,000,000,000,000,000 wei) will receive 100 token units.

There are many other ways to determine the rate in a crowdsale contract, and it will depend on the specific requirements of the contract and the goals of the project. Some common approaches include setting a fixed rate, using a dynamic pricing mechanism based on market conditions, or implementing a Dutch auction where the price starts high and gradually decreases over time until all tokens are sold.

```sol
function setRate(uint256 _rate) external onlyOwner {
    require(_rate > 0, "Crowdsale: rate is 0");
    rate = _rate;
}
```

Overall, the CrowdSale contract defines a basic crowdsale that allows buyers to purchase tokens with ether, tracks the amount of ether raised, and allows the owner to withdraw unsold tokens and funds.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// This is a contract for a token that is sold through a crowdsale. It inherits from the ERC20 and Ownable contracts.
contract CrowdSaleToken is ERC20, Ownable {

    // This is the constructor for the CrowdSaleToken contract. It takes two string arguments: the name and symbol of the token.
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
    }

    // This function allows the contract owner to mint new tokens and transfer them to the specified address.
    function mint(address _to, uint _amount) external onlyOwner{
        _mint(_to, _amount); // This is a function from the ERC20 contract that creates new tokens and transfers them to the specified address.
    }
}

contract CrowdSale is Ownable{
    using SafeMath for uint;

    // The token being sold
    ERC20 public token;

    // Address where funds are collected
    address payable public wallet;

    // How many token units a buyer gets per wei
    uint256 public rate;

    // Amount of wei raised
    uint256 public weiRaised;

    event TokenPurchase(address indexed beneficiary, uint256 value, uint256 amount);

    constructor(uint _intialRate , address payable _wallet, CrowdSaleToken _token){
        require(_intialRate > 0, "Crowdsale: rate is 0");
        require(_wallet != address(0), "Crowdsale: wallet is the zero address");
        require(address(_token) != address(0), "Crowdsale: token is the zero address");

        rate = _intialRate;
        wallet = _wallet;
        token = _token;
    }

    // Fallback function can be used to buy tokens
    receive() external payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable{
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        require(msg.value != 0, "Crowdsale: wei amount is 0");

        uint weiAmount = msg.value;
        uint tokens = weiAmount.mul(rate);
        
         // update state
        weiRaised = weiRaised.add(weiAmount);

        token.transfer(beneficiary, tokens);
        emit TokenPurchase(beneficiary, weiAmount, tokens);
        wallet.transfer(msg.value);
    }

    // Withdraw the unsold tokens
    function withdrawTokens() external onlyOwner {
        uint256 unsoldTokens = token.balanceOf(address(this));
        token.transfer(owner(), unsoldTokens);
    }

    function withdraw() external onlyOwner{
        require(address(this).balance > 0, "Crowdsale: no funds to withdraw");
        wallet.transfer(address(this).balance);
    }

    // Update the rate of the crowdsale
    function setRate(uint256 _rate) external onlyOwner {
        require(_rate > 0, "Crowdsale: rate is 0");
        rate = _rate;
    }
}
```

## Output

## Important Points

## External Resources

https://docs.openzeppelin.com/contracts/2.x/crowdsales

https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#Crowdsale