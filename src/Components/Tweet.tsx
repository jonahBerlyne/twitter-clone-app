import React from 'react';
import "../Styles/Tweet.css";
import { Avatar } from "@mui/material";

interface TweetInterface {
  name: string;
  photoUrl: string;
  tweet: string;
  username: string;
};

export default function Tweet({ name, photoUrl, tweet, username }: TweetInterface) {
  return (
    <div className='tweet'>

      <div className="tweet-header">
        <Avatar />
        <div className="tweet-info">
          <p>{name}</p>
          <p>@{username}</p>
        </div>
      </div>

      <div className="tweet-body">
        <p>{tweet}</p>
      </div>

    </div>
  );
}