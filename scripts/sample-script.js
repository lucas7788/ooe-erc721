// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    // We get the contract to deploy
    if (true) {
        const NFT = await hre.ethers.getContractFactory("NFT");
        const nft = await NFT.deploy("testName", "testSymbol");

        await nft.deployed();
        console.log("NFT deployed to:", nft.address);
        //0xCdc664C04dFCe03c9DCdaB0e7c943a4C76C85ddC
        return;
    }
    if (true) {
        const nft = await ethers.getContractAt("NFT", "0x1516AfF990a413813F6AE62BE86fc39d9D03e41A");

        let hash1 = ethers.utils.keccak256("0x01");
        let r = await nft.mint(hash1);
        console.log("r:", r);
        let res = await nft.getHash(1);
        console.log("res:", res.toString());
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
