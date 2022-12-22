# Types

The Solidity programming language is statically typed, which means each variable must be defined by its type. Data types in Solidity can generally be categorized into three groups: `value types`, `reference types` and `mapping types`. We will examine the various `value types` in this section.
							

## Value types

These types of variables are always <a href="https://www.javascripttutorial.net/javascript-pass-by-value/" target="_blank">passed by value</a>, which is why they are called value types since they are always copied when assigned to another variable or passed into a function.

Value data types include the following:
`boolean`,
`integers`,
`fixed point numbers`,
`addresses`,
`fixed-size byte arrays`,
`rational and integer literals`,
`enums`

## Boolean

A boolean variable is defined by the keyword `bool`, whose values are constants `true` and `false`. The default value for `bool` in Solidity is `false`.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
   bool public isAliensExist = true;                           // true
   bool public isKappaExist;                                   // false
}
```

**Operators:** Solidity supports all our regular boolean operators, such as
	
* `!` (logical negation)

* `&&` (logical conjunction, "and")

* `||` (logical disjunction, "or")

* `==` (equality)

* `!=` (inequality)

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
   bool public isAliensExist = true;                           // true
   bool public isKappaExist;                                   // false
   bool public isUFO = !isAliensExist;                         // false
   bool public isHuman = isAliensExist && isKappaExist;        // false
   bool public isAnimal = isAliensExist || isKappaExist;       // true
   bool public isEqual = isAliensExist == isKappaExist;        // false
   bool public isNotEqual = isAliensExist != isKappaExist;     // true
}
```

## Integers

Solidity has two main types of integers of `varying sizes`:

**Signed integers (int):** Signed integers can hold both negative and positive values. `int` is used to declare signed integers which is aviable in different `bits` size such as int8, int16 etc.

`int8` means, It can hold signed integers whose size is 8bit. As a result, -128 to 127 integers can be held in it.

`int` is the alias for int256.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;
contract Example{
  int8 public i8 = -127;
  int public i256 = 1123; // int is same as int256
}
```
<br>

**Unsigned integers (uint):** Unsigned integers can hold only positive values along with zero. `uint` is used to declare usigned integers, which are also available in different bit sizes, such as `uint8`, `uint16` etc. 

`uint8` holds an 8-bit unsigned integer with a range of 0 to 255.

`uint` is the alias for uint256.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;
contract Example{
  uint8 public u8 = 27;
  uint public u256 = 1123; // uint is same as uint256
}
```

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

Solidity gives us the type method to find out the `minimum` and `maximum` value of a type without having to calculate the range for each type. For an integer type x , you can use `type(x).min` and `type(x).max` to access the `minimum` and `maximum` values represented by the type.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;
contract Example{
    int8 public minInt = type(int8).min; // -128
    int8 public maxInt = type(int8).max; // 127
}
```

### Integers work with the following operators:

**Comparisons:** `<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool) 

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.15;
contract MyContract {
   int public damage = -8;
   int public life = 255;
   bool public isDie = life < damage; //false
}
```

**Bitwise operators:**

* `&` (bitwise AND)

* `|` (bitwise inclusive OR)

* `^` (bitwise XOR (exclusive OR))

* `~` (bitwise NOT)

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.15;
contract Example{
    uint8 public water = 2;
    uint8 public fire = 1;
    uint8 public bitWise= water & fire; // 0
}
```

<div class="doc-note">
	<p class="alert alert-primary"><b>Note:</b>Bit operations are performed on the two's complement representation of the number. This means that, for example ~int256(0) == int256(-1).</p>
</div>

**Shift operators:** `<<` (left shift), `>>` (right shift)

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.15;
contract Example{
    uint8 public water = 2;
    uint8 public fire = 1;
    uint8 public rightShift= water >> fire; // 1
}
```

**Modulo:**

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.15;
contract Example{
   uint8 public water = 2;
   uint8 public fire = 1;
   uint8 public mod = water % fire; // 0
}
```

**Exponentiation:**

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.15;
contract Example{
       int public exp = 10**2; //100
       bool public isEqual = 10**2 == 1e2; // where 1e2 = 1 x 10**2
}
```

## Fixed Point Numbers

<div class="doc-note">
		<p class="alert alert-danger">Fixed point numbers are not fully supported by Solidity yet. They can be declared, but cannot be assigned to or from. Although they exist, you cannot use them yet. You'll be able to use them in the future to represent numbers with a fixed number of decimal places with solidity's new version.</p>
</div>

Fractional numbers are represented by `fixed point numbers` by storing a fixed number of digits of their fractional part. It does not matter how large or small the fractional part is, it will always use the same number of bits.

There are two types of fixed point numbers of various sizes:

* `fixedMxN:` signed fixed point number.

* `ufixedMxN:` unsigned fixed point number.

where `M` represents the number of bits taken by the type, `M` must be divisible by 8 and goes from 8 to 256 bits And `N` represents how many decimal points are available, `N` must be between 0 and 80.

**Operators:**

* **Comparisons:** `<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool)

* **Arithmetic operators:** `+`, `-`, `unary -`, `*`, `/`, `% (modulo)`

## Address

`Addresses` can be thought of as `bank account numbers`; if you want to send money to me, you will need my bank account number. In the same way, `Ether` can be sent and received from one account to another using `addresses`. The Ethereum blockchain stores addresses as `20-byte` values for accounts and smart contracts.

There are two types of address in Solidity, `address` and `address payable`. Both `address` and `address payable` stores the `20-byte` values.

In the following example, the `address` literal declaration contains 40 characters (20 bytes) and starts with `0x`, which represents `hexadecimal` format.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;
contract MyContract {
  address public myAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
}
```

**Operators:**

`<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool) 

<div class="doc-note">
		<p class="alert alert-primary">For now, it`s just a quick introduction of the address. Later, we'll cover it in more details with address payable.</p>
</div>


## Fixed-size Byte Arrays


Fixed-size byte arrays store a sequence of bytes data in hexadecimal format and have a fixed length that cannot be changed after it has been declared. It is an array that cannot grow or shrink in terms of capacity.

**Syntax:** `bytes<Size> <Visibility> <Name of array> = <Value>; `

`size:` The value types `bytes1`, `bytes2`, `bytes3`, …, `bytes32` hold a sequence of bytes from one to up to 32.

`visibility:` Visibility such as `public`, `private`, `internal`, `external`. We will see these in a later section. Throughout our examples, we will use `public` visibility which means the variable is accessible to all. 

`Name of array:` It is a variable name and follows solidity's general naming convention.

`Value:` The value can be in `hexadecimal(such as 0x616263)` or any `string`.

**Example:** Below is an example of a public fixed size byte array whose size is 4bytes and value is "abcd".
<img class="image" src="./assets/images/fixed-size-byte-array.JPG">
<b><center class="img-label">Fixed-size Byte Array</center></b>

The above image shows a byte array that stores `a`, `b`, `c`, and `d` as hexadecimal numbers and each character has `1byte (8 bits)` size. For hexadecimal values of alphabets, check out the <a href="https://www.alpharithms.com/ascii-table-512119/" target="_blank">ASCII</a> table.

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
pragma solidity 0.8.15;

contract Example{
   bytes2 public cicada = 0x3301;      //0x3301
   bytes1 public character= 'a';       //0x61
   bytes4 public name= "abcd";         //0x61626364
   bytes1 public firstChar = name[0];  //0x61
}
```

If the value does not occupy the entire space or if the variable has not been initialized, a padding of 0 will be added

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract Example{
   bytes4 public empty;          // 0x00000000
   bytes3 public name = "a";     // 0x610000
}
```

We cannot modify a fixed size byte array at the index level, but we can re-initialize the variable. 

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract Example{
   bytes4 public empty;          // 0x00000000
   bytes3 public name = "abc";   // 0x616263
  
   // A method for updating the values of variables
   function update() public{
      empty = "fill";            // 0x66696c6c
      name = "def";              // 0x646566       
      // name[1] = 'e';          // ERROR: Single bytes in fixed bytes arrays cannot be modified.
   }
}
```

**Members:**
 .length yields the fixed length of the byte array (read-only).

