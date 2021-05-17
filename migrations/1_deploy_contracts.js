// for deploy:
// > truffle migrate --network rinkeby
// or
// > truffle migrate --network bsctestnet
// for verify:
// > truffle run verify Bridge@0x9dAC9ca6D25f2d58bC760488213154D46ce8dE03 --network rinkeby
// > truffle run verify BridgeProxy@0xcee070745Fe5804d81F2551F93f237Bc13279d66 --network rinkeby
// or
// > truffle run verify Bridge@0x651c58c964965f5fC232bfEB6cEb30818a1e024E --network bsctestnet
// > truffle run verify BridgeProxy@0x8C32956a49d9D0b90624147ec9e607419d51F373 --network bsctestnet

const Implementation = artifacts.require("Bridge");
const Proxy = artifacts.require("BridgeProxy");

module.exports = async function(deployer, network, accounts) {

    let courier;
    let guardian = '';
    let token;
    let fee;
    let routes;

    if (network === 'bsctestnet') {
        token = '';
        courier = '';
        routes = ['3', '4'];
        fee = '2';
    } else if (network === 'rinkeby') {
        token = '';
        courier = '';
        routes = ['3','97'];
        fee = '1';
    } else if (network === 'mainnet') {
        token = '';
        courier = '';
        routes = ['56'];
        fee = '2000000000000000000';
    } else if (network === 'bsc') {
        token = '';
        courier = '';
        routes = ['1'];
        fee = '50000000000000000000';
    } else {
        console.log('Token is not defined');
        console.log('Routes are not defined');
        return;
    }

    await deployer.deploy(Implementation);
    const imp = await Implementation.deployed();

    await deployer.deploy(Proxy,
        imp.address,
        courier,
        guardian,
        token,
        fee,
        routes
    );
    const proxy = await Proxy.deployed();

    console.log('Guardian', guardian);
    console.log('Token', token);
    console.log('Bridge implementation', imp.address);
    console.log('Bridge proxy', proxy.address);
};
