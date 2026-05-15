// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XJHToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("liuzi6612", "xjh") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}