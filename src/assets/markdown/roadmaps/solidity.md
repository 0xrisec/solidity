# Solidity Roadmap

<center><img class="image" src="./assets/images/solidity-roadmap.png"></center>

👉 **Prerequisites**
    
- `Basic Programming Concepts:` A solid understanding of basic programming concepts such as variables, functions, and control structures is essential.

- `Familiarity with a Programming Language:` Familiarity with at least one programming language is required. Learning a programming language, especially Solidity, can be challenging for individuals without prior programming experience. 

- `Blockchain Fundamentals:` Understanding the basics of blockchain technology and its underlying mechanisms is crucial.

- `Ethereum Blockchain:` Knowledge of the Ethereum blockchain and how it operates is important for developing on the platform.

- [Smart Contracts:](https://rootbabu.github.io/basics/smart-contract.md#top) Understanding of smart contracts and their role in the Ethereum blockchain.

- [Remix IDE:](https://rootbabu.github.io/basics/remixide.md#top) Familiarity with the Remix Integrated Development Environment (IDE) is recommended for developing and testing smart contracts.
    
👉 **[Variables](https://rootbabu.github.io/basics/variables-basic.md#top)**
    
- [State Variable](https://rootbabu.github.io/basics/variables-basic.md#state-variables)
    
    - [Constant State Variables](https://rootbabu.github.io/basics/constant-immutable.md#top)
        
    - [Immutable State Variables](https://rootbabu.github.io/basics/constant-immutable.md#immutable)
        
    
- [Local Variable](https://rootbabu.github.io/basics/variables-basic.md#local-variables)
    
- [Global Variable](https://rootbabu.github.io/basics/globally-available-variables.md#top)
        
    - [Block properties](https://rootbabu.github.io/basics/globally-available-variables.md#block-properties)
        
    - [Message properties](https://rootbabu.github.io/basics/globally-available-variables.md#block-properties)
        
    - [Transaction properties](https://rootbabu.github.io/basics/globally-available-variables.md#block-properties)

👉 **Data Types**

- [Value Types](https://rootbabu.github.io/basics/types.md#top)
    - [bool](https://rootbabu.github.io/basics/types.md#boolean)
    - [Integers](https://rootbabu.github.io/basics/types.md#integers)
        - uint
        - int
    - [Address](https://rootbabu.github.io/basics/types.md#address)
    - [Fixed Size Byte Arrays](https://rootbabu.github.io/basics/types.md#fixed-size-byte-arrays)
  
- [Refrence Types](https://rootbabu.github.io/basics/reference-types.md#top)
    - [Arrays](https://rootbabu.github.io/basics/reference-types.md#top)
    - [Fixed-size Arrays](https://rootbabu.github.io/basics/reference-types.md#fixed-size-arrays)
    - [Dynamic Arrays](https://rootbabu.github.io/basics/reference-types.md#dynamic-arrays)
    - [Dynamically-sized byte array](https://rootbabu.github.io/basics/reference-types.md#dynamically-sized-byte-array)
    - [String](https://rootbabu.github.io/basics/reference-types.md#string)
    - [Mapping](https://rootbabu.github.io/basics/reference-types.md#mapping)
    - [Structs](https://rootbabu.github.io/basics/reference-types.md#structs)

👉 **[Functions](https://rootbabu.github.io/basics/functions.md#top)**
- [Visibility](https://rootbabu.github.io/basics/visibility.md#top) 
- [State mutability](https://rootbabu.github.io/basics/state-mutability.md#top)
- [Constructor](https://rootbabu.github.io/basics/variable-functions.md#constructor)
    
👉 **[Visibility](https://rootbabu.github.io/basics/visibility.md#top)**
    
- public
- private
- internal
- external
    
👉 **[State mutability](https://rootbabu.github.io/basics/state-mutability.md#top)**

- [view](https://rootbabu.github.io/basics/state-mutability.md#view-state-mutability-read-not-modify)
- [pure](https://rootbabu.github.io/basics/state-mutability.md#pure-state-mutability-not-read-not-modify)
- [payable](https://rootbabu.github.io/basics/payable.md#top)
- [Non Payable](https://rootbabu.github.io/basics/payable.md#non-payable)
    
👉 **[Control Structures](https://rootbabu.github.io/basics/control-structures.md#top)**

- [if/else and ternary operator](https://rootbabu.github.io/basics/control-structures.md#top)
- [While and For Loop](https://rootbabu.github.io/basics/control-structures.md#while-and-for-loop)
    
👉 **[Units & Gas](https://rootbabu.github.io/basics/units.md#top)**
    
- [Ether Units](https://rootbabu.github.io/basics/units.md#top)
- [Time Units](https://rootbabu.github.io/basics/units.md#time-units)
- [Gas](https://rootbabu.github.io/basics/units.md#gas)
- [Gas Limit](https://rootbabu.github.io/basics/units.md#gas-limit)
    
👉 **[Enums](https://rootbabu.github.io/basics/enums.md#top)**

👉 **[Error handling](https://rootbabu.github.io/basics/error-handling.md#top)**
    
- [Assert](https://rootbabu.github.io/basics/error-handling.md#top)
- [Require](https://rootbabu.github.io/basics/error-handling.md#require)
- [Revert](https://rootbabu.github.io/basics/error-handling.md#revert)
    
👉 **[Data Locations](https://rootbabu.github.io/basics/data-locations.md#data-location)**
    
- memory
- storage
- calldata
- stack
    
👉 **[Events](https://rootbabu.github.io/basics/events.md#top)**

👉 **[Function Modifier](https://rootbabu.github.io/basics/function-modifier.md#top)**

👉 **[Inheritance](https://rootbabu.github.io/basics/inheritance.md#top)**
    
- Override
- Virtual
    
👉 **[Abstract Contracts and Interfaces](https://rootbabu.github.io/basics/interfaces.md#top)**

👉 **[Import and Libraries](https://rootbabu.github.io/basics/import.md#top)**

👉 **[Special Function](https://rootbabu.github.io/basics/special-functions.md#top)**
- [fallback](https://rootbabu.github.io/basics/special-functions.md#top)
- [receive](https://rootbabu.github.io/basics/special-functions.md#receive-ether-function)
  
👉 **[Keccak256 & Function Selector](https://rootbabu.github.io/basics/keccak256.md#top)**

👉 **[ABI Encode/Decode](https://rootbabu.github.io/basics/abi.md#top)**

- [abi.encode(...) and abi.decode(...)](https://rootbabu.github.io/basics/abi.md#abiencode-and-abidecode)
- [abi.encodePacked(...) and abi.decodePacked(...)](https://rootbabu.github.io/basics/abi.md#abiencodepacked-and-abidecodepacked)
- [abi.encodeWithSelector(...)](https://rootbabu.github.io/basics/abi.md#abiencodewithselector)
- [abi.encodeWithSignature(...)](https://rootbabu.github.io/basics/abi.md#abiencodewithsignature)
  
👉 **[Low level function](https://rootbabu.github.io/basics/low-level-function.md#top)**
- [send](https://rootbabu.github.io/basics/low-level-function.md#top)
- [transfer](https://rootbabu.github.io/basics/low-level-function.md#transfer)
- [call](https://rootbabu.github.io/basics/low-level-function.md#call)
- [delegatecall](https://rootbabu.github.io/basics/low-level-function.md#delegatecall)
