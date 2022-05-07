import React from 'react';
import "../../Styles/Sidebar.css";
import { Avatar } from "@mui/material";
import SidebarOption from './SidebarOption';
import { MoreHoriz, Home, Tag, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity, ExitToApp } from "@mui/icons-material";

export default function Sidebar() {
  return (
    <div className='sidebar'>

      <div className="sidebar-top">
        <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
        <Avatar className='sidebar-avatar' />
        <h2>Name</h2>
        <h4>@username</h4>
        <MoreHoriz />
      </div>

      <div className="sidebar-bottom">
        <SidebarOption icon={<Home />} title="Home" />
        <SidebarOption icon={<Tag />} title="Explore" />
        <SidebarOption icon={<NotificationsNone />} title="Notifications" />
        <SidebarOption icon={<MailOutline />} title="Messages" />
        <SidebarOption icon={<BookmarkBorder />} title="Bookmarks" />
        <SidebarOption icon={<ListAlt />} title="Lists" />
        <SidebarOption icon={<PermIdentity />} title="Profile" />
        <SidebarOption icon={<ExitToApp />} title="Sign Out" />
      </div>

    </div>
  )
}