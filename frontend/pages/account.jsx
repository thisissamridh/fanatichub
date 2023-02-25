import React, { useState, useEffect } from "react";
import CreatorAccount from "../src/components/CreatorAccount";
import UserAccount from "../src/components/UserAccount";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import {
  Creator_Contract_address,
  Creator_Contract_ABI,
} from "../utils/constants";

export default function Account() {
  const [isCreator, setIsCreator] = useState(false);
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const Creator_contract = useContract({
    addressOrName: Creator_Contract_address,
    contractInterface: Creator_Contract_ABI,
    signerOrProvider: signer || provider,
  });

  const checkCreator = async () => {
    try {
      console.log("Checking if Creator or Not");
      const check = await Creator_contract.checkStatus(address);
      console.log(check);
      // fetch the value from the fetch
      setIsCreator(check);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkCreator();
  });

  return (
    <>
      <div>{isCreator ? <CreatorAccount /> : <UserAccount />}</div>
      {/* <CreatorAccount /> */}
    </>
  );
}
