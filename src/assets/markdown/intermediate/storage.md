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

In this illustration, we observe the mapping of variables `a`, `b`, and `c` according to their order of declaration into `storage slots`. 

### how the storage variables actually get encoded and stored in the slots at the binary level?

In order to gain a deeper understanding of how storage variables are encoded and stored at the binary level, it is necessary to delve into the concepts of `endian-ness`, `byte-packing`, and `byte-padding`. This exploration will provide insights into the mechanisms behind the organization of data in storage memory slots.

### Endian-ness

`Endian-ness` refers to how computers store multi-byte values in memory, such as `uint256`, `bytes32`, `addresses` etc. There are two types of `endian-ness`: `big-endian` and `little-endian`.

In `little-endian` systems, the least significant byte is stored first, while in big-endian systems, the most significant byte is stored first. Let's examine how the hexadecimal number `0x01e8f7a1 (decimal 32044961)` would be stored in memory in both `little-endian` and `big-endian` systems:

<center><img class="image" src="./assets/images/diagram-of-big-endian-and-little-endian-storage-layouts-in-solidity-smart-contracts.jpeg"></center>
<b><center class="img-label">Diagram of how computers store multi-byte values in memory.</center></b>

In Ethereum, the endian-ness format used depends on the variable type:

- `Big-endian` is utilized for `bytes` and `string` types. These two types exhibit different behavior in a contract's storage slots compared to other variables.

- `Little-endian` is employed for all other variable types. Examples of such types include `uint8`, `uint32`, `uint256`, `int8`, `boolean`, `address`, and more.

### byte-padding

When storing data in Ethereum's storage, the Ethereum Virtual Machine (EVM) uses a specific method to make the best use of memory. If a variable needs less than `32 bytes` of memory, like `boolean` values, small numbers (`uint8`), or `addresses`, the EVM adds extra `zeros` to the value until it reaches a total of `32 bytes`.

Here is a diagram illustrating how the storage appears when storing state variables that need less than `32 bytes` of memory:

<center><img class="image" src="./assets/images/padded-contract.jpg"></center>
<b><center class="img-label">byte padding</center></b>

`PaddedContract` includes three state variables: `"a"` of type `bool`, `"b"` of type `uint256`, and `"c"` of type `uint8`. Let's explore how padding is applied in this context:

- The variable `"a"` is of type `bool`, which requires only `1 byte` of memory. However, the EVM storage operates on `32-byte slots`. Therefore, the EVM will pad `"a"` with `31` additional `zeros` to fill the entire slot. The resulting storage value for `"a"` would be `"0000000000000000000000000000000000000000000000000000000000000001"`.

- The variable `"b"` is of type `uint256`, which requires `32 bytes` of memory. Since it already occupies a full slot, no padding is necessary. The storage value for `"b"` would be `"000000000000000000000000000000000000000000000000000000000001e8f7"`.

- The variable `"c"` is of type `uint8`, which requires only `1 byte` of memory. Similar to the case of `"a"`, the EVM will pad `"c"` with `31 zeros` to fill the entire slot. The resulting storage value for `"c"` would be `"0000000000000000000000000000000000000000000000000000000000000098"`.

### byte-packing

The storage in a smart contract is organized into `32-byte` slots and each slot can hold one or more state variables, depending on their size and alignment requirements. To save space and make storage more efficient, multiple state variables can be packed together into a single slot.

When the smart contract is written and compiled, the compiler automatically decides how to pack the variables. It considers the size and requirements of each variable to determine if they can fit together in the same slot. The compiler tries to organize the variables in a way that minimizes wasted space and optimizes the overall storage usage.

For example, if you have several small variables that can fit within `32 bytes`, they can be packed together in one slot. However, larger variables that exceed `32 bytes` will need their own slot and cannot be split across multiple slots.

<center><img class="image" src="./assets/images/packed-contract.jpg"></center>
<b><center class="img-label">byte padding</center></b>

The `PackedContract` declares three state variables: `a`, `c`, and `b`. These variables are stored in the contract's storage slots.

Let's break down the state variables in the code and see how they are packed:

`bool public a = true;`

- The variable `a` is a `boolean` type and requires `1 byte` of storage.
- Since a storage slot is `32 bytes` in size, `a` can fit entirely within the first slot (`slot 0`), starting from the right.

`uint8 public c = 0x98;`

- The variable `c` is an `8-bit` unsigned integer (`uint8`) and also requires `1 byte` of storage.
- Since there is remaining space in slot `0` after `a`, `c` can be packed into the same slot (`slot 0`), moving left from `a`.
- The initial value of `c` is set to `0x98`, which is the hexadecimal representation of the decimal value `152`.

`uint256 public b = 0x01e8f7;`

- The variable `b` is a `256-bit` unsigned integer (`uint256`), which occupies `32 bytes`. The initial value of `b` is set to `0x01e8f7`, which is the hexadecimal representation of the decimal value `125751`.
- Unfortunately, the remaining space in `slot 0` is not sufficient to accommodate `b` alongside `a` and `c`. As a result, the EVM assigns `b` to the next available slot, which is `slot 1`.

To summarize the revised explanation:

Variables `a` and `c` are packed together within storage `slot 0`, with `c` positioned to the left of `a`. Variable `b` is assigned to storage `slot 1` because it cannot fit into the remaining space in `slot 0`. The order in which variables are declared also matters. Variables declared first will be placed in lower slots, while variables declared later will be placed in higher slots. This order can affect the packing and usage of storage.

By carefully considering the size, arrangement, and order of state variables, developers can help the compiler pack them efficiently in storage slots, making the best use of space and reducing storage costs for the smart contract.

When storing multiple small items that take up less than `32 bytes` each, we try to pack them together in a single storage space. Here are the rules we follow:

- The first item in a storage slot is stored lower-order aligned.
  
- Value types occupy only the minimum number of bytes required to store them.
  
- If a value type cannot fit within the remaining space of a storage slot, it is placed in the next available slot.
  
- `Structs` and `array` data always begin a new storage slot, and their individual items are tightly packed based on these rules.
  
- Items that appear after a `struct` or `array` data also initiate a new storage slot.

**C3-linearization**

When a contract in Ethereum uses inheritance, the order in which the state variables are stored is determined by a method called `C3-linearization`. This method arranges the contracts in a specific order, starting from the most basic contract and moving towards the derived contracts.

For example, let's say we have three contracts: Contract A, Contract B, and Contract C. Contract B inherits from Contract A, and Contract C inherits from Contract B. The `C3-linearized` order of these contracts would be: Contract A, Contract B, Contract C.

Now, when it comes to storing state variables, if the rules mentioned earlier allow it, state variables from different contracts can be stored in the same storage slot. This means that the variables from Contract A, Contract B, and Contract C may share the same storage slot if they meet the conditions specified by the rules we discussed earlier.

## user-defined types (structs)

<center><img class="image" src="./assets/images/struct-storage-slot.jpg"></center>
<b><center class="img-label">byte padding</center></b>

## statically-sized variables

<center><img class="image" src="./assets/images/value-type-storage.jpg"></center>
<b><center class="img-label">byte padding</center></b>


## dynamically-sized state variables

Dynamically-sized state variables are handled differently from statically-sized variables. The reason for this is that dynamic variables can grow in size, and if their data were stored directly in their assigned slots, it would cause problems. When new items are added to a dynamic variable, it would require more slots to store all the data. This would then push down subsequent state variables to further slots, potentially causing data overlap and making it difficult to manage the storage efficiently.

<center><img class="image" src="./assets/images/dynamic-size-variable-storage-slot.jpg"></center>
<b><center class="img-label">byte padding</center></b>

The slots assigned to dynamic variables act as markers that indicate the presence of an array but they don't directly store the variable's data.

A marker slot is a specific storage slot that is allocated for a dynamically-sized state variable. It doesn't store the actual data of the variable, but it serves as an indicator that the variable exists and provides essential information about the variable, such as its length or a reference to where its data is stored.

The marker slot typically contains metadata about the dynamic variable, which can include the length of a dynamic array or a reference (often a hash) to the storage location of the variable's data. By using the marker slot, the contract can keep track of the variable's properties and access its data efficiently.

To ensure that dynamically-sized variables don't cause conflicts or overlap with other variables in storage, we use a unique identifier for each variable. In this case, we use the keccak256 hash, which is a cryptographic function that takes an input (like the marker slot number) and produces a unique output (the hash value). This hash value serves as a special "pointer" to locate the actual storage slots where the variable's data is stored.

In summary, dynamically-sized state variables use marker slots to indicate their presence and rely on a hashing technique to manage their data storage in a way that prevents overlap and allows for efficient storage management.

## mappings

The marker slot in mappings serves as an indication that a mapping exists. When searching for a value associated with a specific key, the formula `keccak256(h(k) . p)` is utilized. Here are the details regarding the components of the formula:

- The symbol "." represents the concatenation of strings.
- "p" represents the position of the state variable's declaration in the smart contract.
- "h()" denotes a function applied to the key based on its type.
- For value types, "h()" returns the value padded to 32 bytes.
- For strings and byte arrays, "h()" simply returns the unpadded data.

The following diagram illustrates how mappings are stored in memory:

<center><img class="image" src="./assets/images/mapping-storage-slot.jpg"></center>
<b><center class="img-label">byte padding</center></b>

SRC: https://docs.soliditylang.org/en/v0.8.20/internals/layout_in_storage.html