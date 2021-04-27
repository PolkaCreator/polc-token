const artifacts = require('hardhat').artifacts
const BN = web3.utils.BN;

const PolcToken = artifacts.require('PolcToken.sol');

let token;
let tokenAddress;

let deployer;

async function main() {
    const accounts = await web3.eth.getAccounts();
    deployer = accounts[0];
    console.log(`Deployer address: ${deployer}`);

    gasPrice = new BN(2).mul(new BN(10).pow(new BN(9)));
    console.log(`Sending transactions with gas price: ${gasPrice.toString(10)} (${gasPrice.div(new BN(10).pow(new BN(9))).toString(10)} gweis)`);

    if (tokenAddress == undefined) {
        token = await PolcToken.new(deployer);
        tokenAddress = token.address;
        console.log(`Deployed POLC token address: ${tokenAddress}`);
    } else {
        token = await PolcToken.at(tokenAddress);
        console.log(`Interacting POLC token address: ${tokenAddress}`);
    }

    console.log(`POLC token balance: ${(await token.balanceOf(deployer)).toString(10)}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
