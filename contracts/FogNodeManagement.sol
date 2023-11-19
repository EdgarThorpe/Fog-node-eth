//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FogNodeManagement{
    struct FogNode {
        address owner;
        string ip;
        string location;
        uint processingCapability;
    }
    mapping(address => FogNode) public fogNodes;
    function givefogNodes(address _address) public view returns (FogNode memory) {
        return fogNodes[_address];
    }
    function registerFogNode(string memory ip, string memory location, uint processingCapability) public {
        fogNodes[msg.sender] = FogNode(msg.sender, ip, location, processingCapability);
    }

}