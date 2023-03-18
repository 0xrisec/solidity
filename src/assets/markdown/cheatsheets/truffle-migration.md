# Migrations

<hr>

Migrations are JavaScript files that help you deploy contracts to the Ethereum network. 

To run your migrations:

```
$ truffle migrate
```

<hr>

### Deploy a contract

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A);
};
```

### Deploy multiple contracts

```js
var A = artifacts.require("A");
var B = artifacts.require("B");

module.exports = function(deployer) {
    deployer.deploy(A);
    deployer.deploy(B);
};
```

### Deploy a contract with constructor arguments

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    // Deploy a single contract with constructor arguments
    deployer.deploy(A, arg1, arg2, ...);
};
```

### Deploy multiple contracts with dependency

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

or

```js
// Deploy A, then deploy B, passing in A's newly deployed address
deployer.deploy(A).then(function() {
  return deployer.deploy(B, A.address);
});
```

### Don't deploy this contract if it has already been deployed

```js
const A = artifacts.require("A");

module.exports = function(deployer) {
	deployer.deploy(A, {overwrite: false});
};
```

### Deploy a contract and link it with a library

```js
var LibA = artifacts.require("A");
var B = artifacts.require("B");

module.exports = function(deployer) {
    // Deploy library LibA, then link LibA to contract B, then deploy B.
    deployer.deploy(LibA);
    deployer.link(LibA, B);
    deployer.deploy(B);
};
```

### Deploy many contracts and link it with a library

```js
var LibA = artifacts.require("A"); // library
var B = artifacts.require("B"); // contract
var C = artifacts.require("C"); // contract
var D = artifacts.require("D"); // contract

module.exports = function(deployer) {
    deployer.deploy(LibA);
    // Link LibA to many contracts
    deployer.link(LibA, [B, C, D]);
};
```

### Deploy a contracts and link it with copy of a library at a custom address

```js
var LibA = artifacts.require("A"); // library
var B = artifacts.require("B"); // contract

module.exports = function(deployer) {
    // Link to a copy of LibA at a custom address
    const instanceOfLibA = await LibA.at(address);

    await deployer.link(instanceOfLibA, B);
};
```

### Deploy a contract and specify gas limit, gas price, sender, send Ether

```js
var A = artifacts.require("A");

module.exports = function(deployer) {
    deployer.deploy(A, 
    { 
        gas: 5000000,
        gasPrice: 10000000000,
        from: web3.eth.accounts[1], 
        value: web3.utils.toWei("1", "ether")
    });
};
```

### Deploy a contract and interact with it in the migration script

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
```

### Network considerations

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

## Available accounts

### Injecting a parameter into the deployment

```js
module.exports = function(deployer, network, accounts) {
    // Use the accounts within your migrations.
	deployer.deploy(A, accounts[0]);
}
```

or

```js
const A = artifacts.require("A");

module.exports = async function(deployer) {
	const accounts = await web3.eth.getAccounts();
	const owner = accounts[0];

	await deployer.deploy(A, owner);
};
```

Source: 
https://trufflesuite.com/docs/truffle/how-to/contracts/run-migrations/
https://trufflesuite.com/docs/truffle/reference/configuration/#networks