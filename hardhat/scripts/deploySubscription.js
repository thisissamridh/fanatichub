const hre = require("hardhat");

async function main() {
  const NFTaddress = "0x0e017a1E08849754dB855CA75736A06EC058aDF9";
  const CreatorAddress = "0x9A9C9A993209086d4c55509A8AB293e65Bc84330";
  const Subscription = await hre.ethers.getContractFactory("SubscriptionPlan");
  const subscription = await Subscription.deploy(NFTaddress, CreatorAddress);

  await subscription.deployed();

  console.log("Subscription deployed to:", subscription.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
