# Constant and Immutable State Variables 

State variables can be declared as constants or immutables. Once the contract is constructed, variables cannot be modified in both cases.

- `constant variables`: the value has to be fixed at compile-time.
- `immutable variables`: it can still be assigned at construction time.

## Constant

For constant variables, the value has to be a constant at compile time and it must be assigned where the variable is declared.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
  // coding convention to uppercase constant variables
  uint public constant PRICE = 450;

  constructor(){
    //PRICE = 550; //TypeError: Cannot assign to a constant variable.
  }
}
```

It is also possible to define constant variables at the file level.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

uint constant PRICE = 450; //file level variable

contract MyContract {
  constructor(){
  }
}
```

# Immutable

An immutable variable is less restricted than a constant variable. Variables that are immutable can be assigned arbitrary values in the constructor of the contract or at the time of their declaration, i.e. they can be assigned during construction time.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    uint public immutable PRICE;
    address public immutable ACCOUNT = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    constructor(uint _price){
      PRICE = _price;
    }
}
```

We can also initialize the immutable at the point of their declaration but on that time we can`t initialize in constructor again.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
    uint public immutable PRICE = 20;
    constructor(uint _price){
      PRICE = _price; 
    }
}
```
<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
//TypeError: Immutable state variable already initialized.
</pre>

Immutable variables are not allowed to declare at the file level.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

uint immutable PRICE = 20;

contract MyContract {
    constructor(){
    }
}
```
<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
//DeclarationError: Only constant variables are allowed at file level.
//DeclarationError: The "immutable" keyword can only be used for state variables.
</pre>

<div class="doc-note">
   <p class="alert alert-primary">
      <b>Note:</b><br>
      <span>
         - Value types, byte array type or string variables can be constant, but others cannot.
      </span><br>
      <span>
         - Only value type variables can be immutable, but others cannot.
      </span>
   </p>
</div>