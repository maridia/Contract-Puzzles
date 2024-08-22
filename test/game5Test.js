const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    // Create a wallet with an address less than the threshold
    let wallet;
    while (true) {
      wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      if (
        wallet.address.toLowerCase() <
        "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf"
      ) {
        break;
      }
    }

    // Fund the wallet with some ETH for gas
    await ethers.provider.getSigner(0).sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("1.0"),
    });

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
