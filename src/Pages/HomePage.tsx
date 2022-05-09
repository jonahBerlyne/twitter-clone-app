import React, { useState, useEffect } from 'react';
import "../Styles/Home.css";
import Sidebar from '../Components/Sidebar/Sidebar';
import Feed from "../Components/Feed";
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/userSlice';
import { store } from '../Redux/store';

export default function HomePage() {

  const user: any = useSelector(selectUser);

  console.log(store.getState());

  return (
    <div className='home'>
      <div className="app-body">
        {/* Sidebar */}
        <Sidebar 
          name={user?.name}
          photoUrl={user?.photoUrl}
          username={user?.username}
        />
        {/* Feed */}
        <Feed 
          name={user?.name}
          photoUrl={user?.photoUrl}
          username={user?.username}
        />
        {/* Trends */}
        {/* Widgets */}
      </div>
    </div>
  );
}

export interface UserInfo {
  name: string;
  photoUrl: string;
  username: string;
};