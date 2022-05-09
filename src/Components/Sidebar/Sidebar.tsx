import React from 'react';
import "../../Styles/Sidebar.css";
import { Avatar } from "@mui/material";
import SidebarOption from './SidebarOption';
import { MoreHoriz, Home, Tag, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity, ExitToApp } from "@mui/icons-material";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/userSlice';

export default function Sidebar() {

  const user: any = useSelector(selectUser);

  const logOut = async (): Promise<any> => {
    try {
      await signOut(auth);
    } catch (err) {
      alert(`Sign out error: ${err}`);
    }
  }

  return (
    <div className='sidebar'>

      <div className="sidebar-top">
        <img src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" alt="Twitter Icon" />
        <div className="sidebar-profile">
          <Avatar className='sidebar-avatar' />
          <div className="sidebar-profile-name">
            <p className='name-display'>{user.name}</p>
            <p className="username-display">@{user.username}</p>
          </div>
          <MoreHoriz style={{ cursor: "pointer", marginTop: "-2px" }} />
        </div>
      </div>

      <div className="sidebar-bottom">
        <SidebarOption icon={<Home />} onClick={undefined} title="Home" />
        <SidebarOption icon={<Tag />} onClick={undefined} title="Explore" />
        <SidebarOption icon={<NotificationsNone />} onClick={undefined} title="Notifications" />
        <SidebarOption icon={<MailOutline />} onClick={undefined} title="Messages" />
        <SidebarOption icon={<BookmarkBorder />} onClick={undefined} title="Bookmarks" />
        <SidebarOption icon={<ListAlt />} onClick={undefined} title="Lists" />
        <SidebarOption icon={<PermIdentity />} onClick={undefined} title="Profile" />
        <SidebarOption icon={<ExitToApp />} onClick={logOut} title="Sign Out" />
      </div>

    </div>
  );
}