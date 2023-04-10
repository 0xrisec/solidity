## Gas Optimizations in Variables

<hr>

**1. Avoid Explicitly Initializing Variables with Default Values**

|  | Code                                           | Transaction Cost        | Execution Cost         |
| :-: | ---------------------------------------------- | ----------------------- | ---------------------- |
| ❌ | `uint num1 = 0;`<br>(unnecessary initialization)| 94337 gas               | 38093 gas              |
| ✔️ | `uint num2;`<br>(automatically initialized)     | 92079 gas  | 35887 gas |

**2.** Always Initialize i Variable in For Loops


```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract Example {
    // ✔️ : Initialized for loop variable i to 0
    function sum(uint[] memory numbers) public pure returns (uint) {
            uint total = 0;
            for (uint i = 0; i < numbers.length; i++) {
                total += numbers[i];
            }
            return total;
    }

    // ❌ : Default-initialized for loop variable i 
    function sum2(uint[] memory numbers) public pure returns (uint) {
        uint total = 0;
        for (uint i; i < numbers.length; i++) {
            total += numbers[i];
        }
        return total;
    }

    // ❌ : Loop variable i declared outside loop and not initialized
    function sum3(uint[] memory numbers) public pure returns (uint) {
        uint total = 0;
        uint i; // variable i is declared but not initialized
        for (; i < numbers.length; i++) {
            total += numbers[i];
        }
        return total;
    }

    // ❌ : Default-initialized for loop variable i 
    function sum4(uint[] memory numbers) public pure returns (uint) {
        uint total = 0;
        uint i = 0;
        for (; i < numbers.length; i++) {
            total += numbers[i];
        }
        return total;
    }
}
```

|  | Function | Gas Cost |
| --- | --- | --- |
| ✔️ | `sum()` | 3047 |
| ❌ | `sum2()` | 3091 |
| ❌ | `sum3()` | 3069 |
| ❌ | `sum4()` | 3113 |

**3. Substituting State Variables with Local Variables**

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract Example {
    uint public counter;
  
    function incrementCounter(uint amount) public {
        for (uint i = 0; i < amount; i++) {
            // Accesses the state variable 'counter' and increments its value.
            counter++; //❌ State variable reads and writes multiple times
        }
    }

    function incrementCounter2(uint amount) public {
        uint _counter = counter; // Reads the state variable 'counter' once and stores it in a local variable.
        for (uint i = 0; i < amount; i++) {
            // Accesses the local variable and increments its value.
            _counter++; // Local variable reads and writes
        }
        // Assigns the updated value back to the state variable 'counter'.
        counter = _counter; //✔️ Writes to the state variable 'counter' once.
    }
}
```

|  | Function | Execution Gas Cost |
| --- | --- | --- |
| ❌ | `incrementCounter()` | 75638 |
| ✔️ | `incrementCounter2()` | 36987 |
