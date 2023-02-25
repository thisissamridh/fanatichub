import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import creator_nft from '../../src/assets/Fanfare_Creator_NFT.png';
import content1 from '../../src/assets/gold.png';
import content2 from '../../src/assets/silver.png';
import profile from '../../src/assets/profile.png';
import { constants } from 'ethers';
import {
  useContract,
  useSigner,
  useProvider,
  useAccount,
  useConnect,
} from 'wagmi';
import {
  Creator_Contract_address,
  Creator_Contract_ABI,
  Content_ABI,
  Content_Contract_address,
  Subscription_Contract_ABI,
  Subscription_Contract_Address,
} from '../../utils/constants';
import CreatePost from './CreatePost';
import ethers, { utils } from 'ethers';

import Loading from './Loader';

export default function Creator() {
  const [isCreator, setIsCreator] = useState(false);
  const [creator, setCreator] = useState({});
  const [id, setId] = useState(0);
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [subscribers, setSubscribers] = useState(0);

  const Creator_contract = useContract({
    addressOrName: Creator_Contract_address,
    contractInterface: Creator_Contract_ABI,
    signerOrProvider: signer || provider,
  });

  const Content_contract = useContract({
    addressOrName: Content_Contract_address,
    contractInterface: Content_ABI,
    signerOrProvider: signer || provider,
  });

  const Subscription_contract = useContract({
    addressOrName: Subscription_Contract_Address,
    contractInterface: Subscription_Contract_ABI,
    signerOrProvider: signer || provider,
  });

  /// Check for creator if the user is one or Not , and accordingly render the Data
  const checkCreator = async () => {
    try {
      setIsLoading(true);
      console.log('Checking if Creator or Not');
      const check = await Creator_contract.checkStatus(address);
      console.log(check);
      // fetch the value from the fetch
      setIsCreator(check);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  /// fetch the creator data and ipfs CID from the Creator Contract
  const fetchCreator = async () => {
    try {
      setIsLoading(true);
      setMessage('loading data');
      console.log('Fetching Creator Id');
      const response = await Creator_contract.getId(address);
      const id = parseInt(response._hex);
      // separate the id value from value
      console.log(id);
      setId(id);
      const _data = await Subscription_contract.getSubscribers(id);
      const _subscribers = parseInt(_data._hex);
      console.log(_subscribers);
      setSubscribers(_subscribers);
      console.log('Fetching Creators details');
      const data = await Creator_contract.fetchCreators(id);
      console.log(data);
      // set the Data(ipfs URI) part to creator Details
      // set the Balance of the user to the balance
      setCreator(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /// fetch the data from the CID from IFPS for both type of datas
  const fetchIPFS = async (_cid) => {
    console.log('fetching the files');
    // const _cid = "bafkreifxtpdf5lcmkqjqmpe4wjgfl4rbov23ryn5merejridxk27pfzufq";
    const data = await GetData(_cid);
    console.log(data);

    /// get the json and use that json for further processing of the data
    /// {name , description(bio) , image (pfp), }
  };

  /// Fetching the Ipfs CID array from the content contract for the creator
  const fetchContent = async (_id) => {
    try {
      console.log('Fetching content for the creator');
      const response = await Content_contract.getContent(_id);
      /// we get the array of IPFS strings , need to render the data from that link on the page
      const content = [];
      console.log('Data fetched');
    } catch (error) {
      console.log(error);
    }
  };

  const Withdraw = async () => {
    try {
      /// accepts the ID of the Creator to be able to
      console.log('Withdrawing balance from the contract...');
      const tx = await Subscription_contract.withdraw(id);
      await tx.wait();
      console.log('Amount Withdrawn to the creator account');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkCreator();
    if (isCreator) {
      fetchCreator();
    }
  }, [isCreator]);

  return (
    <>
      {!isLoading ? (
        <div className={`${styles.explore}`}>
          <h1 className={styles.section_heading}>Creator Account Details</h1>
          <div className={`${styles.creator_section}`}>
            <div className={styles.account_details}>
              {/* <div className={styles.profile_image}>
              <Image src={profile} />
            </div> */}
              <div className={styles.wallet_details}>
                <h2>Wallet Details</h2>
                <h3>Address: </h3>
                <p className={styles.address}>{creator.creatorAddress}</p>
                <h3>Balance:</h3>
                <p>
                  {creator.balance
                    ? utils.formatEther(parseInt(creator.balance._hex))
                    : 0}{' '}
                  MATIC
                </p>
                <h3>Subscribers : {subscribers}</h3>
                <div>
                  <button onClick={Withdraw} className={styles.explore_btn}>
                    Withdraw
                  </button>
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
              {/* <div className={styles.content}>
              <Image src={content1} />
            </div>
            <div className={styles.content}>
              <Image src={content2} />
            </div> */}
              <CreatePost Id={id} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.fullScreen}>
            <Loading _loading={isLoading} _message={message} />
          </div>
        </>
      )}
    </>
  );
}
