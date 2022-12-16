# Reference Types
A solidity reference type does not store values directly on its own, unlike a solidity value type. Instead of sharing data directly, reference types store the address (or "reference") of the data's location. 

## Array

Arrays are a type of reference variable that stores a list of values of the same type, where each element can be accessed directly by using its index number.

In Solidity, the size of the array can be `fixed` or `dynamic`.


### Fixed-size Arrays
A fixed-size array is a data structure that stores a fixed number of elements of the same type. Once a fixed-size array has been created, the length cannot be changed once it has been declared. A fixed-size array is useful for storing a fixed number of elements in an efficient and predictable way.

**Syntax for fixed size array declaration:**

<pre style="background: rgba(0,0,0,.05); padding:20px">
dataType[size] &lt;visibility&gt; arrayName;

or

dataType[size] &lt;visibility&gt; arrayName = [&lt;elements&gt;];

or 

dataType[] &lt;visibility&gt; arrayName = new dataType[](size);

</pre>

**Example:** 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    // Array with length 3 and initializes it with values 2, 3, and 4.
    uint[3] public fixedArr = [2, 3, 4];

    // Array with length 3 and no initial values.
    uint[3] public fixedArr2;

    // Array with length 3 and initializes it with a single value, 1.
    uint[3] public fixedArr3 = [1];

    //Array with length 3, but the syntax is incorrect.
    //uint[3] public fixedArr4 = []; //TypeError: Unable to deduce common type for array elements.
    
    //Array with length 3 and no initial values.
    uint[3] public fixedArr5;

    //Array with length 4 and no initial values.
    uint[] public fixedArr6 = new uint[](4);
    
    //Updating the index value of an array
    function update(uint _ele,uint _index) public{
        fixedArr5[_index]= _ele;
    }
}
```



The first array, `fixedArr`, is declared with the `uint[3]` data type, which means it is an array of uint (unsigned integer) elements with a length of `3`. 

The `fixedArr` array is initialized with the values `[2,3,4]`, so its elements will be `fixedArr[0] = 2, fixedArr[1] = 3, and fixedArr[2] = 4`.

The next array, fixedArr2, is also declared as a `uint[3]` array, but no values are assigned to it. In this case, all of the elements of the array will be initialized to `0`.

The `fixedArr3` array is declared similar to the other arrays, but it is initialized with only one value. In this case, the first element of the array will be set to `5`, and the other two elements will be set to `0`.

 <center><img class="image" src="./assets/images/fixed-array-example.JPG"></center>
 <b><center class="img-label">Output</center></b>

The `fixedArr5` array is not initialized with any values. Initially, the elements of the array will be initialized to `0`. Afterward, it's used in the update function, which takes two arguments: an element to add and an index at which to add it. Using the index, the function updates a specific element's value in the `fixedArr5` array. As an example, if `update(100,1)` is called, `fixedArr5[1]` will be set to `100`.

**Important points:** 
- Fixed-size arrays are best used in situations where the array size is known in advance and does not need to be changed during contract execution such as it can be used to store the names of the days of the week, the months of the year, or the suits in a deck of cards.

- Arrays with fixed size are more efficient than arrays with dynamic size because they use less gas and are easier to process by Ethereum Virtual Machine (EVM).

### Dynamic Array

A dynamic-size array is a type of data structure that allows you to store an arbitrary number of elements of the same data type. Arrays with dynamic sizes are declared without a specific length, and their lengths can be changed at runtime. In a flexible and efficient manner, dynamic-size arrays can store a variable number of elements.

In the same way as with fixed-size arrays, you can access and modify dynamic-size array elements using square bracket notation. However, you can also manipulate the array using some Solidity functions. For example, you can use the push function to add a new element to the end of the array, the pop function to remove the last element from the array, or the length property to get the current number of elements in the array.

**Syntax for dynamic size array declaration:**

<pre style="background: rgba(0,0,0,.05); padding:20px">
dataType[] &lt;visibility&gt; arrayName;

or

dataType[] &lt;visibility&gt; arrayName = [&lt;elements&gt];
</pre>

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    // Declare a dynamic array of type uint
    uint[] public dynamicArr = [2, 3, 4];
    
     // Define a function that returns the size of the array
    function getSize() public view returns(uint){
        // Return the length of the array using the length property
        return dynamicArr.length;
    }

    // Define a function that adds an element to the array
    function insert(uint _element) public{
        // Add the element to the end of the array using the push method
        dynamicArr.push(_element);

        // Another way to add an element to the array is to use the assignment operator
        // dynamicArr.push() = _element;
    }

    // Define a function that removes the last element from the array
    function remove() public{
        // Remove the last element from the array using the pop method
        dynamicArr.pop();
    }

    // Define a function that updates an element in the array
    function update(uint _element,uint _index) public{
        // Update the element at the specified index using the assignment operator
        dynamicArr[_index] = _element;
    }

    // Define a function that removes an element from the array
    function deleteByIndex(uint _index) public{
        // Delete the element at the specified index using the delete keyword
        // Note that this does not affect the array length. It simply resets the value at the index back to its default value.
        delete dynamicArr[_index];
    }

}
```
 <center><img class="image" src="./assets/images/dynamic-array-example.JPG" ></center>
 <b><center class="img-label">Output</center></b>

`MyContract` that has a public dynamic array named `dynamicArr` initialized with the values `2`, `3`, and `4`. The contract defines four functions:

- `getSize()` returns the length of the dynamicArr array.

- `insert()` adds an element to the end of the dynamicArr array.

- `remove()` removes the last element from the dynamicArr array.

- `update()` updates an element in the dynamicArr array at a specified index.

- `delete()` deletes an element in the dynamicArr array at a specified index.

### byte as arrays:
Variables of type bytes are special arrays.
Dynamic arrays are declared using the keyword `bytes` followed by the name of the array. We can declare it in following ways:

```
bytes myArray;
bytes[] myArray;
bytes1[] myArray;
bytes2[] myArray;
...
bytes32[] myArray;
```

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    bytes1[] public num= [bytes1("a"),bytes1("b")];
    bytes2[] public num2;
    bytes[] public num3 = [bytes("asdf"),"s"];
    function insertNum() public{
        num.push("a");
        num2.push("m");
        num3.push("qwerty");
    }
}
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

//Dynamic byte size array
contract MyContract {
    bytes public arr1;
    bytes[] public arr4;

    bytes[] public arr2 = [arr1,arr3];

    bytes1[] public arr3 = [bytes1("a"),bytes1("b")];

    bytes a = "aaa";
    bytes1 b = "a";
    // bytes2[] public arr4;
    // bytes32[] public arr5;

    function insert() public{
        arr1.push(bytes1("a"));
        arr1.push("a");
    }
}
```

The type bytes1[] is an array of bytes, but due to padding rules, it wastes 31 bytes of space for each element (except in storage). It is better to use the bytes type instead.

## string as Arrays

## Mapping
Mapping is a data structure in Solidity that maps keys to values. It is similar to an array, but the keys can be any of the built-in data types, but reference types are not allowed ***except string***, and the values can be of any data type. 

### Defining a Mapping
A mapping is declared using the mapping keyword, followed by the data type of the key in square brackets, followed by the data type of the value.

<pre style="background: rgba(0,0,0,.05); padding:20px">
mapping(keyType => valueType) <visibility> <name>;
</pre>

KeyType can be any built-in value type, bytes, string, or any contract or enum type. Other user-defined or complex types, such as mappings, structs or array types are not allowed. ValueType can be any type, including mappings, arrays and structs.

Example: 

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract AlienTracker {
    // Define a mapping that maps a planet's name (string) to its number of aliens (uint).
    mapping(string => uint) public alienCount;

    // Define a function for adding aliens to a planet.
    function addAliens(string memory _planet, uint _number) public {
        // Use the planet's name as the key and add the number of aliens to the current value.
        alienCount[_planet] += _number;
    }
}
```

The contract `AlienTracker` defines a mapping called `alienCount` that maps string keys (the planet's name) to values of type uint (the number of aliens on the planet).

A function called `addAliens` that takes two arguments: `_planet` (a string representing the planet's name) and `_number` (a uint representing the number of aliens to be added to the planet). Inside the function, the `alienCount` mapping is updated by using the planet's name as the key and adding the number of aliens to the current value.

Output:

<center><img class="image" src="./assets/images/mapping-example-output.JPG" ></center>
 <b><center class="img-label">Output</center></b>

If addAliens is called with the arguments "Earth" and 5, the alienCount mapping would be updated to have a key of "Earth" with a value of 5.

if the addAliens function is called with the arguments "Earth" and 5, followed by "Mars" and 10, and then "Earth" and 3, the alienCount mapping would have the following key-value pairs: "Earth" with a value of 8, and "Mars" with a value of 10.

In variable declarations, do not separate the keyword mapping from its type by a space. Do not separate any nested mapping keyword from its type by whitespace.
The KeyType can be any built-in value type, bytes, string, or any contract or enum type.Other user-defined or complex types, such as mappings, structs or array types are not allowed. ValueType can be any type, including mappings, arrays and structs.

delete in mapping

## Structs

A struct is a way to define a new data type that can contain multiple values of different types. 

### Defining a Struct

To define a struct in Solidity, you must use the "struct" keyword followed by the name of the struct. The struct definition consists of a set of variables enclosed in braces, with each variable having a name and a data type. Mappings are reference types, which means that when you assign a mapping to a variable, you are not copying the entire mapping into the variable. Instead, you are creating a reference to the mapping, which allows you to access and modify the original mapping using the variable. This is done to avoid copying large amounts of data unnecessarily, which can be inefficient and waste gas.

**Syntax:**

<pre style="background: rgba(0,0,0,.05); padding:20px">
struct &lt;structure_name&gt; {
    &lt;data type&gt; variable_1; 
    &lt;data type&gt; variable_2; 
}
</pre>

Once you have defined a struct, you can create variables of that struct type and access the individual elements of the struct using the dot operator. 

Example:

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

// Define a struct to represent a zombie. 
// There are three fields in the struct: name, isHungry, and numBrainsEaten.
struct Zombie {
    string name;
    bool isHungry;
    uint numBrainsEaten;
}

//Create a contract for managing a collection of zombies.
contract ZombieApocalypse {
    //To store zombies, use an array of Zombie structs.
    Zombie[] public zombies;

    //Defining a function for adding new zombie to the collection.
    function addZombie(string memory _name, bool _isHungry, uint _numBrainsEaten) public {
        // Create a new instance of the Zombie.
        Zombie memory newZombie = Zombie(_name, _isHungry, _numBrainsEaten);
        // Add the new zombie to the array.
        zombies.push(newZombie);
    }
}
```

A new zombie will be added to the array of zombies in the `ZombieApocalypse` contract when you call the `addZombie` function. In the `addZombie` function call, the zombie's name, hunger status, and number of brains eaten are specified. A new zombie will then be added to the zombies array. 

Output: 
 <center><img class="image" src="./assets/images/struct-example.JPG" ></center>
 <b><center class="img-label">Output</center></b>

 =------------=-=-=

Structs allow groups of related variables to be treated as one entity. In many situations, this will allow you to organize your code more effectively and make it easier to work with.

Structs in Solidity are reference types, which means that when you create a struct, you are creating a reference to the struct in memory, rather than creating the struct itself. This means that when you pass a struct as an argument to a function or return it from a function, you are actually passing or returning a reference to the struct, rather than a copy of the struct itself.

UseCases:

you could use a mapping to store the balances of multiple accounts in a contract that manages a simple token system. You could use a mapping to store the information about multiple products in an e-commerce contract. You could also use a mapping to store the number of votes each candidate has received in a voting contract.

The contract does not provide the full functionality of a crowdfunding contract, but it contains the basic concepts necessary to understand structs. Struct types can be used inside mappings and arrays and they can themselves contain mappings and arrays.

It is not possible for a struct to contain a member of its own type, although the struct itself can be the value type of a mapping member or it can contain a dynamically-sized array of its type. This restriction is necessary, as the size of the struct has to be finite.

## enum

"Enums" are user-defined data types that allow you to define named constants called "enumerators". Using enums allows you to represent a finite set of options in your code, and provides you with named constants that can be used to represent specific values.

### Defining an enum

To define an enum, you must use the "enum" keyword followed by the name of the enum and a list of enumerators enclosed in braces. 

<pre style="background: rgba(0,0,0,.05); padding:20px">
enum &lt;enum-name&gt; {
  element1,
  emenent2,
	...
}
</pre>

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract Game {
    // Define an enum to represent the different game levels.
    enum Level {
        LOW,
        MEDIUM,
        HIGH
    }

    // Define a variable to hold the number of coins.
    uint public coins;

    // Define a variable to hold the current game level.
    Level public lvl;

    // Define a function for setting the number of coins.
    function setCoins(uint _coin) public {
        coins = _coin;
    }

    // Define a function for setting the current game level based on the number of coins.
    function setLevel() public {
        if (coins < 10) {
            lvl = Level.LOW;
        } else if (coins >= 10 && coins < 25) {
            lvl = Level.MEDIUM;
        } else {
            lvl = Level.HIGH;
        }
    }
}
```

The Solidity contract called Game defines an enum called Level, which has three enumerators: LOW, MEDIUM, and HIGH. This enum is used to represent the different game levels in the contract. The contract also defines two variables: coins, which holds the number of coins, and lvl, which holds the current game level. The coins variable is of type uint, which represents an unsigned integer, and the lvl variable is of type Level, which allows it to hold one of the enumerators defined in the Level enum.

The contract defines two functions: setCoins, which allows the number of coins to be set, and setLevel, which sets the current game level based on the number of coins. The setCoins function takes a single argument of type uint, which represents the number of coins to be set. The function simply assigns the value of the argument to the coins variable. The setLevel function is used to determine the current game level based on the number of coins. It checks the value of the coins variable and assigns the corresponding Level enumerator to the lvl variable, depending on whether the number of coins is less than 10, between 10 and 25, or greater than 25. This allows the contract to keep track of the current game level and adjust it as needed.

Output:
 <center><img class="image" src="./assets/images/enum-example-output-1.JPG" ></center>
 <b><center class="img-label">Output</center></b>

If the `setCoins` function is called with a value of `5`, the coins variable will be set to `5` and the `setLevel` function will assign the Level `LOW` enumerator to the `lvl` variable, because the number of coins is less than `10`. 

 <center><img class="image" src="./assets/images/enum-example-output-2.JPG" ></center>
 <b><center class="img-label">Output</center></b>

If the `setCoins` function is called with a value of `15`, the coins variable will be set to `15` and the `setLevel` function will assign the Level `MEDIUM` enumerator to the lvl variable, because the number of coins is greater than or equal to `10` but less than `25`. 

 <center><img class="image" src="./assets/images/enum-example-output-3.JPG" ></center>
 <b><center class="img-label">Output</center></b>

If the `setCoins` function is called with a value of `30`, the coins variable will be set to `30` and the `setLevel` function will assign the Level `HIGH` enumerator to the `lvl` variable, because the number of coins is greater than or equal to `25`.

An enum's enumerators (i.e. constant values) are automatically assigned integer values starting from zero, unless otherwise specified. In the above example, we define an enum called Level with three enumerators: LOW, MEDIUM, and HIGH, the default values for these enumerators will be 0, 1, and 2, respectively.

However, you can also specify custom values for the enumerators if you want. For example, you could define the Level enum as follows:

```sol
enum Level { 
    LOW = 20,
    MEDIUM = 40,
    HIGH = 60 
}
```


### Important points:

    There should be at least one value in an enumerated list.
    You cannot use booleans or numbers as enum members
    In a mapping, enums are not permitted to be used as a key type
    You cannot return an enum within a function because enums aren't part of the ABI.




## Data location

Every reference type has an additional annotation, the `data location`, about where it is stored. Data locations are used to specify where a particular variable or data structure should be stored. There are different properties and limitations associated with different data locations, such as their scope and lifetime. Your contract can ensure that your variables and data structures are stored in the right place and that they can be accessed and modified as needed by your contract by explicitly specifying the data location. Additionally, using the correct data location can help optimize the performance and gas usage of your contract. `Data location can only be specified for array, struct or mapping types.`

**Memory:** Local variables and function arguments are stored here by default. Data stored in memory is temporary and only exists for the duration of a function call.

**Storage:** Contract state variables and struct fields are stored here by default. Data stored in the storage is persistent and can be accessed and modified by contract functions.

**Calldata:** This data location is used for function arguments that are passed as part of a contract call (e.g. when calling a contract function from another contract or from a client). Data stored in calldata is read-only and cannot be modified by the contract.

Give simple examples here for all 
Examples:

```sol
MyContract {
    uint256 public myVariable; // Stored in storage by default
    uint256[] memory myArray; // Stored in memory
    uint256[] storage myStorageArray; // Stored in storage
}
```
## Array Data location, Iteration and assignments


## Mapping Data location, Iteration and assignments

Mappings can only have a data location of `storage`, and as a result, they can only be used for state variables, as storage reference types in functions, or as parameters for library functions. They cannot be used as parameters or return parameters of contract functions that are publicly visible. For example:

For example, consider the following code, which defines a contract with a myVariable state variable and a setMyVariable function that takes a storage reference type as an argument:

However, mappings cannot be used as parameters or return parameters of contract functions that are publicly visible. This is because mappings are stored in the contract's storage, and public contract functions can only accept input data and return output data in the form of function arguments and return values.

For example, consider the following code, which attempts to define a public contract function that takes a mapping as an argument:

```sol
// Defines a contract that has a public function that takes a mapping as an argument
contract MyContract {
    // Defines a public function that takes a mapping as an argument
    function myFunction(mapping(uint => string) memory myMapping) public {
        // Do something with the mapping here...
    }
}
```

This code will not compile, because the myFunction function takes a mapping as an argument, which is not allowed for public contract functions. To fix this error, you can either make the myFunction function private, or you can use a struct or array type instead of a mapping as the argument type.



