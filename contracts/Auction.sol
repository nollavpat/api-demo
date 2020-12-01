// Bidding contract
// bid using ERC20 tokens

pragma solidity 0.7.0;

import './ERC20.sol';
import './SafeMath.sol';

// Escrow - holding, locking the funds inside the smart contracts

contract Auction {
    
    using SafeMath for uint256;
    
    ERC20 public _token; // will be the ERC20 Token
    
    uint256 public highestBid = 0;
    address public highestBidder;
    mapping(address => uint256) public forWithdrawals;
    // prev bidder => withdrawal amount
    
    // Functions - Specs:
    // We can use ERC20 to bid
    // Function to bid
    // withdraw function
    // track the highest bidder
    // track the highest bid
    
    constructor(address token) {
        _token = ERC20(token);
    }
    
    function bid(uint256 amount) external returns (bool) {
        // acct1 - 500 - added to the withdrawals
        // acct2 - 600
        // acct1 - 700 - add to the withdrawals - 1200
        // acct2 - 800
        // check if the amount > highestBid
        // check the balance of the bidder
        // check allowance
        // add the prev highest bidder for withdrawals
        // transferFrom bidder to Auction smart contract
        // set the highest Bidder and hihgest Bidder
        require(amount > highestBid, 'Amount is not higher than the highest bid');
        require(_token.balanceOf(msg.sender) >= amount, 'Insufficient balance');
        require(_token.allowance(msg.sender, address(this)) >= amount, 'Insufficient Allowance');
        forWithdrawals[highestBidder] = forWithdrawals[highestBidder].add(highestBid);
        _token.transferFrom(msg.sender, address(this), amount); // transferFrom
        highestBidder = msg.sender;
        highestBid = amount;
    }
    
    // transfer auto to the prev highest bidder - smart contract - loop of withdrawals
    // pull - over - push
    
    function withdraw() external returns (bool) {
        uint256 amount = forWithdrawals[msg.sender];
        
        if (amount > 0) {
            // check - effect - interaction
            forWithdrawals[msg.sender] = 0; // effect
            _token.transfer(msg.sender, amount); // interaction
        }
    }
}