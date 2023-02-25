import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import github from '../assets/github.svg';
import twitter from '../assets/twitter.svg';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Link href="/team">© 2022 fanatic hub</Link>
        <a
          href="https://github.com/thisissamridh"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={github} />
        </a>
      </div>
    </footer>
  );
}
