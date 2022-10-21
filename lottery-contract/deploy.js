const HDWalletProvider = require("@truffle/hdwallet-provider"); // helps to create a provider
const Web3 = require("web3");
const {
  abi,
  evm
} = require("./compile");

const provider = new HDWalletProvider(
  "civil lock budget asset drill parade nature pigeon wild item razor ranch", // which account we will be using
  "https://rinkeby.infura.io/v3/a5582dd7138d46de9c7490bae956eddb" // which network we are connecting to
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); // get accounts
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi) // instance to contract
    .deploy({
      data: evm.bytecode.object
    })
    .send({
      gas: "1000000",
      from: accounts[0]
    });

  console.log(JSON.stringify(abi));
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
