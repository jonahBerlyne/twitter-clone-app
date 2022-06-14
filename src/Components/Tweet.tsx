import React, { useState, useEffect } from 'react';
import "../Styles/Tweet.css";
import { Avatar } from "@mui/material";
import { ModeCommentOutlined, Repeat, FavoriteBorderOutlined, DeleteOutlined } from "@mui/icons-material";
import { doc, deleteDoc } from "firebase/firestore";
import fireDB, { auth } from "../firebaseConfig";
import { getAuth } from 'firebase/auth';

interface TweetInterface {
  name: string;
  photoUrl: string;
  tweet: string;
  tweetId: string;
  uid: string;
  username: string;
};

export default function Tweet({ name, photoUrl, tweet, tweetId, uid, username }: TweetInterface) {

  const deleteTweet = async (): Promise<any> => {
    try {
      const docRef = doc(fireDB, "tweets", `${tweetId}`);
      await deleteDoc(docRef);
    } catch (err) {
      alert(`Tweet deletion error: ${err}`);
    }
  }

  return (
    <div className='tweet'>

      <div className="tweet-header">
        <Avatar src={photoUrl} alt={username} />
        <div className="tweet-info">
          <p data-testid={`name-${tweetId}`} className='tweet-info-name'>{name}</p>
          <p data-testid={`username-${tweetId}`} className="tweet-info-username">@{username}</p>
        </div>
      </div>

      <div className="tweet-body">
        <p data-testid={`tweet-${tweetId}`}>{tweet}</p>
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
        {uid === getAuth().currentUser?.uid && 
          <div data-testid={`deleteBtn-${tweetId}`} className="delete-btn" onClick={deleteTweet}>
            <DeleteOutlined />
          </div>
        }
      </div>

    </div>
  );
}