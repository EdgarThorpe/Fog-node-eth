# Project Name

This project is a smart contract system that allows clients to register and interact with fog nodes. It consists of three contracts: ClientRegistration, Credibility, and FogNodeManagement.

## ClientRegistration

This contract allows clients to register themselves by sending some ether and get a balance, a credibility score, and a rating. Clients can also update their ratings and credibility scores based on their interactions with fog nodes. Clients can clear their registration and withdraw their balance at any time.

The contract has the following functions:

- `addRatings()`: This function allows a client to increase their rating by one if they have a balance greater than 100.
- `clearRegister()`: This function allows a client to clear their registration and withdraw their balance.
- `max(uint a, uint b)`: This is a private function that returns the maximum of two unsigned integers.
- `credUpdate(int score, address fog)`: This function allows a client to update their credibility score and balance based on their performance score and the fog node's threshold. The function calls the `updateCredibility` function from the Credibility contract.
- `registerClient()`: This is a payable function that allows a client to register themselves by sending some ether. The function checks if the client is already registered and assigns them a balance, a credibility score of 5, and a rating of 0.

## Credibility

This contract calculates the credibility score of a client based on their performance score and the threshold of the fog node they interact with. The credibility score can be positive or negative, and it affects the client's rating and balance.

The contract has the following functions:

- `updateCredibility(int score, address fog)`: This function returns the credibility score of a client as the difference between their performance score and the fog node's threshold. The function calls the `giveThreshold` function from the FogNodeManagement contract.

## FogNodeManagement

This contract allows fog nodes to register themselves by providing their location, processing capability, and initial rating. Fog nodes can also receive ratings from clients based on their credibility scores. The contract calculates the average rating and the threshold of each fog node based on their ratings array.

The contract has the following functions:

- `givefogNodes(address _address)`: This function returns the FogNode struct of a given address.
- `giveThreshold(address _address)`: This function returns the threshold of a fog node as the average of their ratings array.
- `addRating(address _address, int rating, int cred)`: This function allows a client to add a rating to a fog node based on their credibility score. The rating is multiplied by the credibility score and pushed to the fog node's ratings array.
- `modifyRating(address _address)`: This function calculates the average rating of a fog node based on their ratings array and assigns it to their rating variable.
- `registerFogNode(string memory location, uint processingCapability, int rating)`: This function allows a fog node to register themselves by providing their location, processing capability, and initial rating. The function creates a new FogNode struct and assigns it to the sender's address.


# How to use :
- use truffle migrate on parent directory. 
- turn on ganache and add truffle-config.js to workspace
- add localhost to metamask and import 4 accounts for fog nodes and other for clients
- add client public and private keys to fognode.json in client folder
- register fognodes through commented out contract calls in index.js
- run npm install in clients folder
- run npm run start in client folder