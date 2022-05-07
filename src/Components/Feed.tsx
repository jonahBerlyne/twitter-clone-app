import React from 'react';
import "../Styles/Feed.css";
import { Create } from "@mui/icons-material";
import { Avatar } from "@mui/material";

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
    </div>
  )
}