# More about variable and functions

## Reading and Writing to a State Variable

Compilers automatically create getter functions for public state variables in contracts. You do not need to define getter functions explicitly for public state variables.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract{
    uint public num = 42;
     function setNum(uint _num) public{
        num = _num;
    }
}

contract AnotherContract {
    MyContract cont = new MyContract();
    function foo() public view returns (uint) {
        return cont.num(); // calling num getter function
    }
}
 ```

In above `MyContract` the compiler will generate a getter function called `num` that does not take any arguments and returns a uint (the value of the state variable `num`). The getter functions have external visibility. So the getter function will look like below.

```
function num() external view returns(uint){
    retur num;
}
```

If it is accessed externally (i.e. with `this`.), it evaluates to a function. If the symbol is accessed internally (i.e. without `this`.), it evaluates to a state variable. 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract{
    uint public num = 42;
    function foo(uint _x) public returns(uint add, uint mul){
        uint add = num + _x; //  evaluates to a state variable
        uint mul = this.num() * _x; //  evaluates to a getter function
    }
}
```

## Free Function:

It is possible to define functions both inside and outside of contracts. Functions outside of a contract are called `free functions`.

 ```sol
 // SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

//Free function
function square(uint x) pure returns(uint){
    return x*x;
}

contract Pythagoras{
    function getHypotenuse(uint a, uint b) pure public returns(uint){
        uint c = square(a) + square(b);
        return square(c);
    }
}

```

It has implicit internal visibility. Adding visibility to a free function declaration is not allowed, otherwise the compiler will throw a SyntaxError.

<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
SyntaxError: Free functions cannot have visibility.
</pre>

Free function are still always executed in the context of a contract. As well as being able to access the variable `this`, they can also call other contracts, send Ether to them, and destroy the contract that called them. The main difference between free functions and those defined inside a contract is that free functions do not have access to storage variables and functions that are outside their scope.

## Constructor

The constructor function is a special function in Solidity that is executed when the contract is deployed. Upon contract creation, the constructor function is executed, where you can run the initialization code for the contract.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MainContract{
    uint public num;
    constructor(uint _num){
          num = _num;
    }
}
```

<center><img class="image w100" alt="constructor" src="./assets/images/constructor.JPG" ></center>
<b><center class="img-label">constructor</center></b>

In the above example, the constructor is used to initialize the `num` state variable. At the time of contract deployment, we pass a constructor argument. State variables are initialized before the constructor code is executed if you initialize them inline, or to their default value otherwise. The final code of the contract is deployed to the blockchain after the constructor has run. This code includes all functions that are part of the public interface and can be accessed through function calls. This does not include the code for the constructor or internal functions that are only called from the constructor.

The contract will assume a default constructor if there is no constructor, which is equivalent to `constructor() {}`.

Derived contracts must specify all arguments if the base constructors have arguments. This can be done in two ways:

**1. Specify directly in the inheritance list:** In the first case, it is more convenient to have the constructor argument be a constant defining or describing the contract's behavior. 

``` sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MainContract{
    uint public num;
    constructor(uint _num){
          num = _num;
    }
}

contract DerivedContract is MainContract(1) {
    constructor() {}
}
```

**2. Specify through a "modifier style" of the derived constructor:** If the constructor arguments of the base contract depend on those of the derived contract, then the second way must be used. 

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MainContract{
    uint public num;
    constructor(uint _num){
          num = _num;
    }
}

contract DerivedContract is MainContract {
    constructor(uint x) MainContract(x * x) {}
}
```

A declaration error occurs when arguments are specified on both places.
<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
DeclarationError: Base constructor arguments given twice.
</pre>

<!-- Constructor must be payable or non-payable. -->