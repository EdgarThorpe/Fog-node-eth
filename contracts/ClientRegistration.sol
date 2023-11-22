//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Credibility.sol';

contract ClientRegistration {
    struct Client {
        int credibility;
        int ratings;
        uint balance;
        address owner;
    }
    mapping(address => bool) public registeredClients;
    mapping(address => Client) public clients;

    Credibility credibility;

    constructor (address credibilityAddress) {
        credibility = Credibility(credibilityAddress);
    }

    function addRatings() public {
        require(clients[msg.sender].balance > 100, "Insufficient balance.");
        clients[msg.sender].ratings += 1;
    }

    function max(uint a, uint b) private pure returns (uint) {
        return a > b ? a : b;
    }
    function credUpdate(int score, address fog) public {
        int value = credibility.updateCredibility(score, fog);
        clients[msg.sender].ratings += value;
        if(value > 0) clients[msg.sender].balance += uint(5*value);
        else clients[msg.sender].balance -= max(uint(5*value), clients[msg.sender].balance);
    }

    function registerClient() public payable {
        if(registeredClients[msg.sender]) {
            (bool success, ) = msg.sender.call{value: msg.value}("");
            require(success, "Failed to send Ether");
        }
        require(!registeredClients[msg.sender], "Client already registered.");
        registeredClients[msg.sender] = true;
        clients[msg.sender] = Client(5, 0, msg.value, msg.sender);
    }
}