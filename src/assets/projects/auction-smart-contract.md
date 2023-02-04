
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Auction {
    // The address of the auction owner.
    address public owner;

    // // The item being auctioned.
    // string public item;

    struct Item {
        string name;
        uint highestBid;
        address highestBidder;
        uint startTime;
        uint endTime;
        bool isOpen;
    }

    Item[] public items;

    constructor(){
        owner = msg.sender;
    }

    function addItem(string memory _name, uint _startingBid, uint _endTime) public{
        uint startTime = block.timestamp;
        uint endTime = startTime + _endTime * 1 days;
        uint startingBid = _startingBid * 1 ether;
        Item memory newItem = Item(_name, startingBid, address(0), startTime, endTime, true);
        items.push(newItem);
    }

    function placeBid(uint _index) public payable{
        require(_index < items.length, "item does nto exist!");
        require(items[_index].isOpen, "This item bid is closed!");
        require(msg.value > items[_index].highestBid, "Bid should be grateher than highest bid");
        // Return the previous highest bidder's funds.
        if (items[_index].highestBidder != address(0)) {
            payable(items[_index].highestBidder).transfer(items[_index].highestBid);
        }
        // payable(msg.sender).transfer(_bid); // you make a mistake here. payable will do that to recevive money
        items[_index].highestBid = msg.value;
        items[_index].highestBidder = msg.sender;
    }

    function closeBid(uint _index) public returns(address){
        require(msg.sender == owner, "owner can only closed the bid.");
        require(_index < items.length, "Item doest not exist");
        require(items[_index].isOpen, "ALready closed!");
        items[_index].isOpen = false;
        return items[_index].highestBidder;
    }

    function extend(uint _index, uint _extendTime) public{
        require(msg.sender == owner, "owner can only extend the bid.");
        require(_index < items.length, "Item doest not exist");
        require(items[_index].isOpen, "ALready closed!");
        require(block.timestamp <= items[_index].endTime, "The auction has already ended.");
        items[_index].endTime += _extendTime * 1 days;
    }

    function cancelBid(uint _index) public payable{
        require(msg.sender == owner, "owner can only cancel the bid.");
        require(_index < items.length, "Item doest not exist");
        require(items[_index].isOpen, "The auction has ended , now you cant cancel it");
        payable(items[_index].highestBidder).transfer(items[_index].highestBid);
    }

}
```

// Conscieous about for loop, may u can use loop in UI side. here u just use the index.

//array delete will remove the element of just update to zero :( its not felted , its just insert the data by default values