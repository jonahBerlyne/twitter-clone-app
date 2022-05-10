import React from 'react';
import "../Styles/Widgets.css";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import Trend from "./Trend";

export default function Widgets() {
  return (
    <div className='widgets'>

      <div className="search-container">
        <input type="search" className='search' readOnly placeholder='Search Twitter' />
        <Search className="search-icon" />
      </div>

      <div className="trends-container">
        <p className="trends-header">What's happening</p>
        <Trend 
          trendTopic="Only on Twitter" trendRelevance="Trending" trending="#weekendvibe" 
          trendBody='Join the conversation to get your morning started in the right way.'
          trendFooter='25.8K Tweets'
          trendPhotoUrl='/sunRising.jpeg' 
        />
        <Trend 
          trendTopic="Sports"
          trendRelevance="4 hours ago"
          trending="Tom Brady"
          trendFooter='1,452 Tweets'
        />
        <Trend 
          trendTopic="Food"
          trendRelevance='12 hours ago'
          trending="National Pizza Day"
          trendFooter="10.6K Tweets"
        />
        <Trend 
          trendTopic="K-pop"
          trendRelevance="Trending"
          trending="BTS"
          trendBody="BTS unveils the tracklist for the third CD of their upcoming anthology album Proof"
          trendingWith1="STILL WITH You"
          trendingWith2="#PROOF_TRACKLIST3"
          trendPhotoUrl='/btsAlbum.jpeg'
        />
        <Trend 
          trendTopic="Science"
          trendRelevance='Trending'
          trending="Andromeda Galaxy"
          trendFooter="8,736 Tweets"
        />
      </div>

    </div>
  );
}