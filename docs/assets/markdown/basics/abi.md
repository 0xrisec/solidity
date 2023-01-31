# ABI encode / decode

The `Application Binary Interface (ABI)` is a standard that specifies how to encode and decode data that is passed between a smart contract and an external caller, such as a wallet or another contract. The `ABI` is used to encode and decode function calls and transactions, including the types and values of their arguments.

There are several functions that can be used for `ABI` encoding and decoding. Here are some: `abi.encode(...) and abi.decode(...)`, `abi.encodePacked(...) & abi.decodePacked(...)`, `abi.encodeWithSignature(...) `, `abi.encodeWithSelector(...)`.

## abi.encode(...) and abi.decode(...)

**abi.encode(...):** `abi.encode(...)` function encodes a list of values into a `byte` array, with each value being encoded separately. It is often used to encode complex data structures, such as arrays and structs.

**abi.decode(...):** `abi.decode(...)` function decodes a `byte` array into a list of values, using the expected output types as a guide.

**Example:**
``` sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare a public variable to store the encoded data
    bytes public data;

    function setData(uint a, bool b, string memory c) public {
        // Encode the function arguments into binary form
        bytes memory encodedData = abi.encode(a, b, c);

        // Store the encoded data in the contract
        data = encodedData;
    }

    function getData() public view returns (uint256, bool, string memory) {
        // Retrieve the encoded data from the contract
        bytes memory encodedData = data;

        // Decode the encoded data into its corresponding data structure
        return abi.decode(encodedData, (uint, bool, string));
    }
}
```
`MyContract`, has two functions: `setData(...)` and `getData()`.

The `setData(...)` function takes three arguments: a `uint`, a `bool`, and a `string`. It uses the `abi.encode(...)` function to encode these arguments into a binary representation (a string of bytes). The encoded data is then stored in the `data` variable, which is a `public` variable of type `bytes`.

<center><img class="image" src="./assets/images/abi-encode.JPG"></center>
<b><center class="img-label">Output</center></b>

The `getData()` function retrieves the encoded data from the data variable and uses the `abi.decode(...)` function to decode it into its corresponding data structure. The `abi.decode(...)` function takes two arguments: the encoded data and a tuple specifying the types and names of the values in the data structure. In this case, the tuple is `(uint, bool, string)`, which specifies that the data structure is a tuple of three values: a `uint`, a `bool`, and a `string`. The `abi.decode(...)` function returns the decoded data structure, which is then returned by the `getData()` function.

The `data` variable and `the setData(...)` and `getData()` functions can be used to store and retrieve data in a contract, using the ABI to `encode` and `decode` the data between its binary representation and its corresponding data structure. It's important to note that the ABI used to encode the data must be the same as the ABI used to decode the data. If the ABIs do not match, the `abi.decode(...)` function will likely produce incorrect or unexpected results.

The `abi.encode(...)` function can be used to `encode` data before storing it in a `smart contract`. The `abi.decode(...)` function can then be used to retrieve and `decode` the data from the contract.

## abi.encodePacked(...) and abi.decodePacked(...)

**abi.encodePacked(...):** abi.encodePacked(...) is a function that is used to encode multiple values into a `single byte array` in a `packed format`. The `packed format` means that the values are encoded without adding any padding bytes or separators between them.

This function encodes a list of values into a single byte array, using the most compact encoding possible. It is often used to encode function arguments.

**abi.decodePacked(...):** This function decodes a byte array into a list of values, using the most compact decoding possible. It is often used to decode function arguments that were encoded with `abi.encodePacked()`.

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare a public variable to store the encoded data
    bytes public data;
    // Declare a public variable to store the encoded packed data
    bytes public packedData;

    function setData(uint a, bool b, string memory c) public {
        // Encode the function arguments into binary form
        bytes memory encodedData = abi.encode(a, b, c);
        // Encode the function arguments into packed binary form
        bytes memory encodedPackedData = abi.encodePacked(a, b, c);

        // Store the encoded data in the contract
        data = encodedData;
        // Store the encoded packed data in the contract
        packedData = encodedPackedData;
    }

    function getData() public view returns (uint256, bool, string memory) {
        // Retrieve the encoded data from the contract
        bytes memory encodedData = data;

        // Decode the encoded data into its corresponding data structure
        return abi.decode(encodedData, (uint, bool, string));
    }

    function getPackedData() public view returns (uint256, bool, string memory) {
        // Retrieve the encoded packed data from the contract
        bytes memory encodedPackedData = data;

        // Decode the encoded packed data into its corresponding data structure
        return abi.decode(encodedPackedData, (uint, bool, string));
    }
}
```


`MyContract` defines three functions: `setData`, `getData`, and `getPackedData`.

The `setData` function takes in three arguments: a `uint` (unsigned integer), a `bool` (boolean), and a `string` memory. It then encodes these arguments into binary data using the abi library's `encode` function, and stores the result in the contract's `data` variable. It also encodes the same arguments using the abi library's `encodePacked` function, and stores the result in the contract's `packedData` variable.

The `getData` function retrieves the encoded data stored in the contract's `data` variable, and then `decodes` it back into its original data structure using the `abi library's decode function`. It returns the decoded data as a tuple of three values: a `uint`, a `bool`, and a `string` memory.

<center><img class="image" src="./assets/images/packedData.JPG"></center>
<b><center class="img-label">Output</center></b>

The `getPackedData` function is similar to the `getData` function, but it retrieves the encoded packed data stored in the contract's `packedData` variable instead. It also decodes this data using the `abi library's decode function`, and returns the `decoded` data as a tuple of three values: a `uint`, a `bool`, and a `string` memory.

## abi.encodeWithSelector(...)

This function encodes a `function selector` and a list of values into a single byte array. It is often used to encode function calls that include a `function selector`.

`abi.encodeWithSelector(...)` is a function that is used to encode a function call with its selector and arguments into binary form. It takes two arguments:
**selector:** a `bytes4` value that represents the `function selector` of the function being called.
**args:** a list of values that represent the arguments of the function being called. These values must match the types of the function's input parameters.

`abi.encodeWithSelector(...)` returns a `bytes` value that represents the encoded function call.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare a public variable called "data" of type "bytes".
    bytes public data;

    // Define a public function called "setData" that takes in three arguments: a uint, a bool, and a string.
    function setData(uint a, bool b, string memory c) public {
        // Calculate the function selector for the "setData" function.
        bytes4 selector = getSelector("setData(uint,bool,string)");

        // Encode the function call to the "setData" function with its selector and the provided arguments.
        bytes memory encodedData = abi.encodeWithSelector(selector, a, b, c);

        // Store the encoded data in the "data" variable.
        data = encodedData;
    }

    // Define an internal, pure function called "getSelector" that takes in a string and returns a bytes4.
    function getSelector(string memory _func) internal pure returns (bytes4) {
        // Calculate and return the function selector for the provided function signature.
        return bytes4(keccak256(bytes(_func)));
    }
}
```
The contract has one public variable called `"data"` of type `"bytes"`, and two functions: `"setData"` and `"getSelector"`.

The `"setData"` function is marked as `"public"`, which means it can be called by anyone. It takes in three arguments: a `uint` (unsigned integer), a `bool` (boolean), and a `string`.

Inside the `"setData"` function, the `"getSelector"` function is called with the `string` argument `"setData(uint,bool,string)"`. This function returns the `4-byte function selector` for the `"setData"` function, which is calculated as the first `4 bytes` of the `Keccak-256 hash` of the `function's signature`.

<center><img class="image" src="./assets/images/enocde-with-selector.JPG"></center>
<b><center class="img-label">Output</center></b>

The `"abi.encodeWithSelector"` function is then called, which encodes the function call to the `"setData"` function with its selector and the provided arguments. The resulting encoded data is stored in the `"data"` variable.

The `"getSelector"` function is marked as `"internal"` and `"pure"`. It takes in a `string` argument and returns a `bytes4` value, which is the function selector for the provided `function signature`. It calculates this value by taking the first `4 bytes` of the `Keccak-256 hash` of the provided `function signature`.

## abi.encodeWithSignature(...) 

`abi.encodeWithSignature(...)` function encodes a `function signature` and a list of values into a single `byte` array. It is often used to encode function calls that include a `function signature`.

The function takes in the `function's signature` and its arguments as separate arguments, and returns the encoded data as a `bytes` value. 

Here is an example of how to use `abi.encodeWithSignature`:

```sol
bytes memory encodedData = abi.encodeWithSignature("myFunction(uint,bool,string)", 123, true, "hello");
```

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare a public variable called "data" of type "bytes".
    // This variable will be publicly accessible from outside the contract.
    bytes public data;

    // Define a public function called "setData" that takes in three arguments: a uint, a bool, and a string.
    // This function is also public and can be called from outside the contract.
    function setData(uint a, bool b, string memory c) public {

        // Encode the function call to the "setData" function with its selector and the provided arguments.
        // The ABI (Application Binary Interface) helps encode and decode data for use in Ethereum transactions.
        bytes memory encodedData = abi.encodeWithSignature("setData(uint,bool,string)", a, b, c);

        // Store the encoded data in the "data" variable.
        data = encodedData;
    }
}
```

The contract has one public variable called `"data"` of type `"bytes"`, which is an array of `bytes` (a sequence of `8-bit` integers). This variable can be accessed from outside the contract.

The contract also has a `public` function called `"setData"` which takes in three arguments: a `uint` (unsigned integer), a `bool` (boolean value), and a `string`. This function is also `public` and can be called from outside the contract.

<center><img class="image" src="./assets/images/enocde-with-signature.JPG"></center>
<b><center class="img-label">Output</center></b>

Inside the `"setData"` function, the arguments are passed to the ABI's `"encodeWithSignature"` function along with the `function's signature`. The function signature is a `string` that identifies the function by its name and the types of its arguments. The ABI's `"encodeWithSignature"` function then encodes the function call and its arguments into a `byte` array, which is stored in the `"data"` variable.
