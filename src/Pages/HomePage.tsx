import React from 'react';
import "../Styles/Home.css";
import Sidebar from '../Components/Sidebar/Sidebar';
import Feed from "../Components/Feed";
import { useSelector } from "react-redux";
import { RootState } from '../Redux/store';

export default function HomePage() {

  const user = useSelector((state: RootState) => state.user.user);
  
  return (
    <div className='home'>
      <div className="app-body">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Trends */}
        {/* Widgets */}
      </div>
    </div>
  )
}