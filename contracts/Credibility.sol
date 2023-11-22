//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './FogNodeManagement.sol';

contract Credibility {

    FogNodeManagement fognodemanagement;
    constructor (address fogNodeManagementAddress) {
        fognodemanagement = FogNodeManagement(fogNodeManagementAddress);
    }

    function updateCredibility(int score, address fog) public view returns (int){
        int threshold = fognodemanagement.giveThreshold(fog);
        return (score - threshold);
    }
}