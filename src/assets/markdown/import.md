# Import

The contents of local and external files can be accessed within your code by importing them. You can use this to organize your code into smaller, reusable chunks or to include libraries and other external resources.

To import a file, you can use the import directive followed by the file path. For example:

```sol
import "./Utils.sol"; // local file
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol"; //external file
```

# Libraries

Libraries are a useful tool in Solidity for sharing code between contracts. They contain functions and data structures, but do not have state variables or the ability to receive ether, making them more lightweight and efficient than regular contracts. Libraries can be imported and used in other contracts, allowing for easy code reuse. They can also be inherited from other libraries and contracts, allowing for easy extension and customization of existing code.

To use a library in your contract, you can use the library keyword to access its functions:

**Example:**

```sol
library MyLibrary {
    function foo() public pure returns (uint) {
        return 42;
    }
}
```

```sol
import "./MyLibrary.sol";

contract MyContract {
    function doSomething() public {
        uint result = MyLibrary.foo();
    }
}
```
Libraries can be derived from other libraries and contracts, just like regular contracts. This allows you to take advantage of existing code and build upon it, making it easier to create complex and custom solutions. By inheriting from libraries and contracts, you can customize and extend their functionality to fit your specific needs. This helps to reduce the amount of code you need to write and makes it easier to reuse and maintain your code over time.

```sol
// BaseLibrary is a library that contains a function called foo()
library BaseLibrary {
    // This function returns the number 42
    function foo() public pure returns (uint) {
        return 42;
    }
}

// MyLibrary is a library that inherits from BaseLibrary
library MyLibrary is BaseLibrary {
    // This function calls foo() from BaseLibrary and returns the result multiplied by 2
    function bar() public pure returns (uint) {
        return foo() * 2;
    }
}

// MyContract is a contract that inherits from MyLibrary
contract MyContract is MyLibrary {
    // This function calls the bar() function from MyLibrary and stores the result in the "result" variable
    function doSomething() public {
        uint result = bar();
    }
}
```