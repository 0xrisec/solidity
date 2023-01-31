
# Data location

`Data locations` are used to specify where a particular variable or data structure should be stored. There are different properties and limitations associated with different `data locations`, such as their scope and lifetime. Your contract can ensure that your variables and data structures are stored in the right place and that they can be accessed and modified as needed by your contract by explicitly specifying the `data location`. Additionally, using the correct `data location` can help optimize the performance and gas usage of your contract. 

There are four type of data location:

**Memory:** 

Local variables and function arguments are stored in the `memory` data location by default. This means that they are created in `memory` when the function is called and are deleted when the function returns. The `memory` data location is temporary and exists only for the duration of the function call. We use the `memory` annotation to explicitly specify that a variable or data structure should be stored in the `memory` data location. 

It is important to note that data stored in the `memory` data location is deleted when the function returns, so it is not suitable for storing long-term data or data that needs to be accessed after the function has completed.

**Storage:** 

Contract state variables and struct fields are stored here by default. Data stored in the `storage` is persistent and can be accessed and modified by contract functions. We use the `storage` annotation to explicitly specify that a variable or data structure should be stored in the `storage` data location.

**Calldata:** 

This data location is used for function arguments that are passed as part of a contract call (e.g. when calling a contract function from another contract or from a client). Data stored in `calldata` is read-only and cannot be modified by the contract.  We use the `calldata` annotation to explicitly specify that a variable or data structure should be stored in the `calldata` data location.

It is temporary and only exists for the duration of the contract call, and is automatically deleted when the contract function returns.

`Calldata` is a non-modifiable, non-persistent area where function arguments are stored, and behaves mostly like memory. 

If you can, try to use `calldata` as data location because it will avoid copies and also makes sure that the data cannot be modified. `Arrays` and `structs` with `calldata` data location can also be returned from functions, but it is not possible to allocate such types. This means that you cannot create new `arrays` or `structs` with calldata data location within a contract function, but you can return existing `arrays` or `structs` with calldata data location from a function.

**Stack:** 

The `EVM` is not a register machine but a stack machine, so all computations are performed on a data area called the stack. We do not specify it to any variable.

**Important Points:**
- Data location for all state variables is `storage`. We can not specify data location annotation with state variable. 
- We can not specifiy data location annotation with value type variable. Data location annotation can only be specified for `array`, `struct` or `mapping` types only inside the function or local variables and arguments. Must be require in function.

## Value types data location
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MyContract {
    // Declare public state variables
    uint public num = 100;
    bool public flag = true;
    address public myAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    bytes2 public fixedByte = 0x3301;

    // Declare a function that returns local variables
    function localVariables() public pure returns(uint, bool, address, bytes2){
        // Declare and initialize local variables
        uint localNum = 100;
        bool localFlag = true;
        address localAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
        bytes2 localByte = 0x3301;
        // Return the local variables
        return (localNum, localFlag, localAddress, localByte);
    }

    // Declare a function that updates the public variables
    function update(uint _num, bool _flag, address _myAddress, bytes2 _fixedByte) public{
        // Assign the input arguments to the public variables
        num = _num;
        flag = _flag;
        myAddress = _myAddress;
        fixedByte = _fixedByte;
    }
}
```
The contract has four `value type` state variables: `num`, `flag`, `myAddress`, and `fixedByte`. All are value types we can not specify data location annotation with its variables and all will be stored at storage data location.

The localVariables function is a pure function that returns four local variables of different types: a `uint` (unsigned integer), a `bool` (boolean), an `address`, and a `bytes2` (fixed size byte array with length 2). All local variables are value type so we can not be specified data location annotation. All will be stored at memory lcation.

The update function is a public function that accepts four input arguments and assigns them to the public variables `num`, `flag`, `myAddress`, and `fixedByte`, respectively. All value type arguments, we can not specifiy annotation and all will be stored at calldata data location.

## Refrence types Data location

We can not specifiy `data location annotation` with value type variable. `Data location annotation` can only be specified for `array`, `struct` or `mapping` types only inside the function or local variables and arguments. Must be require in function.

There are three possible values for the `data location annotation`: `memory`, `storage`, and `calldata`. These values determine where the data is stored and how it can be accessed.

**Example:**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract DataLocations {
    // Public array of unsigned integers
    uint[] public arrayOfUints;
    // Mapping from unsigned integers to addresses
    mapping(uint => address) public mappingOfUintToAddress;
    // Struct with a single field, foo, which is an unsigned integer
    struct MyStruct {
        uint foo;
    }
    // Mapping from unsigned integers to MyStruct structs
    mapping(uint => MyStruct) public mappingOfUintToMyStruct;

    // Public function that calls an internal function and uses state variables
    function functionF() public {
        // Call _functionF with state variables
        _functionF(arrayOfUints, mappingOfUintToAddress, mappingOfUintToMyStruct[1]);

        // Get a struct from a mapping
        MyStruct storage myStructInStorage = mappingOfUintToMyStruct[1];
        // Create a struct in memory
        MyStruct memory myStructInMemory = MyStruct(0);
    }

    // Internal function that takes storage variables as arguments
    function _functionF(
        uint[] storage arrayInStorage,
        mapping(uint => address) storage mappingInStorage,
        MyStruct storage structInStorage
    ) internal {
        // Do something with storage variables
    }

    // Public function that returns a memory array
    function functionG(uint[] memory arrayInMemory) public returns (uint[] memory) {
        // Do something with memory array
    }

    // External function that takes a calldata array as an argument
    function functionH(uint[] calldata arrayInCalldata) external {
        // Do something with calldata array
    }
}
```

The contract is called `DataLocations` and it has four functions: `functionF`, `_functionF`, `functionG`, and `functionH`.

The contract has three state variables:
- `arrayOfUints`, which is an array of `unsigned integers (uint)` that is `publicly` accessible
- `mappingOfUintToAddress`, which is a mapping from `unsigned integers` to `addresses` that is `publicly` accessible
- `mappingOfUintToMyStruct`, which is a mapping from `unsigned integers` to a `struct` called `MyStruct` that is `publicly` accessible

The `arrayOfUints`, `mappingOfUintToAddress`, and `mappingOfUintToMyStruct` variables are all stored in storage, which means they are stored on the blockchain and can be accessed by any `external` contract or account.

The `MyStruct` struct has a single field, `foo`, which is an` unsigned integer`.

The `functionF` function is marked as `public`, meaning it can be called by any `external` contract or account. It calls the `internal` function `_functionF` with three arguments: `arrayOfUints`, `mappingOfUintToAddress`, and `mappingOfUintToMyStruct[1]`. The `_functionF` function is marked as `internal`, meaning it can only be called by other functions within this contract.

The `_functionF` function has three `storage` variables as arguments: `arrayInStorage`, `mappingInStorage`, and `structInStorage`. Storage variables are stored on the blockchain and persist between function calls.

The `functionG` function is also marked as `public`, and it takes a `memory` array of unsigned integers as an argument. `Memory` arrays are temporary variables that are only available within the current function call. The function returns a `memory` array of unsigned integers.

The `functionH` function is marked as `external`, meaning it can be called by external contracts but not by other functions within this contract. It takes a `calldata` array of `unsigned integers` as an argument. `Calldata` arrays are a special type of array that is passed as an argument to a contract function in the data section of a transaction, rather than in the contract storage.


## Assignment behaviour

`Data locations` are important to consider when assigning values to variables because they affect how the `assignment` is performed. Here is what happens when you assign values to variables based on their `data locations`:

**1.** `Assignments` between `storage` and `memory` (or from `calldata`) always create an independent copy. This means that the value of the source variable is copied to the destination variable, and the two variables are not connected in any way. Any changes to the source variable will not affect the destination variable.
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
    // Public array of unsigned integers stored in storage
    uint[] public storageArrayVar;

    function example() public {
        // Local memory array of unsigned integers
        uint[] memory memoryArrayVar;

        // Assign value of storageArrayVar to memoryArrayVar
        // This creates an independent copy of the array
        memoryArrayVar = storageArrayVar;

        // Change value of element at index 0 in storageArrayVar
        storageArrayVar[0] = 200;
        // Change value of element at index 0 in memoryArrayVar
        memoryArrayVar[0] = 100;

        // The changes to the two arrays are independent and do not affect each other
        assert(memoryArrayVar[0] != storageArrayVar[0]);
    }
}
```
In the above code, the `storageArrayVar` variable is a `public` array of `unsigned integers` stored in `storage`. The `memoryArrayVar` variable is a local `memory` array of `unsigned integers`.

When the value of `storageArrayVar` is assigned to `memoryArrayVar` using the assignment operator `=`, an independent copy of the array is created. This means that the two arrays are not connected in any way and any changes to one array will not affect the other array.

For example, when the value of the element at index `0` in `storageArrayVar` is changed to `200`, the value of the element at index `0` in `memoryArrayVar` is not affected and remains at its original value. Similarly, when the value of the element at index `0` in `memoryArrayVar` is changed to `100`, the value of the element at index `0` in `storageArrayVar` is not affected and remains at its original value.

This behavior is due to the fact that assignments between storage and memory (or from calldata) always create an independent copy.

**2.** Assignments from `memory` to `memory` only create `references`. This means that the destination variable will refer to the same data as the source variable, and any changes to the source variable will also be visible in the destination variable.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
    // Function that demonstrates assignment behavior between memory variables
    function example() public pure {
        // Local memory arrays
        uint[] memory memoryArray1;
        uint[] memory memoryArray2;

        // Assign memoryArray1 to memoryArray2
        // This creates a reference between the two arrays, so they now refer to the same data
        memoryArray2 = memoryArray1;

        // Change value of memoryArray1
        memoryArray1[0] = 100;

        // Because memoryArray2 refers to the same data as memoryArray1,
        // the change to memoryArray1 is also visible in memoryArray2
        assert(memoryArray1[0] == memoryArray2[0]);
    }
}
```
In this example, the `memoryArray1` and `memoryArray2` variables are both local `memory` arrays. When the assignment `memoryArray2 = memoryArray1` is executed, a `reference` is created between the two arrays. This means that the two arrays refer to the same data and any changes to one array will also be visible in the other array.

For example, when the value of the element at index `0` in `memoryArray1` is changed to `100`, the value of the element at index `0` in `memoryArray2` is also changed to `100`, because both arrays refer to the same data.

**3.** Assignments from `storage` to a `local storage` variable also only assign a `reference`. This means that the `local variable` will refer to the same data as the source variable, and any changes to the source variable will also be visible in the `local variable`.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
    uint[] public storageArrayVar;

    function example() public {
        // Local storage array
        uint[] storage localArrayVar;

        // Assign storageArrayVar to localArrayVar
        localArrayVar = storageArrayVar;

        // Change value of storageArrayVar
        storageArrayVar[0] = 200;
        localArrayVar[0] = 100;

        // storageArrayVar and localArrayVar now have the same value, because they refer to the same data
        assert(storageArrayVar[0] == localArrayVar[0]);
    }
}
```
In above example, the `storageArrayVar` variable is a state variable of type `uint[]` that is stored in `storage`. The `localArrayVar` variable is also stored in `storage`.

When the assignment `localArrayVar = storageArrayVar` is executed, a reference is created between the two arrays. This means that the `localArrayVar` variable will refer to the same data as the `storageArrayVar` variable, and any changes to the `storageArrayVar` variable will also be visible in the `localArrayVar` variable.

For example, when the value of the element at index `0` in `storageArrayVar` is changed to `200`, the value of the element at index `0` in `localArrayVar` is also changed to `100`, because both arrays refer to the same data.

**4.** All other assignments to `storage` always copy. Examples of this include assignments to `state variables` or to `members` of local variables of `storage` struct type, even if the local variable itself is just a reference.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Example {
    uint[] public storageArrayVar;
    uint public storageScalarVar;

    struct MyStruct {
        uint foo;
    }
    MyStruct public storageStructVar;

    function example() public {
        // Local storage variables
        uint[] storage localArrayVar;
        uint localScalarVar;
        MyStruct storage localStructVar;

        // Assign value of storageArrayVar to localArrayVar
        localArrayVar = storageArrayVar;

        // Assign value of storageScalarVar to localScalarVar
        localScalarVar = storageScalarVar;

        // Assign value of storageStructVar to localStructVar
        localStructVar = storageStructVar;

        // Change value of storageArrayVar
        storageArrayVar[0] = 200;
        localArrayVar[0] = 100;

        // Change value of storageScalarVar
        storageScalarVar = 200;
        localScalarVar = 100;

        // Change value of storageStructVar
        storageStructVar.foo = 200;
        localStructVar.foo = 100;
    }
}

