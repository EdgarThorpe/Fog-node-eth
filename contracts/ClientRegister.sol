//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClientRegister {
    mapping(address => bool) public registeredClients;

    function registerClient() public {
        require(!registeredClients[msg.sender], "Client already registered.");
        registeredClients[msg.sender] = true;
    }
}
