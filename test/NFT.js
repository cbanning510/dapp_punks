const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;

describe("NFT", () => {
  const NAME = "Dapp Punks";
  const SYMBOL = "DP";
  const COST = ether(10);
  const MAX_SUPPLY = 25;
  const BASE_URI = "ipfs://QmQ2jnDYecFhrf3asEWjyjZRX1pZSsNWG3qHzmNDvXa9qg/";

  let nft, deployer, minter;

  beforeEach(async () => {
    let accounts = await ethers.getSigners();
    deployer = accounts[0];
    minter = accounts[1];
  });

  describe("Deployment", () => {
    const ALLOW_MINTING_ON = (Date.now() + 12000).toString().slice(0, 10);

    beforeEach(async () => {
      const NFT = await ethers.getContractFactory("NFT");
      nft = await NFT.deploy(
        NAME,
        SYMBOL,
        COST,
        MAX_SUPPLY,
        ALLOW_MINTING_ON,
        BASE_URI,
      );
    });

    it("has correct name", async () => {
      expect(await nft.name()).to.equal(NAME);
    });

    it("has correct symbol", async () => {
      expect(await nft.symbol()).to.equal(SYMBOL);
    });

    it("returns the cost to mint", async () => {
      expect(await nft.cost()).to.equal(COST);
    });

    it("returns the max supply", async () => {
      expect(await nft.maxSupply()).to.equal(MAX_SUPPLY);
    });

    it("returns the allowed minting time", async () => {
      expect(await nft.allowMintingOn()).to.equal(ALLOW_MINTING_ON);
    });

    it("returns the Base URI", async () => {
      expect(await nft.baseURI()).to.equal(BASE_URI);
    });

    it("returns the owner", async () => {
      expect(await nft.owner()).to.equal(deployer.address);
    });
  });

  //   describe("Sending Tokens", () => {
  //     let amount, transaction, result;

  //     describe("Success", () => {
  //       beforeEach(async () => {
  //         amount = tokens(100);
  //         transaction = await token
  //           .connect(deployer)
  //           .transfer(receiver.address, amount);
  //         result = await transaction.wait();
  //       });

  //       it("transfers token balances", async () => {
  //         expect(await token.balanceOf(deployer.address)).to.equal(
  //           tokens(999900),
  //         );
  //         expect(await token.balanceOf(receiver.address)).to.equal(amount);
  //       });

  //       it("emits a Transfer event", async () => {
  //         await expect(transaction)
  //           .to.emit(token, "Transfer")
  //           .withArgs(deployer.address, receiver.address, amount);
  //       });
  //     });

  //     describe("Failure", () => {
  //       it("rejects insufficient balances", async () => {
  //         const invalidAmount = tokens(100000000);
  //         await expect(
  //           token.connect(deployer).transfer(receiver.address, invalidAmount),
  //         ).to.be.reverted;
  //       });

  //       it("rejects invalid recipent", async () => {
  //         const amount = tokens(100);
  //         await expect(
  //           token
  //             .connect(deployer)
  //             .transfer("0x0000000000000000000000000000000000000000", amount),
  //         ).to.be.reverted;
  //       });
  //     });
  //   });

  //   describe("Approving Tokens", () => {
  //     let amount, transaction, result;

  //     beforeEach(async () => {
  //       amount = tokens(100);
  //       transaction = await token
  //         .connect(deployer)
  //         .approve(exchange.address, amount);
  //       result = await transaction.wait();
  //     });

  //     describe("Success", () => {
  //       it("allocates an allowance for delegated token spending", async () => {
  //         expect(
  //           await token.allowance(deployer.address, exchange.address),
  //         ).to.equal(amount);
  //       });

  //       it("emits an Approval event", async () => {
  //         const event = result.events[0];
  //         expect(event.event).to.equal("Approval");

  //         const args = event.args;
  //         expect(args.owner).to.equal(deployer.address);
  //         expect(args.spender).to.equal(exchange.address);
  //         expect(args.value).to.equal(amount);
  //       });
  //     });

  //     describe("Failure", () => {
  //       it("rejects invalid spenders", async () => {
  //         await expect(
  //           token
  //             .connect(deployer)
  //             .approve("0x0000000000000000000000000000000000000000", amount),
  //         ).to.be.reverted;
  //       });
  //     });
  //   });

  //   describe("Delegated Token Transfers", () => {
  //     let amount, transaction, result;

  //     beforeEach(async () => {
  //       amount = tokens(100);
  //       transaction = await token
  //         .connect(deployer)
  //         .approve(exchange.address, amount);
  //       result = await transaction.wait();
  //     });

  //     describe("Success", () => {
  //       beforeEach(async () => {
  //         transaction = await token
  //           .connect(exchange)
  //           .transferFrom(deployer.address, receiver.address, amount);
  //         result = await transaction.wait();
  //       });

  //       it("transfers token balances", async () => {
  //         expect(await token.balanceOf(deployer.address)).to.be.equal(
  //           ethers.utils.parseUnits("999900", "ether"),
  //         );
  //         expect(await token.balanceOf(receiver.address)).to.be.equal(amount);
  //       });

  //       it("rests the allowance", async () => {
  //         expect(
  //           await token.allowance(deployer.address, exchange.address),
  //         ).to.be.equal(0);
  //       });

  //       it("emits a Transfer event", async () => {
  //         const event = result.events[0];
  //         expect(event.event).to.equal("Transfer");

  //         const args = event.args;
  //         expect(args.from).to.equal(deployer.address);
  //         expect(args.to).to.equal(receiver.address);
  //         expect(args.value).to.equal(amount);
  //       });
  //     });

  //     describe("Failure", async () => {
  //       // Attempt to transfer too many tokens
  //       const invalidAmount = tokens(100000000); // 100 Million, greater than total supply
  //       await expect(
  //         token
  //           .connect(exchange)
  //           .transferFrom(deployer.address, receiver.address, invalidAmount),
  //       ).to.be.reverted;
  //     });
  //   });
});
