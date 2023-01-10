# A simple voting contract

This contract could allow a group of people to vote on a single decision. It could have functions to add options, cast votes, and tally the results.


```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Voting {
  struct Association {
    string name;
    uint votes;
  }

  Association[] public associations;
  address[] private voters;
  bool public votingOpen;
  address public owner;

  constructor() {
    owner = msg.sender;
    votingOpen = true;
  }

  function addAssociation(string memory _name) public {
    require(!associationExists(_name), "Association already exists! Choose a unique name.");
    Association memory association = Association(_name, 0);
    associations.push(association);
  }

  function associationExists(string memory _name) private view returns (bool) {
    for (uint i = 0; i < associations.length; i++) {
      bytes4 hashedString = bytes4(keccak256(abi.encodePacked(associations[i].name)));
      bytes4 hashedSearchString = bytes4(keccak256(abi.encodePacked(_name)));
      if (hashedString == hashedSearchString) {
        return true;
      } 
    }
    return false;
  }

  function vote(uint _index) public {
    require(_index < associations.length, "Invalid association selected.");
    require(!voterExists(), "You have already voted.");
    require(votingOpen, "Voting is over.");
    voters.push(msg.sender);
    associations[_index].votes++;
  }

  function voterExists() private view returns (bool) {
    for (uint i = 0; i < voters.length; i++) {
      if (voters[i] == msg.sender) {
        return true;
      }
    }
    return false;
  }

  function getTotalVotes() public view returns (uint) {
    uint countVotes = 0;
    for (uint i = 0; i < associations.length; i++) {
      countVotes += associations[i].votes;
    }
    return countVotes;
  }

  function endVoting() public {
    require(owner == msg.sender, "Only the owner can close the voting.");
    require(votingOpen, "Voting is already closed.");
    votingOpen = false;
  }
}

//mistake i did:
//1. used new keyword with newOption, what we called it , is it object ?
//you can compare string to string in solidity becuz of different location.
//2. TypeError: Operator == not compatible with types string storage ref and string memory.
```