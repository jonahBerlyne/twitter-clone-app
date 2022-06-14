import React from 'react';
import "../../Styles/Sidebar.css";
import SidebarOption from './SidebarOption';
import { Home, Tag, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity, ExitToApp } from "@mui/icons-material";
import { auth } from "../../firebaseConfig";
import { signOut, getAuth } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, store } from '../../Redux/store';
import { selectUser, logout } from '../../Redux/userSlice';
import User from "../User";

export default function Sidebar() {

  const user: any = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const logOut = async (): Promise<any> => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (err) {
      alert(`Sign out error: ${err}`);
    }
  }

  return (
    <div className='sidebar'>

      <img src="/Images/Twitter/twitterIcon.png" alt="Twitter Icon" />

      <div className="sidebar-options">
        <SidebarOption icon={<Home />} onClick={undefined} title="Home" />
        <SidebarOption icon={<Tag />} onClick={undefined} title="Explore" />
        <SidebarOption icon={<NotificationsNone />} onClick={undefined} title="Notifications" />
        <SidebarOption icon={<MailOutline />} onClick={undefined} title="Messages" />
        <SidebarOption icon={<BookmarkBorder />} onClick={undefined} title="Bookmarks" />
        <SidebarOption icon={<ListAlt />} onClick={undefined} title="Lists" />
        <SidebarOption icon={<PermIdentity />} onClick={undefined} title="Profile" />
        <SidebarOption icon={<ExitToApp />} onClick={logOut} title="Sign Out" />
      </div>

      <div className="sidebar-bottom">
        <User 
          name={user?.name}
          photoUrl={user?.photoUrl}
          showFollowBtn={false}
          testId={1}
          username={user?.username}
        />
      </div>
    </div>
  );
}