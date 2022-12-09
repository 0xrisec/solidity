# Control Structures 

The following control structures are available in Solidity:

if, else, while, do, for, break, continue, return, with the usual semantics known from C, JavaScript.

## if/else and ternary operator

if statement: The statements will be executed if the condition is true, otherwise no statement will be executed.

if-else statement: When the condition is true, the if block is executed, while if it is false, the else block is executed.

if-else if-else statement: When a condition of any if block is true, the block of code associated with it is executed, rest if blocks are skipped, and the else block is executed if none of the conditions are true.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract{
    function getNum(uint number) public pure returns (int) {
        if(number>0){  
            return 0;
        }else if(number<0){  
            return -1;
        }else{  
            return 1;
        }  
    }
}
```

Solidity does not support the statement `if (1) {... }` because there is no type conversion from non-boolean to boolean types.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
  function foo() public pure returns(uint){
    uint i = 1;
    if(i) { 
        return 1;
    }
    return 0;
  }
}
```
<pre style="background: rgba(0,0,0,.05); padding:20px; color:red">
TypeError: Type uint256 is not implicitly convertible to expected type bool.
</pre>

**Conditional (ternary) operator:**

The ternary operator (? :) can also be used to perform the if...else statement. The result of `?` is returned if the condition is true. The result of `:` is returned when the condition is false.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract{
    function isPositive(int number) public pure returns (bool) {
        return (number > 0) ?  true : false;
    }
}
```

## While and For Loop

You should avoid writing loops that are unbounded as this can cause your transaction to fail due to the gas limit.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract MyContract {
  function loops() public pure returns(uint){
     uint num = 2;
     
     while(num < 4){
        num++;
     }

     for(uint i = 0; i<10 ;i++){
        if (i == 1) {
            // Skip to next iteration
            continue;
        }
        if (i == 3) {
            // Exit loop
            break;
        }
        num++;
     }

     do{
        num++;
     } while(num<10);
     
     return num;
  }
}
```