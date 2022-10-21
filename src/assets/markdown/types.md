# Types

The Solidity programming language is statically typed, which means each variable must be defined by its type. Data types in Solidity can generally be categorized into three groups: `value types`, `reference types` and `mapping types`. We will examine the various `value types` in this section.
							

## Value types

These types of variables are always <a href="https://www.javascripttutorial.net/javascript-pass-by-value/" target="_blank">passed by value</a>, which is why they are called value types since they are always copied when assigned to another variable or passed into a function.

Value data types include the following:
`boolean`
`integers`
`fixed point numbers`
`addresses`
`fixed-size byte arrays`
`rational and integer literals`
`enums`

<hr id="boolean">

### Booleans

**bool:**  A boolean variable is defined by the keyword `bool`, whose values are constants `true` and `false`. The default value for `bool` in Solidity is `false`. 
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
   bool public isAliensExist = true;
   bool public isKappaExist;
}

//output
//true
//false

```

**Operators:** Solidity supports all our regular boolean operators, such as
	
* `!` (logical negation)

* `&&` (logical conjunction, "and")

* `||` (logical disjunction, "or")

* `==` (equality)

* `!=` (inequality)

<hr id="integers">

### Integers

Solidity has two main types of integers of `varying sizes`:

**Signed integers (int):** Signed integers can hold both negative and positive values. `int` is used to declare signed integers which is aviable in different `bits` size such as int8, int16 etc.

`int8` means, It can hold signed integers whose size is 8bit. As a result, -128 to 127 integers can be held in it.

`int` is the alias for int256.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;
contract Example{
  int8 public i8 = -127;
  int public i256 = 1123; // int is same as int256
}
```


**Unsigned integers (uint):** Unsigned integers can hold only positive values along with zero. `uint` is used to declare usigned integers, which are also available in different bit sizes, such as `uint8`, `uint16` etc. 

`uint8` holds an 8-bit unsigned integer with a range of 0 to 255.

`uint` is the alias for uint256.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;
contract Example{
  uint8 public u8 = 27;
  uint public u256 = 1123; // uint is same as uint256
}
```

<div class="callout-block callout-block-info">
   <div class="content">
		<h4 class="callout-title">
         <span class="callout-icon-holder me-1">
            <i class="fas fa-info-circle"></i>
         </span>
         Note
   	</h4>
			<p> By explicitly specifying the number of bits, you can always make your variable smaller if you know it will never hold that many bits.</p>
	</div>
</div>

**Range:**
To identify the range of types, we can use the following formulas.

* The formula for a signed number with N bits are
      
   <div class="s">
      <img src="../../../assets/images/signed.JPG">
   </div>

* The formulas for an unsigned number with N bits are

   <div class="s">
      <img src="../../../assets/images/unsigned.JPG">
   </div>

Solidity gives us the type method to find out the `minimum` and `maximum` value of a type without having to calculate the range for each type. For an integer type x , you can use `type(x).min` and `type(x).max` to access the `minimum` and `maximum` values represented by the type.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;
contract Example{
    int8 public minInt = type(int8).min;
    int8 public maxInt = type(int8).max;
}
//output
//-128
//127
```

##### Integers work with the following operators:

**Comparisons:** `<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool) 

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;
contract Example{
    int private num1 = 8;
    int private num2 = -8;
    bool public isMax = num1>num2
}
//output
//true
```

**Bitwise operators:**

* `&` (bitwise AND)

* `|` (bitwise inclusive OR)

* `^` (bitwise XOR (exclusive OR))

* `~` (bitwise NOT)

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;
contract Example{
    int private num1 = 8;
    int private num2 = -8;
    int public bitWise= num1 & num2;
}
//output
//8
```

<div class="callout-block callout-block-info">
   <div class="content">
		<h4 class="callout-title">
         <span class="callout-icon-holder me-1">
            <i class="fas fa-info-circle"></i>
         </span>
         Note
   	</h4>
			<p> Bit operations are performed on the two's complement representation of the number. This means that, for example ~int256(0) == int256(-1). </p>
	</div>
</div>

**Shift operators:** `<<` (left shift), `>>` (right shift)

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;
contract Example{
   uint8 private a = 20;
   uint8 private b = 2;
   uint8 public rightshift = a >> b;
}
//output
//80
```

**Modulo:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;
contract Example{
       uint8  a = 20;
       uint8  b = 3;
       uint8 public mod = a % b;
}
//output
//2
```

**Exponentiation:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;
contract Example{
       int public exp = 10**2;
}
//output
//100
```

<hr id="fixed-point-numbers">

### Fixed Point Numbers

<div class="callout-block callout-block-warning">
	<div class="content">
		<h4 class="callout-title">
			<span class="callout-icon-holder me-1">
				<i class="fas fa-bullhorn"></i>
			</span>
				Warning
		</h4>
		<p>Fixed point numbers are not fully supported by Solidity yet. They can be declared, but cannot be assigned to or from. Although they exist, you cannot use them yet. You'll be able to use them in the future to represent numbers with a fixed number of decimal places with solidity's new version.</p>
	</div>
</div>

Fractional numbers are represented by `fixed point numbers` by storing a fixed number of digits of their fractional part. It does not matter how large or small the fractional part is, it will always use the same number of bits.

There are two types of fixed point numbers of various sizes:

* `fixedMxN:` signed fixed point number.

* `ufixedMxN:` unsigned fixed point number.

where `M` represents the number of bits taken by the type, `M` must be divisible by 8 and goes from 8 to 256 bits And `N` represents how many decimal points are available, `N` must be between 0 and 80.

##### Operators:

* **Comparisons:** `<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool)

* **Arithmetic operators:** `+`, `-`, `unary -`, `*`, `/`, `% (modulo)`

<hr id="addresses">

### Address

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

##### Operators:

`<=`, `<`, `==`, `!=`, `>=`, `>` (evaluate to bool) 

**For now, it`s just a quick introduction of the address. Later, we'll cover it in more details with address payable.**

<hr id="fixed-size-byte-array">

### Fixed-size Byte Arrays

A fixed-size array refers to the array that is not capable of growing or shrinking in terms of its capacity. Solidity supports the byte data type that represents a value of a byte (8 bits sign integer). 

<div class="callout-block callout-block-info">
   <div class="content">
		<h4 class="callout-title">
         <span class="callout-icon-holder me-1">
            <i class="fas fa-info-circle"></i>
         </span>
         Note
   	</h4>
			<p> 1 byte = 8bits </p>
			<p> 1 hexadecimal digit = 4 bits </p>
	</div>
</div>

A fixed-size byte array contains a sequence of bytes. Its length must always be specified in the type declaration. These are declared in the following way: `bytes1`, `bytes2`, `bytes3`, up to `bytes32`. `byte` is an alias for `bytes1`.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.15;
contract MyContract {
    bytes1 public num = 0x11;//hexadecimal representation
    bytes2 public cicada = 0x3301;
    bytes1 public character= 'a';
}
//output
//bytes1: 0x11
//bytes2: 0x3301
//bytes1: 0x61
```