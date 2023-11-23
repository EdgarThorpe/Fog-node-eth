//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FogNodeManagement{
    struct FogNode {
        address owner;
        string location;
        uint processingCapability;
        int[] ratings;
        int[] creds;
        int credsum;
        int rating;
    }

    mapping(address => FogNode) private fogNodes;

    function givefogNodes(address _address) public view returns (FogNode memory) {
        return fogNodes[_address];
    }

    function giveThreshold(address _address) public view returns (int) {
        int sum = 0;
        for(uint i = 0; i < fogNodes[_address].ratings.length; i++){
            sum += fogNodes[_address].ratings[i];
        }
        return sum / int(fogNodes[_address].ratings.length);
    }

    function addRating(address _address, int rating, int cred) public {
        fogNodes[_address].ratings.push(rating);
        fogNodes[_address].creds.push(cred);
    }

    function modifyRating(address _address) public {
        int sum = 0;
        for(uint i = 0; i < fogNodes[_address].ratings.length; i++){
            sum += fogNodes[_address].ratings[i] * fogNodes[_address].creds[i];
        }
        fogNodes[_address].rating = sum;
        sum = 0;
        for(uint i = 0; i < fogNodes[_address].creds.length; i++){
            sum += fogNodes[_address].creds[i];
        }
        fogNodes[_address].credsum = sum;
    }

    function registerFogNode(string memory location, uint processingCapability, int rating) public {
        int[] memory empty = new int[](0);
        int[] memory empty2 = new int[](0);
        fogNodes[msg.sender] = FogNode(msg.sender, location, processingCapability, empty, empty2, 0, rating);
    }

}