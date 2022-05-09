import React, { useState, useEffect } from 'react';
import "../Styles/Feed.css";
import { Avatar } from "@mui/material";
import Tweet from "./Tweet";
import fireDB, { auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore"; 
import { useSelector } from 'react-redux';
import { selectUser } from "../Redux/userSlice";
import { store } from "../Redux/store";
import { UserInfo } from "../Pages/HomePage";

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
        username
      };
      setTweet("");
      await addDoc(docRef, tweetDoc);
    } catch (err) {
      alert(`Tweeting error: ${err}`);
    }
  }

  return (
    <div className="feed">

      <h2 className='feed-header'>Home</h2>

      <div className="feed-inputContainer">
        <div className="feed-input">
          <Avatar style={{ height: "50px", width: "50px" }} src={photoUrl} alt={username} />
          <form>
            <input type="text" placeholder="What's happening?" value={tweet} onChange={e => setTweet(e.target.value)}/>
            <button type="button" className="btn btn-primary tweet-btn" onClick={sendTweet}>Tweet</button>
          </form>
        </div>
      </div>

      {tweets.map(_tweet => {
        return (
          <Tweet key={_tweet.id} name={_tweet.name} photoUrl={_tweet.photoUrl} tweet={_tweet.tweet} username={_tweet.username} />
        );
      })}

    </div>
  );
}