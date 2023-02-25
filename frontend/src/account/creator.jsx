import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import creator_nft from "../../src/assets/creator-nft.png";
import content1 from "../../src/assets/gold.png";
import content2 from "../../src/assets/silver.png";
import profile from "../../src/assets/profile.png";
import { constants } from "ethers";
import { GetData } from "../components/GetData";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import {
  Creator_Contract_address,
  Creator_Contract_ABI,
  Content_ABI,
  Content_Contract_address,
} from "../../utils/constants";

export default function Creator() {
  const [isCreator, setIsCreator] = useState(false);
  const [creator, setCreator] = useState({});
  const [data, setData] = useState({});
  const [id, setId] = useState(0);

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

  const fetchCreator = async () => {
    try {
      console.log("Fetching Creator Id");
      const id = await Creator_contract.getId(address);

      // separate the id value from value
      console.log(id);

      console.log("Fetching Creators details");
      const _data = await Creator_contract.fetchCreators(id);
      console.log(_data);
      // set this data and get the IPFS hash from this object
      setData(_data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIPFS = async (_cid) => {
    console.log("fetching the files");
    // const _cid = "bafkreifxtpdf5lcmkqjqmpe4wjgfl4rbov23ryn5merejridxk27pfzufq";
    const data = await GetData(_cid);
    console.log(data);

    /// get the json and use that json for further processing of the data
    /// {name , description(bio) , image (pfp), }
  };

  useEffect(() => {
    checkCreator();
  }, []);

  return (
    <>
      {isCreator ? (
        <div className={`${styles.explore}`}>
          <h1 className={styles.section_heading}>Creator Account Details</h1>
          <div className={`${styles.creator_section}`}>
            <div className={styles.account_details}>
              <div className={styles.profile_image}>
                <Image src={profile} />
              </div>
              <div className={styles.wallet_details}>
                <h2>Wallet Details</h2>
                <h3>Address: </h3>
                <p className={styles.address}>
                  0xA25c5bE1324764573dE0a14ABFe0279B4291adfA
                </p>
                <h3>Balance: </h3>
                <p>10 MATIC</p>
                <div>
                  <button className={styles.explore_btn}>Withdraw</button>
                </div>
              </div>
              <div className={styles.user_subscription}>
                {/* <h2 className={styles.card_title}>Creator NFT</h2> */}
                <div className={styles.creator_nft}>
                  <Image src={creator_nft} />
                </div>
              </div>
            </div>
            {/* <hr /> */}

            <h2 className={styles.card_title}>Content</h2>
            <div className={styles.creator_content}>
              <div className={styles.content}>
                <Image src={content1} />
              </div>
              <div className={styles.content}>
                <Image src={content2} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <a>Not a Creator</a>
      )}
      {/* <div className={`${styles.explore}`}>
        <h1 className={styles.section_heading}>Creator Account Details</h1>
        <div className={`${styles.creator_section}`}>
          <div className={styles.account_details}>
            <div className={styles.profile_image}>
              <Image src={profile} />
            </div>
            <div className={styles.wallet_details}>
              <h2>Wallet Details</h2>
              <h3>Address: </h3>
              <p className={styles.address}>
                0xA25c5bE1324764573dE0a14ABFe0279B4291adfA
              </p>
              <h3>Balance: </h3>
              <p>10 MATIC</p>
              <div>
                <button className={styles.explore_btn}>Withdraw</button>
              </div>
            </div>
            <div className={styles.user_subscription}>
              <h2 className={styles.card_title}>Creator NFT</h2>
              <div className={styles.creator_nft}>
                <Image src={creator_nft} />
              </div>
            </div>
          </div>
          <hr />

          <h2 className={styles.card_title}>Content</h2>
          <div className={styles.creator_content}>
            <div className={styles.content}>
              <Image src={content1} />
            </div>
            <div className={styles.content}>
              <Image src={content2} />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
