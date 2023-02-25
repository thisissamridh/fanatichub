import React, { useState } from 'react';
import logo from '../assets/logof.png';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import twitter from '../assets/twitter.svg';
import Button from './Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  return (
    <nav className={styles.nav}>
      <div className={styles.hamMenu}>
        <div className={styles.logo}>
          <Link href={'/'}>
            <a>
              <Image src={logo}></Image>
            </a>
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
              console.log(isNavExpanded);
            }}
            className={styles.hamBtn}
          >
            {isNavExpanded ? '☰' : '✖'}
          </button>
        </div>
      </div>

      <div
        className={` ${styles.menu} ${
          isNavExpanded ? styles.displayMenu : 'list'
        }`}
      >
        <ul className={`${styles.navLeft} ${styles.list}`}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/explore">
              <a>Creators</a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>

          <li>
            <Link href="/account">
              <a>Account</a>
            </Link>
          </li>

          <li>
            <Link href="/team">
              <a>Team</a>
            </Link>
          </li>

          <li className={styles.hide}>
            <a
              href="https://twitter.com/fanfare_xyz"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={twitter} />
            </a>
          </li>
          <li className={styles.hide}>
            <span className={styles.connect_btn}>
              <ConnectButton />
            </span>
          </li>
        </ul>
      </div>

      <div className={`${styles.show} ${styles.navRight}`}>
        <a
          href="https://twitter.com/fanfare_xyz"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={twitter} />
        </a>
        <span className={`${styles.show} ${styles.connect_btn}`}>
          <ConnectButton />
        </span>
      </div>
    </nav>
  );
}
