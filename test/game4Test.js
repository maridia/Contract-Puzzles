const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    // Get two signers
    const signer = ethers.provider.getSigner(0);

    return { game, signer };
  }
  it("should be a winner", async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // Get the addresses
    const address = await signer.getAddress();

    // nested mappings are rough :}

    // Write to the nested mapping
    await game.connect(signer).write(address);

    // Call win with the correct address
    await game.connect(signer).win(address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
