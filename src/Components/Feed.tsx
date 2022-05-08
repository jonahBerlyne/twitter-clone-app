import React, { useState, useEffect } from 'react';
import "../Styles/Feed.css";
import { Avatar } from "@mui/material";
import Tweet from "./Tweet";
import fireDB, { auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore"; 

export default function Feed() {

  const [tweets, setTweets] = useState<any[]>([]);

  const [name, setName] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [tweet, setTweet] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const getTweets = async (): Promise<any> => {
    try {
      const q = query(collection(fireDB, "tweets"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      let tweetsArr: any[] = [];
      querySnapshot.forEach(doc => {
        const tweetDoc = {
          id: doc.id,
          data: doc.data(),
        };
        tweetsArr.push(tweetDoc);
        console.log(tweetsArr);
      });
      setTweets(tweetsArr);
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
      await addDoc(docRef, tweetDoc);
      alert("Tweet sent");
    } catch (err) {
      alert(`Tweeting error: ${err}`);
    }
  }

  return (
    <div className="feed">

      <h2 className='feed-header'>Home</h2>

      <div className="feed-inputContainer">
        <div className="feed-input">
          <Avatar style={{ height: "50px", width: "50px" }} />
          <form>
            <input type="text" placeholder="What's happening?" value={tweet} onChange={e => setTweet(e.target.value)}/>
            <button type="button" className="btn btn-primary tweet-btn" onClick={sendTweet}>Tweet</button>
          </form>
        </div>
      </div>

      {tweets.map(_tweet => {
        return (
          <Tweet id={_tweet.id} name={_tweet.data.name} photoUrl={_tweet.data.photoUrl} tweet={_tweet.data.tweet} username={_tweet.data.username} />
        );
      })}

    </div>
  );
}