const ClientRegistration = artifacts.require("ClientRegistration");
const FogNodeManagement = artifacts.require("FogNodeManagement");
const Reputation = artifacts.require("Reputation");
const Credibility = artifacts.require("Credibility");

module.exports = function (deployer) {
  deployer.deploy(ClientRegistration);
  deployer.deploy(FogNodeManagement);
  
  deployer.deploy(Reputation, FogNodeManagement.address);
  deployer.deploy(Credibility, ClientRegistration.address);
};