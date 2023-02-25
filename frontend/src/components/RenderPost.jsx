import React from 'react';
import styles from './Post.module.css';
import Image from 'next/image';

export default function RenderPost(props) {
  /// render Image of the post from props.media
  return (
    <>
      <div className={styles.render_post}>
        <h2>Post #1</h2>
        <hr className={styles.line} />
        <p>{props.content}</p>
        <img
          className={styles.render_media}
          //   height={"400px"}
          //   width={"auto"}
          src={props.media}
          alt="Banner image"
        />
        {/* <button className={styles.create_post_btn} type="button"> */}
        {/* <a
          text={"Hi checkout User profile on FanFare"}
          rel="noopener noreferrer"
          className={styles.create_post_btn}
          href="https://twitter.com/intent/tweet"
          data-size="large"
          data-text="custom share text"
          data-url="https://dev.twitter.com/web/tweet-button"
          data-hashtags="example,demo"
          data-via="twitterdev"
          data-related="twitterapi,twitter"
        >
          Share on Twitter
        </a> */}
        {/* </button> */}
      </div>
    </>
  );
}
