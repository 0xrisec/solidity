# Todo Smart Contract

`Todo smart contracts` serve as a simple example of how blockchain technology can be used to automate tasks and provide increased security and transparency. Although there may not be a widely used decentralized application (`dApp`) based on `Todo smart contracts`, the concept is still a valuable one for those looking to understand the basics of `smart contracts` and their potential applications. In this comprehensive guide, we will examine the code behind a `Todo smart contract`, breaking it down step by step to understand its inner workings.

## Goals and Objectives

In this scenario, we are creating a `Todo smart contract` for an organization to assign tasks to `employees`. The contract aims to:

- Allow `users` to add tasks to the to-do list and assign them to someone with a deadline.
- Permit task owners to update the task.
- Permit task owners to delete the task.
- Enable `assignees` to mark tasks as completed. `Assignees` are individuals or entities who is responsible for completing the task and marking it as completed.

## Code Implementation

The first step in creating a `to-do smart contract` is to define its structure. In this example, we will be creating a contract for an organization to assign tasks to `employees`. The contract will have a struct called `TodoItem`, which will hold information about each task, such as its `identifier`, `description`, `assignee`, `assigned by`, `completion status`, `deadline`, and `existence`. The existence (`isExist`) is used to indicate whether a task still exists or has been deleted. If a task is deleted, its `isExist` value will be set to `false`. This allows for a way to keep track of the tasks that have been added to the to-do list, even if they have been deleted.

```sol
// Defining a structure called TodoItem
struct TodoItem{
    // A unique identifier for the task
    uint id;
    // The task description
    string task;
    // The address of the assignee
    address assignee;
    // The address of the person who assigned the task
    address assignedBy;
    // A boolean value indicating whether the task has been completed or not
    bool completed;
    // The deadline for the task to be completed
    uint deadline;
    // A boolean value indicating whether the task still exists or has been deleted
    bool isExist;
}
```

The next step after defining the `TodoItem` struct is to create a `mapping` between a unique identifier and the `TodoItem` struct. The code `mapping(uint=>TodoItem) public todoItems` creates a `public` mapping called `todoItems` where the key is a `uint` type and the value is of type `TodoItem`. This mapping will be used to store all of the tasks that are added to the to-do list, where each task will have a unique identifier and its corresponding `TodoItem` information. The `public` keyword makes the mapping accessible from outside of the contract, allowing for users to query and interact with the tasks stored in the mapping.

```sol
// Define a public mapping of type "uint" to "TodoItem"
mapping(uint=>TodoItem) public todoItems;
```

The next step after creating the mapping is to define an event for the `TaskAdded` action. The code `event TaskAdded(uint id, address assignee, address assignedBy, bool completed)` creates an event that will be triggered whenever a new task is added to the to-do list. The event will contain information about the task, such as its identifier, the address of the `assignee`, the address of the person who assigned the task, and its completion status.

```sol
// Declare an event named "TaskAdded" with 4 parameters
event TaskAdded(uint id, address assignee, address assignedBy, bool completed);
```

The next step after defining the `TaskAdded` event is to create a `modifier` that identifies the task owner. The code modifier `taskOwner(uint _id)` creates a modifier that will be used to restrict access to certain functions in the smart contract. The `require` statement checks if the sender of the current transaction `(msg.sender)` is the same as the person who assigned the task `(todoItems[_id].assignedBy)`. If the sender is not the task `owner`, the contract will revert with an error message indicating that `only the task owner can perform the action`.

Using this `modifier` can provide a way to ensure that only the person who assigned a task is able to perform certain actions on it, such as `updating` or `deleting` the task. This helps to maintain the integrity of the to-do list and ensures that tasks are not altered by unauthorized entities.

```
// Define a modifier named "taskOwner" that checks if the message sender is the task owner
modifier taskOwner(uint _id){
    // If the message sender is not the task owner, throw an error
    require(msg.sender == todoItems[_id].assignedBy, "Only Task owner can perform this action");
    // Placeholder for code block to be executed when the modifier is used
    _;
}
```

The next step is to define the function for adding a new task to the to-do list. The `addTask` function takes in `4 arguments`: the `_id` of the task, the `_task` description, the `_assignee` of the task, and the `_deadline` for the task.

Before adding the new task, the function first checks if an item with the same `_id` already exists in the `todoItems` mapping using the `require` statement. If it exists, an error message is thrown.

The function then calls the `validateInputs` function to validate the inputs provided. This helps ensure that the `_id` is positive, the `_task` is not empty, the `_assignee` is not a null address, and the `_deadline` is a future date.

Once the inputs have been validated, the function creates a memory object of the `TodoItem` struct and sets its values based on the arguments passed in. The `newItem` is then added to the `todoItems` mapping using the `_id` as the key.

Finally, the function emits an `event` of type `TaskAdded` with the `_id`, `_assignee`, `msg.sender` (the person who added the task), and the completed status of the task. This event can be listened to by external entities for updating their records.

```sol
// Function to add a new task to the todo list
function addTask(uint _id, string memory _task, address _assignee, uint _deadline) public {
    // Check if a task with the same ID already exists
    require(!todoItems[_id].isExist, "Item with the same ID already exists"); 

    // Validate inputs
    validateInputs(_id, _task, _assignee, _deadline);

    // Create a new TodoItem and store it in memory
    TodoItem memory newItem = TodoItem(_id, _task, _assignee, msg.sender, false, _deadline * 1 days, true);

    // Add the new TodoItem to the todoItems mapping
    todoItems[_id] = newItem;

    // Emit the "TaskAdded" event with the ID, assignee, sender and completion status of the task
    emit TaskAdded(_id, _assignee, msg.sender, false);
}

// Function to validate input values for adding a task
function validateInputs(uint _id, string memory _task, address _assignee, uint _deadline) internal pure {
    // Check if the ID is a positive non-zero value
    require(_id > 0, "Id should be a positive non-zero value"); 

    // Check if the task description is not empty
    require(bytes(_task).length > 0, "Task cannot be empty");

    // Check if the assignee address is not null
    require(_assignee != address(0), "Assignee address cannot be null");

    // Check if the deadline is a future date
    require(_deadline > 0, "Deadline should be a future date");
}
```

The next step is to create a `updateTask` function that allows the task `owner` to update an existing task. This function is marked with the `taskOwner` modifier that ensures that only the task owner can update the task. The function first checks if the task with the provided `ID` exists and if so, it validates the inputs and updates the task with the new information. An event `TaskAdded` is then emitted with the updated information.

```sol
// Function to update an existing task
function updateTask(uint _id, string memory _task, address _assignee, uint _deadline) public taskOwner(_id) {
    // Check if the task with the given ID exists
    require(todoItems[_id].isExist, "Item with the same ID already exists"); 

    // Validate inputs
    validateInputs(_id, _task, _assignee, _deadline);

    // Update the task description, assignee, and deadline
    todoItems[_id].task = _task;
    todoItems[_id].assignee = _assignee;
    todoItems[_id].deadline = _deadline;

    // Emit the "TaskAdded" event with the ID, assignee, sender, and completion status of the task
    emit TaskAdded(_id, _assignee, msg.sender, false);
}
```

The next step in the smart contract development process is to implement the `deleteTask` function. The `deleteTask` function takes in the `_id` of the task as an argument and is executed by the task owner. The function first checks if the `_id` of the task is a positive non-zero value, and that the task exists in the `todoItems` mapping. If these checks pass, the task is deleted from the `todoItems` mapping using the `delete` keyword. This function makes use of the `taskOwner` modifier to ensure that only the task owner can delete the task.

```sol
// Function to delete an existing task
function deleteTask(uint _id) public taskOwner(_id) {
    // Check if the ID is a positive non-zero value
    require(_id > 0, "Id should be a positive non-zero value"); 

    // Check if the task with the given ID exists
    require(todoItems[_id].isExist, "Item with the given ID does not exist");

    // Delete the task from the `todoItems` mapping
    delete todoItems[_id];
}
```

The next step in our `Todo contract` is to create the `taskCompleted` function. This function allows the task `assignee` to mark a task as completed or not completed. The function begins by checking if the message `sender` is indeed the `assignee` of the task. If it's not, an error message is thrown. Then, the function verifies that the `ID` provided is positive and non-zero, and that the task exists. If these conditions are met, the completion status of the task is toggled from its current value. Toggled means to switch between two states, in this case the two states are `completed` (represented as `true`) and `not completed` (represented as `false`). If a task is currently in the `completed` state (represented as `true`), then toggling its status will change it to `not completed` (represented as `false`), and vice versa.

```sol
// Function to mark a task as completed or uncompleted
function taskCompleted(uint _id) public {
    // Check if the message sender is the task assignee
    require(msg.sender == todoItems[_id].assignee, "Only the task assignee can perform this action");

    // Check if the ID is a positive non-zero value
    require(_id > 0, "Id should be a positive non-zero value"); 

    // Check if the task with the given ID exists
    require(todoItems[_id].isExist, "Item with the given ID does not exist");

    // Toggle the completed status of the task
    todoItems[_id].completed = !todoItems[_id].completed;
}
```

## Full Code Snippet

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract TodoList {
    // Defining a structure called TodoItem
    struct TodoItem{
        // A unique identifier for the task
        uint id;
        // The task description
        string task;
        // The address of the assignee
        address assignee;
        // The address of the person who assigned the task
        address assignedBy;
        // A boolean value indicating whether the task has been completed or not
        bool completed;
        // The deadline for the task to be completed
        uint deadline;
        // A boolean value indicating whether the task still exists or has been deleted
        bool isExist;
    }

    // Define a public mapping of type "uint" to "TodoItem"
    mapping(uint=>TodoItem) public todoItems;

    // Declare an event named "TaskAdded" with 4 parameters
    event TaskAdded(uint id, address assignee, address assignedBy, bool completed);

    // Define a modifier named "taskOwner" that checks if the message sender is the task owner
    modifier taskOwner(uint _id){
        // If the message sender is not the task owner, throw an error
        require(msg.sender == todoItems[_id].assignedBy, "Only Task owner can perform this action");
        // Placeholder for code block to be executed when the modifier is used
        _;
    }

    // Function to validate input values for adding a task
    function validateInputs(uint _id, string memory _task, address _assignee, uint _deadline) internal pure {
        // Check if the ID is a positive non-zero value
        require(_id > 0, "Id should be a positive non-zero value"); 

        // Check if the task description is not empty
        require(bytes(_task).length > 0, "Task cannot be empty");

        // Check if the assignee address is not null
        require(_assignee != address(0), "Assignee address cannot be null");

        // Check if the deadline is a future date
        require(_deadline > 0, "Deadline should be a future date");
    }

    // Function to add a new task to the todo list
    function addTask(uint _id, string memory _task, address _assignee, uint _deadline) public {
        // Check if a task with the same ID already exists
        require(!todoItems[_id].isExist, "Item with the same ID already exists"); 

        // Validate inputs
        validateInputs(_id, _task, _assignee, _deadline);

        // Create a new TodoItem and store it in memory
        TodoItem memory newItem = TodoItem(_id, _task, _assignee, msg.sender, false, _deadline * 1 days, true);

        // Add the new TodoItem to the todoItems mapping
        todoItems[_id] = newItem;

        // Emit the "TaskAdded" event with the ID, assignee, sender and completion status of the task
        emit TaskAdded(_id, _assignee, msg.sender, false);
    }

    // Function to update an existing task
    function updateTask(uint _id, string memory _task, address _assignee, uint _deadline) public taskOwner(_id) {
        // Check if the task with the given ID exists
        require(todoItems[_id].isExist, "Item with the same ID already exists"); 

        // Validate inputs
        validateInputs(_id, _task, _assignee, _deadline);

        // Update the task description, assignee, and deadline
        todoItems[_id].task = _task;
        todoItems[_id].assignee = _assignee;
        todoItems[_id].deadline = _deadline;

        // Emit the "TaskAdded" event with the ID, assignee, sender, and completion status of the task
        emit TaskAdded(_id, _assignee, msg.sender, false);
    }

    // Function to delete an existing task
    function deleteTask(uint _id) public taskOwner(_id) {
        // Check if the ID is a positive non-zero value
        require(_id > 0, "Id should be a positive non-zero value"); 

        // Check if the task with the given ID exists
        require(todoItems[_id].isExist, "Item with the given ID does not exist");

        // Delete the task from the `todoItems` mapping
        delete todoItems[_id];
    }
    
    // Function to mark a task as completed or uncompleted
    function taskCompleted(uint _id) public {
        // Check if the message sender is the task assignee
        require(msg.sender == todoItems[_id].assignee, "Only the task assignee can perform this action");

        // Check if the ID is a positive non-zero value
        require(_id > 0, "Id should be a positive non-zero value"); 

        // Check if the task with the given ID exists
        require(todoItems[_id].isExist, "Item with the given ID does not exist");

        // Toggle the completed status of the task
        todoItems[_id].completed = !todoItems[_id].completed;
    }
}
```

## Output

The first account (`0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`) deployed the contract, making it the owner of the contract. Currently, the owner account will be responsible for assigning todo items. Although other accounts may assign tasks, for now, the todo items will only be added by the `contract owner`. Other accounts will serve as task `assignees`.

<center><img class="image" src="./assets/images/todo-eoa.JPG"></center>
<b><center class="img-label">EOA</center></b>

After adding a task, it can be accessed in the `todoItems` mapping using its `ID`. The output displays the task's attributes, such as `id`, `task`, `assignee`, `assignedBy`, `completed`, `deadline`, and `isExist`.

<center><img class="image" src="./assets/images/todo-add-item.JPG"></center>
<b><center class="img-label">Task Details</center></b>

If someone tries to add a task with an `ID` that already exists, the code will fail the `require` statement, `"require(!todoItems[_id].isExist, "Item with the same ID already exists");".` This means that the code will stop executing and an error message `"Item with the same ID already exists"` will be thrown. The task will not be added to the `todoItems` mapping and the `TaskAdded` event will not be emitted. This is because the code is designed to prevent duplicates by checking if a task with the same `ID` already exists before allowing it to be added.

<center><img class="image" src="./assets/images/todo-adding-same-item.JPG"></center>
<b><center class="img-label">Error: Item with the same ID already exists</center></b>

Next, we will switch to the second account, `0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2`, which will be considered as the `assignee`. The `assigne` does not have the permission to `delete` and `update` the task, and attempting to do so will result in an error message stating `"Only Task owner can perform this action"`.

<center><img class="image" src="./assets/images/todo-error-ondelete.JPG"></center>
<b><center class="img-label">Error: Only Task owner can perform this action</center></b>

The assignee(`0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2`) can complete the task by calling the `completeTask` function and passing in the task `ID` as an argument. This will set the `completed` property of the task to `true` and emit the `TaskCompleted` event with the task `ID`, `assignee`, and completion status.

<center><img class="image" src="./assets/images/todo-task-complete.JPG"></center>
<b><center class="img-label">Task Completion</center></b>

The task owner(`0x5B38Da6a701c568545dCfcB03FcB875f56beddC4`) can delete a task by calling the `deleteTask` function and passing the `ID` of the task they want to delete as an argument. The function will then check if the task exists in the `todoItems` mapping and if it does, it will delete it by setting its `isExist` property to `false`.

<center><img class="image" src="./assets/images/todo-delete-task.JPG"></center>
<b><center class="img-label">Task Deleted</center></b>

## Conclusion


This tutorial has provided a comprehensive guide on how to create an `todo smart contract`. We have discussed the basics of` smart contract`s, the key features an `todo` contract should have, and the steps needed to implement it.

`Todo smart contracts` are not widely used as decentralized applications (`dApps`) but they serve as a simple and straightforward example of how smart contracts can be utilized in various ways. The concept of a `Todo smart contract` can be used as a starting point for individuals and organizations interested in learning about smart contracts and the potential applications for blockchain technology.


## Important Points:

**1.** What is the purpose of creating a todo smart contract? Listing work items on the blockchain is not something that many people are willing to pay for, and they can opt for traditional methods or use web2 applications instead. If we consider the use of a todo smart contract for organizations to manage and assign tasks to employees, the problem remains that on a blockchain, anyone can view the details of these tasks. It is likely that no organization would want to reveal any work-related information. So, what is the point of creating a todo smart contract?

The purpose of creating a todo smart contract may vary depending on the specific use case and context. However, in general, a todo smart contract can offer certain benefits such as immutability, transparency, and trust in the handling of tasks and information.

For example, in an organizational context, a todo smart contract can provide a secure and decentralized way of assigning and tracking tasks among employees, without the need for a central authority or a single point of failure. Additionally, the information stored on a blockchain is tamper-proof and can be accessed by authorized parties only, providing an added layer of security and privacy.

However, it's also true that the transparency aspect of blockchain can also be seen as a drawback in certain situations where organizations may not want to reveal sensitive information to the public. In these cases, alternative solutions such as private or consortium blockchain may be more appropriate.

In conclusion, the usefulness of a todo smart contract will depend on the specific needs and requirements of each organization, and whether the benefits offered by the technology outweigh the potential drawbacks.

**2.** What is the difference between Mapping and Array in Solidity and which one is better for a specific use case? When it comes to storing data in a Solidity contract, how do the data structures Mapping and Array differ, and when is it best to use one over the other?

It depends on the specific use case. If you have a unique identifier for the data you want to store and that identifier can be used as a key for efficient lookups, a mapping would be a good choice. However, if you need to access the data based on numerical indices, an array would be more appropriate. Both data structures have their own advantages and disadvantages, and the choice between the two should be based on the specific requirements of the project.

In a to-do smart contract, let's say you want to store the tasks assigned to different individuals. You could store this information using either a mapping or an array.

A mapping would be ideal in this scenario if you need to fetch tasks assigned to a specific individual using their address as a key. Due to the way mappings are structured, fetching data from a mapping using a key is far more efficient than fetching the same data from an array. This is because arrays require you to iterate over the entire array until you find the element you're looking for, while a mapping will immediately grab the data you need so long as you have the key.

On the other hand, arrays would be useful if you need to retrieve all tasks assigned to all individuals in a numerical order. Arrays are optimized for numerical index-based access, so it would be easier to retrieve tasks stored in an array in this manner. However, if you need to access a specific task based on a unique identifier like an address, you would have to iterate over the entire array to find the task you're looking for, which could be less efficient.

In summary, it is best to use a mapping when you need to efficiently access data using a unique key, and to use an array when you need to retrieve data in a numerical order.