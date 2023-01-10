# Constant and Immutable State Variables 

State variables can be declared as either `constants` or `immutables`. Both types of variables cannot be modified after the contract has been deployed.

**Constant variables :** `Constant` variables must have their value fixed at compile-time, meaning that it cannot be changed after the contract has been compiled.

**Immutable variables :** `Immutable` variables, on the other hand, can still be assigned a value at the time of contract construction, but the value cannot be modified after the contract has been deployed.

## Constant

To declare a constant variable in a smart contract, the value must be fixed at compile-time and must be assigned at the point of declaration. In other words, the value of a constant variable cannot be changed after the contract has been compiled, and it must be given a value when it is first declared in the contract code.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Define the main contract "MyContract"
contract MyContract {
    // This is a constant variable with a fixed value of 450 that can be accessed publicly
    uint public constant PRICE = 450;

    // This is the constructor function for the contract
    constructor(){
        // This line of code would cause an error because it is attempting to modify the value of a constant variable, which is not allowed
        // PRICE = 550; //TypeError: Cannot assign to a constant variable.
    }
}
```
It is also possible to define `constant` variables at the file level. `Constant` variables that are defined at the file level can be accessed by any contract or function within the same file. They cannot be modified after the contract has been compiled.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// This is a constant variable with a fixed value of 450 that is defined at the file level
uint constant PRICE = 450;

// This is the contract definition
contract MyContract {
  // This is the constructor function for the contract
  constructor(){
  }
}
```

## Immutable

An immutable variable is less restricted than a constant variable. Variables that are immutable can be assigned arbitrary values in the constructor of the contract or at the time of their declaration, i.e. they can be assigned during construction time.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Define the main contract "MyContract"
contract MyContract {
    // This is an immutable variable that can be assigned a value in the constructor
    uint public immutable PRICE;

    // This is an immutable variable with a fixed value that can be accessed publicly
    address public immutable ACCOUNT = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    // This is the constructor function for the contract
    constructor(uint _price){
        // The value of the PRICE variable is set to the value passed to the constructor
        PRICE = _price;
    }
}
```
`Immutable` variables are less restricted than constant variables in that they can be assigned in the `constructor` of the contract. However, we can also initialize the `immutable` variable at the point of their declaration but on that time we can`t initialize in `constructor` again.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Define the main contract "MyContract"
contract MyContract {
    // This is an immutable variable with a fixed value of 20 that can be accessed publicly
    uint public immutable PRICE = 20;

    // This is the constructor function for the contract
    constructor(uint _price){
        // This line of code would cause an error because the PRICE variable has already been initialized with a value at the point of declaration.
        PRICE = _price; 
    }
}
```
<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
//TypeError: Immutable state variable already initialized.
</pre>

Unlike `constant` variables, `immutable` variables cannot be defined at the file level.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;


// This line of code would cause a DeclarationError because immutable variables cannot be defined at the file level
uint immutable PRICE = 20;

// This is the contract definition
contract MyContract {
    // This is the constructor function for the contract
    constructor(){
    }
}
```
<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
DeclarationError: Only constant variables are allowed at file level.
DeclarationError: The "immutable" keyword can only be used for state variables.
</pre>

<div class="doc-note">
   <p class="alert alert-primary">
      <b>Note:</b><br>
      <span>
         - Value types and the bytes data type can be declared as "constants" in a smart contract. Other data types, such as "struct" and "mapping", cannot be declared as constants.
      </span><br>
      <span>
         - Only value type variables can be immutable, but others cannot.
      </span>
   </p>
</div>