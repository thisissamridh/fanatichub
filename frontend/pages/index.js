import Head from 'next/head';
import Image from 'next/image';
import Card from '../src/components/Card';
import Navbar from '../src/components/Navbar';
import styles from '../styles/Home.module.css';
import music from '../src/assets/music.gif';
import nft from '../src/assets/nft.gif';
import creator from '../src/assets/creator.gif';
import artist from '../src/assets/artist.gif';
import paperplane from '../src/assets/paper-plane.png';
import spaceship from '../src/assets/space-ship.png';
import plane from '../src/assets/plane.png';
import banner from '../src/assets/banner.png';
import Hover from 'react-3d-hover';
import Link from 'next/link';
import ipfs from '../src/assets/ipfs.png';
import ceramic from '../src/assets/ceramic.png';
import valist from '../src/assets/valist.png';
import spheron from '../src/assets/spheron.svg';
import web3storage from '../src/assets/web3storage.svg';
import polygon from '../src/assets/polygon.svg';
import Footer from '../src/components/Footer';
import PlanCard from '../src/components/PlanCard';
import Button from '../src/components/Button';
import { Owner_address } from '../utils/constants';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>FanFare</h1>
          <span className={styles.banner}>
            <Image src={banner} />
          </span>
          <span className={styles.tagline}>
            Subscribe and support your favorite creators and get access to
            exclusive content
          </span>

          <Link href={'/explore'}>
            <button className={styles.explore_btn}> Explore </button>
          </Link>
        </main>
      </div>

      <div className={styles.container}>
        <div className={styles.category}>
          <h1 className={styles.section_heading}>Explore among categories</h1>
          <div className={styles.categories_cards}>
            <Hover scale={1} perspective={900} speed={500}>
              <Card
                img={music}
                heading={'Music Artists'}
                matter={
                  'Support your favorite music creators and pay only for what you listen to 🤩 '
                }
              />
            </Hover>

            <Hover scale={1} perspective={900} speed={500}>
              <Card
                img={artist}
                heading={'Digital Creators'}
                matter={
                  'Access and collect digital arts from creators around the world 😇'
                }
              />
            </Hover>
            <Hover scale={1} perspective={900} speed={500}>
              <Card
                img={nft}
                heading={'NFT Artists'}
                matter={
                  'Mint NFTs from your favorite projects and artists by only paying once 🫣'
                }
              />
            </Hover>
            <Hover scale={1} perspective={900} speed={500}>
              <Card
                img={creator}
                heading={'Video Creators'}
                matter={
                  'Support your favorite video creators and get access to special content every month 😘	'
                }
              />
            </Hover>
          </div>
        </div>
      </div>
      <div className={styles.plans}>
        <h1 className={styles.section_heading}>Choose across 3 plans </h1>
        <div className={styles.plan_cards}>
          <Hover scale={1} perspective={900} speed={500}>
            <div className={`${styles.plan_card} ${styles.shadow}`}>
              <div className={`${styles.card_content}`}>
                <h2>Silver</h2>
                <br />
                <div className={styles.card_img}>
                  <Image src={paperplane} alt="" />
                </div>
                <br />
                <h3>1 Month</h3>
                <p>0.2 MATIC</p>
                <br />
                <div className={styles.plan_benefits}>
                  <h4>Benefits</h4>
                  <li>Exclusie Content</li>
                  <li>Membership NFT</li>
                </div>
              </div>
            </div>
          </Hover>
          <Hover scale={1} perspective={900} speed={500}>
            <div className={`${styles.plan_card} ${styles.shadow}`}>
              <div className={`${styles.card_content}`}>
                <h2>Gold</h2>
                <br />
                <div className={styles.card_img}>
                  <Image src={plane} alt="" />
                </div>
                <br />
                <h3>3 Month</h3>
                <p>0.5 MATIC</p>
                <br />
                <div className={styles.plan_benefits}>
                  <h4>Benefits</h4>
                  <li>Silver Plan Benifits</li>
                  <li>Personalized NFT from Creator</li>
                  <li>Token Rewards</li>
                </div>
              </div>
            </div>
          </Hover>
          <Hover scale={1} perspective={900} speed={500}>
            <div className={`${styles.plan_card} ${styles.shadow}`}>
              <div className={`${styles.card_content}`}>
                <h2>Platinum</h2>
                <br />
                <div className={styles.card_img}>
                  <Image src={spaceship} alt="" />
                </div>
                <br />
                <h3>6 Month</h3>
                <p>1.0 MATIC</p>
                <br />
                <div className={styles.plan_benefits}>
                  <h4>Benefits</h4>
                  <li>Gold Plan Benifits</li>
                  <li>Private Chat Access</li>
                  <li>1-1 Meet with Creator</li>
                </div>
              </div>
            </div>
          </Hover>
        </div>
      </div>

      <div className={styles.plans}>
        <h1 className={styles.section_heading}>Technologies Used</h1>

        <div className={styles.sponsor_images}>
          <div className={styles.sponsor}>
            <a
              href="https://polygon.technology"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={polygon} />
            </a>
          </div>
          <div className={`${styles.sponsor} ${styles.ipfs}`}>
            <a href="https://ipfs.io" target="_blank" rel="noreferrer">
              <Image src={ipfs} />
            </a>
          </div>
          <div className={styles.sponsor}>
            <a href="https://web3.storage/" target="_blank" rel="noreferrer">
              <Image src={web3storage} />
            </a>
            <p>Web3.Storage</p>
          </div>

          <div className={styles.sponsor}>
            <a href="https://spheron.network" target="_blank" rel="noreferrer">
              <Image src={spheron} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
