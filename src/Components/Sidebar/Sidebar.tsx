import React from 'react';
import "../../Styles/Sidebar.css";
import { Avatar } from "@mui/material";
import SidebarOption from './SidebarOption';
import { MoreHoriz, Home, Tag, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity, ExitToApp } from "@mui/icons-material";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { AppDispatch, store } from '../../Redux/store';
import { selectUser, logout } from '../../Redux/userSlice';
import { UserInfo } from "../../Pages/HomePage";

export default function Sidebar({ name, photoUrl, username }: UserInfo) {

  const dispatch = useDispatch<AppDispatch>();

  const logOut = async (): Promise<any> => {
    try {
      dispatch(logout());
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
          <Avatar className='sidebar-avatar' src={photoUrl} alt={username} />
          <div className="sidebar-profile-name">
            <p className='name-display'>{name}</p>
            <p className="username-display">@{username}</p>
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