# Overview

Remix is a web browser based integrated development environment(IDE) that allows you to write, deploy and administer Solidity smart contracts, without the need to install Solidity locally.

Remix is an online integrated development environment (IDE) that allows developers to write, deploy, and manage Solidity smart contracts from a web browser. It is a convenient tool for working with Solidity and the Ethereum platform, as it does not require the installation of any software locally.

To use Remix, you can simply access it online <a href="https://remix.ethereum.org" target="_blank">online</a>. Remix provides a range of features and tools for working with Solidity, including a code editor, compiler, debugger, and more. It is a popular choice among Ethereum developers, and we will be using it throughout our coding exercises. Overall, Remix is a powerful and easy-to-use platform for working with Solidity and the Ethereum platform.

# Remix Layout:

<img class="image" alt="Remix IDE Panels"  src="./assets/images/remix-ide-panels.JPG" >
<b><center class="img-label">Remix IDE Panels</center></b>

The `Remix IDE` is divided into three main panels:

**Code Panel:** This panel allows you to view and edit files in multiple tabs. You can open and edit Solidity files, as well as other types of files, in this panel.

**Terminal:** The Terminal panel displays the output of your code. You can use this panel to see the results of your code, debug any issues, and more.

**Tab Panel:** The `Tab Panel` contains a variety of tools and features that you can use when working with Solidity. It includes the File Explorer, which allows you to browse and organize your files, the Search in files tool, which allows you to search for specific text within your files, the Solidity compiler, which converts your code into bytecode, and the Deploy and run transaction tool, which allows you to deploy your code to the Ethereum network and execute transactions.

## Tab Panel: 

The `Tab Panel` in the Remix IDE consists of four modules: `the File Explorer`, `the Search in files tool`, `the Solidity compiler`, and `the Deploy and run transaction `module.

**1. File Explorer:** 

<center><img class="image" alt="Remix IDE Panels"  src="./assets/images/file-explorer.JPG" ></center>
<b><center class="img-label">File Explorer</center></b>

The `File Explorer` module allows you to manage your workspaces and files. You can access it by clicking the File Explorer icon in the `Tab Panel`. You can use the File Explorer to navigate through your files and folders, and you can also access a context menu by right-clicking on a file or folder.

**2. Search in files:**

<center><img class="image" alt="Remix IDE Panels"  src="./assets/images/search-in-files.JPG" ></center>
<b><center class="img-label">Search in files</center></b>

The `Search in files` module allows you to search for specific text within your files. You can access it by clicking the search icon in the `Tab Panel`. The `Search in files` tool includes a search box and allows you to filter your search results by file extension.

**3. Solidity compiler:**

<center><img class="image" alt="Remix IDE Panels"  src="./assets/images/remix-compiler.JPG" id="image"></center>
<b><center class="img-label">Solidity compiler</center></b>

The `Solidity compiler` module allows you to compile your Solidity code into `bytecode` & `ABI`. You can access it by clicking the Solidity icon in the `Tab Panel`. To use the Solidity compiler, you must first select the file you want to compile using the `File Explorer`. You can then select a compiler version, choose whether to auto-compile and hide warnings, and click the compile or compile and run script button to start the compilation process. When you have successfully compiled the file, you will see a green checkmark on the icon that indicates that your file has been successfully compiled.

**4. Deploy and run transaction:**

<center><img class="image" alt="Remix IDE Panels"  src="./assets/images/deploy-transaction.JPG" ></center>
<b><center class="img-label">Deploy and run transaction</center></b>

The `Deploy and run transaction` module allows you to deploy your compiled code to the `Ethereum network` and execute `transactions`. You can access it by clicking the fourth icon in the `Tab Panel`. The `Deploy and run transaction` module includes:
- An `environment field`, which allows you to connect to the blockchain using different environments such as the `Remix VM (London)` or the `Remix VM (Berlin)`. 
- An `account field`, which displays a list of current environment accounts and their balances. 
- A `gas Limit` field, which sets the maximum amount of gas allowed for all the transactions created in `Remix`. etc.

To deploy your contract on a selected environment, you can simply click the deploy button.