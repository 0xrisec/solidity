# What is Solidity?

Solidity is `statically typed`, `contract-oriented`, `high-level language` used to develop smart contracts that run on Ethereum Blockchain. 

A statically-typed language is a language (such as `Java`, `C`, or `C++`) where variable types are known at compile time.

Solidity is similar in appearance to other coding languages such as `C++`, `Python`, and `JavaScript`.  For example, Solidity programming also has variables, functions, Access  modifiers, arithmetic operations, string manipulation, inheritance, and  many other concepts.

# Solidity Compiler, Byte Code & ABI, EVM and Etherum Network:

To make these items easier, we need to understand how other programming language codes are executed.

## Execution of programing language:

<img alt="Code Execution"  src="./assets/images/code-execution.JPG" >
<b><center class="img-label">Execution of programing language</center></b>

Programming languages such as `Java` and `Python` are programmer-friendly, but computers cannot understand them. Machine language (binary) is the only language that computers understand. So we need a tool known as a `compiler` that converts high-level programming languages into low-level programming languages (`Assembly language`, `machine code`).

So using a compiler we convert the source code into bytecode. Bytecode is a set of instructions in the form of compact `numeric codes`, `constants`, and `references`.

The virtual machine can go ahead and execute the `bytecode instruction` once the compiler converts programs into `bytecode`.

A virtual machine provides a runtime environment for executing `bytecode` and enables a computer to run programs. There are different virtual machines for different types of programming to run the program on our system.

Likewise, `Solidity Compiler`, `Byte Code & ABI`, `EVM`, and `Ethereum Network` participate in the execution of Solidity smart contracts.

## Solidity Compiler: 

<center><img alt="Compiler" class="w13" src="./assets/images/compilerIcon.JPG" ></center>
<b><center class="img-label">Compiler</center></b>


We have a solidity compiler that converts solidity programs into `bytecode & ABI`.

## Byte Code & ABI:

<center><img alt="Byte Code and ABI" class="w13" src="./assets/images/Byte Code And ABI.JPG" ></center>
<b><center class="img-label">Byte Code & ABI</center></b>

**Byte Code:** The Solidity code gets translated into `bytecode` using `compiler`. It is a set of instructions that runs on the EVM. The EVM execute the `bytecode` instruction by instruction.

**ABI:** ABIs stand for application binary interfaces.

Smart contracts are made up of functions and variables and based on those variables and functions, we interact with smart contracts (this will become clearer once you create a simple smart contract).

Smart contracts are now converted to `bytecode` using a `compiler`. So we need a way to know which operations and interactions we can initiate with bytecode. Furthermore, we need a standardized way to express such interfaces, so that smart contracts can be accessed from any language. As a result, ABI provides an interface to interact with bytecode.

As an example, if you want to use JavaScript to call a function in a smart contract, ABI acts as an intermediary between JavaScript and smart contract bytecode.

In the Hello World example, we will see how actual bytecode and ABI look like.

## EVM (Ethereum Virtual Machine):

<center><img alt="Geth" class="w25" src="./assets/images/geth.JPG" ></center>
<b><center class="img-label">geth</center></b>

`EVM` is part of a program called `Geth`. `Geth` is this piece of software. You can run `Geth` on your machine. And when you run `Geth`, you also run the `EVM`.Once you run this in your system which means that you're part of the `Ethereum network`.
The Ethereum Virtual Machine or EVM is a piece of software that executes smart contracts bytecode and computes the state of the Ethereum network after each new block is added to the chain.

## Ethereum Network: 

<center><img alt="Geth" class="w45" src="./assets/images/eth network.JPG" ></center>
<b><center class="img-label"> Ethereum Network</center></b>

Ethereum is a distributed, peer-to-peer network of computers that are all running `Geth` (that all are running Ethereum virtual machine). A peer-to-peer network means computers share information directly rather than using a central server.

# Smart Contract deployment and Execution:

<center><img alt="Geth" src="./assets/images/smart-contract-execution.JPG" ></center>
<b><center class="img-label">Smart Contract deployment and Execution</center></b>

## Deployment: 

To create a smart contract, developers write code in `Solidity`. Developers compile smart contracts using `compilers`. Compilers convert smart contracts into `Bytecode`. After that, the developer deployed it to the blockchain. This means the developer gives a copy of the bytecode to all the nodes in the network. A node is simply a computer that runs the `Geth` program.

## Execution of smart contract and state change of blockchain:

Anyone uses that smart contract and the transaction happens through the execution of smart contracts (The term "transaction" refers to a change in the state of a smart contract). All computers in the network pull out copies of the smart contract and execute the smart contract step-by-step. As well as change its state. All computers keep track of the blockchain's state. Thats, why we called EVM is state machine.