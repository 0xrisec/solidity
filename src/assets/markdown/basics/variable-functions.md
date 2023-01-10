# More about variable and functions

## Reading and Writing to a State Variable

Compilers automatically generate `getter` functions for `public` state variables in contracts. You do not need to define these functions explicitly.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This is the contract definition for MyContract
contract MyContract {
    // This is a public state variable with an initial value of 42
    uint public num = 42;

    // This is a function that can be called to modify the value of the num state variable
    function setNum(uint _num) public{
        // The value of the num state variable is set to the value passed to the function as an argument
        num = _num;
    }
}
 ```

In the following example, the contract `MyContract` has a public state variable `num` with an initial value of `42`. The compiler will automatically generate a `getter` function called `num` that returns the value of the `num` state variable. This function has `external` visibility, meaning that it can be accessed from outside the contract.

The generated getter function will look like this:

```
function num() external view returns(uint){
    return num;
}
```
If a `state variable` is accessed `internally`, meaning it is accessed from within the contract without the `this.` prefix, it evaluates to the variable itself.

If a `state variable` is accessed `externally`, meaning it is accessed from outside the contract using the `this.` prefix, it evaluates to the corresponding `getter` function. 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This is the contract definition for MyContract
contract MyContract{
    // This is a public state variable with an initial value of 42
    uint public num = 42;

    // This is a function that takes an argument _x and returns two values, add and mul
    function foo(uint _x) public returns(uint add, uint mul){
        // This line of code adds the value of the num state variable to the value of _x and assigns the result to the add variable
        // Since num is accessed without the this. prefix, it evaluates to the variable itself
        uint add = num + _x;

        // This line of code calls the num getter function using the this.num() syntax and multiplies the result by the value of _x
        // Since num is accessed with the this. prefix, it evaluates to the num getter function
        uint mul = this.num() * _x;
    }
}
```

## Free Function:

`Free functions` are functions that are defined outside of a contract. They have implicit `internal` visibility, which means that they can only be accessed from within the contract in which they are called. It is not allowed to add a `visibility modifier` to a `free function` declaration, as this will result in a syntax error.

 ```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This is a free function that takes an argument x and returns the square of x
function square(uint x) pure returns(uint){
    // The function calculates and returns the square of x
    return x*x;
}

// This is the contract definition for Pythagoras
contract Pythagoras{
    // This is a function that calculates and returns the square of the hypotenuse of a right-angled triangle
    function getHypotenuse(uint a, uint b) pure public returns(uint){
        // The function calculates the square of the length of one side of the triangle (a) and the square of the length of the other side (b)
        uint c = square(a) + square(b);
        // The function calculates and returns the square of the hypotenuse
        return square(c);
    }
}
```

Following code defines a `free function` called `square` and a contract called `Pythagoras`.

The `square` function takes a single argument `x` of type `uint` (unsigned integer) and returns the square of `x`. It does this by multiplying `x` by itself and returning the result.

The `Pythagoras` contract defines a function called `getHypotenuse`, which takes two arguments `a` and `b` of type `uint` and returns the square of the hypotenuse. The function calculates the squares of `a` and `b` and `adds` them together to get the square of the length of the `hypotenuse`. It then calls the `square` function to calculate and return the square of the `hypotenuse`. The `public` modifier indicates that the function can be called from outside the contract.

`Free functions` have certain limitations compared to `functions` defined inside a contract. One of the main differences is that `free functions` do not have access to storage variables and functions that are defined outside their scope. 

## Constructor

The constructor function is a special function that is executed when a contract is deployed. It is used to run the initialization code for the contract.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MainContract{
    uint public num;
    // This is the constructor function
    constructor(uint _num){
        // This line of code initializes the num state variable
        num = _num;
    }
}
```

A contract called `MainContract` is defined with a single `public` state variable called `num`. 

The contract also has a `constructor` function, which is executed when the contract is deployed. The `constructor` function has a single argument called `_num`, which is type of `uint`. Inside the `constructor` function, the value of `_num` is assigned to the `num` state variable using the assignment operator `=`. This initializes the `num` state variable with the value passed as an argument to the constructor function.

<center><img class="image w100" alt="constructor" src="./assets/images/constructor.JPG" ></center>
<b><center class="img-label">constructor</center></b>

Once the `contract` is deployed, the `constructor` function will be executed and the num state variable will be initialized with the value passed as an argument. The final code of the `contract`, which includes all functions that are part of the public interface and can be accessed through function calls, will then be deployed to the blockchain.

If a `contract` does not have a `constructor` defined, it will assume a default `constructor`, which is equivalent to `constructor() {}`. This means that the contract will have an empty `constructor` function that does not take any arguments and does not have any code inside it. The default constructor is used when a contract is deployed without specifying any arguments.

Derived contracts must provide all required arguments if the base contract's `constructor` has arguments. There are two ways to do this:

**1. Specify directly in the inheritance list:** In this case, it is more convenient to have the `constructor` argument be a constant that defines or describes the contract's behavior.

``` sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Define the MainContract contract
contract MainContract {
    // Declare a public state variable called num of type uint
    uint public num;
    
    // Define the constructor function for MainContract
    // The constructor takes a single argument _num of type uint
    constructor(uint _num) {
        // Initialize the num state variable with the value of _num
        num = _num;
    }
}

// Define the DerivedContract contract
// DerivedContract is derived from MainContract and specifies the required argument 1 for the base contract's constructor
contract DerivedContract is MainContract(1) {
    // Define an empty constructor for DerivedContract
    // This constructor does not take any arguments and does not have any code inside it
    constructor() {}
}
```

In above code, the `MainContract` contract has a single `public` state variable called `num` of type `uint`, and a `constructor` function that takes a single argument `_num` of type `uint`. The `DerivedContract` contract is derived from the `MainContract` and specifies the required argument `1` for the `base contract's constructor` in the `inheritance` list. The `DerivedContract` contract also has an empty `constructor` function that does not take any arguments and does not have any code inside it. When the `DerivedContract` contract is deployed, the `num` state variable in the MainContract will be initialized with the value `1`.

**2. Specify through a "modifier style" of the derived constructor:**  If the arguments of the base contract's constructor depend on those of the derived contract, then the second way of specifying the arguments must be used. This is done through a "modifier style" in the derived contract's constructor, as shown in the following example:

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Define the MainContract contract
contract MainContract {
    // Declare a public state variable called num of type uint
    uint public num;
    
    // Define the constructor function for MainContract
    // The constructor takes a single argument _num of type uint
    constructor(uint _num) {
        // Initialize the num state variable with the value of _num
        num = _num;
    }
}

// Define the DerivedContract contract
// DerivedContract is derived from MainContract
contract DerivedContract is MainContract {
    // Define the constructor function for DerivedContract
    // The constructor takes a single argument x of type uint
    constructor(uint x) 
        // Call the base contract's constructor with the value of x squared as the argument
        MainContract(x * x) 
    {}
}
```
In this code, the `MainContract` contract has a single `public` state variable called `num` of type `uint`, and a `constructor` function that takes a single argument `_num` of type `uint`. The `DerivedContract` contract is derived from the `MainContract` and has a constructor function that takes a single argument `x` of type `uint`. The `DerivedContract` constructor function calls the base contract's `constructor` function, passing in the value of `x` squared as the argument. When the `DerivedContract` contract is deployed, the `num` state variable in the `MainContract` will be initialized with the value of `x` squared.
