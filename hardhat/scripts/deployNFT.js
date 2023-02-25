const hre = require("hardhat");

async function main() {
  const metadata =
    "ipfs://bafybeiaw43hwcgphcsoq5r3nzrh4gykalfrk3wbricm6nkvo22mzltm5na/metadata/";

  const NFT = await hre.ethers.getContractFactory("CrazeNFT");
  const nft = await NFT.deploy(metadata);

  await nft.deployed();

  console.log("NFT contract deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
