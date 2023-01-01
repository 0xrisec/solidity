# Visibility

`Visibility` controls the accessibility of variables and functions within a smart contract. It helps to secure specific elements of the contract without the need for additional coding. 

`Visibility` only restricts other contracts from accessing or altering the information. In a smart contract, `visibility` can be set for three types of function callers: `the main contract`, `a derived contract`, and `another contract`.

**MyContract:** In my case, the name of the main contract is MyContract.
<pre style="background: rgba(0,0,0,.05); padding:20px">
contract MyContract{

}
</pre>

**DerivedContract:** A `derived contract`, also known as a `child contract`, is a contract that is built upon an existing contract, known as the `base or parent contract`. The `is` keyword is used in Solidity to indicate `inheritance`.

<pre style="background: rgba(0,0,0,.05); padding:20px">
//base contract or main contract or parent contract
contract MyContract{

}

//Defining derived contract or child contract
contract DerivedContract is MyContract{ 

}
</pre>

**AnotherContract:** An another contract might be with a third party contract, a contract within the main contract file, or a contract in a different file.

<pre style="background: rgba(0,0,0,.05); padding:20px">
//base contract or main contract
contract MyContract{

}

//Defining other contract
contract AnotherContract{ 

}
</pre>

## Types of visibility

Function visibility can be set to `private`, `internal`, `external`, or `public`, while state variables can only be designated as `public`, `internal`, or `private`. It is not possible to use the `external` keyword for state variables.

**Declaration:**

<pre style="background: rgba(0,0,0,.05); padding:20px">
&lt;Type&gt; <b>&lt;visibility&gt;</b> &lt;Variable Name&gt;;

function function_name(&lt;Parameters&gt;) <b>&lt;visibility&gt;</b> &lt;state mutability&gt; [returns(&lt;return_type&gt;)]{
    //statements  
}

OR

function function_name(&lt;Parameters&gt;) &lt;state mutability&gt; <b>&lt;visibility&gt;</b> [returns(&lt;return_type&gt;)]{
    //statements  
}
</pre>

<img class="image" alt="Remix IDE Panels"  src="./assets/images/visibility.JPG" >
<b><center class="img-label">visibilty within contracts</center></b>

- **public:** A `public` variable or function can be accessed by anyone, including the `contract itself`, `derived contracts`, `other contracts`, and `external accounts`. 

- **internal:** An `internal` variable or function can only be accessed within the contract and its `derived contracts`.

- **external:** An `external` function can only be called from `other contracts` or `external accounts`. It cannot be called from within the `main contract` or any `derived contracts`.

- **private:** A `private` variable or function is only accessible within the `contract itself`. It cannot be accessed by `other contracts` or `external accounts` and `derived contracts`.

## Example
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Define the main contract "MyContract"
contract MyContract {
    // Declare a public variable
    uint public publicVar = 12;

    // Declare a private variable
    uint private privateVar = 12;

    // Declare an internal variable
    uint internal internalVar = 12;

    // Declare a public function
    function publicFun(uint a, uint b) public pure returns(uint) {
        // Return the sum of the two input parameters
        return a + b;
    }

    // Declare a private function
    function privateFun(uint a, uint b) private pure returns(uint) {
        // Return the product of the two input parameters
        return a * b;
    }

    // Declare an internal function
    function internalFun(uint a, uint b) internal pure returns(uint) {
        // Return the difference of the two input parameters
        return a - b;
    }

    // Declare an external function
    function externalFun(uint a, uint b) external pure returns(uint) {
        // Return the quotient of the two input parameters
        return a / b;
    }

    // Declare a public view function
    function total() public view returns(uint) {
        // Calculate the total of the variables and functions
        uint varTotal = publicVar + privateVar + internalVar;
        uint funTotal = publicFun(2, 2) + privateFun(2, 2) + internalFun(2, 2);
        // Return the sum of the variable total and function total
        return varTotal + funTotal;
    }
}

// Define a derived contract "DerivedContract"
contract DerivedContract is MyContract {
    // The "is" keyword is used for inheritance in Solidity.
    // Declare a public view function that accesses public and internal variables and functions of the main contract
    function foo() public view returns(uint) {
        uint varTotal = publicVar + internalVar;
        uint funTotal = publicFun(2, 2) + internalFun(2, 2);
        // Return the sum of the variable total and function total
        return varTotal + funTotal;
    }
}

// Define an "OtherContract"
contract OtherContract {
    // Create an instance of the main contract
    MyContract mainContract = new MyContract();

    // Declare a public view function that accesses public variables and functions of the main contract
    function fun() public view returns(uint) {
        // Access the public variable of the main contract
        uint varTotal = mainContract.publicVar();
        // Access the public and external functions of the main contract
        uint funTotal = mainContract.publicFun(2, 2) + mainContract.externalFun(2, 2);
        // Return the sum of the variable total and function total
        return varTotal + funTotal;
    }
}
```

### Compilation and Deployment:

- Use the Solidity compiler tab to compile the contract. This will produce the bytecode and ABI (Application Binary Interface) of the contract, which are necessary for deployment.

<img class="image" alt=""  src="./assets/images/deployed-contracts.JPG" >
<b><center class="img-label"></center></b>

- In the Deploy & Run Transactions tab, select the name of the contract in the contract field. 

- Click the deploy button to deploy the contract. You will see the deployed contract at the bottom of the tab.

- Repeat this process for each contract that you want to deploy.

### Code explanation:

The main contract `MyContract` has three variables: `publicVar`, `privateVar`, and `internalVar`, which can be used within the contract. It also has four functions: `publicFun()`, `privateFun()`, `internalFun()`, and `total()`, which can be called from within the contract. The `total()` function accesses all of the variables and functions within the contract except for the `externalFun()` function.

<img class="image" alt="Main Contract"  src="./assets/images/main-contract.JPG" >
<b><center class="img-label">Main Contract</center></b>

`Private` and `internal` variables and functions are not accessible from outside of the contract, so they are not visible in the `REMIX IDE` (since they are not exposed through the contract's `ABI`). From outside of the contract, we can only access `public` variables, `public` functions, and `external` functions. Therefore, `publicVar`, `publicFun()`, `externalFun()`, and `total()` (which is a `public` function) are visible.

`Derived contracts` can access their parent's `public` and `internal` variables and functions. For example, in a `derived contract`, the `foo()` function can access the `public` and `internal` variables and functions of the `parent contract`.

<img class="image" alt="Derived Contract"  src="./assets/images/derived-contract.JPG" >
<b><center class="img-label">Derived Contract</center></b>

Derived contract shows its public `variable`, `public` function, and `external` function outside the contract, along with its parent `public` variable, `public` function, and `external` function.

The `external` function can be accessed by other contracts and is visible from outside the contract. In the `OtherContract`, the `fun()` function can access the `external` function, as well as the `public` variables and functions.

<img class="image" alt=""  src="./assets/images/another-contract.JPG" >
<b><center class="img-label"></center></b>

The `OtherContract` contract creates an instance of the `MyContract` contract and accesses its `public` variables and functions in the `fun` function.
