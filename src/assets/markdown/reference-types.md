# Reference Types
A solidity reference type does not store values directly on its own, unlike a value type. Instead of sharing data directly, reference types store the address (or "reference") of the data's location. 

## Arrays

Arrays are a type of reference variable that stores a list of values of the same type, where each element can be accessed directly by using its index number.

In Solidity, the size of the array can be `fixed` or `dynamic`.

### Fixed-size Arrays
A fixed-size array is a data structure that stores a fixed number of elements of the same type. Once a fixed-size array has been created, the length cannot be changed once it has been declared. A fixed-size array is useful for storing a fixed number of elements in an efficient and predictable way.

**Syntax for fixed size array declaration:**

<pre style="background: rgba(0,0,0,.05); padding:20px">
dataType[size] &lt;visibility&gt; arrayName;

or

dataType[size] &lt;visibility&gt; arrayName = [&lt;elements&gt;];
</pre>

**Example:** 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    // Array with length 3 and initializes it with values 2, 3, and 4.
    uint[3] public fixedArr = [2, 3, 4];

    // Array with length 3 with default initialize values (zero in each index).
    uint[3] public fixedArr2;

    // An array of length 3 is initialized with a single value, 5 and all other indexes are set to default values.
    uint[3] public fixedArr3 = [5];

    //Array with length 3, but the syntax is incorrect.
    // uint[3] public fixedArr4 = []; //TypeError: Unable to deduce common type for array elements.
    
    //Array with length 3 and no initial values.
    uint[3] public fixedArr5;

    // Define a function that returns the size of the array
    function getSize() public view returns(uint){
        // Return the length of the array using the length property
        return fixedArr5.length;
    }

    //Updating the index value of an array
    function update(uint _ele,uint _index) public{
        fixedArr5[_index]= _ele;
    }

    // Define a function that removes an element from the array
    function deleteByIndex(uint _index) public{
        // Delete the element at the specified index using the delete keyword
        // Note that this does not affect the array length. It simply resets the value at the index back to its default value.
        delete fixedArr5[_index];
    }
}
```



The first array, `fixedArr`, is declared with the `uint[3]` data type, which means it is an array of uint (unsigned integer) elements with a length of `3`. The `fixedArr` array is initialized with the values `[2,3,4]`, so its elements will be `fixedArr[0] = 2, fixedArr[1] = 3, and fixedArr[2] = 4`.

The next array, `fixedArr2`, is also declared as a `uint[3]` array, but no values are assigned to it. In this case, all of the elements of the array will be initialized to `0`.

The `fixedArr3` array is declared similar to the other arrays, but it is initialized with only one value. In this case, the first element of the array will be set to `5`, and the other two elements will be set to `0`.

 <center><img class="image" src="./assets/images/fixed-array-example.JPG"></center>
 <b><center class="img-label">Output</center></b>

The `fixedArr5` array is not initialized with any values. Initially, the elements of the array will be initialized to `0`. Afterward, it's used in the update function, which takes two arguments: an element to add and an index at which to add it. Using the index, the function updates a specific element's value in the `fixedArr5` array. As an example, if `update(100,1)` is called, `fixedArr5[1]` will be set to `100`.

**Important points:** 
- Fixed-size arrays are best used in situations where the array size is known in advance and does not need to be changed during contract execution such as it can be used to store the names of the days of the week, the months of the year, or the suits in a deck of cards.

- Arrays with fixed size are more efficient than arrays with dynamic size because they use less gas and are easier to process by Ethereum Virtual Machine (EVM).

### Dynamic Arrays

A dynamic-size array is a type of data structure that allows you to store an arbitrary number of elements of the same data type. Arrays with dynamic sizes are declared without a specific length, and their lengths can be changed at runtime. In a flexible and efficient manner, dynamic-size arrays can store a variable number of elements.

In the same way as with fixed-size arrays, you can access and modify dynamic-size array elements using square bracket notation.However, dynamic arrays have several built-in functions and properties that allow you to manipulate the array such as `push()`, `pop()`, `length`.

**Syntax for dynamic size array declaration:**

<pre style="background: rgba(0,0,0,.05); padding:20px">
dataType[] &lt;visibility&gt; arrayName;

or

dataType[] &lt;visibility&gt; arrayName = [&lt;elements&gt;];

or 

dataType[] &lt;visibility&gt; arrayName = new dataType[](size);
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

## Dynamically-sized byte array:

The following keywords can be used to declare a dynamic sized byte array. `bytes`, `bytes[]`, `bytes1[] up to bytes32[]`

### bytes: 
Variables of type `bytes` are special arrays. It can be declared and initialized as follows:


<pre style="background: rgba(0,0,0,.05); padding:20px">
bytes &lt;visibility&gt; arrayName;

or

bytes &lt;visibility&gt; arrayName; = "&lt;sequence of byte literals&gt;";

or

bytes &lt;visibility&gt; arrayName = bytes("&lt;sequence of byte literals&gt;");

or 

bytes &lt;visibility&gt; arrayName = new bytes(size);
</pre>

`bytes` are used to store arbitrary-length raw byte data by specifying the sequence of the ASCII characters. 

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    //Declaration of a bytes array
    bytes public bytesArr = "abc";
    bytes public bytesArr2;
    bytes public bytesArr3 = bytes("cde");
    bytes public bytesArr4 = new bytes(2);

    // Define a function that returns the size of the array
    function getSize() public view returns(uint){
        // Return the length of the array using the length property
        return bytesArr.length;
    }

    // Define a function that adds an element to the array
    function insert(bytes1 _element) public{
        // Add the element to the end of the array using the push method
        bytesArr.push(_element);

        // Another way to add an element to the array is to use the assignment operator
        // bytesArr.push() = _element;
    }

    // Define a function that removes the last element from the array
    function remove() public{
        // Remove the last element from the array using the pop method
        bytesArr.pop();
    }

    // Define a function that updates an element in the array
    function update(bytes1 _element,uint _index) public{
        // Update the element at the specified index using the assignment operator
        bytesArr[_index] = _element;
    }

    // Define a function that removes an element from the array
    function deleteByIndex(uint _index) public{
        // Delete the element at the specified index using the delete keyword
        // Note that this does not affect the array length. It simply resets the value at the index back to its default value.
        delete bytesArr[_index];
    }
}
```

The contract begins with the declaration of four byte arrays: `bytesArr`, `bytesArr2`, `bytesArr3`, and `bytesArr4`. The `bytesArr` array is initialized with sequence of the ASCII characters `"abc"`. The `bytesArr2` array is not initialized and will have a default value of an empty byte array. The `bytesArr3` array is initialized with the `"cde"`. The `bytesArr4` array is created using the new keyword and initialized with a length of 2 bytes.

- We can push only `bytes1` types of data in bytes type variables.
- It is not possible to initialize an array with an empty array like `arr = []`.

### bytes[ ]:

The `bytes[]` array contains `bytes` values. This means that it is a collection of `bytes` arrays, each of which can store an arbitrary number of bytes and whose size can change at runtime.

You can declare it following ways:

<pre style="background: rgba(0,0,0,.05); padding:20px">
bytes[] &lt;visibility&gt; arrayName;

or

bytes[] &lt;visibility&gt; arrayName; = [&lt;bytes type elements&gt;];

or

bytes[] &lt;visibility&gt; arrayName = new bytes[](size);
</pre>

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {

    bytes[] public bytesArr = [bytes("a"),bytes("ab")];
    // This is an empty array of bytes
    bytes[] public bytesArr2;
    // This is an array of bytes with length 2 and default values for each element
    bytes[] public bytesArr3 = new bytes[](2);
    //The string literal "abc" is also converted to a bytes object, with each character being represented as a single byte in ASCII encoding.
    bytes[] public bytesArr4 = [bytes("a"),"abc"];
    // This is commented out because the string literal "abc" is not a valid value for an element of an array of bytes objects.
    // bytes[] public bytesArr5 = ["abc"];

    // Function returns the length of the bytesArr array
    function getSize() public view returns(uint){
        return bytesArr.length;
    }

    // Function adds an element to the bytesArr array
    function insert(bytes memory _element) public{
        bytesArr.push(_element);

        // Another way to add an element to the array is to use the assignment operator
        // bytesArr.push() = _element;
    }

    // Function removes the last element from the bytesArr array
    function remove() public{
        bytesArr.pop();
    }

    // Function updates the element at a specific index in the bytesArr array
    function update(bytes memory _element,uint _index) public{
        bytesArr[_index] = _element;
    }

    // Function deletes the element at a specific index in the bytesArr array
    function deleteByIndex(uint _index) public{
        // Delete the element at the specified index using the delete keyword
        // Note that this does not affect the array length. It simply resets the value at the index back to its default value.
        delete bytesArr[_index];
    }
}
```
There are four public arrays of bytes objects: `bytesArr`, `bytesArr2`, `bytesArr3`, and `bytesArr4`.
- `bytesArr` is an array of bytes objects with initial values [0x61] and [0x61, 0x62].
- `bytesArr2` is an empty array of bytes objects, with no initial values.
- `bytesArr3` is an array of bytes objects with length 2 and default values for each element (i.e., [0x00, 0x00]).
- `bytesArr4` is an array of bytes objects with initial values [0x61] and [0x61, 0x62, 0x63].
- `bytesArr5` is commented out because the string literal "abc" is not a valid value for an element of an array of bytes objects. 

The contract also defines five functions:
- `getSize()` returns the length of the `bytesArr` array.
- `insert(bytes memory _element)` adds an element to the end of the `bytesArr` array.
- `remove()` removes the last element from the `bytesArr` array.
- `update(bytes memory _element,uint _index)` updates the element at a specific index in the `bytesArr` array.
- `deleteByIndex(uint _index)` deletes the element at a specific index in the `bytesArr` array.

### bytes1[ ] up to bytes32[ ]:

bytes1[] type array stores bytes1 type of values, bytes2[] array stores bytes2 type of values and so on upto bytes32[]. the bytes1 type is a fixed-size byte array that holds 1 byte (8 bits) of data. The bytes2 type is a fixed-size byte array that holds 2 bytes (16 bits) of data, and so on, up to the bytes32 type, which is a fixed-size byte array that holds 32 bytes (256 bits) of data.

You can declare these following ways:

<pre style="background: rgba(0,0,0,.05); padding:20px">
type[] &lt;visibility&gt; arrayName;

or

type[] &lt;visibility&gt; arrayName; = [&lt;same type elements&gt;];

or

type[] &lt;visibility&gt; arrayName = new type[](size);

where `type` refers to bytes1, bytes2, bytes3 ... bytes32.

</pre>

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {

    // An array of bytes1 with two elements
    bytes1[] public bytesArr = [bytes1("a"),bytes1("b")];
    // An empty array of bytes2
    bytes2[] public bytesArr2;
    // An array of bytes5 with length 2 and default values for each element
    bytes5[] public bytesArr3 = new bytes5[](2);
    //An array of bytes6 with two elements
    bytes6[] public bytesArr4 = [bytes6("a"),"abc"];
    //An array of bytes6 with two elements
    bytes6[] public bytesArr5 = [bytes5("12345"),"a"];
    //An array of bytes6 with two elements,
    bytes6[] public bytesArr6 = [bytes4("12"),"abcd"];

    // bytes6[] public bytesArr7 = [bytes4("12"),"abcdefg"];

    // Function returns the length of the bytesArr array
    function getSize() public view returns(uint){
        return bytesArr.length;
    }

    // Function adds an element to the bytesArr array
    function insert(bytes1 _element) public{
        bytesArr.push(_element);

        // Another way to add an element to the array is to use the assignment operator
        // bytesArr.push() = _element;
    }

    // Function removes the last element from the bytesArr array
    function remove() public{
        bytesArr.pop();
    }

    // Function updates the element at a specific index in the bytesArr array
    function update(bytes1 _element,uint _index) public{
        bytesArr[_index] = _element;
    }

    // Function deletes the element at a specific index in the bytesArr array
    function deleteByIndex(uint _index) public{
        // Delete the element at the specified index using the delete keyword
        // Note that this does not affect the array length. It simply resets the value at the index back to its default value.
        delete bytesArr[_index];
    }
}
```

There are four public arrays of bytes objects: `bytesArr`, `bytesArr2`, `bytesArr3`, `bytesArr4`, `bytesArr5`, `bytesArr6` and `bytesArr7`.
- `bytesArr` is an array of bytes1 values with two elements. The bytes1 type represents a fixed-length byte array of 1 element. The array is initialized with two bytes1 values.

- `bytesArr2` is an empty array of bytes2 values. The bytes2 type represents a fixed-length byte array of 2 elements.

-  `bytesArr3` is an array of `bytes5` values with length `2` and default values for each element. The `bytes5` type represents a fixed-length byte array of `5` elements. The new `bytes5[](2)` syntax is used to create an array of `bytes5` values with a length of `2`, and the default value for each element is the zero value for the `bytes5` type (an array of `5` zeros).

- `bytesArr4` is an array of `bytes6` values with two elements. The `bytes6` type represents a fixed-length byte array of `6` elements. The array is initialized with a `bytes6` value constructed using the `bytes6` constructor function which is initialized with the "a". String `"abc"` is converted to a bytes6 value. Each element will be padded with trailing zeros to fill out the full length of 6 elements.

-  `bytesArr5` is an array of bytes6 values with two elements. The array is initialized with a `bytes5` value constructed using the `bytes5` constructor function and initialized with the string `"12345"` ( `bytes5` can be implicitly convertible to expected type `bytes6[]` ), and a string value `"a"` which will be converted to a bytes6 value. Each element will be padded with trailing zeros to fill out the full length of 6 elements.

- `bytesArr6` is an array of `bytes6` values with two elements. The array is initialized with a `bytes4` value constructed using the `bytes4` constructor function and initialized with the string `"12"`, and a string value `"abcd"` which will be converted to a `bytes6` value. Each element will be padded with trailing zeros to fill out the full length of 6 elements.

- `bytesArr7` is commented out because the string literal "abcdefg" can not implicitly convertible to expected type bytes6[] so you will get type error such as unable to deduce common type for array elements. 

- `bytesArr8` is commented out because the `bytes7("12")` can not implicitly convertible to expected type bytes6[].

The contract also has several functions for interacting with these arrays. The `getSize` function returns the length of the `bytesArr` array. The `insert` function adds an element to the `bytesArr` array. The `remove` function removes the last element from the `bytesArr` array. The `update` function updates the element at a specific index in the `bytesArr` array. The `deleteByIndex` function deletes the element at a specific index in the `bytesArr` array.

### bytes1[ ] vs bytes:
The type bytes1[] is an array of bytes, but due to padding rules, it wastes 31 bytes of space for each element (except in storage). It is better to use the bytes type instead. The bytes type is similar to bytes1[], but it is packed tightly in calldata and memory. You should use bytes over bytes1[] because it is cheaper, since using bytes1[] in memory adds 31 padding bytes between the elements. Note that in storage, the padding is absent due to tight packing, see bytes and string.

## String
A `string` is a data type that represents an array of characters (i.e., a sequence of characters) and you can access individual characters in the string using the string's index. String literals can only contain printable `ASCII` characters, which means the characters between and including `0x20 .. 0x7E`.

`string` is equal to `bytes` but does not allow length or index access, meaning that you cannot use the .length property or the [] operator to access individual characters in a string. 

You can declare these following ways:

<pre style="background: rgba(0,0,0,.05); padding:20px">
string &lt;visibility&gt; variableName;

or

string &lt;visibility&gt; str = new string(size);
</pre>

string literals can be written with either double or single quotes. Both of the following are valid string literals:
```sol
string public str1 = "Alien";
string public str2 = 'Human';
```

String literals can also be split into multiple consecutive parts by enclosing each part in quotation marks and separating them with spaces. Using this method allows you to spread out long strings over multiple lines for easier reading. As an example:

```sol
string public str1 = "The string is very long and" 
              "must be broken up into multiple lines to be readable."
```

**string concatenation:** The `string.concat()` function is a built-in function that allows you to concatenate multiple strings into a single string. It takes any number of string arguments and returns a single string that is the concatenation of all the input strings.

```sol
string public str1 = string.concat("a","b");
string public str2 = string.concat("a",string("bc"));
string public str3 = string.concat("a",string("bc"),str1,string.concat("a","b"));
```
## Mapping
Mapping is a data structure in Solidity that maps keys to values.

### Defining a Mapping
A mapping is declared using the mapping keyword, followed by the data type of the key in square brackets, followed by the data type of the value.

<pre style="background: rgba(0,0,0,.05); padding:20px">
mapping(KeyType => ValueType) &lt;visibility&gt; &lt;name&gt;;
</pre>

The `KeyType` can be any `built-in value type`, `bytes`, `string`, or `any contract` or `enum type`. Other user-defined or complex types, such as `mappings`, `structs` or `array` types are not allowed. `ValueType` can be any type, including `mappings`, `arrays` and `structs`.

Example: 

```sol
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

If `addAliens` is called with the arguments `"Earth"` and `5`, the `alienCount` mapping would be updated to have a key of `"Earth"` with a value of `5`.

If the `addAliens` function is called with the arguments `"Earth"` and `5`, followed by `"Mars"` and `10`, and then `"Earth"` and `3`, the `alienCount` mapping would have the following key-value pairs: `"Earth"` with a value of `8`, and `"Mars"` with a value of `10`.

**Important Points:**

**1.** When declaring a variable of type mapping or nested mapping, it's important to make sure that you do not include any spaces between the keyword mapping and its type. For example, the following declaration is correct:

```sol
mapping(uint => string) public names;
mapping(uint => mapping(uint => string)) public nestedNames; // Correct
```

However, the following declaration is incorrect, because it includes a space between the keyword mapping and its type:

```sol
mapping (uint => string) public names; // Incorrect
mapping(uint => mapping (uint => string)) public nestedNames; // Incorrect
```

**2.** There is no built-in way to delete a specific key-value pair from a mapping. This is because mappings are implemented as a hash table under the hood, and deleting a single key-value pair would require re-hashing all of the other keys in the mapping. 

**3.** If you mark a state variable of type mapping as public, the compiler will automatically generate a getter function for you. This getter function allows you to retrieve the value associated with a specific key in the mapping. The getter function takes the key as a parameter and returns the corresponding value. For example, consider the following mapping:

```sol
mapping(uint => string) public names;
```

If you mark this mapping as public, the compiler will generate a getter function that looks something like this:

```sol
function names(uint key) public view returns (string) {
  return names[key];
}
```

## Structs

A struct is a way to define a new data type that can contain multiple values of different types. 

### Defining a Struct

To define a struct in Solidity, you must use the `struct` keyword followed by the name of the struct. The struct definition consists of a set of variables enclosed in braces, with each variable having a name and a data type. Mappings are reference types, which means that when you assign a mapping to a variable, you are not copying the entire mapping into the variable. Instead, you are creating a reference to the mapping, which allows you to access and modify the original mapping using the variable. This is done to avoid copying large amounts of data unnecessarily, which can be inefficient and waste gas.

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

Output: 
 <center><img class="image" src="./assets/images/struct-example.JPG" ></center>
 <b><center class="img-label">Output</center></b>

A new zombie will be added to the array of zombies in the `ZombieApocalypse` contract when you call the `addZombie` function. In the `addZombie` function call, the zombie's name, hunger status, and number of brains eaten are specified. A new zombie will then be added to the zombies array. 

**Importsnt Points:**

- Structs allow groups of related variables to be treated as one entity. In many situations, this will allow you to organize your code more effectively and make it easier to work with.

- It is not possible for a struct to contain a member of its own type, although the struct itself can be the value type of a mapping member or it can contain a dynamically-sized array of its type.
<!-- 
## enum

`Enums` are user-defined data types that allow you to define named constants called `enumerators`. Using enums allows you to represent a finite set of options in your code, and provides you with named constants that can be used to represent specific values.

### Defining an enum

To define an enum, you must use the `enum` keyword followed by the name of the enum and a list of enumerators enclosed in braces. 

<pre style="background: rgba(0,0,0,.05); padding:20px">
enum &lt;enum-name&gt; {
  enumerator1,
  enumerator2,
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

An enum's enumerators (i.e. constant values) are automatically assigned integer values starting from zero, unless otherwise specified. In the above example, we define an enum called Level with three enumerators: LOW, MEDIUM, and HIGH, values for these enumerators will be 0, 1, and 2, respectively.

**Important points:**
- There should be at least one value in an enumerated list.
- You cannot use booleans or numbers as enum members
- In a mapping, enums are not permitted to be used as a key type
- You cannot return an enum within a function because enums aren't part of the ABI. -->

## Data location

Data locations are used to specify where a particular variable or data structure should be stored. There are different properties and limitations associated with different data locations, such as their scope and lifetime. Your contract can ensure that your variables and data structures are stored in the right place and that they can be accessed and modified as needed by your contract by explicitly specifying the data location. Additionally, using the correct data location can help optimize the performance and gas usage of your contract. 

There are four type of data location:

**Memory:** 

Local variables and function arguments are stored in the memory data location by default. This means that they are created in memory when the function is called and are deleted when the function returns. The memory data location is temporary and exists only for the duration of the function call. We use the `memory` annotation to explicitly specify that a variable or data structure should be stored in the memory data location. 

It is important to note that data stored in the memory data location is deleted when the function returns, so it is not suitable for storing long-term data or data that needs to be accessed after the function has completed.


**Storage:** 

Contract state variables and struct fields are stored here by default. Data stored in the storage is persistent and can be accessed and modified by contract functions. We use the `storage` annotation to explicitly specify that a variable or data structure should be stored in the storage data location.

**Calldata:** 

This data location is used for function arguments that are passed as part of a contract call (e.g. when calling a contract function from another contract or from a client). Data stored in calldata is read-only and cannot be modified by the contract.  We use the `calldata` annotation to explicitly specify that a variable or data structure should be stored in the calldata data location.

It is temporary and only exists for the duration of the contract call, and is automatically deleted when the contract function returns.

Calldata is a non-modifiable, non-persistent area where function arguments are stored, and behaves mostly like memory. 

If you can, try to use calldata as data location because it will avoid copies and also makes sure that the data cannot be modified. Arrays and structs with calldata data location can also be returned from functions, but it is not possible to allocate such types. Arrays and structs with calldata data location can also be returned from functions, but it is not possible to allocate such types. This means that you cannot create new arrays or structs with calldata data location within a contract function, but you can return existing arrays or structs with calldata data location from a function.

**Stack:** 

The EVM is not a register machine but a stack machine, so all computations are performed on a data area called the stack. We do not specify it to any variable.

Examples:

```sol

```

**Important Points:**
- Data location for all state variables is storage. We can not specify data location annotation with state variable. 
- We can not specifiy data location annotation with value type variable. Data location annotation can only be specified for array, struct or mapping types only inside the function or local variables and arguments. Must be require in function.

## Value types data location
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    // Declare public state variables
    uint public num = 100;
    bool public flag = true;
    address public myAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    bytes2 public fixedByte = 0x3301;

    // Declare a function that returns local variables
    function localVariables() public pure returns(uint, bool, address, bytes2){
        // Declare and initialize local variables
        uint localNum = 100;
        bool localFlag = true;
        address localAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
        bytes2 localByte = 0x3301;
        // Return the local variables
        return (localNum, localFlag, localAddress, localByte);
    }

    // Declare a function that updates the public variables
    function update(uint _num, bool _flag, address _myAddress, bytes2 _fixedByte) public{
        // Assign the input arguments to the public variables
        num = _num;
        flag = _flag;
        myAddress = _myAddress;
        fixedByte = _fixedByte;
    }
}
```
The contract has four `value type` state variables: `num`, `flag`, `myAddress`, and `fixedByte`. All are value types we can not specify data location annotation with its variables and all will be stored at storage data location.

The localVariables function is a pure function that returns four local variables of different types: a `uint` (unsigned integer), a `bool` (boolean), an `address`, and a `bytes2` (fixed size byte array with length 2). All local variables are value type so we can not be specified data location annotation. All will be stored at memory lcation.

The update function is a public function that accepts four input arguments and assigns them to the public variables `num`, `flag`, `myAddress`, and `fixedByte`, respectively. All value type arguments, we can not specifiy annotation and all will be stored at calldata data location.

## Arrays Data location, Iteration and Assignment behaviour
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    // Declare public state variables
    uint16[2] public num = [1,3];

    // Declare a function that returns local variables
    function fun() public returns(uint16){
        // Declare and initialize a local array of one uint16 value
        uint16[1] memory fixedArr = [uint16(19)];

        // Declare and initialize a local array of two uint16 values
        uint16[2] memory fixedArr2 = [uint16(19),1];

        // Getting error because required to explicitly typecast each value in the array to the desired type.
        // uint16[2] memory fixedArr3 = [19,1];

        // Declare a local array of two uint16 values and initialize it with the values from the public state variable "num"
        uint16[2] memory fixedArr4 = num;

        // Declare a local array of two uint16 values in storage and initialize it with the values from the public state variable "num"
        uint16[2] storage fixedArr5 = num;

        // Modify the first element of the "fixedArr4" array
        fixedArr4[0] = 12;

        // Modify the first element of the "fixedArr5" array
        fixedArr5[0] = 12;

        return (fixedArr4[0]);
    }
}
```

Above contract has a public state variable called num which is an array of two uint16 values, initialized to [1,3]. The contract also contains a function named fun() which is marked public and returns a uint16 value. This function has a local array called fixedArr which is an array of one uint16 value, initialized to [uint16(19)]. It also has another local array called fixedArr2 which is an array of two uint16 values, initialized to [uint16(19),1].

fixedArr3 with the values [19,1], but this would generate an error because it is required to explicitly typecast each value in the array to the desired type.

 fixedArr4 and fixedArr5 which are both arrays of two uint16 values. fixedArr4 is initialized with the values from the public state variable num, and fixedArr5 is also initialized with the values from num but is marked as storage. The state variable num is also an array of two uint16 values, which means that the values of num can be directly copied into fixedArr4 because they are both arrays of the same type.


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






funtion fun(string calldata num){

}

function fun2(){
    fun("asdf"); // not call why?
    
}