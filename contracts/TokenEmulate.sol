// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenEmulate is ERC20 {
    uint public INITIAL_SUPPLY = 220_000_000 * 10 ** 18;

    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
    {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}