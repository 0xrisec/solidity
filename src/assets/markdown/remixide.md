# Overview

Remix is a web browser based integrated development environemnt(IDE) that allows you to write, deploy and administer Solidity smart contracts, without the need to install Solidity locally.

<a href="https://remix.ethereum.org" target="_blank">Access Remix online</a>, We will use Remix for all our coding.

# Remix Layout:

<img alt="Remix IDE Panels"  src="./assets/images/Remix IDE panels.JPG" >
<b><center class="img-label">Remix IDE Panels</center></b>

 Remix IDE consists three panels:

 - **Code Panel :** It allows to view and edit files in multiple tabs.
 - **Terminal :** You can see the result and run you code in the Terminal
 - **Tab Panel :** File Explorer, Search in files, Solidity compiler, Deploy and run transaction

## Tab Panel: 
It consists of four modules. `File Explorer, Search in files, Solidity compiler, Deploy and run transaction`

**1. File Explorer:** Click the File Explorer icon to access the `File Explorer` module.

<center><img alt="Remix IDE Panels"  src="./assets/images/file explorer.JPG" ></center>
<b><center class="img-label">File Explorer</center></b>

File Explorer is used to managing `workspaces and files`. Right-clicking on a file or folder also brings up a context menu.

**2. Search in files:** Click the search icon to get to the `Search in files` module.

<center><img alt="Remix IDE Panels"  src="./assets/images/search in files.JPG" ></center>
<b><center class="img-label">Search in files</center></b>

The search box allows you to search any string in files and filter them based on their extensions.

**3. Solidity compiler:** Click the Solidity icon to get to the `Solidity compiler` module.

<center><img alt="Remix IDE Panels"  src="./assets/images/remix-compiler.JPG" ></center>
<b><center class="img-label">Solidity compiler</center></b>

Using `File Explorer`, select a file to compile. If you have several files open, make sure the one you want to compile is the active file. There is a choice of `compiler versions`, `auto compile` and `hide warnings`. To compile the file, click on compile or compile and run script.

**4. Deploy and run transaction:** When you have successfully compiled the file, you will see a green checkmark on the icon that indicates that your file has been successfully compiled.

Deploy & Run transactions can be accessed by clicking the fourth icon.

<center><img alt="Remix IDE Panels"  src="./assets/images/deploy and transaction.JPG" ></center>
<b><center class="img-label">Deploy and run transaction</center></b>

- **Environment:** There are multiple environments to connect to the `blockchain`, so this field helps us to connect to it such as 

    `Remix VM (London):` The Remix VM (previously known as JavaScript VM) maintains its own "blockchain" and, on each reload the old chain will be cleared and a new blockchain will be started. The London refers to the London fork of Ethereum.

    `Remix VM (Berlin):` The same as above, but with the Berlin fork of Ethereum.

- **Account:** Here is a list of current environment accounts (and their balances).

- **Gas Limit:** This sets the maximum amount of gas that will be allowed for all the transactions created in Remix.

- **Deploy:** To deploy the contract on a selected environment, click the deploy button.
