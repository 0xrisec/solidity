# Auction Smart Contract

`Auction smart contracts` are transforming the `traditional auction system` with the power of blockchain technology. These decentralized programs automate the bidding process, providing transparency, immutability, and security to the auction. In this comprehensive guide, we will explore what `auction smart contracts` are, gain a basic understanding of how they work, and see how to code a smart contract for an auction. Furthermore, we will examine the potential use cases of these innovative contracts in real-world scenarios. Get ready to dive into the world of `auction smart contracts`!

## Goals and Objectives

The `Auction Smart Contract` is designed to provide a decentralized and fair platform for conducting auctions. The following goals are set to achieve this objective:

**1. Auction Creation:** The `smart contract` enables individuals to establish auctions by creating items for `bidding`. These items can be anything, such as `Art`, `Jewelry`, and `Cars`. The individual who creates the bid becomes the `owner` of that item.

**2. Bid Participation:** `Bidders` can participate in the auction by placing their bids for the available items. The conditions for bidding include the auction being `open`, the `bid` being greater than the current highest `bid`. If `bid` is grater than current highest `bid` return the previous highest `bidder's` funds and then set the new highest `bid` and new highest `bidder` for the item.

**3. Extend Auction Time:** The end time for the `item` is updated by adding the extend time to it.Only the item `owner` can extend the `auction`, but certain conditions must be met first: 
- The extend time must be greater than `zero`, 
- The extend time must not exceed `7 days`, and 
- The auction for the item must not have ended. 

**4. Auction Close and Winner Announcement:** `"Closing the bidding"` refers to ending the auction and announcing the highest `bidder` as the `winner`. The conditions for closing the bidding include the bidding not already being closed and only the item `owner` can initiate the closing.

**5. Bid Cancellation:** `"Cancelling a bid"` signifies the removal of a bid made in the `auction`. To cancel a `bid`, the `bid` must have been placed and only the item `owner` can initiate the cancellation. Once the `bid` is cancelled, the highest `bid` and highest `bidder` will be reset to 0 and address(0), respectively.

The difference between the two is that closing the bidding marks the end of the auction and determines the winner, while cancelling a bid removes a specific `bid` from the auction.

## Code Implementation

The foundation of building an auction `smart contract` is to determine its structure. In this case, the `contract` is designed to host auctions for various `items`. The structure, named `"Item"`, serves as a container to store information about each item that's being auctioned. The fields within the `"Item"` structure include the `item's name`, the `highest bid` received, the address of the `highest bidder`, the start and end `time` of the auction, a flag to indicate if the auction is open for bidding, and the `owner` of the item. This organized data enables the `smart contract` to effectively manage the bidding process for each item in the auction.

```sol
// Struct to hold the details of each item being auctioned
struct Item {
    // The name of the item
    string name;
    // The current highest bid for the item
    uint highestBid;
    // The address of the highest bidder for the item
    address highestBidder;
    // The start time of the auction for the item
    uint startTime;
    // The end time of the auction for the item
    uint endTime;
    // Boolean to indicate if the auction is open for bidding
    bool isOpen;
    // The owner of the item being auctioned.
    address itemOwner;
}
```

The next step is to define an array named `items` to hold all the items that are up for auction. This `array`, declared as `public`, means that it can be accessed by anyone. The `items` array serves as a record of all the items being auctioned in the contract and allows for easy tracking of the bidding process for each item.

```sol
// An array to hold all items being auctioned
Item[] public items;
```

In the next step, we will establish modifier `onlyOwner`. The modifier `onlyOwner` is used to restrict certain actions to the `owner` of a specific item. It takes an input parameter `index` which represents the index of the item in the `items` array. Inside the modifier, it uses the `require` function to check if the `sender` of the message (the person trying to perform the action) is the same as the `owner` of the item at the specified `index`. If the check fails, it returns an error message `"Only the item owner can perform this action."` This modifier can be used with other functions in the contract to restrict access to only the item `owner` when attempting to `close`, `cancel`, or `extend` the bid.

```sol
// A modifier to only allow the owner to perform certain actions
modifier onlyOwner(uint _index) {
    require(msg.sender == items[_index].itemOwner, "Only the item owner can perform this action.");
    _;
}
```

The next step is to create a function `addItem` that adds a new item to an `auction`. The function takes three input parameters:

**1.** `_name:` A string that represents the name of the `item`.

**2.** `_startingBid:` An `unsigned integer` that represents the starting bid of the `item`.

**3.** `_endTime:` An `unsigned integer` that represents the end time of the auction in `days`.

We will also create several checks before adding the new item to an array:

**1.** The first check makes sure that the `_startingBid` is greater than `zero`. If the check fails, an error message of `"Starting bid must be greater than zero"` will be returned.

**2.** The second check ensures that the `_endTime` is less than or equal to `7 days`. If the check fails, an error message of `"End time must be less than or equal to 7 days"` will be returned.

If both checks pass, the function creates a new item using the `Item` struct and adds it to the `items` array. The new `item` is constructed by several arguments:

**1.** `_name:` A string value for the name of the item.

**2.** `_startingBid * 1 ether:` A value for the starting bid, calculated as the argument `_startingBid` multiplied by `1 ether`, assigned to the `highestBid` field of the `struct`.

**3.** `address(0):` The `address 0`, which represents an empty `address` in Ethereum, assigned to the `highestBidder` field of the `struct`

**4.** `block.timestamp:` The `timestamp` of the current block, assigned to the `startTime` field of the `struct`

**5.** `block.timestamp + _endTime * 1 days:` The end `time` of the `auction`, calculated as the current block `timestamp` plus the `number of days` specified by the argument `_endTime`, assigned to the `endTime` field of the `struct`.

**6.** `true:` A `boolean` value set to `true`, assigned to the `isOpen` field of the `struct`.

**7.** `msg.sender:` The `address` of the message sender, which is the contract's caller, assigned to the `itemOwner` field of the `struct`.

Once the fields are initialized, the resulting `struct` instance is assigned to the variable `newItem`. The `newItem` is then added to the `items` array.

```sol
// Function to add a new item to the auction
function addItem(string memory _name, uint _startingBid, uint _endTime) public{
    // Check if the starting bid is greater than zero
    require(_startingBid > 0, "Starting bid must be greater than zero");
    // Check if the end time is less than or equal to 7 days
    require(_endTime <= 7 days, "End time must be less than or equal to 7 days");
    // Create a new item with the provided details and add it to the array
    Item memory newItem = Item(_name, _startingBid * 1 ether, address(0), block.timestamp, block.timestamp + _endTime * 1 days, true, msg.sender);
    items.push(newItem);
}
```

In the next step, we will establish a function `placeBid` that allows a user to place a `bid` on an `item`. The function takes an argument `_index` which is the `index` of the `item` being `bid` on. The function performs several checks before accepting the `bid`:

**1.** It checks if the item exists by comparing the `_index` argument with the length of the items array. If the `index` is greater than or equal to the length of the `items` array, the function will revert with an error message `"item does not exist!"`.

**2.** It checks if the auction for the item is still open by calling the itemStatus function with `_index` as an argument. If the `itemStatus` function returns `false`, the function will revert with an error message `"This item bid is closed!"`.

**3.** It checks if the `bid` value (`msg.value`) is greater than the current highest `bid` for the `item`. If not, the function will revert with an error message `"Bid must be greater than the current highest bid"`.

If all the checks pass, the function proceeds to execute the following steps:

**1.** If the previous highest bidder exists (`highest bidder's address` is not equal to `address(0)`), we need to return the previous highest `bidder's` funds using the `transfer` function. This is done to return the funds to the previous highest `bidder` in the event that they are no longer the highest `bidder`, due to a new `bid` being placed.

**2.** The function updates the `highestBid` and `highestBidder` properties of the item to reflect the new `bid`. The new `highestBid` is set to `msg.value` (the `bid` value sent by the user) and the new `highestBidder` is set to `msg.sender` (the `address` of the user who placed the `bid`).

```sol
// Function to allow a user to place a bid on an item
function placeBid(uint _index) public payable{
    // Check if the item exists
    require(_index < items.length, "item does not exist!");
    // Check if the auction for the item is still open
    require(itemStatus(_index), "This item bid is closed!");
    // Check if the bid is greater than the current highest bid
    require(msg.value > items[_index].highestBid, "Bid must be greater than the current highest bid");
    // Return the previous highest bidder's funds if they exist
    if (items[_index].highestBidder != address(0)) {
        payable(items[_index].highestBidder).transfer(items[_index].highestBid);
    }
    // Set the highest bid and highest bidder for the item
    items[_index].highestBid = msg.value;
    items[_index].highestBidder = msg.sender;
}
```

In the next step, We will create a function called `itemStatus`. The purpose of the `itemStatus` function is to monitor the status of an auction `item` and update it accordingly. It takes in an `_index` argument which identifies the `item` in the `items` array. The function checks if the auction time has ended by comparing the `endTime` of the `item` with the current block `timestamp`. If the auction time is over, the function updates the status of the auction by setting its `isOpen` property to `false`, sending the highest bid amount to the item `owner` using the `sendBid` function, and assigning the new `owner` to the highest `bidder`. The final step is to return the current status of the auction (whether it is `open` or `closed`) by accessing the `isOpen` property of the `item`.

```sol
// Function to check the status of an auction
function itemStatus(uint _index) private returns(bool){
    // Check if the auction is still open and the end time has not been reached
    if(items[_index].isOpen && items[_index].endTime < block.timestamp){
        items[_index].isOpen = false;
        sendBid(_index);
        items[_index].itemOwner = items[_index].highestBidder;
    }
    // Return the status of the auction
    return items[_index].isOpen;
}
```

The `sendBid` function is a `private` function that is used to send the highest bid for an auction item to its `owner`. It takes a single argument `_index`, which represents the `index` of the `item` in the `items` array.

The function transfers the highest `bid` amount stored in the `items[_index].highestBid` variable to the `item owner`, as specified by the `items[_index].itemOwner` address. The transfer is done using the `transfer` method from the `payable` modiefier, which allows for sending `Ether` from the contract to an external Ethereum address.

```sol
function sendBid(uint _index) private{
    payable(items[_index].itemOwner).transfer(items[_index].highestBid);
}
```

In the next step, we will establish a function named `extendBid` that extends the end time of an auction for a specific `item`. The function has two input parameters: `_index` (the `index` of the item in an array named `items`) and `_extendTime` (the time in `days` by which to extend the auction).

The function has several checks to ensure the auction is still valid and can be extended:

**1.** It checks if the `item` exists in the items array using a `require` statement with a condition `_index < items.length`. If the condition is not met, an error message `"Item does not exist"` is thrown.

**2.** It verifies if the auction for this `item` has ended using the `itemStatus` function and a `require` statement with a condition `itemStatus(_index)`. If the condition is not met, an error message `"The auction has ended."` is thrown.

**3.** It checks if the `_extendTime` is greater than `zero` using a `require` statement with a condition `_extendTime > 0`. If the condition is not met, an error message `"Extend time must be greater than zero"` is thrown.

If all the checks pass, the function extends the end time of the auction by adding `_extendTime * 1 days` to `items[_index].endTime`.

The function should be restricted to be called only by the `owner` of the `smart contract` using the `onlyOwner` modifier.

```sol
/**
* extendBid - Function to extend the auction time for a particular item.
*
* @param _index      - Index of the item in the `items` array
* @param _extendTime - The time, in days, to extend the auction by.
*/
function extendBid(uint _index, uint _extendTime) public onlyOwner(_index) {
    // Check if the item exists in the `items` array
    require(_index < items.length, "Item doest not exist");

    // Check if the auction for this item has ended.
    require(itemStatus(_index), "The auction has ended.");

    // Check if the extend time is greater than zero
    require(_extendTime > 0, "Extend time must be greater than zero");

    // Add the extend time to the item's endTime
    items[_index].endTime += _extendTime * 1 days;
}
```

In the next step, we will establish a function named `closeBid` that closes the bidding for a specific `item` and returns the `address` of the `highest bidder` for that `item`. The function has one input parameter: `_index` (the index of the `item` in an array named `items`).

The function has several checks to ensure the bidding process can be closed:

**1.** It checks if the `item` exists in the items array using a `require` statement with a condition `_index < items.length`. If the condition is not met, an error message `"Item does not exist"` is thrown.

**2.** It verifies if the bidding is still open for the `item` using the `itemStatus` function and a `require` statement with a condition `itemStatus(_index)`. If the condition is not met, an error message `"Bid is already closed"` is thrown.

If all the checks pass, the function sets the status of the `item` to closed by setting `items[_index].isOpen = false`, then calls the `sendBid` function with `_index` as input and sets `items[_index].itemOwner` to `items[_index].highestBidder`. Finally, the function returns the `address` of the highest `bidder` stored in `items[_index].highestBidder`.

The function is restricted to be called only by the `owner` of the `smart contract` using the `onlyOwner` modifier.

```sol
// This function is used to close the bidding for a particular item
// The function can only be executed by the owner of the auction contract
// The function takes an item index as input and returns the address of the highest bidder for that item
function closeBid(uint _index) public onlyOwner(_index)  returns(address){
    // Check if the item exists or not
    require(_index < items.length, "Item doest not exist");
    // Check if the bidding is still open for the item
    require(itemStatus(_index), "Bid is already closed");
    // Set the status of the item to closed
    items[_index].isOpen = false;
    sendBid(_index); 
    items[_index].itemOwner = items[_index].highestBidder;
    // Return the address of the highest bidder
    return items[_index].highestBidder;
}
```

In the next step, we will establish a function named `cancelBid` that cancels a `bid` for a specific `item`. The function has one input parameter: `_index` (the `index` of the `item` in an array named `items`).

The function has several checks to ensure a `bid` can be canceled:

**1.** It checks if the item exists in the auction using a require statement with a condition _index < items.length. If the condition is not met, an error message `"Item does not exist"` is thrown.

**2.** It verifies if the `auction` for the item is still `open` using the `itemStatus` function and a `require` statement with a condition `itemStatus(_index)`. If the condition is not met, an error message `"The auction is closed, cannot cancel bid"` is thrown.

**3.** It checks if a `bid` has been placed for the `item` using a `require` statement with a condition `"items[_index].highestBidder != address(0)"`. If the condition is not met, an error message `"No bids placed, cannot cancel bid"` is thrown.

If all the checks pass, the function transfers the highest `bid` for the item back to the highest bidder using `payable(items[_index].highestBidder).transfer(items[_index].highestBid)` and then resets the highest `bid` and the highest `bidder` to `0` and `address(0)` respectively.

The function is restricted to be called only by the `owner` of the `smart contract` using the `onlyOwner` modifier.

```sol
// This function cancels a bid in the auction
function cancelBid(uint _index) public onlyOwner(_index){
    // Check if the item exists in the auction
    require(_index < items.length, "Item doest not exist");
    // Check if the auction for the item is still open
    require(itemStatus(_index), "The auction is closed, cannot cancel bid");
    // Check if a bid has been placed for the item
    require(items[_index].highestBidder != address(0), "No bids placed, cannot cancel bid");
    // Transfer the highest bid to the highest bidder
    payable(items[_index].highestBidder).transfer(items[_index].highestBid);
    // Reset the highest bid and the highest bidder to 0 and address(0) respectively
    items[_index].highestBid = 0;
    items[_index].highestBidder = address(0);
}
```

## Full code snippet
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Auction {
    // Struct to hold the details of each item being auctioned
    struct Item {
        // The name of the item
        string name;
        // The current highest bid for the item
        uint highestBid;
        // The address of the highest bidder for the item
        address highestBidder;
        // The start time of the auction for the item
        uint startTime;
        // The end time of the auction for the item
        uint endTime;
        // Boolean to indicate if the auction is open for bidding
        bool isOpen;
        // The owner of the item being auctioned.
        address itemOwner;
    }

    // An array to hold all items being auctioned
    Item[] public items;
    
    // A modifier to only allow the owner to perform certain actions
    modifier onlyOwner(uint _index) {
        require(msg.sender == items[_index].itemOwner, "Only the item owner can perform this action.");
        _;
    }

    // Function to add a new item to the auction
    function addItem(string memory _name, uint _startingBid, uint _endTime) public{
        // Check if the starting bid is greater than zero
        require(_startingBid > 0, "Starting bid must be greater than zero");
        // Check if the end time is less than or equal to 7 days
        require(_endTime <= 7 days, "End time must be less than or equal to 7 days");
        // Create a new item with the provided details and add it to the array
        Item memory newItem = Item(_name, _startingBid * 1 ether, address(0), block.timestamp, block.timestamp + _endTime * 1 days, true, msg.sender);
        items.push(newItem);
    }
    
    // Function to allow a user to place a bid on an item
    function placeBid(uint _index) public payable{
        // Check if the item exists
        require(_index < items.length, "item does not exist!");
        // Check if the auction for the item is still open
        require(itemStatus(_index), "This item bid is closed!");
        // Check if the bid is greater than the current highest bid
        require(msg.value > items[_index].highestBid, "Bid must be greater than the current highest bid");
        // Return the previous highest bidder's funds if they exist
        if (items[_index].highestBidder != address(0)) {
            payable(items[_index].highestBidder).transfer(items[_index].highestBid);
        }
        // Set the highest bid and highest bidder for the item
        items[_index].highestBid = msg.value;
        items[_index].highestBidder = msg.sender;
    }

    // Function to check the status of an auction
    function itemStatus(uint _index) private returns(bool){
      // Check if the auction is still open and the end time has not been reached
      if(items[_index].isOpen && items[_index].endTime < block.timestamp){
        items[_index].isOpen = false;
        sendBid(_index);
        items[_index].itemOwner = items[_index].highestBidder;
      }
      // Return the status of the auction
      return items[_index].isOpen;
    }

    function sendBid(uint _index) private{
        payable(items[_index].itemOwner).transfer(items[_index].highestBid);
    }

    /**
    * extendBid - Function to extend the auction time for a particular item.
    *
    * @param _index      - Index of the item in the `items` array
    * @param _extendTime - The time, in days, to extend the auction by.
    */
    function extendBid(uint _index, uint _extendTime) public onlyOwner(_index) {
        // Check if the item exists in the `items` array
        require(_index < items.length, "Item doest not exist");

        // Check if the auction for this item has ended.
        require(itemStatus(_index), "The auction has ended.");

        // Check if the extend time is greater than zero
        require(_extendTime > 0, "Extend time must be greater than zero");

        // Add the extend time to the item's endTime
        items[_index].endTime += _extendTime * 1 days;
    }

    // This function is used to close the bidding for a particular item
    // The function can only be executed by the owner of the auction contract
    // The function takes an item index as input and returns the address of the highest bidder for that item
    function closeBid(uint _index) public onlyOwner(_index)  returns(address){
        // Check if the item exists or not
        require(_index < items.length, "Item doest not exist");
        // Check if the bidding is still open for the item
        require(itemStatus(_index), "Bid is already closed");
        // Set the status of the item to closed
        items[_index].isOpen = false;
        sendBid(_index); 
        items[_index].itemOwner = items[_index].highestBidder;
        // Return the address of the highest bidder
        return items[_index].highestBidder;
    }

    // This function cancels a bid in the auction
    function cancelBid(uint _index) public onlyOwner(_index){
        // Check if the item exists in the auction
        require(_index < items.length, "Item doest not exist");
        // Check if the auction for the item is still open
        require(itemStatus(_index), "The auction is closed, cannot cancel bid");
        // Check if a bid has been placed for the item
        require(items[_index].highestBidder != address(0), "No bids placed, cannot cancel bid");
        // Transfer the highest bid to the highest bidder
        payable(items[_index].highestBidder).transfer(items[_index].highestBid);
        // Reset the highest bid and the highest bidder to 0 and address(0) respectively
        items[_index].highestBid = 0;
        items[_index].highestBidder = address(0);
    }
}
```

## Output

<center><img class="image" src="./assets/images/auction-accounts.JPG"></center>
<b><center class="img-label">EOA(Externally Owned Accounts)</center></b>

The contract has been deployed by the first account (`0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`), which makes it the `owner` of the contract. Initially, the `owner` account will auction one item, the `Mona Lisa Painting`. Although any account can auction different items, for now, the items will be added through the contract `owner` account. Other accounts will be used as `bidders`.


<center><img class="image" src="./assets/images/auction-item.JPG"></center>
<b><center class="img-label">Add Auction Item</center></b>

The item can be found at the `0th` index of the items array. The output shows the attributes of the item, such as `name`, `highest bid`, `highest bidder`, `start time`, `end time`, `bidding status`, and `item owner`.

<center><img class="image" src="./assets/images/auction-item-0.JPG"></center>
<b><center class="img-label">Item Details</center></b>

Here is a brief explanation of the values displayed:

- **name:** This is the name of the item, in this case it is `"Mona Lisa Painting"`.
- **highestBid:** This is the highest bid for the item in wei, the value of `30000000000000000000 wei` is equivalent to `30 ether`.
- **highestBidder:** This is the address of the highest bidder for the item. Since no bids have been placed yet, it is displayed as `0x0000000000000000000000000000000000000000`, which is the `zero` address.
- **startTime:** This is the time in seconds since the epoch (`UNIX time`) when the auction for the item started. In this case, it is `1675439279`. This value can be converted to a human-readable date and time using an online tool, such as the one found at <a href="https://www.unixtimestamp.com/" target="_blank">here</a>.
- **endTime:** This is the time in seconds since the epoch (`UNIX time`) when the auction for the item will end. In this case, it is calculated as the `startTime + _endTime * 1 day` which is `1675871279`.
- **isOpen:** This is a boolean value indicating whether the bidding for the item is `open` or `closed`. In this case, it is `true`, meaning the bidding is `open`.
- **itemOwner:** This is the address of the owner of the item. In this case, it is `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4` which is the address of the account that added the item.

Next, we will switch to the second account, `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2`, which will be considered as the `bidder`. The `bidder` does not have the permission to `cancel`, `close`, or `extend` the bid, and attempting to do so will result in an error message stating `"Only the item owner can perform this action."`

<center><img class="image" src="./assets/images/auction-error.JPG"></center>
<b><center class="img-label">Unauthorized Action: Only Item Owner Can Cancel/Close/Extend Auction</center></b>

Next, we proceed to place a bid on the item at the `0th` index of the items array using the second account, which we'll consider as the bidder. The second account must place a bid that is higher than the current highest bid or it will receive an error saying `"Bid must be greater than the current highest bid". `

<center><img class="image" src="./assets/images/auction-bidding-error.JPG"></center>
<b><center class="img-label">Error: Bid must be greater than the current highest bid</center></b>

In this case, the second account places a bid of `40 ether`, which is higher than the current highest bid of `30 ether`. This results in the item's highest bid being updated to `40 ether` and the highest `bidder` being set to the second account's address, `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2`. Additionally, the second account's balance is reduced by `40 ether` and contract account balance is incresed by `40 ether`.

<center><img class="image" src="./assets/images/aution-placed-bid-status.JPG"></center>
<b><center class="img-label">Updated Item Details</center></b>
<center><img class="image" src="./assets/images/auction-contract-balance.JPG"></center>
<b><center class="img-label">Updated Smart Contract Account Balance</center></b>
<center><img class="image" src="./assets/images/auction-account-balance.JPG"></center>
<b><center class="img-label">Updated EOA Balance</center></b>

Next, we will use the third account (`0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db`) as another bidder and attempt to place a higher bid (`50 ether`), greater than the previous highest bid of 40 ether. If successful, the previous highest bid will be returned to its original highest bidder (`0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2`) and the contract's balance will decrease by `40 ether`. The new highest bid of `50 ether` will be placed and the contract's balance will be updated to reflect this change by adding `50 ether` to the contract account.

<center><img class="image" src="./assets/images/auction-new-high-bid.JPG"></center>
<b><center class="img-label">Updated Item Details</center></b>
<center><img class="image" src="./assets/images/auction-new-contract-balance.JPG"></center>
<b><center class="img-label">Updated Smart Contract Account Balance</center></b>
<center><img class="image" src="./assets/images/auction-updated-account-balance.JPG"></center>
<b><center class="img-label">Updated EOA Balance</center></b>

The item owner (`0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`) will then close the bid. The `isOpen` flag will be set to `false`, indicating that the bidding process is now closed. The item's ownership will then be transferred to the highest bidder, and all the bids for this item will be transferred to the former `owner's` account.

<center><img class="image" src="./assets/images/aution-close-bid.JPG"></center>
<b><center class="img-label">Updated Item Details</center></b>

<center><img class="image" src="./assets/images/auction-contract-balance-bidclose.JPG"></center>
<b><center class="img-label">Updated Smart Contract Account Balance</center></b>

<center><img class="image" src="./assets/images/auction-bid-close-account-balance.JPG"></center>
<b><center class="img-label">Updated EOA Balance</center></b>


## Conclusion

The use of `smart contracts` for `auction systems` is also a rapidly growing area of interest and has the potential to modernize the way we participate in auctions. `Smart contracts` offer benefits such as increased efficiency, security, and transparency for `auction systems`.

Here are some real-world examples of auction `smart contracts` in use:

**1. Art Blocks** - Art Blocks is a platform that utilizes `NFTs (Non-Fungible Tokens)` and `smart contracts` to conduct auctions for digital art. You can see their platform in action at <a href="https://artblocks.io/" target="_blank">here</a>

**2. OpenSea** - `OpenSea` is a `marketplace` for buying, selling, and discovering unique digital items, including `NFTs`. They have a section dedicated to auctioning off `NFTs`, and their platform is powered by `smart contracts`. Visit their website at <a href="https://opensea.io/" target="_blank">here</a> to see it in action.

**3. Rarible** - `Rarible` is a platform that enables the creation and trade of `NFTs`. It features an auction section where users can bid on unique digital items and the transactions are managed by `smart contracts`. You can see the platform in action at <a href="https://rarible.com/" target="_blank">here</a>.

This tutorial has provided a comprehensive guide on how to create an auction `smart contract`. We have discussed the basics of `smart contracts`, the key features an auction contract should have, and the steps needed to implement it. By following this tutorial, you should now have a good understanding of how to create your own auction `smart contract` and be well equipped to develop your own decentralized auction system.

## Important Points:

**1.** It is a good practice to handle looping in the front-end rather than the `smart contract` for performance reasons. The `smart contract` can simply provide the necessary data and indices, and the front-end can handle the iteration and display. This way, the `smart contract` can remain simple and efficient, while the user interface can be more dynamic and flexible.
