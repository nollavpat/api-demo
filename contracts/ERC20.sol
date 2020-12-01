pragma solidity 0.7.0;

import './IERC20.sol';
import './SafeMath.sol';

// contract Animal {
//     function eat() internal
// }

// contract Dog is Animal {

// }

// Function visibility
    // 1. private - call only inside own smart contract
    // 2. internal - callable only inside own smart contract and contracts that inherits it
    // 3. external - callable outside the smart contract
    // 4. public - callable anywhere

contract ERC20 is IERC20 {

    using SafeMath for uint256; // use Safemath for all uint256 variables

    uint256 _totalSupply;
    mapping (address => uint256) _balances; // key-value storage
    mapping (address => mapping(address => uint256)) _allowances;
    // owner => spender => allowance

    constructor (uint256 supply) {
        _totalSupply = supply;
        // set the balance of the deployer to the totalSupply
        // how can we get the deployer's address
        _balances[msg.sender] = supply;
    }

    // return total circulating supply
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    // pending testing
    function allowance(address owner, address spender) public view override returns (uint256) {
        // return the allowance of the spender from the owner's address
        return _allowances[owner][spender];
    }

    // move funds from an account to another
    // called by the owner
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        // validate address is not 0x0 - sender and recipient
        // validate the sender's balance
        // deduct the amount to the sender's balance
        // add the amount to the recipient's balance
        // emit the Transfer event
        // require(false, 'fire')
        require(msg.sender != address(0), 'Invalid Sender Address');
        require(recipient != address(0), 'Invalid Recipient Address');
        require(_balances[msg.sender] >= amount, 'Insufficient Balance');
        _balances[msg.sender] = _balances[msg.sender].sub(amount); // deduct the sender's balances = current_balance - amount
        _balances[recipient] = _balances[recipient].add(amount); // current_balance + amount
        emit Transfer(msg.sender, recipient, amount);
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        // validate the addresses
        // adjust the allowance of the spender
        // dont validate the balances
        // Bob - 100 tokens
        // Bob approves Janeth with 200 tokens
        require(msg.sender != address(0), 'Invalid Owner Address');
        require(spender != address(0), 'Invalid Spender Address');
        _allowances[msg.sender][spender] = amount;
    }

    // called by the spender
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        // validate address
        // check the allowance >= amount
        // adjust balances
        // deduct from the spender's allowance
        // emit Transfer event
        // emit Approval event
        require(msg.sender != address(0), 'Invalid Spender Address');
        require(sender != address(0), 'Invalid Owner Address');
        require(recipient != address(0), 'Invalid Recipient Address');
        require(_allowances[sender][msg.sender] >= amount, 'Insufficient Allowance');
        _balances[sender] = _balances[sender].sub(amount); // deduct the sender's balances = current_balance - amount
        _balances[recipient] = _balances[recipient].add(amount); // current_balance + amount
        _allowances[sender][msg.sender] = _allowances[sender][msg.sender].sub(amount); // deduct from Allowance
        emit Transfer(sender, recipient, amount);
        emit Approval(sender, msg.sender, _allowances[sender][msg.sender]);
    }
}





