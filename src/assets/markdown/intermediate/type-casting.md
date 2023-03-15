# Understanding Type Casting in Solidity: Cast to a Contract or Interface?

## Introduction:

Solidity is a statically typed language, which means that the data types of variables and functions must be defined explicitly. Sometimes, we need to convert a value of one data type to another data type. This process is called type casting. In Solidity, there are two types of type casting: casting to a contract type and casting to an interface type.

## Casting to a Contract Type:

<hr>

When we cast to a contract type, we are converting an address to a specific contract type. This allows us to call functions that are defined in that contract. The advantage of casting to a contract type is that we have access to all of the functions and variables that are defined in that contract. However, the disadvantage is that we are limited to calling functions that are defined in that specific contract.

Here's an example:

```sol
pragma solidity ^0.8.0;

contract ContractA {
    function foo() external pure returns (string memory) {
        return "ContractA foo";
    }
}

contract ContractB {
    function bar(address _contract) external {
        // Check that the contract at _contract implements IContractA
        require(
            IContractA(_contract).foo() != "",
            "Contract at _contract does not implement IContractA"
        );
        
        // Call foo() function
        string memory result = IContractA(_contract).foo();
        
        // Do something with the result
    }
}

```

In this example, ContractB has a function called bar that takes an address parameter _contract representing the address of an instance of ContractA. The function casts _contract to ContractA using ContractA a = ContractA(_contract). Then it calls the foo function of ContractA using the a variable.

## Casting to an Interface Type:

<hr>

When we cast to an interface type, we are converting an address to an interface type. This allows us to call functions that are defined in the interface. The advantage of casting to an interface type is that we can interact with any contract that implements that interface. However, the disadvantage is that we only have access to the functions that are defined in the interface.

Here's an example:

```sol
pragma solidity ^0.8.0;

interface IContractA {
    function foo() external pure returns (string memory);
}

contract ContractA is IContractA {
    function foo() external pure override returns (string memory) {
        return "ContractA foo";
    }
}

contract ContractB {
    function bar(address _contract) external {
        IContractA a = IContractA(_contract);
        string memory result = a.foo();
        // Do something with the result
    }
}
```

In this example, ContractA implements the IContractA interface, which has a foo function. ContractB has a function called bar that takes an address parameter _contract representing the address of an instance of ContractA. The function casts _contract to IContractA using IContractA a = IContractA(_contract). Then it calls the foo function of IContractA using the a variable. Because ContractA implements IContractA, the foo function of ContractA is called.


## Comparison between Casting to a Contract Type and an Interface Type:

<hr>

Both casting to a contract type and casting to an interface type have their pros and cons. When we cast to a contract type, we have access to all of the functions and variables that are defined in that contract, but we are limited to calling functions that are defined in that specific contract. When we cast to an interface type, we can interact with any contract that implements that interface, but we only have access to the functions that are defined in the interface. The choice between casting to a contract type and casting to an interface type depends on the specific use case.

## Conclusion:

<hr>

Type casting is an important concept in Solidity, and there are two types of type casting: casting to a contract type and casting to an interface type. Casting to a contract type allows us to call functions that are defined in a specific contract, while casting to an interface type allows us to interact with any contract that implements that interface. The choice between casting to a contract type and casting to an interface type depends on the specific use case.

# Important Points:

