## Gas Optimizations in Variables

<hr>

**1. Avoid Explicitly Initializing Variables with Default Values**

|  | Code                                           | Transaction Cost        | Execution Cost         |
| :-: | ---------------------------------------------- | ----------------------- | ---------------------- |
| ❌ | `uint num1 = 0;`<br>(unnecessary initialization)| 94337 gas               | 38093 gas              |
| ✔️ | `uint num2;`<br>(automatically initialized)     | 92079 gas  | 35887 gas |

