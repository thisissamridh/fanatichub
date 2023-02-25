import React, { useState } from "react";
import {
  useContract,
  useSigner,
  useProvider,
  useAccount,
  useConnect,
} from "wagmi";
import { NFT_ABI, NFT_Address } from "../../utils/constants";

const CheckUser = () => {
  const [isSilver, setIsSilver] = useState(false);
  const [isGold, setIsGold] = useState(false);
  const [isPlatinum, setIsPlatinum] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

  const NFT_contract = useContract({
    addressOrName: NFT_Address,
    contractInterface: NFT_ABI,
    signerOrProvider: signer || provider,
  });

  const checkSilver = async () => {
    try {
      console.log("Checking user");
      const data = await NFT_contract.balanceOf(address, 0);
      if (data.value > 0) {
        console.log("Silver Tier User");
        setIsSilver(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkGold = async () => {
    try {
      console.log("Checking user");
      const data = await NFT_contract.balanceOf(address, 1);
      if (data.value > 0) {
        console.log("Gold tier User");
        setIsGold(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkPlatinum = async () => {
    try {
      console.log("Checking user");
      const data = await NFT_contract.balanceOf(address, 2);
      if (data.value > 0) {
        console.log("Platinum tier User");
        setIsPlatinum(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkCreator = async () => {
    try {
      console.log("Checking user");
      const data = await NFT_contract.balanceOf(address, 3);
      if (data.value > 0) {
        console.log("Creator Spotted");
        setIsPlatinum(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>checkUser</div>;
};

export default checkUser;
