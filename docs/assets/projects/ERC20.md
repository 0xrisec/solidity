A contract that implements a simple token exchange platform
A contract that implements a simple ERC-20 token.


```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

interface IERC20{
    function transfer(address _to, uint _amount) external;
    function transferFrom(address _from, address _to, uint _amount) external;
    function approve(address _spender, uint _amount) external;
}

contract ERC20 is IERC20{
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    constructor(string memory tokenName, string memory tokenSymbol, uint8 tokenDecimals, uint256 initialSupply) {
        name = tokenName;
        symbol = tokenSymbol;
        decimals = tokenDecimals;
        totalSupply = initialSupply * 10 ** uint256(decimals);
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return balances[owner];
    }

    function transfer(address to, uint256 value) public {
        require(balances[msg.sender] >= value && value > 0, "Insufficient funds.");
        balances[msg.sender] -= value;
        balances[to] += value;
    }

    function transferFrom(address from, address to, uint256 value) public {
        require(balances[from] >= value && allowed[from][msg.sender] >= value && value > 0, "Insufficient funds.");
        balances[from] -= value;
        allowed[from][msg.sender] -= value;
        balances[to] += value;
    }

    function approve(address spender, uint256 value) public {
        allowed[msg.sender][spender] = value;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return allowed[owner][spender];
    }
}
```