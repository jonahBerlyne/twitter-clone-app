import React from 'react';
import "../Styles/Tweet.css";
import { Avatar } from "@mui/material";
import { ModeCommentOutlined, Repeat, FavoriteBorderOutlined } from "@mui/icons-material";

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
          <p className='tweet-info-name'>{name}</p>
          <p className="tweet-info-username">@{username}</p>
        </div>
      </div>

      <div className="tweet-body">
        <p>{tweet}</p>
      </div>

      <div className="tweet-btns">
        <div className="reply-btn">
          <ModeCommentOutlined />
        </div>
        <div className="retweet-btn">
          <Repeat />
        </div>
        <div className="like-btn">
          <FavoriteBorderOutlined />
        </div>
      </div>

    </div>
  );
}