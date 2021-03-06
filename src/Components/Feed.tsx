import React, { useState, useEffect } from 'react';
import "../Styles/Feed.css";
import { Avatar, IconButton } from "@mui/material";
import { Form } from "react-bootstrap";
import Tweet from "./Tweet";
import fireDB, { auth } from "../firebaseConfig";
import { getAuth, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore"; 
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from "../Redux/userSlice";
import { AppDispatch, store } from "../Redux/store";
import { UserInfo } from "../Pages/HomePage";
import { ExitToApp } from '@mui/icons-material';

export default function Feed({ name, photoUrl, username }: UserInfo) {

  const [tweets, setTweets] = useState<any[]>([]);
  const [tweet, setTweet] = useState<string>("");

  const getTweets = () => {
    try {
      const q = query(collection(fireDB, "tweets"), orderBy("timestamp", "desc"));
      const unsub = onSnapshot(q, snapshot => {
        let tweetsArr: any[] = [];
        snapshot.docs.forEach(doc => {
          const tweetDoc = {
            ...doc.data(),
            id: doc.id
          };
          tweetsArr.push(tweetDoc);
        });
        setTweets(tweetsArr);
      });
      return unsub;
    } catch (err) {
      alert(`Tweet retrieval error: ${err}`);
    }
  }

  useEffect(() => {
    getTweets();
  }, []);

  const sendTweet = async (): Promise<any> => {
    try {
      const timestamp = serverTimestamp();
      const docRef = collection(fireDB, "tweets");
      const tweetDoc = {
        name,
        photoUrl,
        timestamp,
        tweet,
        uid: getAuth().currentUser?.uid,
        username
      };
      setTweet("");
      await addDoc(docRef, tweetDoc);
    } catch (err) {
      alert(`Tweeting error: ${err}`);
    }
  }

  const dispatch = useDispatch<AppDispatch>();

  const logOut = async (): Promise<any> => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (err) {
      alert(`Sign out error: ${err}`);
    }
  }

  return (
    <div className="feed">

      <h2 className='feed-header'>
        <img src="/Images/Twitter/twitterIcon.png" alt="Twitter Icon" />
        <p>Home</p>
        <IconButton onClick={() => logOut()}>
          <ExitToApp fontSize="large" />
        </IconButton>
      </h2>

      <div className="feed-inputContainer">
        <div className="feed-input">
          <div className="feed-input-left">
            <Avatar style={{ height: "50px", width: "50px" }} src={photoUrl} alt={username} />
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" data-testid="tweetBox" rows={3} cols={50} maxLength={140} size="lg" placeholder="What's happening?" value={tweet} onChange={e => setTweet(e.target.value)} className="feed-input-box" />
              </Form.Group>
            </Form>
          </div>
          <div className="feed-input-right">
            <button data-testid="tweetBtn" type="submit" className="btn btn-primary tweet-btn" onClick={sendTweet} disabled={tweet === ""}>Tweet</button>
          </div>
        </div>
        <div className="feed-border"></div>
      </div>

      {tweets.map(_tweet => {
          return (
            <div className={_tweet === tweets[tweets.length - 1] ? "first-tweet" : ""} key={_tweet.id}>
              <Tweet name={_tweet.name} photoUrl={_tweet.photoUrl} tweet={_tweet.tweet} tweetId={_tweet.id} uid={_tweet.uid} username={_tweet.username} />
            </div>
          );
        })
      }

    </div>
  );
}