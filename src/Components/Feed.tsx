import React from 'react';
import "../Styles/Feed.css";
import { Create } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Tweet from "./Tweet";

export default function Feed() {
  return (
    <div className="feed">

      <h2 className='feed-header'>Home</h2>

      <div className="feed-inputContainer">
        <div className="feed-input">
          <Avatar style={{ height: "50px", width: "50px" }} />
          <form>
            <input type="text" placeholder="What's happening?" />
            <button type="submit" className="btn btn-primary tweet-btn">Tweet</button>
          </form>
        </div>
      </div>

      <Tweet name="Name" photoUrl='' tweet="This is a test tweet." username="username" />
    </div>
  );
}