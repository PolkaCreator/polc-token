pragma solidity 0.5.11;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

/**
 * @dev CreatorChain's ERC20 token and burnable
 * Total supply: 150M token
 */
contract CtrToken is ERC20Detailed, ERC20Burnable {
    uint256 public constant TOTAL_SUPPLY = 150 * 10**(6 + 18);

    constructor(address owner)
        public
        ERC20Detailed("CreatorChain", "CTR", 18)
    {
        _mint(owner, TOTAL_SUPPLY);
    }
}
