import React from 'react';
import styles from '../styles/Home.module.css';
import samridh from '../src/assets/samridh.jpg';
import ria from '../src/assets/ria.jpg';
import dakshi from '../src/assets/dakshi.jpg';

import Image from 'next/image';
import Button from '../src/components/Button';
import Link from 'next/link';

export default function team() {
  return (
    <>
      <div className={styles.explore}>
        <h1 className={styles.section_heading}>Team Members</h1>
        <div className={styles.team_section}>
          <span className={styles.team_member}>
            <div className={styles.member_pfp}>
              <Image className={styles.member_pfp} src={samridh} alt="" />
            </div>
            <h1 className={styles.memeber_name}>samridh singh</h1>
            <h3 className={styles.member_contribution}>Web3 developer</h3>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={'https://twitter.com/this_is_samridh'}
            >
              <Button title={'Twitter'} />
            </a>
          </span>
          <span className={styles.team_member}>
            <div className={styles.member_pfp}>
              <Image className={styles.member_pfp} src={dakshi} alt="" />
            </div>
            <h1 className={styles.memeber_name}>Dakshi Goel</h1>
            <h3 className={styles.member_contribution}>
              Full stack , ML engineer
            </h3>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={'https://twitter.com/#'}
            >
              <Button title={'Twitter'} />
            </a>
          </span>
          <span className={styles.team_member}>
            <div className={styles.member_pfp}>
              <Image className={styles.member_pfp} src={ria} alt="" />
            </div>
            <h1 className={styles.memeber_name}>Ria Batla</h1>
            <h3 className={styles.member_contribution}>
              {' '}
              Full stack Web developer
            </h3>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={'https://twitter.com/#'}
            >
              <Button title={'Twitter'} />
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
