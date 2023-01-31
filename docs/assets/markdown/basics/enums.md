## enums

`Enumeration (enum)` types are user-defined data types that consist of a set of named constants called `enumerators`. By using `enums`, you can represent a finite set of options in your code and provide named constants to represent specific values.

`Enums` are `value types`. When you assign an `enum` value to a variable, the variable is set to the value of the `enum` rather than a reference to the `enum`.

### Defining an enum

To create an `enum`, you can use the `enum` keyword followed by the name of the `enum` and a list of `enumerators` in curly braces. Here is an example of defining an `enum`:

<pre style="background: rgba(0,0,0,.05); padding:20px">
enum &lt;enum-name&gt; {
  enumerator1,
  enumerator2,
	...
}
</pre>

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Game {
    // Define an enum to represent the different game levels.
    enum Level {
        LOW,
        MEDIUM,
        HIGH
    }

    // Define a variable to hold the number of coins.
    uint public coins;

    // Define a variable to hold the current game level.
    Level public lvl;

    // Define a function for setting the number of coins.
    function setCoins(uint _coin) public {
        coins = _coin;
    }

    // Define a function for setting the current game level based on the number of coins.
    function setLevel() public {
        if (coins < 10) {
            lvl = Level.LOW;
        } else if (coins >= 10 && coins < 25) {
            lvl = Level.MEDIUM;
        } else {
            lvl = Level.HIGH;
        }
    }
}
```

The contract called `Game` defines an `enum` called `Level`, which has three enumerators: `LOW`, `MEDIUM`, and `HIGH`. This `enum` is used to represent the different `game` levels in the contract. The contract also defines two variables: `coins`, which holds the number of `coins`, and `lvl`, which holds the current game level. The `coins` variable is of type `uint`, which represents an unsigned integer, and the `lvl` variable is of type `Level`, which allows it to hold one of the enumerators defined in the `Level` enum.

The contract defines two functions: `setCoins`, which allows the number of coins to be set, and `setLevel`, which sets the current game level based on the number of coins. The `setCoins` function takes a single argument of type `uint`, which represents the number of coins to be set. The function simply assigns the value of the argument to the coins variable. The `setLevel` function is used to determine the current game level based on the number of coins. It checks the value of the coins variable and assigns the corresponding `Level` enumerator to the `lvl` variable, depending on whether the number of coins is less than `10`, between `10` and `25`, or greater than `25`. This allows the contract to keep track of the current game level and adjust it as needed.

Output:
 <center><img class="image" src="./assets/images/enum-example-output-1.JPG" ></center>
 <b><center class="img-label">Output</center></b>

If the `setCoins` function is called with a value of `5`, the coins variable will be set to `5` and the `setLevel` function will assign the Level `LOW` enumerator to the `lvl` variable, because the number of coins is less than `10`. 

 <center><img class="image" src="./assets/images/enum-example-output-2.JPG" ></center>
 <b><center class="img-label">Output</center></b>

If the `setCoins` function is called with a value of `15`, the coins variable will be set to `15` and the `setLevel` function will assign the Level `MEDIUM` enumerator to the lvl variable, because the number of coins is greater than or equal to `10` but less than `25`. 

 <center><img class="image" src="./assets/images/enum-example-output-3.JPG" ></center>
 <b><center class="img-label">Output</center></b>

If the `setCoins` function is called with a value of `30`, the coins variable will be set to `30` and the `setLevel` function will assign the Level `HIGH` enumerator to the `lvl` variable, because the number of coins is greater than or equal to `25`.

An enum's enumerators (i.e. constant values) are automatically assigned integer values starting from `zero`. In the above example, we define an `enum` called `Level` with three enumerators: `LOW`, `MEDIUM`, and `HIGH`, values for these enumerators will be `0`, `1`, and `2`, respectively.

**Important points:**
- There should be at least one value in an enumerated list.
- You cannot use `booleans` or `numbers` as `enum` members
- In a mapping, `enums` are not permitted to be used as a key type
- You cannot return an `enum` within a function because `enums` aren't part of the `ABI`.
