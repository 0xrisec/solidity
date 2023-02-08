# ERC-20 Token 

## INTRODUCTION
<hr>

**What is a Token?**

A `token` is a representation of something in the blockchain. This something can be `money`, `time`, `services`, `skills in a game`, `lottery tickets`, `shares in a company`, `a virtual pet`, anything. By representing things as `tokens`, we can allow `smart contracts` to `interact` with them, `exchange` them, `create` or `destroy` them. To `create`, `exchange`, and `destroy` tokens, you need to follow the rules specified by the `token standard` you choose. 

A `token standard` is a set of rules that define how a `token` will behave within a `blockchain network`. This includes how the `token` will be `created`, `stored`, and `transferred`. Examples of `token` standards include `ERC-20`, `ERC-721`, `ERC-777`, `ERC-1155`, `ERC-4626`.

**What is ERC?**

`ERC` stands for `Ethereum Request for Comment`, a protocol for proposing improvements to the Ethereum network. , are used to formalize and standardize proposals for new features, improvements, or other changes to the Ethereum network and its underlying code. 

An `ERC` is a set of technical specifications and standards that define the behavior of a particular aspect of the `Ethereum blockchain`, such as the creation and transfer of tokens, or the execution of `smart contracts`. Each `ERC` is designed to provide a standardized and interoperable solution for a specific problem or use case on the `Ethereum network`. `ERC-20` is just one example of an `ERC`, and there are many others that address different issues and requirements on the `Ethereum` platform.

**What is ERC-20 (Ethereum Request for Comments 20)?**

The `ERC-20 standard` is a widely used standard for creating `fungible tokens` on the `Ethereum network`. These tokens are `interchangeable` and can be used for a variety of purposes such as `voting tokens`, `staking tokens`, or `virtual currencies`. 

`Fungible` means `interchangeable` or `replaceable`. In the context of `tokens`, it refers to `tokens` that have the same value and are `interchangeable` with each other. For example, if you have `10 units` of a `fungible token`, and I have `10 units` of the same `token`, we both have the same value and can exchange our `tokens` without any difference in value.

Think of it like cash or `traditional currency`, where one `dollar` is interchangeable with another `dollar`. Both have the same value and can be used in the same way. This is why the `ERC-20` standard is used for creating `fungible tokens`, like `virtual currencies`, `voting tokens`, or `staking tokens`, that are `interchangeable` and have the same value.

The standard also makes it easier for developers to create and integrate token applications, as they can follow a common set of rules and protocols. The `ERC-20` standard has been widely adopted in the `Ethereum` ecosystem, making it one of the most popular `token standards` on the platform.

**Example of ERC-20 usage**

In the context of a `decentralized gaming platform`, the new blockchain-based game has been developed to use tokens that follow the `ERC-20` standard as the `in-game currency`. This means that the `tokens` used within the `game` are a specific type of `token`, built on the `Ethereum blockchain`, and adhere to the `ERC-20` standard.

`Players` can earn these `tokens` by playing the `game` and completing challenges, purchasing them using `Ethereum`, or trading them with other `players`. The `tokens` can then be used within the `game` to purchase in-game items or traded on decentralized exchanges outside of the `game`. Since they are built on the `Ethereum blockchain`, they can be securely stored in a `wallet`.

In summary, `ERC-20` is a standard for creating `tokens` on the `Ethereum blockchain`, and the new game utilizes `tokens` that follow this standard as its `in-game currency`. In simpler terms,` ERC-20` sets guidelines for how a `token` should function on the `Ethereum network`. This allows developers to create and issue `tokens` that are compatible with the `Ethereum ecosystem`, including `exchanges` and `wallets`.

Some of the most well-known examples of `ERC-20` tokens include:

- Wrapped Bitcoin (WBTC)
- Chainlink (LINK)
- USD Coin (USDC)
- Dai (DAI)
- Binance Coin (BNB)
- Compound (COMP)
- Aave (LEND)
- Maker (MKR)
- Uniswap (UNI)

## OBJECTIVES

<hr>

I've divided the Objectives into three parts:

**1. Understanding the ERC-20 Standard:** We will examine the components of the ERC-20 standard. A comprehensive introduction to the ERC-20 standard, including its structure and features, and to guide readers through the process of creating an ERC20 contract for tokens. You can emphasize that the purpose of this blog is to gain an understanding of the structure and features of the `ERC-20 standard`, so that when the time comes to create an application, your audience will have the necessary knowledge to make informed decisions. By gaining a deep understanding of the standard, your audience will be better equipped to identify opportunities and create innovative and useful applications that utilize the `ERC-20 standard`.

**2. Developing the ERC-20 Contract:** Based on the first step, we will create an ERC-20 contract.

**3. Token Creation for the Game Contract:** Using the ERC-20 contract, we will create tokens for the game contract. A game contract using it to create game tokens ( This means that the ERC20 contract will serve as a foundation for creating game tokens, which will be specific to the game contract. The end result will be a functioning game that utilizes the ERC20-based game tokens as an integral part of its functionality. )

## ERC-20 Standard

<hr>

The following functions and features are required to be included in the code of an ERC-20 token in order to meet the ERC-20 standard:

**1. Total supply:** This specifies the total number of tokens that will exist. It sets a limit on the number of tokens that can be created and ensures that the total supply is transparent and fixed. This ensures that there is no ambiguity or confusion about the total number of tokens in circulation, and provides a clear understanding of the total supply for all parties involved.

```sol
function totalSupply() external view returns (uint);
```

**2. Token balance:** This function allows one to check the number of tokens that an Ethereum address holds. It's a standard way of tracking token ownership and balance within the Ethereum ecosystem. This is like checking your bank balance.

```sol
function balanceOf(address _account) external view returns (uint balance);
```

**3. Transfer:** This function enables the transfer of tokens from one Ethereum address to another. It provides a standardized way of moving tokens within the Ethereum ecosystem. This is like making a money transfer between bank accounts.

```sol
function transfer(address _to, uint _value) external returns (bool success);
```

**4. Approve and transferFrom:** This function allows the token holder to grant another address permission to transfer their tokens on their behalf. It provides a way for tokens to be transferred without the need for the token holder to be involved in each transaction. This is like giving someone else access to your bank account to make transfers.

```sol
function approve(address _spender, uint _amount) external returns(bool);

function transferFrom(address _from, address _to, uint _amount) external returns(bool);
```

**5. Allowance:** This function lets the token holder check how many tokens another address is authorized to transfer from their address i.e. A way to check how many tokens someone else is allowed to transfer from your address. It provides transparency and security for token transfers. 

```sol
function allowances(address _owner, address _spender) external view returns(uint);
```

**6. Event logging:** This function enables the recording of important events such as token transfers or permission changes. It provides a permanent record of token transactions for transparency and accountability, and can be used for auditing purposes.

```sol
event Transfer(address from, address to, uint amount);
event Approve (address owner, address spender, uint amount);
```

These functions and features ensure that ERC-20 tokens are consistent, compatible, and secure within the Ethereum ecosystem. By following the ERC-20 standard, tokens can be easily integrated with existing applications and infrastructure, enabling the creation and use of new tokens in the Ethereum ecosystem.

The points I listed the code of an ERC-20 token must have these functions and features in order to be considered ERC-20 compliant and be compatible with other Ethereum-based applications and infrastructure. They provide a common interface for tokens to be created and used within the Ethereum ecosystem, making it easier for developers to create and integrate new tokens with existing applications and infrastructure. The standard is widely adopted, and understanding these features is important for anyone who wants to develop or use Ethereum-based tokens. By explaining these points, I aim to provide a comprehensive and clear understanding of the ERC-20 standard and its functions.

## ERC-20 Token Contract

<hr>

The first step in creating an ERC20 token is to define its interface.

An interface in Solidity is a contract that specifies the methods and events that other contracts must implement. An ERC20 token interface defines a standard set of methods and events that any token that implements it must have.

The ERC20 token interface, as shown in the code below, includes the following methods: `totalSupply`, `balanceOf`, `transfer`, `allowances`, `approve` and `transferFrom`.

```sol
// Interface for ERC20 token standard
interface IERC20{
    // Returns the total supply of tokens
    function totalSupply() external view returns (uint);

    // Returns the balance of the specified `_account`
    function balanceOf(address _account) external view returns (uint balance);

    // Transfers `_value` tokens from the caller to `_to` address
    function transfer(address _to, uint _value) external returns (bool success);

    // Returns the allowed amount of tokens a spender is allowed to spend on behalf of the owner
    function allowances(address _owner, address _spender) external view returns(uint);

    // Approves the `_spender` to spend `_amount` tokens on behalf of the owner
    function approve(address _spender, uint _amount) external returns(bool);

    // Transfers `_amount` tokens from `_from` to `_to` address
    function transferFrom(address _from, address _to, uint _amount) external returns(bool);

    // Event triggered on token transfer
    event Transfer(address from, address to, uint amount);

    // Event triggered on approval of spender to spend tokens on behalf of owner
    event Approve (address owner, address spender, uint amount);
}
```

The second step after defining the ERC20 interface is to create a contract that implements the interface. In the code below, we have a contract named ERC20 which is declared to implement the IERC20 interface using the is keyword.

```
contract ERC20 is IERC20{
}
```

Next step, in this contract, we will define several public variables:

- name: A string variable to store the name of the token.

- symbol: A string variable to store the symbol of the token.

- totalSupply: An uint variable to store the total supply of tokens.

```sol
contract ERC20 is IERC20{
    string public name;
    string public symbol;
    uint public totalSupply;
}
```

Next, We also will create two mapping variables:

- balanceOf: A mapping that maps addresses to token balances. The "balanceOf" mapping in an ERC20 token is used to keep track of each individual user's token balance. It maps addresses, which represent unique user accounts on the Ethereum blockchain, to their respective token balances. By keeping track of each user's token balance in a mapping, the ERC20 contract can efficiently check the balance of a user's account and perform transactions, such as transferring tokens from one account to another, based on the information stored in the balanceOf mapping.

- allowances: A mapping that maps an owner address to another mapping that maps spender addresses to allowed amounts of tokens. The "allowances" feature in an ERC20 token allows a token owner to give permission to another address (known as the "spender") to spend a specific amount of the owner's tokens on their behalf.

For example, if Alice has 100 tokens and wants to allow Bob to spend 10 of her tokens, she can set an allowance of 10 tokens for Bob's address. The contract would then keep track of this approval and Bob would be able to spend up to 10 of Alice's tokens, but no more.

The mapping maps an owner address to another mapping that maps spender addresses to allowed amounts of tokens. This allows the contract to efficiently check the approved amount of tokens for each spender for a specific owner.

```
contract ERC20 is IERC20{
    string public name;
    string public symbol;
    uint public totalSupply;

	mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowances;
}
```

The constructor function is a crucial step in creating an ERC-20 token on the Ethereum blockchain. It is the first and only function that is executed automatically when the contract is deployed. The purpose of the constructor function is to initialize the state of the contract, which includes important information about the token such as its name and symbol.

In the example provided, the constructor takes in two arguments: _name and _symbol. These arguments represent the name and symbol of the token, respectively. Within the constructor, the values of _name and _symbol are assigned to the variables name and symbol, which are the internal variables used to store the name and symbol of the token within the contract.

Once the contract is deployed, the constructor function will be executed and set the name and symbol of the token, which can be accessed and used by other functions within the contract.

```sol
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }
```

Decimals: An uint8 variable to store the number of decimal places the token uses. For example, if a token has 18 decimals, that means the smallest unit of the token is 0.000000000000000001 of the total supply. If it has 6 decimals, then the smallest unit is 0.000001. In the same way that 100 cents is equal to 1 dollar, 10^6 smallest units of the token with 6 decimals is equal to 1 unit of the token.

A real-world example of decimal places can be seen in traditional fiat currencies, such as the US dollar. For example, if you have $10.00, that means you have 10 dollars and 0 cents. If you have $10.50, that means you have 10 dollars and 50 cents. The decimal places give you more precision in representing and processing transactions with the currency.

Similarly, in the context of an ERC20 token with 6 decimals, the smallest unit of the token would be represented with 6 digits after the decimal point, allowing for smaller transactions to be processed accurately within the token system. The idea is to give more precision to the token value so that it can handle smaller transactions. In summary, the number of decimal places a token uses determines the smallest unit of the token that can be traded or transferred.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

// Interface for ERC20 token standard
interface IERC20{
    // Returns the total supply of tokens
    function totalSupply() external view returns (uint);

    // Returns the balance of the specified `_account`
    function balanceOf(address _account) external view returns (uint balance);

    // Transfers `_value` tokens from the caller to `_to` address
    function transfer(address _to, uint _value) external returns (bool success);

    // Returns the allowed amount of tokens a spender is allowed to spend on behalf of the owner
    function allowances(address _owner, address _spender) external view returns(uint);

    // Approves the `_spender` to spend `_amount` tokens on behalf of the owner
    function approve(address _spender, uint _amount) external returns(bool);

    // Transfers `_amount` tokens from `_from` to `_to` address
    function transferFrom(address _from, address _to, uint _amount) external returns(bool);

    // Event triggered on token transfer
    event Transfer(address from, address to, uint amount);

    // Event triggered on approval of spender to spend tokens on behalf of owner
    event Approve (address owner, address spender, uint amount);
}


contract ERC20 is IERC20{
    string public name;
    string public symbol;
    uint public totalSupply;
    
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowances;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    function transfer(address _to, uint _value) external returns (bool) {
        balanceOf[_to] += _value;
        balanceOf[msg.sender] -= _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) external returns(bool){
        allowances[msg.sender][_spender] = _value;
        emit Approve(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint _amount) external returns(bool){
        allowances[_from][msg.sender] -= _amount;
        balanceOf[_from] -= _amount;
        balanceOf[_to] += _amount;
        emit Transfer(_from, _to, _amount);
        return true;
    }

    function mint(uint _amount) external {
        balanceOf[msg.sender] += _amount;
        totalSupply += _amount;
        emit Transfer(address(0), msg.sender, _amount);
    }

    function burn(uint _amount) external{
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;
        emit Transfer(msg.sender, address(0), _amount);
    }
}
```
