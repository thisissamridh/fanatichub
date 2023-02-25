import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styles from '../../styles/Profile.module.css';
import banner from '../../src/assets/profilebanner.gif';
import profile from '../../src/assets/samridh.jpg';
import Image from 'next/image';
import paperplane from '../../src/assets/paper-plane.png';
import spaceship from '../../src/assets/space-ship.png';
import plane from '../../src/assets/plane.png';
import PlanCard from '../../src/components/PlanCard';
import {
  Creator_Contract_ABI,
  Creator_Contract_address,
  Content_ABI,
  Content_Contract_address,
} from '../../utils/constants';
import { useContract, useProvider } from 'wagmi';
// import { getRecord } from "../../src/components/ceramic";
import { useState, useEffect } from 'react';
import RenderPost from '../../src/components/RenderPost';
import CreatePost from '../../src/components/CreatePost';

import Loading from '../../src/components/Loader';

export default function Creator() {
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [ipfs, setIpfs] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const [newPost, setNewPost] = useState(false);

  function createNewPost() {
    setNewPost(!newPost);
    // console.log(openForm);
  }

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  const provider = useProvider();

  const Creator_contract = useContract({
    addressOrName: Creator_Contract_address,
    contractInterface: Creator_Contract_ABI,
    signerOrProvider: provider,
  });

  // fetch the posts from the contract
  const Content_contract = useContract({
    addressOrName: Content_Contract_address,
    contractInterface: Content_ABI,
    signerOrProvider: provider,
  });

  useEffect(() => {
    if (id) {
      fetchCreator(id);
      fetchPosts(id);
    }
  }, [id]);

  const fetchCreator = async (_id) => {
    try {
      setIsLoading(true);
      setMessage('Fetching the data from the contract and IPFS');
      const creator = await Creator_contract.fetchCreators(_id);
      console.log(creator);
      const Userdata = await fetchIPFS(creator.userData);
      console.log(Userdata);
      const parsedData = {
        Id: _id,
        Name: Userdata.name,
        Description: Userdata.description,
        Image: Userdata.pfp,
        Title: Userdata.title,
      };
      setAddress(creator.creatorAddress);
      setIpfs(creator.userData);
      console.log(parsedData);
      setData(parsedData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /// fetch the User data from the URL stored in the contract from IFPS
  const fetchPost = async (_url, _key) => {
    console.log('fetching the files');
    const response = await fetch(_url);
    const data = await response.json();
    const parsedData = {
      Id: _key,
      Description: data.Description,
      Media: data.Content,
    };
    // console.log(parsedData);
    return parsedData;
    /// {name , description(bio) , image (pfp), title } --> User profile
  };

  const fetchPosts = async (_id) => {
    try {
      setIsLoading(true);

      console.log('Fetching the Content from the Content Contract ...');
      const responses = await Content_contract.getContent(_id);
      console.log(responses);
      /// response is a array of IPFS URI
      const promises = [];
      responses.map((response, key) => {
        const postPromise = fetchPost(response, key);
        promises.push(postPromise);
      });
      const _posts = await Promise.all(promises);
      console.log(_posts, 'hello');
      setPosts(_posts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  /// fetch the User data from the URL stored in the contract from IFPS
  const fetchIPFS = async (_url) => {
    console.log('fetching the files');
    console.log(_url);
    const response = await fetch(_url);
    const data = await response.json();
    return data;
    /// {name , description(bio) , image (pfp), title } --> User profile
  };

  let dataObj = {
    image: profile,
    name: 'samridh singh',
    title: 'Frontend Developer',
    bio: 'Lorem ipsum had a funny talk about rendering data. Both tried so hard to finish the project and submit a functional project in hackathon. ',
    content: profile,
  };

  /// error in rendering the image with data.image , check and solve

  return (
    <>
      {!isLoading ? (
        <div className={styles.main}>
          <div className={styles.user}>
            <div className={styles.banner}>
              <Image className={styles.bannerimg} src={banner} />
            </div>
            <div className={styles.profile}>
              <Image
                className={styles.profileimg}
                src={data.Image ? data.Image : dataObj.image}
                alt="creator profile picture"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className={styles.textContent}>
            <h1>{data.Name}</h1>
            <p className={styles.cardText}>{data.Title}</p>
            <p className={styles.about}>{data.Description}</p>
          </div>
          <h1 className={styles.heading}>Subscribe</h1>
          <div className={styles.container}>
            <div>
              <PlanCard
                planId={'0'}
                creatorId={data.Id}
                month={'1 Month'}
                name={'Silver'}
                amount={'0.2 Matic '}
                perks1={'Exclusie Content'}
                perks2={'Membership NFT'}
                perks3={''}
                img={paperplane}
              />
            </div>
            <div>
              <PlanCard
                planId={'1'}
                creatorId={data.Id}
                month={'3 Months'}
                name={'Gold'}
                amount={'0.5 Matic '}
                perks1={'Silver Plan Benifits'}
                perks2={'Personalized NFT from Creator'}
                perks3={'Token Rewards'}
                img={spaceship}
              />
            </div>
            <div>
              <PlanCard
                planId={'2'}
                creatorId={data.Id}
                month={'6 Months'}
                name={'Platinum'}
                amount={'1 Matic '}
                perks1={'Gold Plan Benifits'}
                perks2={'Private Chat Access'}
                perks3={'1-1 Meet with Creator'}
                img={plane}
              />
            </div>
          </div>

          <h1 className={styles.heading}>Published Posts</h1>
          {/* /// render content from the ipfs data.content , this will just throw a
      IPFS link */}

          <div className={styles.container}>
            {posts ? (
              posts.map((post) => {
                return (
                  <div className={styles.post} key={post.Id}>
                    <RenderPost content={post.Description} media={post.Media} />
                  </div>
                );
              })
            ) : (
              <a>No posts present</a>
            )}
            {/* <div className={styles.post}>
          <RenderPost
            content={`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          perferendis praesentium, doloribus fugit delectus itaque a ex porro
          perspiciatis! Ipsa iusto optio hic ad quaerat voluptas laudanium ea
          itaque! Aspernatur.`}
          />
        </div>
        <div className={styles.post}>
          <RenderPost
            content={`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          perferendis praesentium, doloribus fugit delectus itaque a ex porro
          perspiciatis! Ipsa iusto optio hic ad quaerat voluptas laudantium ea
          itaque! Aspernatur.`}
          />
        </div> */}
          </div>
          {/* <div id="profile-banner-image">
        <img
          src="https://imagizer.imageshack.com/img921/9628/VIaL8H.jpg"
          alt="Banner image"
        />
      </div> */}
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
