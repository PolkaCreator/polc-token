// Load dependencies
const BN = web3.utils.BN;

// Import helper test
const { assertEqual } = require('./helper');

// Load compiled artifacts
const PolcToken = artifacts.require('PolcToken.sol');

// Common variables
let admin;
let polcToken;
let user;

// Start test block
contract('PolcToken', accounts => {
    describe('Test all basic token functions', async () => {
        before('Deploy contract before run each test case', async () => {
            user = accounts[0];
            admin = accounts[1];
            polcToken = await PolcToken.new(admin);
        });

        it('Test contract initiated values', async function () {
            // Expected values
            const expectedTotalSupply = new BN(100).mul(new BN(10).pow(new BN(24))); // 24 ~ 1M 10^6 & 10^18 decimals
            const expectedTokenName = "PolkaCreator";
            const expectedTokenSymbol = "POLC";
            const expectedTokenDecimals = new BN(18);

            assertEqual(expectedTotalSupply, await polcToken.totalSupply(), "Wrong total supply");
            assertEqual(expectedTokenName, await polcToken.name(), "Wrong token name");
            assertEqual(expectedTokenSymbol, await polcToken.symbol(), "Wrong token symbol");
            assertEqual(expectedTokenDecimals, await polcToken.decimals(), "Wrong token decimals");
            assertEqual(expectedTotalSupply, await polcToken.balanceOf(admin), "Wrong admin balance");
        });

        it(`Test token burn`, async () => {
            let adminBalance = await polcToken.balanceOf(admin);
            let burnAmount = new BN(10).pow(new BN(18));
            let totalSupply = await polcToken.totalSupply();

            // Expected values
            let adminBalanceAfter = adminBalance.sub(burnAmount);
            let totalSupplyAfter = totalSupply.sub(burnAmount);

            await polcToken.burn(burnAmount, { from: admin });

            assertEqual(adminBalanceAfter, await polcToken.balanceOf(admin));
            assertEqual(totalSupplyAfter, await polcToken.totalSupply());
        });

        it(`Test token burnFrom`, async () => {
            let adminBalance = await polcToken.balanceOf(admin);
            let userBalance = await polcToken.balanceOf(user);
            let totalSupply = await polcToken.totalSupply();
            let burnAmount = new BN(10).pow(new BN(18));

            // Expected values
            let adminBalanceAfter = adminBalance.sub(burnAmount);
            let totalSupplyAfter = totalSupply.sub(burnAmount);

            await polcToken.approve(user, burnAmount, { from: admin });
            await polcToken.burnFrom(admin, burnAmount, { from: user });

            assertEqual(adminBalanceAfter, await polcToken.balanceOf(admin));
            assertEqual(totalSupplyAfter, await polcToken.totalSupply());
            assertEqual(userBalance, await polcToken.balanceOf(user));
        });
    });
});
