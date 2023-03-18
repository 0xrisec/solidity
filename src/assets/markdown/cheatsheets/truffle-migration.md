## Deploy a contract

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A);
};
```

## Deploy a contract multiple contracts

```js
var A = artifacts.require("A");
var B = artifacts.require("B");

module.exports = function(deployer) {
    deployer.deploy(A);
    deployer.deploy(B);
};
```

## Deploy a contract with constructor arguments

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, arg1, arg2, ...);
};
```

## Deploy multiple contracts with dependency

```js
var A = artifacts.require("A");
var B = artifacts.require("B");

module.exports = function(deployer, network, accounts) {
    deployer.then(async () => {
        await deployer.deploy(A);
        await deployer.deploy(B, A.address);
        //...
    });
};
```

## Injecting a parameter into the deployment

```js
const A = artifacts.require("A");
const B = artifacts.require("B");

module.exports = function(deployer) {
	deployer.deploy(A);
	
	const accounts = await web3.eth.getAccounts();
	const owner = accounts[0];

	deployer.deploy(B, owner);
};
```

## Deploy a contract and link it with a library

```js
var libA = artifacts.require("A");
var B = artifacts.require("B");

module.exports = function(deployer) {
    deployer.deploy(libA);
    deployer.link(libA, B);
    deployer.deploy(B);
};
```

## Deploy a contract and specify gas limit and gas price

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, { gas: 5000000, gasPrice: 10000000000 });
};
```

## Deploy a contract and specify the sender

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, { from: web3.eth.accounts[1] });
};
```

<!-- ## Deploy a contract and specify the nonce

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, { nonce: 123 });
};
``` -->

## Deploying a Contract with Specified Nonce, Sender, and Gas Limit in Truffle

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, { 
        from: web3.eth.accounts[1], 
        nonce: 123,
        gas: 5000000, 
        gasPrice: 10000000000 
    });
};
```

<!-- ## Deploy a contract and wait for it to be mined

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A).then(function() {
        return A.deployed();
    }).then(function(instance) {
        // Do something with the deployed instance
    });
};

``` -->
<!-- 
## Deploy a contract and interact with it in the migration script

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A).then(function() {
        return A.deployed();
    }).then(function(instance) {
        // Interact with the deployed instance
        return instance.doSomething();
    });
};
``` -->
<!-- 
## Deploy a contract and specify the gas price in Gwei

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, { gasPrice: web3.utils.toWei("10", "Gwei") });
};
``` -->

## Deploy a contract and specify the transaction options

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, { 
        from: web3.eth.accounts[1], 
        gas: 5000000, 
        gasPrice: 10000000000 
    });
};
```

## Deploy a contract and send Ether with the transaction

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, { value: web3.utils.toWei("1", "ether") });
};
```


list of some of the most commonly used properties that can be included in the object passed as the second argument to deployer.deploy():

- from: The Ethereum address that is sending the transaction.
- gas: The maximum amount of gas that can be used for the transaction.
- gasPrice: The price (in wei) of gas for this transaction.
- value: The amount of Ether to be sent with the transaction.
- nonce: The transaction nonce (an integer value used to prevent replay attacks).
- data: The input data for the contract constructor.
- chainId: The ID of the Ethereum chain that the transaction will be sent to.
- to: The Ethereum address of the contract that the transaction is interacting with.
- data: The data that will be sent with the transaction, typically used for function calls on the contract.
- nonce: The nonce value of the transaction, used to prevent replay attacks.
- gasPrice: The price in wei that is paid for each unit of gas consumed by the transaction.
- gasLimit: The maximum amount of gas that is allowed for the transaction.
- value: The amount of Ether to be transferred with the transaction.
- chain: The name or ID of the Ethereum network that the transaction will be sent to.
- hardfork: The hard fork version of the Ethereum network.


## Network considerations

```js
module.exports = function(deployer, network) {
  if (network == "live") {
    // Do something specific to the network named "live".
  } else {
    // Perform a different step otherwise.
  }
}
```

```js
module.exports = function(deployer, network, accounts) {
  // Use the accounts within your migrations.
}
```

Source: 
https://trufflesuite.com/docs/truffle/how-to/contracts/run-migrations/
https://trufflesuite.com/docs/truffle/reference/configuration/#networks