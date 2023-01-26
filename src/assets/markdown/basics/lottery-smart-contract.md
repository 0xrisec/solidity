# Lottery Game Smart Contract

Lottery games have been a popular form of entertainment for centuries, providing players with the chance to win big prizes. With the emergence of `blockchain` technology and `smart contracts`, it is now feasible to create decentralized lottery games that are transparent, fair, and operate independently of central authority. In this post, we'll examine the basic code for a `lottery game smart contract`.

## Goals and Objectives

The goal of the `Lottery Game Smart Contract` is to create a decentralized and fair lottery game. The contract aims to achieve the following objectives:

- Allow `players` to participate in the lottery by sending `1 ether` as a bet, which will add their `address` to the `players` array and make them eligible to win the winnings.
- Ensure a fair and transparent selection process by using a `random number generator` to pick a winner from the players array.
- Allow the contract `owner` to view the balance at any time.
- Enable the contract `owner` to transfer the total amount of bets (which is the contract's balance) to the winner's address and end the game.

## Code

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract LotteryGame {
    // address of the contract owner
    address owner;
    // array to store addresses of players
    address payable[] public players;

    address public winner;

    constructor() {
        // set the owner of the contract to the message sender
        owner = msg.sender;
    }

    receive() external payable {
        // require that the value sent with the message is 1 ether
        require(msg.value == 1 ether, "The bet must be 1 ether.");
        // add the message sender to the players array
        players.push(payable(msg.sender));
    }

    function pickWinner() public {
        // require that the message sender is the contract owner
        require(msg.sender == owner, "Only the contract owner can pick a winner.");
        // require that there are at least 3 players in the lottery
        require(players.length >= 3, "There must be at least 3 players in the lottery.");

        // generate a random number
        uint randomNumber = random();
        // calculate the index of the winner using the random number
        uint index = randomNumber % players.length;
        // get the address of the winner from the players array
        address payable winnerAddress = players[index];
        
        winner = winnerAddress;
        // transfer the contract balance to the winner's address
        winnerAddress.transfer(getBalance());
        // reset the game by clearing the players array
        resetGame();
    }

    function getBalance() public view returns (uint) {
        // require that the message sender is the contract owner
        require(msg.sender == owner, "Only the contract owner can view the balance.");
        // return the balance of the contract
        return address(this).balance;
    }

    function random() private view returns (uint) {
        // generate a random number using keccak256 hash function
        // and the block difficulty, timestamp, and players length as input
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function resetGame() private {
        // reset the game by creating a new empty players array
        players = new address payable[](0);
    }
}
```

## Code Explanation

The first line of the code specifies the license for the contract, in this case, it's `GPL-3.0`. This means that the contract is open-source and can be used, modified, and distributed by anyone, as long as they follow the terms of the `GPL-3.0 license`.

**Solidity Version:** 

The next line of code specifies the version of Solidity that the contract was written in, which is `0.8.17`.

**Contract Structure**

The contract is called `LotteryGame`, and it has several variables and functions.

- The variable `"owner"` is an address variable that stores the address of the contract `owner`.
- The variable `"players"` is an array of addresses that can receive `Ether` and stores the addresses of all players who have entered the `lottery`.
- The constructor function is called automatically when the contract is deployed and assigns the address of the deployer to the `"owner"` variable.

**Receive Method**
The `receive()` function is an `external` function with the `"payable"` keyword, which allows it to receive `Ether` from players. It has a `require` statement that checks if the value sent is `1 Ether`. If the requirement is met, the player's address is added to the `"players"` array.

**Picking a Winner**

The `pickWinner()` function is a `public` function that allows the contract `owner` to select a `winner` from the `players` array. The function has two require statements that check if the contract owner is calling the function and if there are at least `3 players` in the lottery. It then uses the `random()` private function to generate a random number and selects a winner by taking the modulus of the random number and the number of players. The winner's address is then transferred the balance of the contract.

The code uses the `modulo operator (%)` to determine the index by taking `randomNumber` modulo the length of the players array. This ensures that the index is always within the bounds of the array, so that a valid `player` address can be retrieved. The code then uses this index to get the address of the winner from the players array and assigns it to the winner variable.

The `modulo operator (%)` calculates the remainder when one number is divided by another. For example, if you have `10 players` in the players array and the random number generated is `15`, the index would be calculated as `15 % 10 = 5`. This means that the `5th player` in the array would be selected as the winner because `15` divided by `10` equals `1` with a remainder of `5`. The modulo operator is used in this case to determine the index of the winner within the players array, by taking the random number and calculating the remainder when it is divided by the length of the players array.

**Generating Random Numbers**

A random number is generated using the` random()` private view function. The function uses the `keccak256` hash function to generate the random number, which takes the `block.difficulty`, `block.timestamp`, and `players.length` as input. The `abi.encodePacked()` function is then used to pack these inputs into a single byte array, which is then passed as input to the `keccak256` function. The function returns a `32 byte` array, which is then casted to a `uint` using `uint()`.


<div class="doc-note">
	<p class="alert alert-danger">
      It is important to note that the method used to generate a random number in this contract is for demonstration purposes only and should not be used in production projects as it may not provide true randomness.
    </p>
</div>

**Checking Balance**

The `getBalance()` function is a `public` `view` function that allows the contract owner to view the balance of the contract. It has a `require` statement that checks if the contract owner is calling the function.

**Resetting the Game**

The `resetGame()` function is a `private` function that is called after the `winner` is picked, and it resets the `"players"` array to an empty array.

## Output
We are deploying the contract through the first account on `Remix IDE`, which will be the owner of the contract. Other accounts will be considered as players who participate in the `lottery game`.

<center><img class="image" src="./assets/images/accounts-dropdown.JPG"></center>
<b><center class="img-label">Accounts</center></b>

The contract is initialized with default values and a `zero` balance. Using the four player accounts, we sent `1 ether` each to the contract as participation. To do this, we inserted `1 ether` in the value section on `Remix IDE` and clicked the `"Transact"` button, which executed the `"receive"` function and updated the players' array. 

<center><img class="image" src="./assets/images/lottery-game-1.JPG"></center>
<b><center class="img-label">Output</center></b>
All of this was done using the `player` accounts, resulting in a total of `4 ether` in the contract and a reduction of `1 ether` from each player's account.

Navigate to the owner's account, and select the winner using the `"pickWinner"` function. This function will randomly choose an account address and send all funds to that address. The `"winner"` variable will be set to the winning address.

## Conclusion

This code provides a basic example of a decentralized lottery game built using smart contracts. It's a great starting point for anyone looking to create their own lottery game or to learn more about how smart contracts work.
