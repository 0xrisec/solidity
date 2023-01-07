# Types

All variables must be defined with a specific data type. Solidity has three categories of data types: `value types`, `reference types`, and `mapping types`. In this section, we will discuss the various` value types`.	

## Value types

Value types are passed by value, meaning that a copy of the value is made when they are assigned to another variable or passed into a function. Examples of value data types in Solidity include: `boolean`, `integers`, `addresses`, `fixed-size byte arrays`, and `enums`.

## Boolean

A boolean variable is a data type that can hold the values `true` or `false`. The keyword `bool` is used to define a boolean variable, and the default value is `false`. Boolean variables are commonly used to represent the truth or falsity of a statement or condition.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Public boolean variable to store whether aliens exist
    bool public isAliensExist = true;

    // Public boolean variable to store whether kappa exist
    // Default value is false
    bool public isKappaExist;
}
```

`MyContract` contains two public boolean variables: `isAliensExist` and `isKappaExist`. The `isAliensExist` variable is initialized with the value `true`, which means that the contract assumes that aliens do exist. The `isKappaExist` variable is not initialized with a value, so it will default to `false`.

 <center><img class="image" src="./assets/images/bool-type-example.JPG"></center>
 <b><center class="img-label">Output</center></b>

The `isAliensExist` and `isKappaExist` variables are marked as public, which means they can be accessed by external contract callers. These variables could be used to store the truth or falsity of certain statements or conditions within the contract.

**Operators:** Solidity supports all of the standard `boolean` operators that are commonly used in programming languages. These operators are used to perform logical operations on `boolean` values and return a `boolean` result.

* `!` (logical negation)

* `&&` (logical conjunction, "and")

* `||` (logical disjunction, "or")

* `==` (equality)

* `!=` (inequality)

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
   // Public boolean variable to store whether aliens exist
    bool public isAliensExist = true;

    // Public boolean variable to store whether kappa exist
    // Default value is false
    bool public isKappaExist;

    // Public boolean variable to store whether UFO exists
    // Calculated using the negation operator on isAliensExist
    bool public isUFO = !isAliensExist;

    // Public boolean variable to store whether it is a human
    // Calculated using the conjunction operator on isAliensExist and isKappaExist
    bool public isHuman = isAliensExist && isKappaExist;

    // Public boolean variable to store whether it is an animal
    // Calculated using the disjunction operator on isAliensExist and isKappaExist
    bool public isAnimal = isAliensExist || isKappaExist;

    // Public boolean variable to store whether isAliensExist is equal to isKappaExist
    // Calculated using the equality operator on isAliensExist and isKappaExist
    bool public isEqual = isAliensExist == isKappaExist;

    // Public boolean variable to store whether isAliensExist is not equal to isKappaExist
    // Calculated using the inequality operator on isAliensExist and isKappaExist
    bool public isNotEqual = isAliensExist != isKappaExist;     // true
}
```
This code is defining a contract called `MyContract`. Within the contract, there are several public `boolean` variables that store values representing different states or conditions.

<center><img class="image" src="./assets/images/bool-operator-example-output.JPG"></center>
<b><center class="img-label">Output</center></b>

The `isAliensExist` variable is initialized to `true`, and the `isKappaExist` variable is not explicitly initialized, so it takes on the default value of `false`.

The `isUFO` variable is calculated using the negation operator on the isAliensExist variable, so it is assigned the value `false`.

The `isHuman` variable is calculated using the `conjunction` operator on the `isAliensExist` and `isKappaExist` variables, so it is assigned the value false.

The `isAnimal` variable is calculated using the `disjunction` operator on the `isAliensExist` and `isKappaExist` variables, so it is assigned the value `true`.

The `isEqual` variable is calculated using the `equality` operator on the `isAliensExist` and `isKappaExist` variables, so it is assigned the value `false`.

The `isNotEqual` variable is calculated using the `inequality` operator on the `isAliensExist` and `isKappaExist` variables, so it is assigned the value `true`.

## Integers

There are two main types of integers: `signed integers (int)` and `unsigned integers (uint)`. Both types can be declared with varying sizes, such as int8, int16, uint8, uint16, etc.

**Signed integers (int):** 

`Signed integers` can hold both negative and positive values. The `int` type is used to declare signed integers, which are available in different sizes such as int8, int16, upto int256.

For example, an `int8` variable can hold signed integers that are `8 bits` in size, which means it can store values ranging from `-128` to `127`. 

`int` is the alias for int256.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
  // Public signed integer of 8 bits in size
  int8 public i8 = -127;

  // Public signed integer of 256 bits in size
  // int is an alias for int256
  int public i256 = 1123;
}
```

There are two public signed integer variables: `i8` and `i256`.

The `i8` variable is declared as an `int8`, which means it can hold signed integers that are `8 bits` in size. It is initialized to the value of `-127`, which is within the range of values that an `int8` can hold (`-128` to `127`).

The `i256` variable is declared as an `int`, which is an alias for `int256`. This means it can hold signed integers that are up to `256 bits` in size. It is initialized to the value of `1123`, which is within the range of values that an int can hold (`-2^255` to `2^255 - 1`).

**Unsigned integers (uint):** 

`Unsigned integers` can hold only positive values along with `zero`. The `uint` type is used to declare unsigned integers, which are available in different sizes such as uint8, uint16, upto uint256.

For example, a `uint8` variable can hold unsigned integers that are `8 bits` in size, which means it can store values ranging from `0` to `255`. The `uint` type has an alias called `uint256`, which means that a `uint` variable can hold an unsigned integer value of up to `256` bits in size.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
    // Public unsigned integer of 8 bits in size
    uint8 public u8 = 27;

    // Public unsigned integer of 256 bits in size
    // uint is an alias for uint256
    uint public u256 = 1123;
}
```
There are two public unsigned integer variables: `u8` and `u256`.

The `u8` variable is declared as a `uint8`, which means it can hold unsigned integers that are `8 bits` in size. It is initialized to the value of `27`, which is within the range of values that a `uint8` can hold (`0` to `255`).

The `u256` variable is declared as a `uint`, which is an alias for `uint256`. This means it can hold unsigned integers that are up to `256 bits` in size. It is initialized to the value of `1123`, which is within the range of values that a uint can hold (`0` to `2^256 - 1`).

<div class="doc-note">
	<p class="alert alert-primary"><b>Note:</b> By explicitly specifying the number of bits, you can always make your variable smaller if you know it will never hold that many bits.</p>
</div>

**Range:**

To identify the range of types, we can use the following formulas.

* The formula for a signed number with N bits are
      
   <div>
      <img class="image" src="./assets/images/signed.JPG">
   </div>

* The formulas for an unsigned number with N bits are

   <div>
      <img class="image" src="./assets/images/unsigned.JPG">
   </div>

Solidity provides the type method, which allows you to find out the minimum and maximum values of a type without having to manually calculate the range for each type. To use this method, you can simply use `type(x).min` to access the minimum value represented by the type and `type(x).max` to access the maximum value. 

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
    // Public variable to store the minimum value of int8
    // This value is calculated using the type method
    // and is equal to -128
    int8 public minInt = type(int8).min;

    // Public variable to store the maximum value of int8
    // This value is calculated using the type method
    // and is equal to 127
    int8 public maxInt = type(int8).max;
}
```
Contract has two public variables: `minInt` and `maxInt`. `minInt` is of type `int8` and is initialized to the minimum value that an `int8` can hold. This value is calculated using the type method, which takes an integer type as an argument and returns an object with information about that type. In this case, `type(int8)` returns an object with information about the `int8` type, and we access the min property of this object to get the minimum value that `int8` can hold.

Similarly, `maxInt` is of type `int8` and is initialized to the maximum value that an `int8` can hold. This value is also calculated using the type method and accessed using the `max` property.

This code demonstrates how to use the type method to access information about integer types It is useful when you need to know the minimum and maximum values that a particular integer type can hold, or when you want to enforce limits on the values that can be stored in a given integer type.

### Integers work with the following operators:

**Comparisons:** `<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool) 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Public integer variable to store the damage value
    // Default value is -8
    int public damage = -8;
    // Public integer variable to store the life value
    // Default value is 255
    int public life = 255;

    // Public boolean variable to store whether life is less than damage
    // Calculated using the less than operator on life and damage
    bool public isDie = life < damage; // false
}
```

**Bitwise operators:**

* `&` (bitwise AND)

* `|` (bitwise inclusive OR)

* `^` (bitwise XOR (exclusive OR))

* `~` (bitwise NOT)

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
     // Public unsigned integer of 8 bits in size, representing the element "water"
    uint8 public water = 2;

    // Public unsigned integer of 8 bits in size, representing the element "fire"
    uint8 public fire = 1;

    // Public unsigned integer of 8 bits in size
    // Calculated using the bitwise AND operator on water and fire
    // This will result in 0 because the binary representation of water (0010)
    // AND the binary representation of fire (0001) is equal to 0 (0000)
    uint8 public bitWise = water & fire;
}
```

<div class="doc-note">
	<p class="alert alert-primary"><b>Note :</b> Bit operations are performed on the two's complement representation of the number. This means that, for example ~int256(0) == int256(-1). In the example given, the tilde (~) symbol represents the bitwise NOT operator. When applied to the integer value 0, it inverts all the bits in the binary representation of that value, resulting in a new integer value of -1. This is because the two's complement representation of -1 is all 1s, and the bitwise NOT operator inverts all the bits in a given value.
   </p>
</div>

**Shift operators:** `<<` (left shift), `>>` (right shift)

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Public unsigned integer of 8 bits in size with value 2
    uint8 public water = 2;
    // Public unsigned integer of 8 bits in size with value 1
    uint8 public fire = 1;

    // Public unsigned integer of 8 bits in size
    // This value is calculated using the right shift operator on water and fire
    // and is equal to 1
    uint8 public rightShift= water >> fire;
}
```

**Modulo:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare a public unsigned integer variable with a value of 2
    uint8 public water = 2;
    // Declare a public unsigned integer variable with a value of 1
    uint8 public fire = 1;
    // Declare a public unsigned integer variable to store the result of the modulo operation
    // The modulo operation calculates the remainder of the division of water by fire
    // In this case, the result is 0 because 2 % 1 is 0
    uint8 public mod = water % fire;
}
```

**Exponentiation:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Public variable to store the result of 10 raised to the power of 2
    // This value is equal to 100
    int public exp = 10**2;

    // Public variable to store the result of a comparison between 10 raised to the power of 2 and 102
    // This value is calculated using the equality operator and is equal to true
    bool public isEqual = 102 == 1e2; // where 1e2 = 1 x 10**2
}
```

<!-- ## Fixed Point Numbers

<div class="doc-note">
		<p class="alert alert-danger">
      Fixed point numbers, also known as fixed precision numbers, are a type of data used to represent numbers with a fixed number of decimal places. They are not currently fully supported in Solidity, meaning they can be declared but cannot be assigned to or from. However, future versions of Solidity may include support for using fixed point numbers in contracts.
     </p>
</div>

Fractional numbers are represented by `fixed point numbers` by storing a fixed number of digits of their fractional part. It does not matter how large or small the fractional part is, it will always use the same number of bits.

There are two types of fixed point numbers of various sizes:

* `fixedMxN:` signed fixed point number.

* `ufixedMxN:` unsigned fixed point number.

where `M` represents the number of bits taken by the type, `M` must be divisible by 8 and goes from 8 to 256 bits And `N` represents how many decimal points are available, `N` must be between 0 and 80.

**Operators:**

* **Comparisons:** `<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool)

* **Arithmetic operators:** `+`, `-`, `unary -`, `*`, `/`, `% (modulo)` -->

## Address

`Addresses` are used to represent `Ethereum accounts` or `smart contracts`. They can be thought of as similar to bank account numbers, as they are used to send and receive Ether between `accounts`. `Addresses` are stored as `20-byte` values on the Ethereum blockchain.

Solidity has two types of `addresses`: `address` and `address payable`. Both types store `20-byte` values, but `address payable` allows for sending Ether to the address in addition to just storing it.

An address literal is declared by including a `40-character (20-byte)` value, starting with `0x`, which represents hexadecimal format. For example: ```address myAddress = 0x1234567890123456789012345678901234567890;```

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Public address variable to store the address value
    // The address value is in hexadecimal format and is 20 bytes long
    address public myAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
}
```

**Operators:**

`<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool) 

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare two public address variables
    address public address1 = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address public address2 = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    // Declare a public boolean variable to store the result
    // of the comparison between address1 and address2
    bool public isEqual = address1 == address2; // true
}
```

## Fixed-size Byte Arrays

A fixed-size byte array is a sequence of bytes that is represented in hexadecimal and has a predetermined length that cannot be altered once it has been declared. 

**Syntax:** `bytes<Size> <Visibility> <Name of array> = <Value>; `

`size:` The value types `bytes1`, `bytes2`, `bytes3`, …, `bytes32` hold a sequence of bytes from `1` to up to `32`. The array's size is specified using the `bytes<size>` syntax, where `size` can be any value from `1` to `32`. 

`visibility:` The visibility of the array, such as `public`, `private`, `internal`, or `external`, can also be specified.

`Name of array:` The name of the array follows Solidity's naming conventions and the value can be a hexadecimal string or any other string.

`Value:` The value can be in `hexadecimal(such as 0x616263)` or any `string`. The array cannot change in size after it has been initialized.

**Example:** Here is an example of a public fixed-size byte array that has a size of `4 bytes` and a value of `"abcd"`:
<img class="image" src="./assets/images/fixed-size-byte-array.JPG">
<b><center class="img-label">Fixed-size Byte Array</center></b>

In the above image, a byte array is used to store the characters "a", "b", "c", and "d" as hexadecimal numbers. Each character occupies `1 byte (8 bits)` of space in the array. The hexadecimal values of these characters can be found in the <a href="https://www.alpharithms.com/ascii-table-512119/" target="_blank">ASCII</a> table.

<div class="doc-note">
   <p class="alert alert-primary">
      <b>Note:</b><br>
      <span>
         1 byte = 8bits 
      </span><br>
      <span>
         1 hexadecimal digit = 4 bits
      </span>
   </p>
</div>

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declares a public fixed-size byte array with size 2 and value 0x3301
    bytes2 public cicada = 0x33;

    // Declares a public fixed-size byte array with size 1 and value 0x61 (ASCII value for 'a')
    bytes1 public character= 'a';

    // Declares a public fixed-size byte array with size 4 and value 0x61626364
    bytes4 public name= "abc";

    // Declares a public fixed-size byte array with size 1 and value 0x61 (first character of 'name' array)
    bytes1 public firstChar = name[0];
}
```

There are four public fixed-size byte arrays. The first array, `cicada`, has a size of `2 bytes` and a value of `0x3301`. The second array, `character`, has a size of `1 byte` and a value of `0x61`, which is the `ASCII` value for the character `'a'`. The third array, `name`, has a size of `4 bytes` and a value of `0x61626364`, which represents the string `"abcd"` in hexadecimal form. The fourth array, `firstChar`, has a size of `1 byte` and a value of `0x61`, which is the first character of the `name` array.

 <center><img class="image" src="./assets/images/fixed-byte-array-example.JPG"></center>
 <b><center class="img-label">Output</center></b>

The four fixed-size byte arrays are each initialized with a specific value. If the value does not occupy the entire size of the array, padding of `0s` will be added to fill the remaining space. For example, the `name` array has a size of `4 bytes`, but its value (`abc`) only occupies 3 byte. Therefore, a padding of 0 will be added to fill the remaining `1 byte` of the array.

Additionally, if a fixed-size byte array is not initialized with a value, it will be padded with `0s` until it reaches its full size. For example, if we declare a `bytes4` array but do not initialize it with a value, it will be padded with `4 bytes` of `0s`.

**Members:**

Fixed-size byte arrays have a `.length` member that returns the fixed length of the array. This member is read-only, meaning it can only be used to retrieve the length of the array and cannot be used to change it.

For example, consider the following code:
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
   // Declares a public fixed-size byte array with size 4 and value 0x61626364
    bytes4 public exampleArray = 0x61626364;

    // Defines a function that returns the fixed length of the 'exampleArray' byte array
    function getLength() public view returns (uint8) {
        // Returns the length of the 'exampleArray' byte array
        return exampleArray.length;
    }
}
```

Inside the contract, there is a public fixed-size byte array called `exampleArray` with a size of `4 bytes` and a value of `0x61626364`.

The contract also defines a function called `getLength`, which returns the fixed length of the `exampleArray` byte array. The function is marked as public and view, meaning it can be called by any external contract or account and does not modify the state of the contract. The function returns a value of type `uint8`, which is an `8-bit unsigned` integer. The `getLength` function can be called to retrieve the length of the `exampleArray` byte array, which is `4`.


