 # inheritance

 Inheritance allows a contract to inherit the properties and functions of another contract. This means that the inheriting contract can use the inherited functions and variables as if they were defined in the contract itself. Inheritance is useful for code reuse and modularization, as it allows contracts to share common code without duplicating it. Solidity supports multiple inheritance.

Contracts can inherit other contracts using the `is` keyword. 

**Example:**
// In this example, contract Child inherits from contract Parent and reuses its `add` function.
// As a result, contract Child has access to both the `add` and `multiply` functions.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

// Parent contract
contract Parent {
    // Add function
    function add(uint a, uint b) public pure returns (uint) {
        // Return the sum of a and b
        return a + b;
    }
}

// Child contract that inherits from Parent
contract Child is Parent {
    // Multiply function
    function multiply(uint a, uint b) public pure returns (uint) {
        // Return the product of a and b
        return a * b;
    }
}
```

The "Parent" contract has a single function named "add" which takes two unsigned integer arguments (uint a and uint b) and returns their sum. The "public" and "pure" keywords indicate that this function can be called by anyone and does not have any side effects (i.e., it does not modify the state of the contract).

The "Child" contract is a subclass of the "Parent" contract, and it inherits all the functions and data of the "Parent" contract. In addition to the "add" function inherited from the "Parent" contract, the "Child" contract also has a function named "multiply" which takes two unsigned integer arguments (uint a and uint b) and returns their product. Like the "add" function, the "multiply" function is also public and pure.

If you want to override a function in a child contract, the function must be declared as "virtual" in the parent contract.
The "override" keyword is used to indicate that a function in a child contract is overriding a virtual function in the parent contract.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

// Parent contract
contract Parent {
    // Virtual function
    function foo() public virtual {
        // code
    }
}

// Child contract that inherits from Parent
contract Child is Parent {
    // Overridden function
    function foo() public override {
        // code
    }
}
```

the "foo" function in the "Parent" contract is marked as "virtual", which means it can be overridden by a child contract. The "Child" contract then overrides the "foo" function by using the "override" keyword. This allows the "Child" contract to have its own implementation of the "foo" function, while still inheriting the rest of the functions and data from the "Parent" contract.

It is important to note that the function in the child contract must have the same function signature as the virtual function in the parent contract (i.e., the same name, input types, and output types) in order for the override to be valid. If the function signature is different, it will not be considered an override and will be treated as a new function.


the order in which parent contracts are listed is important. 
It is generally recommended to list the parent contracts in the order from "most base-like" to "most derived". Order of inheritance is important. Swapping the order of contracts will throw a compilation error.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

/* Graph of inheritance
    A
   / \
  B   C
 / \ /
F  D,E

*/

// A contract that defines a virtual function
contract A {
    function foo() public pure virtual returns (string memory) {
        return "A";
    }
}

// B contract that inherits from A and overrides the virtual function
contract B is A {
    //It is overriding a virtual function of the parent contract A.
    function foo() public pure virtual override returns (string memory) {
        return "B";
    }
}

// C contract that inherits from A and overrides the virtual function
contract C is A {
    //It is overriding a virtual function of the parent contract A.
    function foo() public pure virtual override returns (string memory) {
        return "C";
    }
}

// When a contract calls a function that is defined multiple times in different contracts, the parent contracts are searched from right to left, and in depth-first manner.
contract D is C, B {
    // D.foo() returns "B"
    // Since B is the right most parent contract with function foo()
    function foo() public pure virtual override(C, B) returns (string memory) {
        return super.foo();
    }
}

contract E is B, C {
    // E.foo() returns "C"
    // since C is the right most parent contract with function foo()
    function foo() public pure override(B, C) returns (string memory) {
        return super.foo();
    }
}

// The parent contracts must be listed in the order from "most base-like" to "most derived".
// Swapping the order of A and B will throw a compilation error.
contract F is A, B {
    function foo() public pure override(A, B) returns (string memory) {
        return super.foo();
    }
}
```

In above example, several contracts that inherit from each other and override virtual functions.
- The "A" contract defines a pure virtual function called "foo". This function is marked as "pure" because it does not modify the contract's state, and "virtual" because it will be overridden by child contracts.

- The "B" contract inherits from the "A" contract and overrides the "foo" function. The "B" contract's implementation of "foo" returns the string "B".

- The "C" contract also inherits from the "A" contract and overrides the "foo" function. The "C" contract's implementation of "foo" returns the string "C".

- The "D" contract inherits from both the "C" and "B" contracts. When the "D" contract calls the "foo" function, it is defined in both the "C" and "B" contracts. The parent contracts are searched from right to left, and in depth-first manner, so the implementation in the "B" contract is used. The "D" contract's implementation of "foo" returns the string "B" by calling the "super" keyword and calling the implementation of "foo" in the "B" contract.

- The "E" contract also inherits from both the "B" and "C" contracts. When the "E" contract calls the "foo" function, it is defined in both the "B" and "C" contracts. The parent contracts are searched from right to left, and in depth-first manner, so the implementation in the "C" contract is used. The "E" contract's implementation of "foo" returns the string "C" by calling the "super" keyword and calling.

# Shadowing Inherited State Variables

A contract that inherits from another contract can access the state variables defined in the parent contract, but it cannot override them by re-declaring them in the child contract.

**For example:**
```sol
contract A {
    address public owner;
}

contract B is A {
    // This will throw a compilation error
    address public owner;
}
```
Instead, if you want to change the value of a state variable in a child contract, you can do so by assigning a new value to it within a function in the child contract.\

```sol
contract A {
    address public owner;
}

contract B is A {
    function changeOwner(address _newOwner) public {
        // Assign a new value to owner
        owner = _newOwner;
    }
}
```

In this example, the "B" contract inherits from the "A" contract and defines a function called "changeOwner" that allows the value of the "owner" state variable to be changed. The "owner" state variable is not re-declared in the "B" contract, but rather its value is modified within a function in the "B" contract.

# Calling Parent Contracts

Parent contracts can be called directly by using the contract name, or by using the keyword "super".

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract A {
    function foo() public virtual pure returns (string memory) {
        return "A";
    }
}

contract B is A {
    function foo() public pure override returns (string memory) {
        return "B";
    }

    function bar() public pure returns (string memory) {
        // Call A.foo() directly
        return A.foo();
    }
}
```

The "A" contract defines a virtual function called "foo" which returns a string. The "B" contract is a child contract of "A" and it overrides the "foo" function with its own implementation.

The "B" contract also defines a function called "bar" which calls the "foo" function of the "A" contract directly, without using the keyword "super". This means that the "A.foo()" function is called regardless of any overrides that may have been defined in the "B" contract or any of its ancestor contracts.

The "foo" function of the "A" contract is marked as "virtual" which means that it can be overridden by child contracts. The "foo" function of the "B" contract is marked as "override" which indicates that it is overriding the "foo" function of the "A" contract.

The "bar" function of the "B" contract can be called to return the output of the "A.foo()" function, which is "A".


**`view` functions can be overridden by `pure` functions.**