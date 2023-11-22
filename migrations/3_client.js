const ClientRegistration = artifacts.require("ClientRegistration");
const Credibility = artifacts.require("Credibility");

module.exports = function (deployer) {
  deployer.deploy(ClientRegistration, Credibility.address);
};
