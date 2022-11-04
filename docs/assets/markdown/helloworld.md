# Overview

First, we'll create a file, then write the code, deploy it, and execute it in Remix IDE.

## Create new file in Remix IDE:

You can create a new file by clicking the button under the `default_workspace` heading on the left. Click it and name our new file `HelloWorld.sol`. Click on the newly created `HelloWorld.sol` file to open the editor.

 <img class="image" alt="HelloWorld example in remix IDE"  src="./assets/images/hello-world.JPG"  >
 <b><center class="img-label">Created a new file HelloWorld.sol</center></b>

 ## Write Hello World in Solidity

 As we know Solidity is similar to languages like `JavaScript`, `Python`, and `Java`. Let's write `Hello World!` in each of these languages to see how they compare to Solidity!

 ### Javascript:

 We can print the `Hello World!` string using `console.log()` method to the console.

 ```js
 console.log("Hello World!");
// Hello World!
```

### Python:

Using the built-in `print()` function in Python, we can printing the string Hello world!

```py
print("Hello World!);
// output: Hello World!
```

### Java:

Every Java application begins with a class definition and the main method. We can print the text `Hello World!` using the built-in `println()` method.

```java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
   }
}
```

### Solidity:

Solidity smart contract files begin with a `license`, a `compiler` version, and then the `contract`. 
<!-- The `Hello World!` string is printed in above languages using some method, but in Solidity, we can create a public variable that contains the string. -->

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;
contract HelloWorld {
  string public hello = "Hello World!";
}
```

### Code Explanation:

**1. SPDX License Identifier:**
The every `first line` in our smart contract is the following:

<pre style="background: rgba(0,0,0,.05); padding:20px">
// SPDX-License-Identifier: GPL-3.0
</pre>

The first line tells you that the source code is licensed under the `GPL version 3.0`. Every smart contract begins with the `SPDX License Identifier`. `SPDX` stands for `Software Package Data Exchange.`

It is best practice to include a type of license that the code you are writing can be used under. The license should be from one of the following:<a href=" https://spdx.org/licenses/" target="_blank"> https://spdx.org/licenses/</a>.

If you do not want to specify a license or if the source code is not open-source, please use the special value `UNLICENSED`.

If the license identifier isn't included in the contract file the compiler will show a `warning`.

 <img class="image" src="./assets/images/spdx-warning.JPG"  >
 <b><center class="img-label">SPDX-Warning</center></b>

If there are multiple SPDX-License-Identifier line in the contract file the compiler will show an `ParseError.`

 <img class="image" src="./assets/images/parse-error.JPG"  >
 <b><center class="img-label">ParseError: Multiple SPDX-License-Identifier</center></b>

**2. Pragmas:**
The next line in our contract is:

<pre style="background: rgba(0,0,0,.05); padding:20px">
pragma solidity ^0.8.10;
</pre>

`pragma` is a directive that specifies the compiler version to be used for current Solidity file.

Each Solidity contract must contain a `pragma` directive, because it will always be local to the file in which it is written.

If the `pragma` isn't included in the contract file the compiler will show a warning.

 <img class="image" src="./assets/images/pragama-warning.JPG"  >
 <b><center class="img-label">Warning: required of compiler version</center></b>

**3. Contract:**

The next line is:

<pre style="background: rgba(0,0,0,.05); padding:20px">
contract HelloWorld {
</pre>

A `contract` in the sense of Solidity is a collection of `code` (its functions) and `data` (its state) that resides at a specific address on the `Ethereum blockchain.`

Inside of our contract declaration, the first line is:

<pre style="background: rgba(0,0,0,.05); padding:20px">
string public hello = "Hello World!";
</pre>

This line declares a state variable called `hello` of type string . You can think of it as a single slot in a `database` that you can query and alter by calling functions of the code that manages the database.

### How to compile and deploy the code:

<b>Step 1:</b> After writing the Smart contract in the code panel, click the Compile button under the Compiler window.

 <img class="image" src="./assets/images/compiler.JPG"  >
 <b><center class="img-label">Compilation of contract</center></b>

<b>Step 2:</b> In the Deploy and Run Transactions window, click the Deploy button to deploy the code. After deployment, you will find the deployed contracts dropdown menu at the bottom of the panel.

 <img class="image" src="./assets/images/deploy.JPG"  >
 <b><center class="img-label">Deployment of contract</center></b>

 <b>Step 3 :</b> Click the variable hello button under the deployed contracts drop-down menu to run the program. You can also view the output in logs by clicking the drop-down menu on the console.

  <img class="image" src="././assets/images/output.JPG"   >
  <b><center class="img-label">Output of contract</center></b>

### Bytecode & ABI:

Solidity compiler creates ByteCode and ABI when we compile the smart contract, you can see them at the bottom of the compiler tab panel. 

  <img class="image" src="././assets/images/remix-bytecode.JPG"  >
  <b><center class="img-label">Bytecode and ABI</center></b>

**Bytecode:** Take a copy of these files and paste them into notepad. Basically, bytecode file contains data in JSON that has a key named `object`, whose value is a hexadecimal number, which is the actual bytecode that EVM runs.

<pre style="background: rgba(0,0,0,.05); padding:20px">
"object":"60806040526040518060400160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610166565b82805461006e90610134565b90600052602060002090601f01602090048101928261009057600085556100d7565b82601f106100a957805160ff19168380011785556100d7565b828001600101855582156100d7579182015b828111156100d65782518255916020019190600101906100bb565b5b5090506100e491906100e8565b5090565b5b808211156101015760008160009055506001016100e9565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061014c57607f821691505b602082108114156101605761015f610105565b5b50919050565b61022e806101756000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806319ff1d2114610030575b600080fd5b61003861004e565b6040516100459190610175565b60405180910390f35b6000805461005b906101c6565b80601f0160208091040260200160405190810160405280929190818152602001828054610087906101c6565b80156100d45780601f106100a9576101008083540402835291602001916100d4565b820191906000526020600020905b8154815290600101906020018083116100b757829003601f168201915b505050505081565b600081519050919050565b600082825260208201905092915050565b60005b838110156101165780820151818401526020810190506100fb565b83811115610125576000848401525b50505050565b6000601f19601f8301169050919050565b6000610147826100dc565b61015181856100e7565b93506101618185602086016100f8565b61016a8161012b565b840191505092915050565b6000602082019050818103600083015261018f818461013c565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806101de57607f821691505b602082108114156101f2576101f1610197565b5b5091905056fea2646970667358221220f02e8903da3c62435e1ae9378d3f94bdecc4a21f12f2227044b5206f01a8342964736f6c634300080a0033"
</pre>

Below the `object` key, an `opcode` key is generated based on the `object` value. `Bytecode in object key` is essentially instructions in assembly language that can be seen by <a href="https://etherscan.io/opcode-tool" target="_blank">Bytecode to Opcode Disassembler tool</a>. 

From the bytecode file, copy the value of the object key. Add the prefix `0x` to the string. Visit the  <a href="https://etherscan.io/opcode-tool" target="_blank">Bytecode to Opcode Disassembler website</a>. Put the string in the text box. Click on the decode button.


  <img class="image" src="././assets/images/opcode.JPG"  >
  <b><center class="img-label">Bytecode to Opcode Disassembler</center></b>

**ABI:** ABI is an interface used to interact with bytecode.

  <img class="image" src="././assets/images/abi-code.JPG"  >
  <b><center class="img-label">ABI</center></b>

Solidity automatically creates a get method to access the value of variables we create, such as `hello` in our `Hello World example` (the get method is actually called to access the value). In the ABI file, we can see that an object is created for the `hello` get method. Through this interface, we can interact with bytecode in any programming language such as In our Hello World example, we click a button to print the `hello world!`, which is actually code in `JS`.  As the `JS` code interacts with the `ABI` and the `ABI` interacts with the `bytecode`, the `bytecode` runs in `EVM` and `EVM` returns the output as per the instructions.