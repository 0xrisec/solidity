# Visibility

Visibility is used to set the accessibility of variables and functions within a smart contract. This allows us to easily secure certain parts of a contract without writing custom code.

Visibility only prevents other contracts from reading or modifying the information. In a contract, visibility is set for three types of function callers: `Main Contract`, `Derived Contract` and `Another Contract`.

**MyContract:** In my case, the name of the main contract is MyContract.
<pre style="background: rgba(0,0,0,.05); padding:20px">
contract MyContract{

}
</pre>

**DerivedContract:** A derived contract is a contract that is constructed from a base contract or an existing contract. In other words a contract inherited from the main contract. The `is` keyword is used for inheritance in Solidity.

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

Function visibility can be `private`, `internal`, `external`, or `public`, while state variables have only three visibility modifiers `public`, `internal`, or `private`. The keyword `external` is not applicable to state variables.

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

- **public:** A public variable or function can be accessed by inside `contract itself`, `derived contracts` and `another contract and accounts`. By default, all functions and variables are `public`.

- **internal:** Internal variable and function can be accessed by inside `contract itself` and `derived contracts`.

- **external:** An external function can only be called from `another contract` or from `a third-party contract`. The main contract itself or any contracts derived from it cannot call it.

- **private:** Private functions and variables can only be accessed inside `contract itself`. `Another contract` and `derived contracts` cannot access private functions and variables.


## Example
```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

//Defining Main contract
contract MyContract {
    //creating public variable and function
    uint public publicVar = 12;
    uint private priavteVar = 12;
    uint internal internalVar = 12;
    // uint external publicVar = 12;

    function publicFun(uint a,uint b) public pure returns(uint){
        return a+b;
    }

    function privateFun(uint a,uint b) private pure returns(uint){
        return a*b;
    }

    function internalFun(uint a,uint b) internal pure returns(uint){
        return a-b;
    }

    function externalFun(uint a,uint b) external pure returns(uint){
        return a/b;
    }

    function total() public view returns(uint){
        uint varTotal = publicVar + priavteVar + internalVar;
        uint funTotal = publicFun(2,2) + privateFun(2,2) + internalFun(2,2);
        return varTotal + funTotal;
    }
}

//Defining child contract
contract DerivedContract is MyContract{ // The is keyword is used for inheritance in Solidity.
    //accessing public vairable and function of main contract
    function foo() public view returns(uint){
        uint varTotal = publicVar + internalVar;
        uint funTotal = publicFun(2,2) + internalFun(2,2);
        return varTotal + funTotal;
    }
}

//Defining Other contract
contract OtherContract{
    //giving main contract address as a param
    function fun(address contractAddr) public view returns(uint){ 
        // create object of a main contract where `contractAddr` is the address of the main contract
        MyContract mainContract = MyContract(contractAddr);
        //accessing public vairable and function of main contract
        uint varTotal = mainContract.publicVar();
        uint funTotal = mainContract.publicFun(2,2)+mainContract.externalFun(2,2);
        return varTotal + funTotal;
    }
}
```

### Compilation and Deployment:

- compile the contract through the solidity compiler tab

<img class="image" alt="Remix IDE Panels"  src="./assets/images/deployed-contracts.JPG" >
<b><center class="img-label"></center></b>

- Select the name of the contract in the contract field of the Deploy & Run Transactions tab and deploy each contract.

- You will see the deployed contract at the bottom of the tab after clicking the deploy button.

### Code explanation:

A main contract named MyContract has three variables, publicVar, privateVar, and internalVar, which we can use anywhere within MyContract. Four functions such as publicFun, privateFun, internalFun and total which we can call anywhere within MyContract. Such as total function is accessing all variables and functions except external ones(`externalFun` function).

<img class="image" alt="Remix IDE Panels"  src="./assets/images/main-contract.JPG" >
<b><center class="img-label">Main Contract</center></b>

Due to the fact that we cannot access private and internal variables and function outside of the contract, they are not visible by REMIX IDE.
Outside of the contract, we can only access public variables, public functions, and external functions, so publicVar, publicFun, externalFun, and total (the total function is public) are visible.

Derived Contracts can access their parent's public and internal variables and functions. As an example, in a derived contract, the foo function accesses public and internal variables and functions of the parent contract.

<img class="image" alt="Remix IDE Panels"  src="./assets/images/derived-contract.JPG" >
<b><center class="img-label">Derived Contract</center></b>

Derived contract shows its public variable, public function, and external function outside the contract, along with its parent public variable, public function, and external function.

The external function can be accessed by other contracts and is visible outside the contract. In Other Contract, foo function accesses external function along with public variables and functions.

<img class="image" alt="Remix IDE Panels"  src="./assets/images/another-contract.JPG" >
<b><center class="img-label"></center></b>

Each contract deployment contract has a unique address. In order to access the variables and functions of another contract, we first need to know its address. In our example, the fun function gets addressed and creates the main contract object, so we can access variables and functions of the main contract.
