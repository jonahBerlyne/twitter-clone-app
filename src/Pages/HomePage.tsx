import React, { useState, useEffect } from 'react';
import "../Styles/Home.css";
import Sidebar from '../Components/Sidebar/Sidebar';
import Feed from "../Components/Feed";
import Widgets from "../Components/Widgets";
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/userSlice';

export default function HomePage() {

  const user: any = useSelector(selectUser);

  return (
    <div className='home'>
      <div className="app-body">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed 
          name={user?.name}
          photoUrl={user?.photoUrl}
          username={user?.username}
        />
        {/* Widgets */}
        <Widgets />
      </div>
    </div>
  );
}

export interface UserInfo {
  name: string;
  photoUrl: string;
  showFollowBtn?: boolean;
  testId?: number;
  username: string;
};