# Lottery Smart Contract

A lottery is a form of gambling in which players purchase tickets in the hope of winning a prize. The prizes are usually cash prizes, and the winners are chosen through a random selection process.

## Objectives
Here are the objectives of the decentralized lottery smart contract project rewritten in the context of the code:

- In this project, you will deploy the solidity contract on the Ethereum blockchain using tools such as Metamask and a test network.

- You will learn about the role of Metamask in interacting with the Ethereum blockchain and deploying smart contracts.

- You will also explore the role of test networks in testing and debugging smart contracts before deploying them on the main Ethereum network.

- Understand the process of testing and debugging a Solidity contract using tools such as Remix and a test network.

- Gain experience interacting with the contract using a web3 interface such as Metamask.

- Learn about the potential applications and limitations of decentralized lottery platforms.

## Goal

Our goal is to create a lottery contract that enables anyone to participate in a fair and transparent lottery game. The contract will have the following features:

- Players can enter the lottery by sending 1 ether as a bet, which will add their address to the players array and make them eligible to win the winnings.
- When the contract has received a sufficient number of bets, the manager can select a winner through a random number generator, which ensures a fair and transparent selection process.
- The contract will then transfer the total amount of bets (which is the contract's balance) to the winner's address.

Overall, the use of a random number generator in the selection process helps to ensure that the winner is chosen randomly and fairly.

## Algorithm or blueprint

- A contract is created and the address of the contract owner is stored in the owner variable.
- Players can participate in the lottery by sending 1 ether to the contract. Their address is added to the players array.
- The contract owner can call the pickWinner function to select a winner.
- The function checks that the contract owner is calling the function and that there are at least 3 players in the lottery.
- A random number is generated using the random function.
- The random number is used to select a player from the players array by finding the remainder of the random number divided by the length of the players array.
- The selected player's address is transferred the contract's balance.
- The players array is reset to an empty array using the resetGame function.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract LotteryGame {
    address owner;
    address payable[] public players;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        require(msg.value == 1 ether, "The bet must be 1 ether.");
        players.push(payable(msg.sender));
    }

    function pickWinner() public {
        require(msg.sender == owner, "Only the contract owner can pick a winner.");
        require(players.length >= 3, "There must be at least 3 players in the lottery.");

        uint randomNumber = random();
        uint index = randomNumber % players.length;
        address payable winnerAddress = players[index];

        winnerAddress.transfer(getBalance());
        resetGame();
    }

    function getBalance() public view returns (uint) {
        require(msg.sender == owner, "Only the contract owner can view the balance.");
        return address(this).balance;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function resetGame() private {
        players = new address payable[](0);
    }
}
```

//Learning :

mapping can not be clear. use clearfully it 
local variable == value;
true; working fine .
false;
