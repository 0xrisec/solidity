# ERC-20 Token Smart Contract

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

In the context of a `decentralized gaming platform`, the `ERC-20` standard can be used to create a cryptocurrency that serves as the in-game currency. This currency can be earned by players through gameplay, purchased using `Ethereum`, or traded with other players.

Since the token follows the `ERC-20` standard and is built on the Ethereum blockchain, it can be securely stored in an Ethereum-compatible wallet, such as `MyEtherWallet` or `MetaMask`. This allows players to easily manage their in-game assets and participate in the Ethereum ecosystem.

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

This guide aims to provide a comprehensive introduction to the `ERC-20 standard`, and guide readers through the process of creating their own custom `ERC-20 token contract`. The objectives of this guide are:

**1. Understanding the ERC-20 Standard:** A comprehensive overview of the structure and features of the `ERC-20 standard`, to equip readers with the knowledge to make informed decisions when creating an `ERC-20 token contract`.

**2. Developing a Custom ERC-20 Token Contract:** A hands-on experience in creating a custom `ERC-20 token contract` from scratch, following the guidelines and rules of the `ERC-20 standard`.

**3. Token Creation for the Game Contract:** Utilizing the ERC-20 contract to create tokens for a `game contract`, demonstrating the versatility of the `ERC-20 standard` in real-world applications.

**4. OpenZeppelin ERC-20 Token Contract Implementations:** An overview of OpenZeppelin `ERC-20 token contract` implementations, and their features and benefits.

## ERC-20 Standard

<hr>

The following functions and features are required to be included in the code of an `ERC-20 token` in order to meet the `ERC-20 standard`:

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

These functions and features ensure that `ERC-20 tokens` are consistent, compatible, and secure within the Ethereum ecosystem. By following the `ERC-20 standard`, tokens can be easily integrated with existing applications and infrastructure, enabling the creation and use of new tokens in the Ethereum ecosystem.

The points I listed the code of an `ERC-20 token` must have these functions and features in order to be considered `ERC-20` compliant and be compatible with other Ethereum-based applications and infrastructure. They provide a common interface for tokens to be created and used within the Ethereum ecosystem, making it easier for developers to create and integrate new tokens with existing applications and infrastructure. The standard is widely adopted, and understanding these features is important for anyone who wants to develop or use Ethereum-based tokens. By explaining these points, I aim to provide a comprehensive and clear understanding of the `ERC-20` standard and its functions.

## ERC-20 Token Contract

<hr>

The first step in creating an `ERC20` token is to define its `interface`. An `interface` is a blueprint that specifies the methods and events that other contracts must implement. An `ERC20` token `interface` defines a standard set of methods and events that any token that implements it must have.

The `ERC20` token interface, as shown in the code below, includes the following methods: `totalSupply`, `balanceOf`, `transfer`, `allowances`, `approve` and `transferFrom`.

To create an `ERC20`-compliant token, developers must first create an interface that implements the `ERC20 standard`. This interface outlines the functions and events that the token must include. Once the interface has been created, developers can create a contract that implements the `ERC20 interface`.

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

The second step after defining the `ERC20 interface` is to create a `contract` that implements the `interface`. In the code below, we have a contract named `ERC20` which is declared to implement the `IERC20` interface using the `is` keyword.

```sol
contract ERC20 is IERC20{
    // This contract implements the ERC20 token standard
}
```

Next step, in this `contract`, we will define several `public variables`:

**1. name:** A string variable to store the name of the token.

**2. symbol:** A string variable to store the symbol of the token.

**3. totalSupply:** An uint variable to store the total supply of tokens.

```sol
contract ERC20 is IERC20{
    // Name of the token
    string public name;

    // Symbol used to represent the token
    string public symbol;

    // Total supply of tokens
    uint public totalSupply;
}
```

Next, We also will create two `mapping` variables:

**1. balanceOf:** A `mapping` that maps addresses to `token` balances. The `balanceOf` `mapping` in an `ERC20` token is used to keep track of each individual user's `token` balance. It maps addresses, which represent unique user `accounts` on the Ethereum blockchain, to their respective `token` balances. By keeping track of each user's `token` balance in a `mapping`, the `ERC20` contract can efficiently check the balance of a user's account and perform transactions, such as transferring `tokens` from one account to another, based on the information stored in the `balanceOf` `mapping`.

**2. allowances:** A `mapping` that maps an owner address to another `mapping` that maps `spender` addresses to allowed amounts of tokens. The `allowances` feature in an `ERC20` token allows a token owner to give permission to another `address` (known as the `"spender"`) to spend a specific amount of the `owner's tokens` on their behalf.

For example, if `Alice` has `100` tokens and wants to allow `Bob` to spend `10` of her tokens, she can set an allowance of `10` tokens for `Bob's address`. The contract would then keep track of this `approval` and `Bob` would be able to spend up to `10` of `Alice's tokens`, but no more.

The `mapping` maps an `owner` address to another `mapping` that maps `spender addresses` to allowed `amounts` of tokens. This allows the contract to efficiently check the approved amount of `tokens` for each `spender` for a specific `owner`.

```sol
contract ERC20 is IERC20{
    // Name of the token
    string public name;

    // Symbol used to represent the token
    string public symbol;

    // Total supply of tokens
    uint public totalSupply;

    // Mapping to store the balance of each address
    mapping(address => uint) public balanceOf;

    // Mapping to store the approved amounts for an address
    mapping(address => mapping(address => uint)) public allowances;
}
```

The `constructor` function is a crucial step in creating an `ERC-20 token` on the `Ethereum blockchain`. It is the first and only function that is executed automatically when the contract is deployed. The purpose of the `constructor` function is to initialize the state of the `contract`, which includes important information about the `token` such as its `name` and `symbol`.

In the example provided, the `constructor` takes in two arguments: `_name` and `_symbol`. These arguments represent the `name` and `symbol` of the token, respectively. Within the `constructor`, the values of `_name` and `_symbol` are assigned to the variables `name` and `symbol`. Once the `contract` is deployed, the `constructor` function will be executed and set the `name` and `symbol` of the `token`.

```sol
// Constructor to initialize the name and symbol of the token
constructor(string memory _name, string memory _symbol) {
    name = _name;
    symbol = _symbol;
}
```

Next, we will create the `decimal` function. The purpose of this function in the `ERC20 token contract` is to return the number of decimal places used by the token. This information is necessary to display the correct number of tokens in wallets, exchanges, and other applications that interact with the token.

For example, a token with `18 decimals` means the smallest unit is `0.000000000000000001` of the total supply, while a token with `6 decimals` means the smallest unit is `0.000001`. Just like 100 cents make up 1 dollar, `10^6` smallest units of a token with `6 decimals` make up `1 unit` of the token. This added precision allows for smaller transactions to be processed accurately.

The returned value is usually `18`, but can be any number depending on the implementation.

```sol
// Function to return the number of decimal places used by the token
function decimals() public view virtual returns (uint8) {
    return 18;
}
```

Next, we will create the `transfer` function. It enables token holders to send tokens to other Ethereum addresses. The function takes two arguments: `_to` and `_value`.

`_to` represents the Ethereum address to which the tokens are to be transferred. `_value` represents the number of tokens to be transferred.

The `transfer` function updates the balance of both the sender and the recipient. It first adds the `_value` of tokens to the recipient's balance by using the following line of code: `balanceOf[_to] += _value`. It then subtracts the same `_value` of tokens from the sender's balance using the line `balanceOf[msg.sender] -= _value`.

The `msg.sender` keyword refers to the address of the person who initiated the function call. In other words, it refers to the sender of the tokens.

The `emit Transfer(msg.sender, _to, _value)` line is used to trigger the `Transfer` event. This event is used to notify any interested parties about the transfer of tokens.

Finally, the function returns `true` if the transfer is successful.

In conclusion, the `transfer` function allows for the transfer of tokens from one Ethereum address to another. It updates the balance of both the sender and the recipient and triggers the `Transfer` event to notify interested parties.

```sol
// This function allows the transfer of tokens from one address to another
function transfer(address _to, uint _value) external returns (bool) {
    // Increase the balance of the receiving address
    balanceOf[_to] += _value;
    // Decrease the balance of the sending address
    balanceOf[msg.sender] -= _value;
    // Emit a Transfer event with the sender, receiver, and amount of tokens transferred
    emit Transfer(msg.sender, _to, _value);
    // Return true to indicate a successful transfer
    return true;
}
```

Next, we will create the `approve` function. The `approve` function allows a token holder to authorize another address to spend a certain amount of their tokens. This is often used in decentralized exchanges and other applications that require the transfer of tokens on behalf of the token holder.

The `approve` function takes two parameters, the `_spender` and the `_value`. The `_spender` is the address that the token holder is granting permission to spend their tokens, and the `_value` is the amount of tokens that can be spent.

The function starts by updating the `allowances` mapping, which is a data structure that keeps track of the amount of tokens each `spender` is allowed to spend on behalf of the token holder. The `allowances[msg.sender][_spender]` is set to `_value`, which authorizes the `_spender` to spend `_value` tokens on behalf of the token holder.

The `emit` Approve line creates an `event` that can be logged by external parties, such as Dapps, to track changes to the token's state. This event includes information about the token `holder`, the `spender`, and the `amount` of tokens approved.

Finally, the function returns `true` to indicate that the approval was successful. This return value can be used by external parties to verify that the approval was processed correctly.

```sol
// Function to approve an address to spend an amount from the msg.sender's balance
function approve(address _spender, uint _value) external returns(bool){
    // Set the approved amount for the spender
    allowances[msg.sender][_spender] = _value;
    // Emit the Approve event, with the msg.sender, spender and value
    emit Approve(msg.sender, _spender, _value);
    // Return true to indicate the approval was successful
    return true;
}
```

Next, we will create the `transferFrom` function. It allows one address to transfer tokens on behalf of another address, with the latter's permission. Notice `approve` sets an allowance for another account to transfer tokens, while `transferFrom` transfers tokens from one account to another using the allowance set by `approve`.

This function takes in three parameters: `_from`, `_to`, and `_amount`. `_from` is the address that the tokens are being transferred from, `_to` is the address that the tokens are being transferred to, and `_amount` is the number of tokens being transferred.

The first step of the function is to decrease the `allowances[_from][msg.sender]` by the `_amount` being transferred. This ensures that the caller of the function has permission to transfer the specified amount of tokens.

Next, the `balanceOf[_from]` is decreased by `_amount`, indicating that the tokens are being taken out of the `_from` address. Finally, the `balanceOf[_to]` is increased by `_amount`, meaning that the tokens are being added to the `_to` address.

An emit `Transfer` statement is used to notify the rest of the system of the transfer that has just taken place, and the function returns `true` to indicate that the transfer was successful.

```sol
// Function to transfer token from one address to another
function transferFrom(address _from, address _to, uint _amount) external returns(bool) { 
    // Decrease the allowance of the sender from the caller
    allowances[_from][msg.sender] -= _amount;
    // Decrease the balance of the sender
    balanceOf[_from] -= _amount;
    // Increase the balance of the recipient
    balanceOf[_to] += _amount;
    // Emit an event to track the transfer
    emit Transfer(_from, _to, _amount);
    // Return true to indicate success
    return true;
}
```

Next, we will create the `mint` function. The `mint` function allows for the creation of new tokens and increases the total supply. It takes in a uint argument, `_amount`, which represents the number of tokens to be minted.

The function starts by increasing the balance of the `msg.sender` by `_amount`. The `msg.sender` is the address of the person or contract calling the function. The `balanceOf` mapping is updated to reflect this increase in balance for the `msg.sender`.

Next, the total supply of the token is increased by `_amount`. This is done by adding `_amount` to the `totalSupply` variable.

Finally, an `emit` statement is executed to broadcast a `Transfer` event, indicating that a transfer of `_amount` tokens has taken place from the `zero` address (`address(0)`) to the `msg.sender`.

The `mint` function is an essential aspect of a token's implementation as it allows for the creation of new tokens and the adjustment of the total supply.

```sol
// This function allows a user to mint a specified amount of tokens.
function mint(uint _amount) external {
    // Update the balance of the user who is calling the function
    balanceOf[msg.sender] += _amount;
    // Update the total supply of the tokens
    totalSupply += _amount;
    // Emit an event to notify that a transfer has taken place
    emit Transfer(address(0), msg.sender, _amount);
}
```

The `burn` function allows a user to reduce the amount of tokens they hold. The function first decreases the token balance of the user, by subtracting `_amount` from `balanceOf[msg.sender]`. The total supply of the token is also reduced by `_amount`. Finally, the Transfer event is emitted, which notifies that the transfer of `_amount` tokens has taken place from `msg.sender` to the `address 0` (also known as the `"burn address"` which is typically an address with no known private key, effectively destroying the tokens). This function allows for the reduction of the overall supply of tokens in circulation, providing a mechanism for token deflation.

```sol
// Function to burn tokens from a user's balance
function burn(uint _amount) external{
    // Decrement the sender's balance by the specified amount
    balanceOf[msg.sender] -= _amount;
    // Decrement the total supply by the specified amount
    totalSupply -= _amount;
    // Emit a Transfer event to log the token burn
    emit Transfer(msg.sender, address(0), _amount);
}
```

### Full code snippet of ERC-20

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
    // Name of the token
    string public name;

    // Symbol of the token
    string public symbol;

    // Total supply of the token
    uint public totalSupply;
    
    // Mapping to store the balance of each address
    mapping(address => uint) public balanceOf;

    // Mapping to store the approved amounts for an address
    mapping(address => mapping(address => uint)) public allowances;

    // Constructor to initialize the name and symbol of the token
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    // Function to return the number of decimal places used by the token
    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    // This function allows the transfer of tokens from one address to another
    function transfer(address _to, uint _value) external returns (bool) {
        // Increase the balance of the receiving address
        balanceOf[_to] += _value;
        // Decrease the balance of the sending address
        balanceOf[msg.sender] -= _value;
        // Emit a Transfer event with the sender, receiver, and amount of tokens transferred
        emit Transfer(msg.sender, _to, _value);
        // Return true to indicate a successful transfer
        return true;
    }

    // Function to approve an address to spend an amount from the msg.sender's balance
    function approve(address _spender, uint _value) external returns(bool){
        // Set the approved amount for the spender
        allowances[msg.sender][_spender] = _value;
        // Emit the Approve event, with the msg.sender, spender and value
        emit Approve(msg.sender, _spender, _value);
        // Return true to indicate the approval was successful
        return true;
    }
    
    // Function to transfer token from one address to another
    function transferFrom(address _from, address _to, uint _amount) external returns(bool) { 
        // Decrease the allowance of the sender from the caller
        allowances[_from][msg.sender] -= _amount;
        // Decrease the balance of the sender
        balanceOf[_from] -= _amount;
        // Increase the balance of the recipient
        balanceOf[_to] += _amount;
        // Emit an event to track the transfer
        emit Transfer(_from, _to, _amount);
        // Return true to indicate success
        return true;
    }

    // This function allows a user to mint a specified amount of tokens.
    function mint(uint _amount) external {
        // Update the balance of the user who is calling the function
        balanceOf[msg.sender] += _amount;
        // Update the total supply of the tokens
        totalSupply += _amount;
        // Emit an event to notify that a transfer has taken place
        emit Transfer(address(0), msg.sender, _amount);
    }

    // Function to burn tokens from a user's balance
    function burn(uint _amount) external{
        // Decrement the sender's balance by the specified amount
        balanceOf[msg.sender] -= _amount;
        // Decrement the total supply by the specified amount
        totalSupply -= _amount;
        // Emit a Transfer event to log the token burn
        emit Transfer(msg.sender, address(0), _amount);
    }
}
```

Above `ERC20 contract` defines the basic structure of a token, it doesn't specify the additional features that a token may have. This is where writing a separate contract becomes important. For example, let's say you want to create a token specifically for in-game purchases, and you want it to have some specific features such as a referral program or a leaderboard system. In this case, you would write a separate contract, inheriting the basic structure from `ERC20` and adding the additional features. This new contract would then be deployed on the Ethereum network, and you would have your custom `GameToken`.

### Using of ERC20 contract

We will now create a separate contract named `GameToken`, which will be based on the `ERC20` standard. This contract will inherit the properties and behaviors of the `ERC20` token.

The `constructor` function in the `GameToken` contract will be used to initialize the contract and set its properties. In this example, the `constructor` calls the `mint` function to create an initial supply of tokens for the contract.

This contract can be utilized to create a token for a gaming platform, which can be used to purchase virtual items, pay for in-game services, or participate in tournaments.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "./ERC20.sol"; // local file import

contract GameToken is ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        super.mint(1000 * 10 ** decimals());
    }
    
    // GameToken contract features
}
```

### Output

Before you can use `GameToken` contract, you need to deploy it on the Ethereum network.

<center><img class="image" src="./assets/images/Deployment-GameToken.JPG"></center>
<b><center class="img-label">Contracts</center></b>

At the time of deployment, you need to send two parameters: the `name` of the token and the `symbol` of the token. The `constructor` code of the contract requires these two parameters, and they are used to identify your token on the network. In our example, the token's name is `"ROOTBABU"` and its symbol is `"RB"`, you would send these two parameters when deploying the contract.

<center><img class="image" src="./assets/images/GameTokenContract-Deployment.JPG"></center>
<b><center class="img-label">Deployment of Game Contract</center></b>

The deployment of the contract will run the `constructor` code, which sets the initial total supply of the token by calling the `super.mint(1000 * 10 ** decimals());` function. This sets the initial supply of tokens to `1000` units, with the number of decimal places defined by the `"decimals"` function. The `decimals()` function returns the number `18`, which is used to calculate the total supply of the token. 

After deployment of the contract, you can verify its state, which is set to `ROOTBABU` for the `name` and `RB` for the `symbol`, with a total supply of `1000000000000000000000`.

The value `1000000000000000000000` is the total supply of the token in its smallest unit, also known as its base unit. For the purpose of understanding, we can consider the smallest divisible unit of the token to be called `BRB`. In this case, with `18 decimal` places, `1000000000000000000000` units of `BRB` represent `1000 units` of `RB` token.

<center><img class="image" src="./assets/images/GameTokenContract-default-values.JPG"></center>
<b><center class="img-label">Initial State Variables Values</center></b>

The `mint` function in the contract allows a user to increase the total supply of tokens in circulation. When called, this function updates the balance of the user who is calling the function and adds to the overall total supply of the token.

The process starts by updating the balance of the user who is calling the function. The function adds the specified amount of tokens to the user's balance. Next, the total supply of the tokens is updated by adding the same amount to it.

In our case, the contract was deployed using the account `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`. This means that the initial total supply of the tokens was set at this address. You can check the balance of this address by using the `balanceOf` function.

<center><img class="image" src="./assets/images/GameContract-owner-balance.JPG"></center>
<b><center class="img-label">Account Balance</center></b>

The transfer function in the contract allows a user to send tokens from one address to another. In our example, the account with address `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4` has a total supply of `1000000000000000000000` tokens. This account can use the transfer function to send `500 BRB` tokens to the account with address `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2`.

<center><img class="image" src="./assets/images/GameToken-transfer.JPG"></center>
<b><center class="img-label">Transfer Tokens</center></b>

Now, we can check the balance of the account `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2` by utilizing the `balanceOf` function. This will display the balance of `500 BRB` tokens for this account.

<center><img class="image" src="./assets/images/GameToken-balanceof.JPG"></center>
<b><center class="img-label">Account Balance</center></b>

The `approve` function allows an owner to give permission to another address (referred to as the "`spender`,") to spend a specific amount of tokens on their behalf. In our example, the account `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4` is approving the account `0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db` to spend `1000 BRB` tokens on its behalf. 

<center><img class="image" src="./assets/images/GameToken-approve.JPG"></center>
<b><center class="img-label"></center>Approve Accounts to spend tokens</b>

To find out the amount of tokens approved for the `spender` address `0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db` to spend on behalf of the owner address `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`, you would use the `allowances` function by passing in the `owner address` as the first parameter and the `spender` address as the second parameter.

<center><img class="image" src="./assets/images/GameToken-allowances.JPG"></center>
<b><center class="img-label">Allowances Balance</center></b>

The `transferFrom` function enables the approved address `0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db` to transfer a specified amount of tokens, `1000 BRB` in this case, on behalf of the owner address `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`. The function requires three parameters: the address to transfer the tokens `from` (`owner addres`s), the address to transfer the tokens `to`, and the `amount` of tokens to transfer. The function decreases the `allowance` of the approved address and the balance of the owner, increases the balance of the recipient, and emits a `"Transfer`" event to track the transaction. If successful, it returns a value of `true`. 

In our case, we have transferred `300 BRB` tokens to the address `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2` using the `transferFrom` function. 

<center><img class="image" src="./assets/images/GameToken-Transferfrom.JPG"></center>
<b><center class="img-label">Transfer Tokens from owners</center></b>

Previously, the account address `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2` had `500 BRB` tokens, and after the `transferFrom` function was called by the `0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db` account, it received `300 BRB` additional tokens, bringing its total to `800 BRB`. You can verify this by using the `balanceOf` function to check the balance of the `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2` account.

<center><img class="image" src="./assets/images/GameToken-updated-balanceof.JPG"></center>
<b><center class="img-label">Account Balance</center></b>

## OpenZeppelin ERC-20 Token Contract implementation

<hr>

`OpenZeppelin` is a popular open-source framework for building secure smart contracts on the Ethereum blockchain. One of its features is the implementation of the `ERC-20 token standard`, which is a widely used standard for creating tokens on the Ethereum network.

Using an established and well-vetted `ERC-20 implementation`, such as the one provided by <a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol" taget="_blank">OpenZeppelin</a>, has several benefits over writing your own custom implementation:

**1. Security:** `OpenZeppelin` has been thoroughly audited by professional security experts, which minimizes the risk of security vulnerabilities in your smart contract.

**2. Compliance:** The E`RC-20 standard` has become a widely accepted standard for token creation, and using an implementation that is compliant with the standard can help ensure that your token is compatible with a wide range of decentralized applications and exchanges.

**3. Time and Cost Savings:** Implementing a token from scratch can be a time-consuming and resource-intensive process. By using a pre-existing implementation, you can save time and effort, allowing you to focus on other important aspects of your project.

**4. Community Support:** `OpenZeppelin` has a large and active community of developers and users, providing a wealth of resources and support for anyone using the framework.

In summary, using a well-vetted `ERC-20 implementation` like the one provided by `OpenZeppelin` offers several benefits in terms of `security`, `compliance`, `cost savings`, and `community support`, making it a popular choice for many blockchain projects.

### Creating GameToken Contract using OpenZeppelin ERC20 token implementation

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract GameToken is ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, 1000 * 10 ** uint(decimals()));
    }
    
    // GameToken contract features
}
```

The above code is an example of a simple contract for a `GameToken` that uses the `OpenZeppelin` implementation of the `ERC-20 token standard`. 

Here is a brief explanation of the code:

**Pragma Directive:** The first line pragma solidity ^0.8.17; specifies the compiler version that should be used to compile the contract. This ensures compatibility with the latest version of the Solidity compiler.

**Import Statement:** The next line `import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";` imports the `OpenZeppelin ERC-20 contract` implementation. This allows us to use the pre-existing code for an `ERC-20 token`, rather than writing it from scratch.

**Contract Definition:** The contract `GameToken` is `ERC20` line defines a new contract called `"GameToken"` that inherits from the `OpenZeppelin ERC-20 contract`.

**Constructor:** The `constructor` `constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol)` sets the `name` and `symbol` for the `GameToken` and calls the `constructor` of the `ERC-20 contract` with the same parameters. Additionally, it uses the `_mint` function provided by the `OpenZeppelin` implementation to mint `1000` tokens and assign them to the message `sender`.

**GameToken Contract Features:** The final section, `// GameToken contract features`, is where you would add any additional features or functionality specific to the `GameToken` contract.

In conclusion, this code creates a `GameToken` contract that is built on top of the `OpenZeppelin ERC-20` implementation. This allows the contract to inherit all of the security and functionality of the `OpenZeppelin ERC-20 contract`, while also allowing for custom features specific to the `GameToken` to be added.

## More Official Support Sources:

<hr>

**ERC-20 Token Standard :** <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/" target="_blank">https://ethereum.org/en/developers/docs/standards/tokens/erc-20/</a>

**Understand the ERC-20 token smart contract :** <a href="https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/" target="_blank">https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/</a>

**ERC-20 Contract Walk-Through :** <a href="https://ethereum.org/en/developers/tutorials/erc20-annotated-code/#main-content" target="_blank">https://ethereum.org/en/developers/tutorials/erc20-annotated-code/#main-content</a>

**ERC20 by Openzeppelin:** <a href="https://docs.openzeppelin.com/contracts/4.x/erc20" target="_blank">https://docs.openzeppelin.com/contracts/4.x/erc20</a>

**Creating ERC20 Supply by Openzeppelin:** <a href="https://docs.openzeppelin.com/contracts/2.x/erc20-supply" target="_blank">https://docs.openzeppelin.com/contracts/2.x/erc20-supply</a>