# What is Solidity?

Solidity is `statically typed`, `contract-oriented`, `high-level language` used to develop smart contracts that run on Ethereum Blockchain.

Solidity is a programming language designed specifically for use in creating smart contracts on the Ethereum blockchain. It is `statically typed`, meaning that variables and other data structures are assigned a specific type at the time of declaration, and this type cannot be changed at runtime.

Solidity is `contract-oriented`, meaning that it is used to define the terms and conditions of a particular contract. 

It is a `high-level language`, meaning that it is relatively easy for humans to read and write, and it is compiled into lower-level code that can be executed by the Ethereum virtual machine.

Solidity is similar in syntax and structure to other popular programming languages such as `C++`, `Python`, and `JavaScript`, making it familiar and easy to learn for many developers. It includes features such as `variables`, `functions`, `access modifiers`, `arithmetic operations`, `inheritance`, and more.

# Solidity Compiler, Byte Code & ABI, EVM and Ethereum Network:

In order to better understand how Solidity Compiler, Byte Code & ABI, EVM, and Ethereum Network function, it is necessary to have a grasp on how programming languages are executed.

## Execution of programing language:

<img class="image" alt="Code Execution"  src="./assets/images/code-execution.JPG" >
<b><center class="img-label">Execution of programing language</center></b>

To execute programming languages such as `Java` and `Python`, we need to use a `compiler` to convert them into a form that computers can understand, such as `machine code` or `assembly language`. The compiler translates the source code into `bytecode`, which is a set of instructions in a compact numeric format. 

The `virtual machine` can then execute the bytecode instructions once the `compiler` has converted the program into `bytecode`. A `virtual machine` is a software program that provides a runtime environment for executing `bytecode` and allows a computer to run programs written in different programming languages. 

Similarly, the Solidity `Compiler`, `Byte Code` & `ABI`, `EVM`, and `Ethereum Network` work together to execute Solidity smart contracts.

## Solidity Compiler: 

<center><img class="image w13" alt="Compiler" src="./assets/images/compiler-icon.JPG" ></center>
<b><center class="img-label">Compiler</center></b>

The `Solidity Compiler` is a tool that converts Solidity code into `bytecode` and `Application Binary Interface (ABI)`. 

## Byte Code & ABI:

<center><img class="image w13" alt="Byte Code and ABI" src="./assets/images/bytecode-abi.JPG" ></center>
<b><center class="img-label">Byte Code & ABI</center></b>

**Byte Code:** 

The `Solidity Compiler` is a tool that converts Solidity code into `bytecode`, which is a form of machine language that can be understood and executed by the `Ethereum Virtual Machine (EVM)`. The `bytecode` is a set of instructions that tells the `EVM` how to execute the smart contract. The `EVM` reads the `bytecode` and executes it instruction by instruction, following the rules and logic defined in the contract code.

**ABI:** 

`Application Binary Interfaces (ABIs)` are specifications that describe the interface between a smart contract and its external users. They allow external programs to interact with the contract and execute its functions by defining the data types and function calls that can be made to the contract.

The `bytecode` is a form of machine language that can be executed by the `Ethereum Virtual Machine (EVM)`, but it is not easily understandable by humans. `ABIs` provide a standardized way to express the interfaces of smart contracts in a way that can be understood by humans and accessed from any programming language.

For example, if you want to use `JavaScript` to call a function in a smart contract, the `ABI` acts as an intermediary between the `JavaScript` code and the smart contract `bytecode`. It defines the function calls and data types that can be used to interact with the contract, allowing the `JavaScript` code to communicate with the contract through the `ABI`.

In the Hello World example, we will see what the `bytecode` and `ABI` of a simple smart contract look like.

## EVM (Ethereum Virtual Machine):

<center><img class="image w25" alt="Geth" src="./assets/images/geth.JPG" ></center>
<b><center class="img-label">geth</center></b>

The `Ethereum Virtual Machine (EVM)` is a crucial component of the `Ethereum` platform. It is a software program that executes smart contract `bytecode` and calculates the state of the Ethereum network after each new block is added to the blockchain. The `EVM` is responsible for enforcing the rules of smart contracts and executing their code, ensuring that they are executed correctly and consistently on the Ethereum network.

The `EVM` is included in a software program called `Geth`. `Geth` is a command-line interface (CLI) tool that allows you to connect to the `Ethereum network`, create and manage accounts, and deploy and interact with smart contracts. When you run `Geth` on your machine, you also run the `EVM`, which enables you to become a part of the Ethereum network and interact with the blockchain. By running `Geth`, you can join the Ethereum network and participate in its decentralized ecosystem.

## Ethereum Network: 

<center><img class="image" alt="Geth" class="w45" src="./assets/images/eth-network.JPG" ></center>
<b><center class="img-label"> Ethereum Network</center></b>

`Ethereum` is a distributed, peer-to-peer network of computers that are all running `Geth` (that all are running` Ethereum virtual machine`). In a peer-to-peer network, computers communicate and share information directly with each other rather than using a central server.

On the `Ethereum network`, all the computers running Geth are connected and able to communicate with each other. Each computer running Geth is known as a "node," and together, these nodes form the `Ethereum network`. The nodes on the `Ethereum network` use the EVM to execute smart contracts and validate transactions, ensuring that the Ethereum blockchain is secure and consistent.

By running Geth and joining the `Ethereum network`, a computer becomes a part of the decentralized Ethereum ecosystem and can participate in the validation and execution of smart contracts and transactions. This allows the `Ethereum network` to operate in a decentralized and trustless manner, without the need for a central authority.

# Smart Contract deployment and Execution:

<center><img class="image" alt="Geth" src="./assets/images/smart-contract-execution.JPG" ></center>
<b><center class="img-label">Smart Contract deployment and Execution</center></b>

## Deployment: 

Smart contract deployment refers to the process of making a` smart contract` available on the `Ethereum` blockchain for execution. To deploy a `smart contract`, a developer must first write the contract code in `Solidity`.

Once the contract code has been written, the developer must use a `compiler` to convert it into `bytecode`.

After the contract has been compiled into `bytecode`, the developer can deploy it to the `Ethereum blockchain`. This process involves sending a copy of the `bytecode` to all the nodes on the network. A node is a computer that is running the `Geth` software program, which includes the `EVM`. When a smart contract is deployed on the blockchain, it is stored on the nodes and can be accessed and executed by any node on the network.

Overall, smart contract deployment involves writing the contract code in Solidity, compiling it into `bytecode` using a `compiler`, and sending a copy of the `bytecode` to all the nodes on the `Ethereum network`. This allows the smart contract to be stored on the blockchain and executed by the `EVM`.

## Execution of smart contract and state change of blockchain:

The execution of a `smart contract` refers to the process of running the contract's code and making changes to its state based on the logic and rules defined in the code. When someone uses a smart contract, they initiate a `transaction`, which is a request to execute one or more functions in the contract. The transaction is processed by the `Ethereum Virtual Machine (EVM)`, which is a software program that executes smart contract `bytecode` and calculates the state of the `Ethereum network`.

When a `transaction` is initiated, all the nodes on the `Ethereum network` pull out copies of the `smart contract` and execute it step-by-step. This involves reading the `bytecode` and following the instructions defined in the code, such as calling functions and modifying variables. As the smart contract is executed, its state is changed based on the logic and rules defined in the code.

The state of a `smart contract` refers to the current values of its variables and the status of its functions. When the state of a `smart contract` is changed, the change is recorded on the `Ethereum blockchain`. All the nodes on the network keep track of the blockchain's state and ensure that it is consistent across the network. This is why the `EVM` is sometimes referred to as a `state machine`, as it maintains and updates the state of the `Ethereum network` as transactions are processed.