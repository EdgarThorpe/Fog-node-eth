const Client = artifacts.require("ClientRegister");

module.exports = function (deployer) {
    deployer.deploy(Client);
};