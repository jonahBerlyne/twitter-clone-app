import React from 'react';
import "../Styles/Sidebar.css";
import { Avatar } from "@mui/material";

export default function Sidebar() {
  return (
    <div className='sidebar'>

      <div className="sidebar-top">
        <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
        <Avatar className='sidebar-avatar' />
        <h2>Name</h2>
        <h4>@username</h4>
      </div>
      
    </div>
  )
}