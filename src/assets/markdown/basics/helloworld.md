# Overview

In the Hello World example, we will follow a simple process to `create`, `write`, `deploy`, and `execute` a smart contract using the `Remix IDE`. 

## Create new file in Remix IDE:

<center><img class="image" alt="HelloWorld example in remix IDE"  src="./assets/images/hello-world.JPG"></center>
<b><center class="img-label">Created a new file HelloWorld.sol</center></b>

To create a new file in the `Remix IDE`, you can follow these steps:

- In the `Remix IDE`, click the button under the `default_workspace` heading on the left side of the screen.
- In the dialog that appears, enter `HelloWorld.sol` as the file name and click the Create button.
- The new file will be added to the `File Explorer` module. To open it in the editor, click on the file's name.
- Once the file is open in the editor, you can begin writing the code for your `smart contract`.

## Write Hello World in Solidity

Solidity smart contract files begin with a `license`, a `compiler` version, and then the `contract`. 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This is the HelloWorld contract
contract HelloWorld {
    // This is the public variable "hello" which stores a string value
    string public hello = "Hello World!";
}
```

In order to create a Solidity smart contract, the first thing you need to do is include a `license` at the top of your code. This specifies the terms under which your contract can be used and distributed. Next, you'll need to specify the `compiler version` using with the `pragma` directive. Finally, you'll define your `contract` using the `contract` keyword followed by the name of your contract. In above example, our contract is called `HelloWorld`.

Inside the contract, we have a single string variable called hello which is set to the value "Hello World!".

### Code Explanation:

**1. SPDX License Identifier:**
The every `first line` in our smart contract is the following:

<pre style="background: rgba(0,0,0,.05); padding:20px">
// SPDX-License-Identifier: GPL-3.0
</pre>

The first line of every Solidity smart contract should include the `SPDX License Identifier`, which specifies the terms under which the source code can be used and distributed. `SPDX` stands for `Software Package Data Exchange.` The identifier should be taken from the list of licenses provided at https://spdx.org/licenses/. If the source code is not open-source or if you do not want to specify a license, you can use the special value `UNLICENSED`. 

It is important to include a license identifier in your contract file, as the Solidity compiler will show a warning if it is not present. 

 <center><img class="image" src="./assets/images/parse-error.JPG"></center>
 <b><center class="img-label">ParseError: Multiple SPDX-License-Identifier</center></b>

If there are multiple SPDX-License-Identifier lines in the contract file, the compiler will throw a `ParseError`.

**2. Pragmas:**
The next line in our smart contract is the following:

<pre style="background: rgba(0,0,0,.05); padding:20px">
pragma solidity 0.8.17;
</pre>

The `pragma` directive specifies the version of the `Solidity compiler` that we want to use to compile our contract. 

It is important to specify the compiler version in your contract because different versions of the Solidity compiler may have different syntax and features. By specifying the compiler version, we ensure that our contract will be compiled correctly.

Each Solidity contract must contain a `pragma` directive, because it will always be local to the file in which it is written.

 <center><img class="image" src="./assets/images/pragama-warning.JPG"></center>
 <b><center class="img-label">Warning: required of compiler version</center></b>

If the `pragma` isn't included in the contract file the compiler will show a warning.

**3. Contract:**

The next line in our smart contract is the following:

<pre style="background: rgba(0,0,0,.05); padding:20px">
contract HelloWorld {
</pre>

The `contract` keyword is used to define a new smart contract. In this case, we are creating a contract called `HelloWorld`.

Everything inside the curly braces is part of the `HelloWorld` contract.

Inside of our contract declaration, the first line is:

<pre style="background: rgba(0,0,0,.05); padding:20px">
string public hello = "Hello World!";
</pre>

Inside the `HelloWorld` contract, we have a single string variable called `hello` which is set to the value `"Hello World!"`.

### How to compile and deploy the code: 
To compile and deploy your Solidity code:

<b>Step 1:</b> Click the `Compile` button under the Compiler window to compile your code.

 <center><img class="image" src="./assets/images/compiler.JPG"></center>
 <b><center class="img-label">Compilation of contract</center></b>

<b>Step 2:</b> In the `Deploy and Run Transactions` window, click the Deploy button. After deployment, you can find the deployed contracts in the dropdown menu at the bottom of the panel.

 <center><img class="image" src="./assets/images/deploy.JPG"></center>
 <b><center class="img-label">Deployment of contract</center></b>

 <b>Step 3 :</b> Click on a variable `hello` button under the deployed contracts dropdown menu to execute it. You can view the output in the logs by clicking the dropdown menu on the console.

  <center><img class="image" src="././assets/images/output.JPG"></center>
  <b><center class="img-label">Output of contract</center></b>

### Bytecode & ABI:

When you compile a smart contract in Solidity, the compiler produces two outputs: `ByteCode` and `ABI`. These can be found at the bottom of the compiler tab panel.

  <center><img class="image" src="././assets/images/remix-bytecode.JPG"></center>
  <b><center class="img-label">Bytecode and ABI</center></b>

**Bytecode:** 
Copy the files produced by the Solidity compiler and paste them into a text editor. The `bytecode` file contains data in `JSON` format, with a key called `"object"` that has a value that is a hexadecimal number. This hexadecimal number is the actual bytecode that is executed by the Ethereum Virtual Machine (EVM).

<pre style="background: rgba(0,0,0,.05); padding:20px">
"object":"60806040526040518060400160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610166565b82805461006e90610134565b90600052602060002090601f01602090048101928261009057600085556100d7565b82601f106100a957805160ff19168380011785556100d7565b828001600101855582156100d7579182015b828111156100d65782518255916020019190600101906100bb565b5b5090506100e491906100e8565b5090565b5b808211156101015760008160009055506001016100e9565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061014c57607f821691505b602082108114156101605761015f610105565b5b50919050565b61022e806101756000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806319ff1d2114610030575b600080fd5b61003861004e565b6040516100459190610175565b60405180910390f35b6000805461005b906101c6565b80601f0160208091040260200160405190810160405280929190818152602001828054610087906101c6565b80156100d45780601f106100a9576101008083540402835291602001916100d4565b820191906000526020600020905b8154815290600101906020018083116100b757829003601f168201915b505050505081565b600081519050919050565b600082825260208201905092915050565b60005b838110156101165780820151818401526020810190506100fb565b83811115610125576000848401525b50505050565b6000601f19601f8301169050919050565b6000610147826100dc565b61015181856100e7565b93506101618185602086016100f8565b61016a8161012b565b840191505092915050565b6000602082019050818103600083015261018f818461013c565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806101de57607f821691505b602082108114156101f2576101f1610197565b5b5091905056fea2646970667358221220f02e8903da3c62435e1ae9378d3f94bdecc4a21f12f2227044b5206f01a8342964736f6c634300080a0033"
</pre>

To view the opcodes of a smart contract's bytecode, you can use a tool called a <a href="https://etherscan.io/opcode-tool" target="_blank">Bytecode to Opcode Disassembler tool</a>. To do this, you will need to:
- Copy the value of the `"object"` key from the bytecode file.
- Add the prefix `"0x"` to the string.
- Visit the <a href="https://etherscan.io/opcode-tool" target="_blank">Bytecode to Opcode Disassembler</a> website.
- Paste the string into the text box provided.
- Click the `"decode"` button.

<center><img class="image" src="././assets/images/opcode.JPG"></center>
<b><center class="img-label">Bytecode to Opcode Disassembler</center></b>

This will display a list of `opcodes` that correspond to the instructions contained in the `assembly language` of the `bytecode`. These `opcodes` are generated based on the value of the `"object"` key in the `bytecode` file.

**ABI:** The `ABI (Application Binary Interface)` is a interface that allows you to interact with the bytecode of a smart contract.

  <center><img class="image" src="././assets/images/abi-code.JPG"></center>
  <b><center class="img-label">ABI</center></b>

It includes a set of methods that can be called in order to execute the contract's functions. For example, in a simple `"Hello World"` contract, the ABI include a `"get"` method that allows you to retrieve the value of the `"hello"` variable.

To use the `ABI`, you can call its methods using any programming language, such as `JavaScript`. For example, you might create a button in a web page that, when clicked, calls the `ABI's` "get" method for the `"hello"` variable. The ABI then communicates with the `bytecode`, which is executed by the `Ethereum Virtual Machine (EVM)`. The `EVM` returns the requested output based on the instructions contained in the `bytecode`.