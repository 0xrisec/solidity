# Pitfalls in Reentrancy Solutions

Because reentrancy can happen across multiple functions and even several contracts, any solution that solely targets preventing reentrancy within a single function would not be effective enough.

Since reentrancy can occur across multiple functions, and even multiple contracts, any solution aimed at preventing reentrancy with a single function will not be sufficient.

Instead, we have recommended finishing all internal work (ie. state changes) first, and only then calling the external function. This rule, if followed carefully, will allow you to avoid vulnerabilities due to reentrancy. However, you need to not only avoid calling external functions too soon, but also avoid calling functions which call external functions.

By following this pattern carefully, you can ensure that all internal state changes are completed before any external interactions are made. This helps to prevent reentrancy attacks by avoiding calling external functions too soon, as well as avoiding calling functions that call external functions.

re-entrancy-pitfall-1.jpg

not only to ensure that external function calls occur after any state variable updates but also to apply this same approach to functions that call other functions which may in turn trigger external function calls.

```sol
mapping (address => uint) private balances;
mapping (address => bool) private hasClaimedBonus;
mapping (address => uint) private rewards;

function withdrawReward(address _recipient) public {
    // Check
    require(rewards[_recipient] > 0, "No reward to withdraw");
    uint amount = rewards[_recipient];
    // Effect
    rewards[_recipient] = 0;
    // Interaction
    (bool success, ) = _recipient.call.value(amount)("");
    require(success);
}

function claimBonus(address _recipient) public {
   require(!hasClaimedBonus[_recipient], "Bonus already claimed");

   rewards[_recipient] += 100;
   withdrawReward(_recipient);
   hasClaimedBonus[_recipient] = true;
}
```