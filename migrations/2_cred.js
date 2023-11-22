const FogNodeManagement = artifacts.require("FogNodeManagement");
const Credibility = artifacts.require("Credibility");

module.exports = function (deployer) {
  deployer.deploy(Credibility, FogNodeManagement.address);
};
