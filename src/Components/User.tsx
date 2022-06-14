import React from 'react';
import "../Styles/User.css";
import { Avatar } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { UserInfo } from "../Pages/HomePage";

export default function User({ name, photoUrl, showFollowBtn, testId, username }: UserInfo) {
  return (
    <div className="user-profile">
      <Avatar src={photoUrl} alt={username} />
      <div className="user-profile-name">
        <p data-testid={`name-${testId}`} className='name-display'>{name}</p>
        <p data-testid={`username-${testId}`} className="username-display">@{username}</p>
      </div>
      {showFollowBtn ? 
        <button data-testid={`followBtn-${testId}`} className='btn btn-dark follow-btn'>Follow</button> : 
        <MoreHoriz style={{ cursor: "pointer", marginTop: "-2px" }} />
      }
    </div>
  );
}