const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game3", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer1 = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);
    const signer3 = ethers.provider.getSigner(2);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const addr1 = await signer1.getAddress();
    const addr2 = await signer2.getAddress();
    const addr3 = await signer3.getAddress();

    return { game, signer1, signer2, signer3, addr1, addr2, addr3 };
  }

  it("should be a winner", async function () {
    const { game, signer1, signer2, signer3, addr1, addr2, addr3 } =
      await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage
    await game.connect(signer1).buy({ value: ethers.utils.parseEther("2") });
    await game.connect(signer2).buy({ value: ethers.utils.parseEther("3") });
    await game.connect(signer3).buy({ value: ethers.utils.parseEther("1") });

    // to call a contract as a signer you can use contract.connect

    // TODO: win expects three arguments
    await game.win(addr1, addr2, addr3);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
