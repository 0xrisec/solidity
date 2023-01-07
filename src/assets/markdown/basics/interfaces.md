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

**Declaration:**
The `interface` keyword is used to declare an interface, and the name of the interface follows the keyword. Inside the curly braces, you can declare one or more functions:

```sol
interface MyInterface {
    // Declare one or more functions
    function functionName(type1 param1, type2 param2, ...) visibility modifier returns (type1, type2, ...);
}
```

`Contracts` can inherit `interfaces` just like they can inherit `other contracts`. This allows a contract to implement the functions defined in an `interface`, which can be useful for defining a common interface that is shared by multiple contracts, or for creating a contract hierarchy where `derived contracts` inherit certain behaviors from their `base contracts`.

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

interface MyInterface {
    // Declare a function called doSomething that takes an uint256 value as an input and returns an uint256 value
    function doSomething(uint256 value) pure external returns (uint256);
}

// Declare a contract called MyContract that depends on the MyInterface interface
contract MyContract is MyInterface {
    // Implement the doSomething function defined in the MyInterface interface
    function doSomething(uint256 value) pure public returns (uint256) {
        // Implementation goes here
        return value;
    }
}
```

The `MyInterface` interface contains a single function called `doSomething` that takes an `uint256` value as an input and returns an `uint256` value. The `pure` and `external` keywords are used to specify that the function is a `pure` function that can only be called from outside the contract.

The `MyContract` contract is then declared, and it depends on the `MyInterface` interface. This means that the `MyContract` contract must implement all of the functions defined in the `MyInterface` interface.

The `MyContract` contract implements the `doSomething` function defined in the `MyInterface` interface by providing an implementation for the function.

**Important Points:**

**1.** `Variables` cannot be declared in `interfaces`.

**2.** `Functions` in an `interface` must be marked as `external` and cannot contain any implementation details.

**3.** `Interfaces` are similar to `abstract contracts` in that they define a set of required behaviors or functions for contracts that implement them. However, there are some key differences between `interfaces` and `abstract contracts`:
- `Interfaces` can inherit from other `interfaces`, but cannot inherit from `contracts`.
- `Interfaces` cannot have any functions implemented. All functions declared in an interface must be external and cannot have any implementation.
- `Interfaces` cannot declare a constructor. 
- `Interfaces` cannot declare state variables.
- `Interfaces` cannot declare modifiers.

**4.** All functions declared in `interfaces` are implicitly `virtual`, which means that they can be overridden by derived contracts. When a contract overrides a function declared in an interface, it is not necessary to use the `override` keyword, as the function is already marked as `virtual`.

**5.** `Interfaces` can inherit from other `interfaces`, just like `contracts` can inherit from `other contracts`. This allows you to create a hierarchy of `interfaces`, where `derived interfaces` can inherit the functions and behavior of their `base interfaces`.

<!-- - You can define types such as enums, structs, and other contract-like structures inside interfaces and other contract-like structures, and these types can be accessed from other contracts. -->