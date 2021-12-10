const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("NFT", function () {
    before("init", async function () {
        const NFT = await ethers.getContractFactory("NFT");
        const nft = await NFT.deploy("name", "symbol");
        this.nft = await nft.deployed();
    })
    it("nft", async function () {
        let hash1 = ethers.utils.keccak256("0x01");
        await this.nft.mint(hash1);
        expect(hash1).to.be.equal(await this.nft.getHash(1));
        expect(1).to.be.equal(await this.nft.curId());

        for (i = 2; i < 100; i++) {
            let hash1 = ethers.utils.keccak256(i);
            await this.nft.mint(hash1);
        }
        expect(99).to.be.equal(await this.nft.curId());
    });
});
