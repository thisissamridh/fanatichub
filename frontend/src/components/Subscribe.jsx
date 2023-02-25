import React, { useEffect } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  Subscription_Contract_ABI,
  Subscription_Contract_Address,
  SilverPLan,
  GoldPLan,
  PlatinumPLan,
} from "../../utils/constants";
import { ethers } from "ethers";
import styles from "./Button.module.css";
import { useState } from "react";
import Loading from "./Loader";

/// A Simple Subscribe Button component , which takes the Plan Id and the creator Id from where it is placed , give a Button that will subscribe for the plan and Creator Chosen
const Subscribe = (props) => {
  // const [amount, setAmount] = useState("");
  const [planId, setPlanId] = useState(0);
  const [creator, setCreator] = useState("");

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount;

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const Subscription_contract = useContract({
    addressOrName: Subscription_Contract_Address,
    contractInterface: Subscription_Contract_ABI,
    signerOrProvider: signer || provider,
  });

  const subscribe = async () => {
    try {
      setIsLoading(true);
      setMessage("Subscribing to the creator");
      console.log(
        `Subscribing to the creator: ${creator} for the planId :${planId} \n`
      );
      console.log("Intiating the Transaction 🔥🔥");
      if (planId == 0) {
        const tx = await Subscription_contract.subscribe(creator, planId, {
          value: ethers.utils.parseEther("0.2"),
        });
        await tx.wait();
      } else if (planId == 1) {
        const tx = await Subscription_contract.subscribe(creator, planId, {
          value: ethers.utils.parseEther("0.5"),
        });
        await tx.wait();
      } else if (planId == 2) {
        const tx = await Subscription_contract.subscribe(creator, planId, {
          value: ethers.utils.parseEther("1"),
        });
        await tx.wait();
      } else {
        console.log("Choose a Correct Plan");
        return false;
      }
      // const tx = await contract.subscribe(creatorAddress, planId, {
      //   value: amount,
      // });
      // await tx.wait();
      console.log("Subscription Successfully completed 🥳🥳");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPlanId(props.planId);
    console.log(props.creatorId);
    setCreator(props.creatorId);
  }, [props.creatorId]);

  return (
    <>
      {!isLoading ? (
        <button className={styles.btn} onClick={subscribe}>
          Subscribe
        </button>
      ) : (
        <>
          <div className={styles.fullScreen}>
            <Loading _loading={isLoading} _message={message} />
          </div>
        </>
      )}
    </>
  );
};

export default Subscribe;
