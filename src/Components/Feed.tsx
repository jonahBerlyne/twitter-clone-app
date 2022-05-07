import React, { useState, useEffect } from 'react';
import "../Styles/Feed.css";
import { Create } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Tweet from "./Tweet";

export default function Feed() {

  const [tweets, setTweets] = useState<any[]>([]);

  const [name, setName] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [tweet, setTweet] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const sendTweet = (e: any): void => {
    e.preventDefault();
    console.log("sent");
  }

  return (
    <div className="feed">

      <h2 className='feed-header'>Home</h2>

      <div className="feed-inputContainer">
        <div className="feed-input">
          <Avatar style={{ height: "50px", width: "50px" }} />
          <form>
            <input type="text" placeholder="What's happening?" />
            <button type="submit" className="btn btn-primary tweet-btn" onClick={sendTweet}>Tweet</button>
          </form>
        </div>
      </div>

      {tweets.map(_tweet => {
        return (
          <Tweet name={name} photoUrl={photoUrl} tweet={tweet} username={username} />
        );
      })}

    </div>
  );
}