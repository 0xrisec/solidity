# Import

The contents of local and external files can be accessed within your code by importing them. You can use this to organize your code into smaller, reusable chunks or to include libraries and other external resources.

**Declaration:**
To `import` a file, you can use the `import` directive followed by the `file path`. For example:

```sol
import "./Utils.sol"; // local file import
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol"; // external file import
import "@openzeppelin/contracts/access/Ownable.sol"; // external file import | shorthand notation for importing the contracts from the OpenZeppelin library.
```

# Libraries

`Libraries` are a useful tool for sharing code between `contracts`. They contain functions and data structures, but do not have `state variables` or the ability to receive `ether`, making them more lightweight and efficient than regular contracts. `Libraries` can be imported and used in `other contracts`, allowing for easy code reuse. They can also be inherited from other `libraries` and `contracts`, allowing for easy extension and customization of existing code.

To use a `library` in your `contract`, you can use the `library` keyword to access its functions:

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This is a library file that defines a function called foo()
library MyLibrary {
    // Declare a pure function called foo() that returns an uint value
    function foo() public pure returns (uint) {
        // Return the value 42
        return 42;
    }
}
```
Above is a library source files defines a single `pure` function called `foo()` that returns the value `42`. Pure functions are functions that do not modify the state of the contract, and they do not depend on the state of the contract.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This is a contract file that imports the MyLibrary library
import "./MyLibrary.sol";

contract MyContract {
    // Declare a function called doSomething() that calls the foo() function from the MyLibrary library
    function doSomething() pure public returns(uint){
        // Call the foo() function from the MyLibrary library and store the result in the result variable
        uint result = MyLibrary.foo();
        return result;
    }
}
```

The `contract` file imports the `library` file using the `import` keyword and then defines a contract called `MyContract`. The `MyContract` contract contains a single function called `doSomething()`, which calls the `foo()` function from the `MyLibrary` library and stores the result in a variable called `result`. The `doSomething()` function is marked as `pure`, which means that it is a pure function that does not modify the state of the contract and does not depend on the state of the contract. The `doSomething()` function is also marked as `public`, which means that it can be called by `external` contracts and users. Finally, the `doSomething()` function returns the value of `result` to the caller.

**Important Points:**

- `Libraries` cannot have state variables.

- `Libraries` cannot inherit nor be inherited.

- `Libraries` cannot receive Ether.

- `Libraries` cannot be destroyed.
