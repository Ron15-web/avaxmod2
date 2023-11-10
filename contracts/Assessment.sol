// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    mapping(address => uint256) public birthYears;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    modifier onlyAdult() {
        require(getAge(msg.sender) >= 18, "You must be 18 or older to use this service");
        _;
    }

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function setBirthYear(uint256 _year) public {
        require(_year > 1900 && _year <= 2023, "Invalid birth year");
        birthYears[msg.sender] = _year;
    }

    function getAge(address _user) public view returns (uint) {
        uint birthYear = birthYears[_user];
        require(birthYear > 0, "Birth year not set");
        
        uint currentYear = 2023;
        return currentYear - birthYear;
    }

    function deposit(uint256 _amount) public payable onlyAdult {
        uint _previousBalance = balance;
        require(msg.sender == owner, "You are not the owner of this account");
        balance += _amount;
        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public onlyAdult {
        require(msg.sender == owner, "You are not the owner of this account");
        require(getAge(msg.sender) >= 18, "You must be 18 or older to withdraw funds");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        balance -= _withdrawAmount;
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }
}