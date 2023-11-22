const FogNodeManagement = artifacts.require("FogNodeManagement");

module.exports = function (deployer) {
  deployer.deploy(FogNodeManagement);
};