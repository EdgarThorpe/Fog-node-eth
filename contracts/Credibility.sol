//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ClientRegistration.sol';

contract Credibility {
    ClientRegistration clientRegistration;
    mapping(address => uint) public credibilityScores;

    constructor(address clientRegistrationAddress) {
        clientRegistration = ClientRegistration(clientRegistrationAddress);
    }

    function updateCredibility(address client, uint score) public {
        require(clientRegistration.registeredClients(client), "Client not registered.");
        credibilityScores[client] = score; // Simplified credibility update
    }
}