# Voting Smart Contract

`Voting` is a fundamental aspect of democracy, and it is essential for decision-making in any organization. With the advent of blockchain technology, it is now possible to create decentralized voting systems that are transparent, secure, and tamper-proof.

## Goals and Objectives

The objective of the` Voting Smart Contract` is to establish a decentralized and fair voting system. The contract aims to accomplish the following goals:

- Enable the public to create `associations` on the contract. For example, three associations can be created, named `Avengers`, `Sunrisers`, and `Thunderbirds`. `Associations` are groups of individuals or entities with a common goal or interest.
- Allow `voters` to take part in the voting process by casting their votes for the above-mentioned associations. Certain conditions apply, such as voters being able to vote only when the voting is open and only being able to vote once and for existing associations.
- Allow the public to check the total number of votes cast.
- Allow the `owner` to end the voting and announce the association that received the most votes as the winner.

## Code Implementation

The first step in creating a `voting smart contract` is to define the structure of the contract. In our example, we will be creating a contract for voting for different associations. The contract will have a struct called `Association` that will hold the name of the `association` and the number of votes it has received.

```sol
struct Association {
    string name; // name of the association
    uint votes; // number of votes received by the association
}
```

In the next step, we will establish an array known as `associations` to store all the associations that are eligible for voting. Furthermore, we will create an array known as `voters` to keep track of the addresses of the voters and ensure that each voter can only cast one vote. This array is designated as private, which means that it cannot be accessed by anyone other than the smart contract itself.

```sol
Association[] public associations; // array of all associations
address[] private voters; // list of addresses of voters
```

We will also establish a flag named `votingOpen` to indicate whether the voting is currently open or closed. Upon deployment of the contract, the `votingOpen` flag will be set to `true`, signifying that voting is `open`. Once the owner ends the voting process, the `votingOpen` flag will be changed to `false`, indicating that voting is `closed`. This variable is designated as `public`, which means that anyone can check the status of the voting process at any time.

```sol
bool public votingOpen; // flag to check if voting is open or closed
```

The `owner` variable stores the address of the user who deployed the contract and has the permission to close the voting.

```sol
address public owner; // address of the owner of the contract
```

The `winner` variable stores the name of the association that received the most votes. This variable is marked as `public` so that anyone can check who is winner after end of the vote.

```sol
string public winner; // name of the association with the most votes
```

The next step is to create the `constructor` function. The `constructor` function is executed when the contract is deployed and sets the `owner` variable to the address of the user who deployed the contract and sets the `votingOpen` flag to `true`.

```sol
constructor() {
    owner = msg.sender; // set the owner of the contract as the msg.sender
    votingOpen = true; // set votingOpen flag to true
}
```

We will also create a function called `addAssociation` that will allow users to add a new `association` to the contract. This function takes in a single parameter, `_name`, which is the name of the association being added. The function starts by checking if an `association` with the same name already exists using the `associationExists` function. If an association with the same name already exists, the function throws an error message `"Association with this name already exists."`. If the association name is unique, the function then creates a new `association` using the given name and sets the number of votes to `0`.

The new `association` is then added to the `associations` array which stores all the `associations`. This allows the contract to keep track of all the `associations` that have been added and their `vote` counts. This function is useful for anybody to add new `associations` to the contract for voting.

```sol
function addAssociation(string memory _name) public {
  // check if an association with the same name already exists
  require(!associationExists(_name), "Association with this name already exists.");
  // create a new association with the given name and 0 votes
  Association memory newAssociation = Association(_name, 0);
  // add the new association to the list of associations
  associations.push(newAassociation);
}
```

The next step is to create the `associationExists` function, which will be invoked from the `addAssociation` function, and it will verify if an association with a specific name already exists within the contract. This function is used to check if an association with a specific name already exists in the smart contract by comparing the input name with the names of all associations stored in the contract and returning `true` if a match is found or `false` otherwise. The purpose of this function is to ensure that only unique `association` names are added to the contract.

```sol
function associationExists(string memory _name) private view returns (bool) {
    // loop through all existing associations
    for (uint i = 0; i < associations.length; i++) {
        // hash the name of the current association and the searched name
        bytes4 hashedString = bytes4(keccak256(abi.encodePacked(associations[i].name)));
        bytes4 hashedSearchString = bytes4(keccak256(abi.encodePacked(_name)));
        // check if the hashed name of the current association matches the hashed searched name
        if (hashedString == hashedSearchString) {
            return true; // association with the same name already exists
        } 
    }
    return false; // association with the given name does not exist
}
```

It starts by taking an input, a string variable named `_name`, which is the name of the `association` that we want to check for. This input is passed to the function when it is called.

The function then loops through an array called `associations`, which contains all the `associations` that have been created. For each association in the array, the function takes the name of the association and uses the `keccak256` function to hash it. This function is a commonly used cryptographic hash function and it is used to create a unique fixed-size output (in this case, a bytes4) from any input.

The function then takes the input string `_name` and hashes it as well, using the same `keccak256` function. It then compares the hashed version of the input `name` with the hashed version of the current `association name` in the loop.

<div class="doc-note">
	<p class="alert alert-primary"><b>Note:</b> In Solidity, strings cannot be compared directly using the usual comparison operators (e.g. ==, !=, >, <, etc.). Instead, one way to compare strings is by using the keccak256() function to hash the strings and then comparing the resulting hash values.</p>
</div>

If the two hashed values match, it means that an `association` with the same name as the input already exists, so the function returns `true`. If the loop finishes running without finding a match, it means that no association with the same name exists, and the function returns `false`.

The next step is to create the `vote` function which allows users to vote for an `association`. This function takes in an `integer` called `_index` which is the index of the `association` that the user wants to vote for. It checks if voting is `open`, if the selected association is valid and if the user has already voted. If all these conditions are met, it adds the user's address to the `voters` array and increases the `vote` count for the selected `association`.

```sol
function vote(uint _index) public {
    // Check if voting is open. If not, throw error message
    require(votingOpen, "Voting is closed.");
    // Check if the selected association index is within the range of the associations array. If not, throw error message.
    require(_index < associations.length, "Invalid association selected.");
    // Check if the voter has already voted. If so, throw error message.
    require(!voterExists(msg.sender), "You have already voted.");
    // Add the voter's address to the voters array
    voters.push(msg.sender);
    // Increase the vote count for the selected association
    associations[_index].votes++;
}
```

The next step is to create the `voterExists` function, which is invoked from the `vote` function, it is used to determine if an individual `voter` has already casted a `vote`. The function scans through the `voters` array and examines if the address of the `voter (msg.sender)` is present in the `array`. The `for` loop is used for this process. The loop starts at index `0` and continues through all the indexes of the array until it reaches the end of the `voters` array. Within the loop, it checks if the address of the current `voter` (indicated by "voters[i]") is equal to the address of the current message sender (indicated by "msg.sender"). If the `voter's` address is found, the function returns `true`, indicating that the voter has already voted. If it is not found, the function returns `false`, indicating that the `voter` has not yet voted.

```sol
    function voterExists() private view returns (bool) {
        // Iterate through the voters array to check if the voter has already voted
        for (uint i = 0; i < voters.length; i++) {
            if (voters[i] == msg.sender) {
                return true;
            }
        }
        // If the voter's address is not found in the voters array, return false
        return false;
    } 
```

The next step is to implement the `getTotalVotes` function, which will return the total number of votes cast in the current voting process. The function does this by iterating through all the associations and adding their respective vote counts to a variable named `countVotes`. The function then returns the final total number of votes.

```sol
    function getTotalVotes() public view returns (uint) {
        // variable to store the total number of votes
        uint countVotes = 0;
        // loop through all the associations and add their number of votes to the countVotes variable
        for (uint i = 0; i < associations.length; i++) {
            countVotes += associations[i].votes;
        }
        // return the total number of votes
        return countVotes;
    }
```

The next step is to create the `endVoting` function, which allows the `owner` of the contract to close the voting process. This function first checks if the `message sender (msg.sender)` is the `owner` of the contract using an `require` statement. If the message sender is not the `owner`, the function will throw an error message `"Only the owner can close the voting."`.
Then it checks if the voting is currently open using another `require` statement with `votingOpen` flag. If the voting is already `closed`, it throws an error message `"Voting is already closed."`.
If both the above conditions are met, the function sets the `votingOpen` flag to `false`, which indicates that the voting process is `closed`. Finally, it calls the `getWinner` function which selects the association with the highest number of votes as the `winner` of the voting process.

```sol

    function endVoting() public {
        // Check if the msg.sender is the owner of the contract
        require(owner == msg.sender, "Only the owner can close the voting.");
        // Check if voting is open
        require(votingOpen, "Voting is already closed.");
        // Set votingOpen flag to false
        votingOpen = false;
        // Get the winner of the voting
        winner = getWinner();
    }
    
```

Finally, The function `getWinner` is a `private view` function which returns the name of the association with the most votes. The function is declared as `private`, meaning that it can only be called within the smart contract, and `view`, meaning that it does not modify the state of the contract.

```sol
function getWinner() private view returns(string memory){
    // Initialize variables to store the max votes and index of the association with max votes
    uint maxVotes = 0;
    uint maxIndex;
    // Iterate through all the associations
    for(uint i=0; i<associations.length; i++){
        // Check if the current association has more votes than the previous max
        if(associations[i].votes > maxVotes){
            // Update maxVotes and maxIndex
            maxVotes = associations[i].votes;
            maxIndex = i;
        }
    }
    // Return the name of the association with the most votes
    return associations[maxIndex].name;
} 
```

The function starts by initializing two variables, `maxVotes` and `maxIndex` to store the number of votes and index of the association with the most votes. It then iterates through all the association in the `associations` array. For each `association`, it checks if the number of votes for that `association` is greater than the previous max number of votes. If it is, the function updates the `maxVotes` and `maxIndex` variables with the number of votes and index of that association.

After the loop, it returns the name of the `association` with the most votes by using the `maxIndex` variable to access the correct association in the `associations` array. This function allows the smart contract to determine which `association` has the most votes, and to return the name of that `association`.

## Full Code Snippet

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Voting {
    struct Association {
        string name; // name of the association
        uint votes; // number of votes received by the association
    }

    Association[] public associations; // array of all associations
    address[] private voters; // list of addresses of voters
    bool public votingOpen; // flag to check if voting is open or closed
    address public owner; // address of the owner of the contract
    string winner; // name of the association with the most votes

    constructor() {
        owner = msg.sender; // set the owner of the contract as the msg.sender
        votingOpen = true; // set votingOpen flag to true
    }

    // function to add a new association to the contract
    function addAssociation(string memory _name) public {
        // check if an association with the same name already exists
        require(!associationExists(_name), "Association with this name already exists.");
        // create a new association with the given name and 0 votes
        Association memory association = Association(_name, 0);
        // add the new association to the list of associations
        associations.push(association);
    }

    // function to check if an association with the given name already exists
    function associationExists(string memory _name) private view returns (bool) {
        // loop through all existing associations
        for (uint i = 0; i < associations.length; i++) {
            // hash the name of the current association and the searched name
            bytes4 hashedString = bytes4(keccak256(abi.encodePacked(associations[i].name)));
            bytes4 hashedSearchString = bytes4(keccak256(abi.encodePacked(_name)));
            // check if the hashed name of the current association matches the hashed searched name
            if (hashedString == hashedSearchString) {
                return true; // association with the same name already exists
            } 
        }
        return false; // association with the given name does not exist
    }

    function vote(uint _index) public {
        // Check if voting is open. If not, throw error message
        require(votingOpen, "Voting is closed.");
        // Check if the selected association index is within the range of the associations array. If not, throw error message.
        require(_index < associations.length, "Invalid association selected.");
        // Check if the voter has already voted. If so, throw error message.
        require(!voterExists(), "You have already voted.");
        // Add the voter's address to the voters array
        voters.push(msg.sender);
        // Increase the vote count for the selected association
        associations[_index].votes++;
    }

    function voterExists() private view returns (bool) {
        // Iterate through the voters array to check if the voter has already voted
        for (uint i = 0; i < voters.length; i++) {
            if (voters[i] == msg.sender) {
                return true;
            }
        }
        // If the voter's address is not found in the voters array, return false
        return false;
    } 
    
    function getTotalVotes() public view returns (uint) {
        // variable to store the total number of votes
        uint countVotes = 0;
        // loop through all the associations and add their number of votes to the countVotes variable
        for (uint i = 0; i < associations.length; i++) {
            countVotes += associations[i].votes;
        }
        // return the total number of votes
        return countVotes;
    }

    function endVoting() public {
        // Check if the msg.sender is the owner of the contract
        require(owner == msg.sender, "Only the owner can close the voting.");
        // Check if voting is open
        require(votingOpen, "Voting is already closed.");
        // Set votingOpen flag to false
        votingOpen = false;
        // Get the winner of the voting
        winner = getWinner();
    }
    
    function getWinner() private view returns(string memory){
        // Initialize variables to store the max votes and index of the association with max votes
        uint maxVotes = 0;
        uint maxIndex;
        // Iterate through all the associations
        for(uint i=0; i<associations.length; i++){
            // Check if the current association has more votes than the previous max
            if(associations[i].votes > maxVotes){
                // Update maxVotes and maxIndex
                maxVotes = associations[i].votes;
                maxIndex = i;
            }
        }
        // Return the name of the association with the most votes
        return associations[maxIndex].name;
    } 
}
```
## Output

<center><img class="image" src="./assets/images/voting-project-accounts.JPG"></center>
<b><center class="img-label">Accounts</center></b>

The contract has been deployed using the first account, making it the owner of the contract. The owner has the ability to add associations, so we are initially adding three associations named Avengers, Sunrisers, and Thunderbirds. Other individuals can also add more associations, but for now, we are adding them through the owner account. Other accounts will be used as voters.

<center><img class="image" src="./assets/images/voting-project-output.JPG"></center>
<b><center class="img-label">Output</center></b>

Voters can cast their vote by using the vote input field and selecting an association by its index number. The function "getTotalVotes" can be used to check the total number of votes cast. The status of the voting process can also be checked by looking at the "votingOpen" flag, which is currently set to "true" indicating that voting is open.

<center><img class="image" src="./assets/images/voting-project-err.JPG"></center>
<b><center class="img-label">Error</center></b>

If an individual attempts to vote multiple times, the contract will not allow it and will throw an error message.

<center><img class="image" src="./assets/images/voting-winner.JPG"></center>
<b><center class="img-label">Winner</center></b>

Once the voting is complete, the owner can end the voting process. After ending the voting process, the "winner" variable can be checked to see which association received the most votes.

<!-- ## Code Optimization -->

## Conclusion

The use of smart contracts for voting systems is a rapidly growing area of interest and has the potential to revolutionize the way we vote. By providing a tamper-proof and transparent system, smart contracts can ensure that the voting process is fair and accurate.

This tutorial has provided a comprehensive guide on how to create a voting smart contract in Solidity. We have covered the basics of smart contracts, the key features a voting contract should have, and the steps needed to implement it. By following this tutorial, you should now have a good understanding of how to create your own voting smart contract and be well on your way to creating your own decentralized voting system.

## Questions:

1. Why Direct Comparison of Strings is not Possible in Solidity.

Strings are stored as arrays of bytes and cannot be directly compared to other strings. Instead, the bytes of the two strings must be compared element by element. Additionally, in order to compare strings in Solidity, it is necessary to use a comparison function, such as keccak256() or sha3(), to generate a hash of the string and compare the hash values.
