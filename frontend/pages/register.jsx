import React, { useState, useEffect } from 'react';
import Button from '../src/components/Button';
import Navbar from '../src/components/Navbar';
import styles from '../styles/Home.module.css';
import { ethers, utils } from 'ethers';
import { StoreContent } from '../src/components/StoreContent';
import {
  Creator_Contract_address,
  Creator_Contract_ABI,
  Content_ABI,
  Content_Contract_address,
} from '../utils/constants';

import {
  useContract,
  useSigner,
  useProvider,
  useAccount,
  useConnect,
} from 'wagmi';
import { StoreData } from '../src/components/StoreData';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Loading from '../src/components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const notify = (message) => toast(`${message}`);

  /// to set the Content Uploaded
  // const [content, setContent] = useState([]);
  // const [contentIpfs, setContentIpfs] = useState("");
  /// set the Profile picture set by the creator
  const [pfp, setPfp] = useState([]);
  const [pfpIpfs, setPfpIpfs] = useState([]);

  // sets the user Data we want to store earlier
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');

  const [ipfsData, setIpfsData] = useState('');

  /// show the ID with The Sharable link to the user
  const [id, setId] = useState(0);
  const [SharableLink, setSharableLink] = useState('');

  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

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

  const checkCreator = async () => {
    try {
      setIsLoading(true);
      console.log('Checking if Creator or Not');
      const check = await Creator_contract.checkStatus(address);
      console.log(check);
      // fetch the value from the fetch
      setIsCreator(check);
      if (check) {
        notify('You are already a creator');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      notify(error);
    }
  };

  /// to upload the pfp to the ipfs and get a hash --- working
  async function uploadPfp() {
    try {
      setIsLoading(true);
      setMessage('Profile uploading to IPFS ...');
      console.log('Profile uploading to IPFS ...');
      const CID = await StoreContent(pfp);
      const hash = `https://ipfs.io/ipfs/${CID}`;
      setPfpIpfs(hash);
      console.log(
        'Profile uploaded to IPFS successfully 🚀🚀  with CID : ',
        hash
      );
      setIsLoading(false);
      updateData(name, bio, title, hash, pfpIpfs);
    } catch (error) {
      console.log('Error uploading file: ', error);
      setIsLoading(false);
      notify(error);
    }
  }

  // to update all the data to ceramic
  const updateData = async (Name, Bio, Title, _PfpIpfs, _pfp) => {
    try {
      setIsLoading(true);
      setMessage('Updating data to the IPFS');
      console.log('Updating data to the IPFS');
      const CID = await StoreData(Name, Bio, Title, _PfpIpfs, _pfp);
      const hash = `https://ipfs.io/ipfs/${CID.ipnft}/metadata.json`;
      setIpfsData(hash);
      console.log(hash);
      console.log('Data uploaded 🚀🚀');
      setIsLoading(false);
      addCreator(address, hash);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      notify(err);
    }
  };

  /// function to add the creator to the contract with the details
  const addCreator = async (Address, IPFSdata) => {
    try {
      setIsLoading(true);
      setMessage('Adding creator profile to contract.....');
      console.log('Adding the Creator Profile ... ');
      const tx = await Creator_contract.addCreator(Address, IPFSdata);
      await tx.wait();
      console.log(tx);
      const ID = parseInt(tx.value._hex);
      console.log(ID);
      setId(ID);
      const link = `https://FanFareio.vercel.app/profile/${ID}`;
      console.log(link);
      setSharableLink(link);
      console.log('Creator Added and Profile added Successfully🚀🚀');
      // uploadContent(ID);
      setIsLoading(false);
      setIsUploaded(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      notify(err.message);
    }
  };

  /// to upload the content to ipfs --- working
  async function uploadContent(_id) {
    try {
      console.log('Uploading Content to IPFS ... ');
      console.log(content);
      const CID = await StoreContent(content);
      const hash = `https://ipfs.io/ipfs/${CID}`;
      setContentIpfs(hash);
      console.log(
        'Content uploaded to IPFS successfully 🚀🚀  with CID : ',
        hash
      );
      addContent(_id, hash);
      return true;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  /// function to add the creator to the contract with the details
  const addContent = async (_id, _hash) => {
    try {
      console.log(id);
      console.log('Adding the Content for the Creator... ');
      const tx = await Content_contract.addContent(_id, _hash);
      await tx.wait();
      console.log(tx.hash);
      console.log(tx);
      console.log('Content Added Successfully🚀🚀');
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isConnected) {
        setIsLoading(true);
        await uploadPfp();
        /// Uploading the updated data to IPFS
        ///  Add creator to the Contract
        /// Upload Content to IPFS
        /// Addcontent to the Contract
        setIsLoading(false);
      } else {
        notify('Connect your wallet');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isConnected) {
      notify('Wallet Connected');
      checkCreator();
    } else {
      notify('Connect your wallet to proceed');
    }
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      {!isLoading ? (
        <>
          {!isCreator ? (
            <>
              {!isUploaded ? (
                <div className={styles.explore}>
                  <h1 className={styles.section_heading}>Register</h1>
                  <div className={styles.register_section}>
                    <p>Please fill this form to register as creator.</p>
                    <hr />
                    <div>
                      <div className={styles.register_label}>
                        Profile Picture:{' '}
                      </div>
                      <input
                        className={styles.register_input}
                        type="file"
                        onChange={(e) => {
                          setPfp(e.target.files);
                          setPfpIpfs(e.target.files[0]);
                        }}
                      />
                      {/* {fileUrl && <img src={fileUrl} width="600px" />} */}

                      <div className={styles.register_label}>Full Name</div>
                      <input
                        className={styles.register_input}
                        placeholder="Creator Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <div className={styles.register_label}>Title</div>
                      <input
                        className={styles.register_input}
                        placeholder="Title Ex: NFT Artist"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className={styles.register_label}>
                      Describe your content{' '}
                      <span className={styles.small}>
                        {' '}
                        &#40;min 200 chars&#41;
                      </span>{' '}
                    </div>
                    <textarea
                      placeholder="Describe your work"
                      className={styles.register_input_about}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    {/* {fileUrl && <img src={fileUrl} width="600px" />} */}
                    <hr />
                    <button
                      className={styles.submit_btn}
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.fullScreen}>
                    <a>Form is Filled now</a>{' '}
                    <a href={SharableLink}>Share this link : {SharableLink}</a>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className={styles.fullScreen}>
                <a> You are Already a Creator</a>
              </div>
            </>
          )}
        </>
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
