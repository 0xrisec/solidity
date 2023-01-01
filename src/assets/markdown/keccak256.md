# Keccak256

`Keccak-256` is a cryptographic `hash function` that produces a fixed-size hash value (`32 bytes` or` 256 bits`) from an input of any size. It is one of the `hashing algorithms` that is used in `Ethereum` and other blockchain platforms.

The `keccak256` function can be used to calculate the `Keccak-256 hash` of its input. The `keccak256` function in accepts a single `bytes` argument. 

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    function hashData(bytes memory data) public pure returns (bytes32) {
        // Calculate the Keccak-256 hash of the input data
        return keccak256(data);
    }
}
```

In this example, the `hashData(...)` function takes a `bytes` argument and returns the `Keccak-256 hash` of the `bytes` as a `32-byte` value. It simply calculates the hash of its input and returns the result.

<center><img class="image" src="./assets/images/keccak256.JPG"></center>
<b><center class="img-label">Keccak-256 hash of the input data</center></b>

**Use Cases:** The keccak256 function is a widely used hashing function in Solidity and is often used for a variety of purposes, including:

- **Generating unique identifiers:** `keccak256` can be used to generate unique identifiers for entities within a smart contract. For example, you can use it to hash a user's profile data and use the resulting hash as a unique identifier for that user.

- **Storing data securely:** `keccak256` can be used to store sensitive data, such as passwords or private keys, in a secure manner. Because keccak256 is a one-way hashing function, it is not possible to reverse the hash and obtain the original data.

- **Verifying data integrity:** `keccak256` can be used to verify the integrity of data stored on the blockchain. For example, you can hash a file and store the hash on the blockchain. Later, you can recompute the hash of the file and compare it to the stored hash to ensure that the file has not been tampered with.

- **Securely sharing data:** `keccak256` can be used to share data securely between smart contracts. For example, you can hash a piece of data and share the hash with another smart contract. The other contract can then use the hash to verify the authenticity of the data without needing to access the original data itself.

**Important Point:**

You can pass any type of data to the `keccak256` function as long as it can be converted to `bytes`. For example, you can pass a `string`, an `integer`, or a `struct` as the argument, as long as you first convert it to `bytes` using one of the `ABI encoding functions` (such as `abi.encode(...)` or `abi.encodePacked(...)`). We will discuss these `ABI encoding functions` in more detail in the next section.

# Function Selector

A `function selector` is a `4-byte` value that is used to identify a specific function in a smart contract. It is calculated by taking the first `4 bytes of the Keccak-256 hash` of the function's signature.

The `function signature` is a string that represents the name of the function and the types of its input parameters. It is used to uniquely identify a function within a contract. The function selector is included as part of the data that is sent in a transaction to a smart contract, along with the encoded function arguments. The smart contract uses the function selector to determine which function to execute.

`Function selectors` are useful because they allow multiple functions with the same name but different arguments to coexist in a smart contract, and they allow contracts to be more flexible and easier to upgrade.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // The setSelector() function calculates and returns the function selector for the add() function.
    function setSelector() public pure returns (bytes4) {
        // Calculate the Keccak-256 hash of the add() function's signature.
        bytes4 selector = bytes4(keccak256("add(uint,uint)"));
        // Return the function selector.
        return selector;
    }

    // The add() function takes two uint arguments (_a and _b) and returns their sum.
    function add(uint _a, uint _b) public pure returns(uint){
        return _a + _b;
    }
}
```

`MyContract` that contains two functions: `setSelector()` and `add()`. The `add()` function is a `pure` function that takes two `uint` arguments, `_a` and `_b`, and returns their `sum`.

<center><img class="image" src="./assets/images/function-selector.JPG"></center>
<b><center class="img-label">First 4 bytes of  the Keccak-256 hash of the add() function's signature</center></b>

The `setSelector()` function is a `pure` function that calculates and returns the function selector for the `add()` function. It does this by calculating the `Keccak-256 hash` of the `add()` function's signature and returning the first `4 bytes` of the hash as a `bytes4` value.


**Use Cases:**

- **Function overloading:** `Function overloading` allows you to define multiple functions with the same name but different parameter types or number of parameters. The `function selector` is used to differentiate between these overloaded functions and determine which one should be called based on the provided arguments.

- **Function call verification:** The `function selector` can be used to verify that a function call is being made to the correct function within a contract. For example, you can use the `function selector` to verify that a contract is calling the expected function before executing it.

- **Interacting with other contracts:** The `function selector` is often used when interacting with other contracts or when calling functions through a contract's interface. For example, the `function selector` can be used to determine which function to call on another contract based on the provided arguments.

- **Event filtering:** The `function selector` can be used to filter events by function. For example, you can use the `function selector` to only retrieve `events` emitted by a specific function within a contract.


**Important points**

- The reason for using only the first `4 bytes` of the hash as the `function selector` is to make it more efficient to call functions on a contract. When calling a function on a contract, the `function selector` is used to identify which function to execute. If the full Keccak-256 hash were used as the `function selector`, it would be `32 bytes` long, which would require more gas to call a function. By using only the first `4 bytes` of the hash, the `function selector` is shorter and requires less gas to be used when calling a function.
