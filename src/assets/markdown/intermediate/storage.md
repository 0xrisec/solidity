# Contract Storage Layout

The term `contract storage layout` refers to the organization and arrangement of data within the storage of a blockchain-based smart contract. Smart contracts often require persistent storage to maintain their state and store important data.

### Why it Matters?

The `storage layout` matters because it determines how data is stored and accessed within the contract. It affects the efficiency, cost, and complexity of reading and writing data to and from the contract's storage. Here are a few reasons why the contract `storage layout` is important:

- `Gas Efficiency:` The storage layout affects gas costs for operations like reading, writing, and modifying data. An efficient layout minimizes gas fees and improves contract performance.

- `Security and Vulnerabilities:` Different design patterns, such as proxy or diamond patterns, rely on specific storage layouts for their implementation. Understanding and utilizing these patterns correctly can improve contract development and interoperability.

- `Design patterns:` Working with contracts that use design patterns such as a proxy or a diamond pattern or other various patterns.

### Solidity Memory Types

There are three memory types that can use to tell the EVM (Ethereum Virtual Machine) where to store their variables. These memory types are called `memory`, `calldata`, and `storage`. 

This blog post will provide a comprehensive understanding of the storage data location.

## What is storage memory?

<hr>

In Ethereum, each contract has its own dedicated storage area, which is a persistent and read-write memory space. This storage area is unique to each contract, meaning that a contract can only read and write data from its own storage.

The storage space of a contract is divided into a massive number of slots, specifically `2²⁵⁶` slots. Each slot can hold `32 bytes` of data. These slots are contiguous, meaning they are arranged in a continuous sequence. They are referenced by indexes, starting from `0` and going all the way up to `2²⁵⁶ - 1`.

<center><img class="image w50" src="./assets/images/storage-slots.jpg"></center>
<b><center class="img-label">Storage Slots</center></b>

<!-- When a contract is deployed, all the storage slots are initialized with a default value of `0`. This means that if a contract tries to access a storage slot that has not been explicitly written to, it will retrieve a value of `0` by default. -->

## How data is physically stored?

Solidity automatically assigns a storage slot to each declared state variable in your contract. These slots are assigned in the order the variables are declared, starting from `slot 0`.

Meaning that the data is stored one after another, starting from the first state variable. The first state variable is stored in `slot 0`, and subsequent variables are stored in consecutive slots.  

<!-- <div class="doc-note">
	<p class="alert alert-primary"><b>Note:</b> However, dynamically-sized arrays and mappings have a different storage arrangement. A storage slot is a unit of storage that can hold a certain amount of data. By allowing multiple values to use the same slot, the contract optimizes storage usage and reduces costs.</p>
</div> -->

<!-- State variables of contracts are stored in storage in a compact manner where multiple values can share the same storage slot.  -->

Here's a simple visualization of this concept:

<center><img class="image w50" src="./assets/images/sequential-slots.jpg"></center>
<b><center class="img-label">Diagram of how state variables are mapped to storage slots.</center></b>

In this illustration, we observe the mapping of variables a, b, and c according to their order of declaration into storage slots. 

### how the storage variables actually get encoded and stored in the slots at the binary level?

In order to gain a deeper understanding of how storage variables are encoded and stored at the binary level, it is necessary to delve into the concepts of `endian-ness`, `byte-packing`, and `byte-padding`. This exploration will provide insights into the mechanisms behind the organization of data in storage memory slots.

### Endian-ness

Endian-ness refers to how computers store multi-byte values in memory, such as uint256, bytes32, addresses etc. There are two types of endian-ness: `big-endian` and `little-endian`.

In little-endian systems, the least significant byte is stored first, while in big-endian systems, the most significant byte is stored first. Let's examine how the hexadecimal number `0x01e8f7a1 (decimal 32044961)` would be stored in memory in both little-endian and big-endian systems:

<center><img class="image" src="./assets/images/diagram-of-big-endian-and-little-endian-storage-layouts-in-solidity-smart-contracts.jpeg"></center>
<b><center class="img-label">Diagram of how computers store multi-byte values in memory.</center></b>

In Ethereum, the endian-ness format used depends on the variable type:

- `Big-endian` is utilized for `bytes` and `string` types. These two types exhibit different behavior in a contract's storage slots compared to other variables.

- `Little-endian` is employed for all other variable types. Examples of such types include `uint8`, `uint32`, `uint256`, `int8`, `boolean`, `address`, and more.

### byte-padding

When storing data in Ethereum's storage, the Ethereum Virtual Machine (EVM) uses a specific method to make the best use of memory. If a variable needs less than 32 bytes of memory, like boolean values, small numbers (uint8), or addresses, the EVM adds extra zeros to the value until it reaches a total of 32 bytes.

Here is a diagram illustrating how the storage appears when storing state variables that need less than 32 bytes of memory:

<center><img class="image" src="./assets/images/padded-contract.jpg"></center>
<b><center class="img-label">byte padding</center></b>

`PaddedContract` includes three state variables: `"a"` of type `bool`, `"b"` of type `uint256`, and `"c"` of type `uint8`. Let's explore how padding is applied in this context:

- The variable `"a"` is of type `bool`, which requires only `1 byte` of memory. However, the EVM storage operates on `32-byte slots`. Therefore, the EVM will pad `"a"` with `31` additional `zeros` to fill the entire slot. The resulting storage value for `"a"` would be `"0000000000000000000000000000000000000000000000000000000000000001"`.

- The variable `"b"` is of type `uint256`, which requires `32 bytes` of memory. Since it already occupies a full slot, no padding is necessary. The storage value for `"b"` would be `"000000000000000000000000000000000000000000000000000000000001e8f7"`.

- The variable `"c"` is of type `uint8`, which requires only `1 byte` of memory. Similar to the case of `"a"`, the EVM will pad `"c"` with `31 zeros` to fill the entire slot. The resulting storage value for `"c"` would be `"0000000000000000000000000000000000000000000000000000000000000098"`.

SRC: https://docs.soliditylang.org/en/v0.8.20/internals/layout_in_storage.html