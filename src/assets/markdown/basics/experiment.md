
### Fixed Arrays 

`State variables` are stored in storage. Therefore, if we declare an array as a state variable, it will be stored in `storage`.

A value stored in memory cannot be directly assigned to a storage pointer, as the value needs to be stored in storage in order to be accessed by the storage pointer.
<!-- Allocating Memory Arrays -->

If you can, try to use calldata as data location because it will avoid copies and also makes sure that the data cannot be modified. Arrays and structs with calldata data location can also be returned from functions, but it is not possible to allocate such types. This means that you cannot create new arrays or structs with calldata data location within a contract function, but you can return existing arrays or structs with calldata data location from a function.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare public state variables
    uint16[2] public num = [1,3];

    // Declare a function that returns local variables
    function fun() public returns(uint16){
        // Declare and initialize a local array of one uint16 value
        uint16[1] memory fixedArr = [uint16(19)];

        // Declare and initialize a local array of two uint16 values
        uint16[2] memory fixedArr2 = [uint16(19),1];

        // Getting error because required to explicitly typecast each value in the array to the desired type.
        // uint16[2] memory fixedArr3 = [19,1];

        // Declare a local array of two uint16 values and initialize it with the values from the public state variable "num"
        uint16[2] memory fixedArr4 = num;

        // Declare a local array of two uint16 values in storage and initialize it with the values from the public state variable "num"
        uint16[2] storage fixedArr5 = num;

        // Modify the first element of the "fixedArr4" array
        fixedArr4[0] = 12;

        // Modify the first element of the "fixedArr5" array
        fixedArr5[0] = 12;

        return (fixedArr4[0]);
    }
}
```

Above contract has a public state variable called num which is an array of two uint16 values, initialized to [1,3]. The contract also contains a function named fun() which is marked public and returns a uint16 value. This function has a local array called fixedArr which is an array of one uint16 value, initialized to [uint16(19)]. It also has another local array called fixedArr2 which is an array of two uint16 values, initialized to [uint16(19),1].

fixedArr3 with the values [19,1], but this would generate an error because it is required to explicitly typecast each value in the array to the desired type.

fixedArr4 and fixedArr5 which are both arrays of two uint16 values. fixedArr4 is initialized with the values from the public state variable num, and fixedArr5 is also initialized with the values from num but is marked as storage. The state variable num is also an array of two uint16 values, which means that the values of num can be directly copied into fixedArr4 because they are both arrays of the same type.


## Mapping Data location, Iteration and assignments

Mappings can only have a data location of `storage`, and as a result, they can only be used for state variables, as storage reference types in functions, or as parameters for library functions. They cannot be used as parameters or return parameters of contract functions that are publicly visible. For example:

For example, consider the following code, which defines a contract with a myVariable state variable and a setMyVariable function that takes a storage reference type as an argument:

However, mappings cannot be used as parameters or return parameters of contract functions that are publicly visible. This is because mappings are stored in the contract's storage, and public contract functions can only accept input data and return output data in the form of function arguments and return values.

For example, consider the following code, which attempts to define a public contract function that takes a mapping as an argument:

```sol
// Defines a contract that has a public function that takes a mapping as an argument
contract MyContract {
    // Defines a public function that takes a mapping as an argument
    function myFunction(mapping(uint => string) memory myMapping) public {
        // Do something with the mapping here...
    }
}
```

This code will not compile, because the myFunction function takes a mapping as an argument, which is not allowed for public contract functions. To fix this error, you can either make the myFunction function private, or you can use a struct or array type instead of a mapping as the argument type.






funtion fun(string calldata num){

}

function fun2(){
    fun("asdf"); // not call why?
    
}

**Experiments:**
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    uint16[2] public numArr = [1,2];
    
    function fun() public {
        uint16[2] memory arr1;
        uint16[2] storage arr2;

        // Declare a memory array of type uint16 with fixed size 2
        uint16[2] memory arr3 = [999, 9];
        // uint16[2] memory arr4 = [99, 9]; //Type uint8[2] memory is not implicitly convertible to expected type uint16[2] memory.
        uint16[2] memory arr5 = [uint16(99), 9];
        
        // uint16[2] storage arr6 = [999,9]; //Type uint16[2] memory is not implicitly convertible to expected type uint16[2] storage pointer.
        // uint16[2] storage arr7 = [uint16(99)]; //same error
        uint16[2] storage arr8 = numArr;
    }

    function args(uint16[3] memory fixedArr) public{

    }

    // function args2(uint16[3] storage fixedArr) public{
    //     //Data location must be "memory" or "calldata" for parameter in function, but "storage" was given.
    // }

    function args3(uint16[3] calldata fixedArr) public{

    }
}

contract B{
     // Declare public state variables
    uint16[2] public num = [1,3];
    struct Zombie {
        string name;
        bool isHungry;
        uint numBrainsEaten;
    }
    // Declare a function that returns local variables
    function fun() public returns(uint16){
        // // fixed size array
        // uint[3] memory fixedArr = [2, 3, 4]; //Type uint8[3] memory is not implicitly convertible to expected type uint256[3] memory.
        // uint[3] storage fixedArr2 = [2, 3, 4]; //Type uint8[3] memory is not implicitly convertible to expected type uint256[3] memory.

        uint16[2] memory arr1 = [999,9];
        uint16[2] storage arr2 = num;
        uint16[2] memory arr3 = arr2;
        arr2[0]= 99;
        arr1[0]= 1;
        arr3[0]=1;

        // //dynamic size array
        // uint[] memory dynamicArr = [uint(2),uint(2)];
        // uint[] storage a = new uint[](7);
        // uint[] memory a = new uint[](7);

        //byte and string array
        bytes memory bytesArr1 = "abc";
        // bytes storage bytesArr2 = "abc";
        // bytes storage bytesArr3 = bytes("cde");
        // string storage str1 = "Alien";
        string storage str1;

        //mapping
        // mapping(string => uint) memory alienCount; //Mappings cannot be created dynamically, you have to assign them from a state variable.
        
        //struct
        Zombie memory z = Zombie("s", true, 123);
        // Zombie storage z2 = Zombie("s", true, 123); //Type struct MyContract.Zombie memory is not implicitly convertible to expected type struct MyContract.Zombie storage pointer.
        Zombie[] memory zombies;
        Zombie[] storage zombies2;
        zombies[0]=z;
        // zombies.push(z); //Member "push" is not available in struct MyContract.Zombie[] memory outside of storage.
        // zombies2.push(z); //This variable is of storage pointer type and can be accessed without prior assignment, which would lead to undefined behaviour.
        // zombies2[0]= Zombie("s", true, 123);

        return (arr1[0]);
    }
}
```