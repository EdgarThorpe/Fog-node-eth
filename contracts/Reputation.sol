//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FogNodeManagement.sol";

contract Reputation {
    FogNodeManagement fogNodeManagement;
    mapping(address => uint) public reputationScores;

    constructor(address fogNodeManagementAddress) {
        fogNodeManagement = FogNodeManagement(fogNodeManagementAddress);
    }

    function updateReputation(address fogNode, uint score) public {
        require(fogNodeManagement.givefogNodes(fogNode).owner != address(0), "Fog node not registered.");
        // Simplified reputation calculation
        reputationScores[fogNode] = (reputationScores[fogNode] + score) / 2;
    }
}