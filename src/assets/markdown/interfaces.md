# Abstract Contracts and Interfaces

## Abstract Contracts



An `abstract contract` is a type of `contract` that defines a set of required behaviors or functions for contracts that derive from it. An abstract contract can contain `function definitions` that must be implemented by any contract that derives from it. This allows you to specify a set of required behaviors for derived contracts, while leaving the implementation details to the `derived contracts` themselves.

An abstract contract is a type of contract that defines a set of functions without providing an implementation for them. It serves as a `template` or `base` for `other contracts`. 

To declare an abstract contract, you can use the `abstract` keyword followed by the contract keyword, like this:

```sol
abstract contract MyAbstractContract {
    // Abstract contract definition goes here
}
```
In other words by defining an function in an `abstract contract`, the designer of the contract is specifying that any contract that derives from the `abstract contract` must implement that function. This allows the designer to ensure that `any contract` that derives from the `abstract contract` has a certain set of behaviors, while leaving the implementation details up to the `derived contracts`.

**Example:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Declare an abstract contract called MyAbstractContract
abstract contract MyAbstractContract {
    // Declare a virtual function called doSomething that does not have an implementation
    function doSomething() external virtual;
}

// Declare a contract called MyDerivedContract that derives from MyAbstractContract
contract MyDerivedContract is MyAbstractContract {
    // Provide an implementation for the doSomething function using the override keyword
    function doSomething() public override {
        // Implementation goes here
    }
}
```

In above code, there are two contracts: `MyAbstractContract` and `MyDerivedContract`.

The `MyAbstractContract` contract is an `abstract contract` that defines a `virtual` function called `doSomething`. The `virtual` keyword indicates that this function does not have an implementation and must be implemented by any contract that derives from the `MyAbstractContract` contract. This means that the `MyAbstractContract` contract is specifying a required behavior for any contract that derives from it, but is leaving the implementation details up to the derived contracts.

The `MyDerivedContract` contract is a contract that derives from the `MyAbstractContract` contract. The `MyDerivedContract` contract provides an implementation for the `doSomething` function using the `override` keyword. This allows the `MyDerivedContract` contract to use the implementation of the `doSomething` function defined in the `MyAbstractContract` contract, while also providing its own implementation that takes precedence over the one in the `base contract`.

By using an `abstract` contract, the designer of the `MyAbstractContract` contract is able to specify a set of required behaviors for contracts that derive from it, while still allowing the `derived contracts` to have their own unique implementation details. This allows for flexibility in the design of the derived contracts, while still ensuring that they have certain required behaviors.

**Important Points:**

**1.** A contract must provide arguments for all of its `base contract` constructor if it is not marked as `abstract`. This means that if a contract derives from another contract, it must pass arguments to the `constructor` of the `base contract` in order to create an instance of the `derived contract`.

**For example:**

```sol
pragma solidity 0.8.17;

// Declare a contract called BaseContract
contract BaseContract {
    // Declare a public state variable called value of type uint256
    uint256 public value;

    // Declare a constructor for BaseContract that takes a single argument called _value of type uint256
    constructor(uint256 _value) {
        // Set the value of the value state variable to the value of the _value argument
        value = _value;
    }
}

// Declare a contract called DerivedContract that derives from BaseContract
contract DerivedContract is BaseContract {
    // Declare a constructor for DerivedContract that takes a single argument called _value of type uint256
    // DerivedContract must pass an argument to the constructor of BaseContract in order to create an instance of the contract
    constructor(uint256 _value) BaseContract(_value) {}
}
```

One of the benefits of using `abstract` contracts is that they do not need to provide arguments for all of their `base contract` constructors. This means that an `abstract` contract can be used as a `base contract` for other contracts that derive from it, without requiring the `derived contracts` to pass any arguments to the `base contract's` constructor.

**For example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Declare a contract called BaseContract
contract BaseContract {
    // Declare a public state variable called value of type uint256
    uint256 public value;

    // Declare a constructor for BaseContract that takes a single argument called _value of type uint256
    constructor(uint256 _value) {
        // Set the value of the value state variable to the value of the _value argument
        value = _value;
    }
}

// Declare an abstract contract called DerivedContract that derives from BaseContract
abstract contract DerivedContract is BaseContract {
    // Declare a constructor for DerivedContract
    // If a contract is marked as abstract, it does not need to provide arguments for all of its base contract constructors. 
    constructor() {}
}
```
**2.** Abstract contracts cannot override an implemented virtual function with an unimplemented one.

## Interfaces

An interface defines a list of functions that any contract inheriting from it must implement. Interfaces are used to specify a contract's behavior and can be thought of as a blueprint for the functions that a contract should have.
