const hre = require("hardhat");

async function main() {
  const NFT_CONTRACT_ADDRESS = "0x0e017a1E08849754dB855CA75736A06EC058aDF9";
  const CREATOR = await hre.ethers.getContractFactory("Creators");
  const creator = await CREATOR.deploy(NFT_CONTRACT_ADDRESS);

  await creator.deployed();

  console.log("Creator contract deployed to:", creator.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
