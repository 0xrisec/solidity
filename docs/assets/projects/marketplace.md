```sol
contract Marketplace {
    // Represents a single item for sale
    struct Item {
        string name;
        uint price;
        address owner;
        bool forSale;
    }

    // Mapping from item IDs to item structures
    mapping(uint => Item) public items;
    // Array of all item IDs
    uint[] public itemIds;

    // Adds a new item to the marketplace
    function addItem(string memory name, uint price) public {
        // Generate a unique ID for the item
        uint id = itemIds.length;
        // Create a new item structure and add it to the mapping
        items[id] = Item(name, price, msg.sender, true);
        // Add the ID to the array of all item IDs
        itemIds.push(id);
    }

    // Purchases an item from the marketplace
    function buyItem(uint id) public {
        // Get a reference to the item
        Item storage item = items[id];
        // Check that the item is for sale and the buyer has sufficient funds
        require(item.forSale && msg.value >= item.price, "Item is not for sale or buyer has insufficient funds.");
        // Transfer ownership of the item to the buyer
        item.owner = msg.sender;
        // Mark the item as no longer for sale
        item.forSale = false;
        // Transfer the purchase price to the seller
        item.owner.transfer(item.price);
    }

    // Lists an item for sale
    function listForSale(uint id) public {
        // Get a reference to the item
        Item storage item = items[id];
        // Check that the item is owned by the seller and is not already for sale
        require(item.owner == msg.sender && !item.forSale, "Item is not owned by the seller or is already for sale.");
        // Mark the item as for sale
        item.forSale = true;
    }

    // Removes an item from the marketplace
    function removeFromMarketplace(uint id) public {
        // Get a reference to the item
        Item storage item = items[id];
        // Check that the item is owned by the seller and is not already for sale
        require(item.owner == msg.sender && !item.forSale, "Item is not owned by the seller or is already for sale.");
        // Remove the item from the mapping
        delete items[id];
        // Remove the item's ID from the array of all item IDs
        for (uint i = 0; i < itemIds.length; i++) {
            if (itemIds[i] == id) {
                delete itemIds[i];
                break;
            }
        }
    }
}
```

//Always transfer the money end of the function.