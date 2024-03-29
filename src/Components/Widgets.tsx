import React from 'react';
import "../Styles/Widgets.css";
import { Search } from "@mui/icons-material";
import Trend from "./Trend";
import User from "./User";

export default function Widgets() {

  return (
    <div className='widgets'>

      <div className="search-container">
        <input type="search" className='search' readOnly placeholder='Search Twitter' />
        <Search className="search-icon" />
      </div>

      <div className="trends-container">
        <p className="widget-header">What's happening</p>
        <Trend
          trendId={1} 
          trendTopic="Only on Twitter" trendRelevance="Trending" trending="#weekendvibe" 
          trendBody='Join the conversation to get your morning started in the right way.'
          trendFooter='25.8K Tweets'
          trendPhotoUrl='/Images/Trending/sunRising.jpeg' 
        />
        <Trend
          trendId={2} 
          trendTopic="Sports"
          trendRelevance="4 hours ago"
          trending="Tom Brady"
          trendFooter='1,452 Tweets'
        />
        <Trend 
          trendId={3}
          trendTopic="Food"
          trendRelevance='12 hours ago'
          trending="National Pizza Day"
          trendFooter="10.6K Tweets"
        />
        <Trend 
          trendId={4}
          trendTopic="K-pop"
          trendRelevance="Trending"
          trending="BTS"
          trendBody="BTS unveils the tracklist for the third CD of their upcoming anthology album Proof."
          trendingWith1="STILL WITH You"
          trendingWith2="#PROOF_TRACKLIST3"
          trendPhotoUrl='/Images/Trending/btsAlbum.jpeg'
        />
        <Trend 
          trendId={5}
          trendTopic="Science"
          trendRelevance='Trending'
          trending="Andromeda Galaxy"
          trendFooter="8,736 Tweets"
        />
      </div>

      <div className="follow-container">
        <p className="widget-header">Who to follow</p>
        <User 
          name="McDonald's"
          photoUrl="/Images/Burgers/mcdonalds.jpeg"
          showFollowBtn={true}
          testId={1}
          username="McDonalds"
        />
        <User 
          name="Burger King"
          photoUrl="/Images/Burgers/burgerKing.jpeg"
          showFollowBtn={true}
          testId={2}
          username="BurgerKing"
        />
        <User 
          name="Five Guys"
          photoUrl="/Images/Burgers/fiveGuys.jpeg"
          showFollowBtn={true}
          testId={3}
          username="FiveGuys"
        />
      </div>

      <div className="terms-container">
        <p data-testid="policies"><a href="#" className="terms-link">Terms of Service</a> <a href="#" className="terms-link">Privacy Policy</a> <a href="#" className="terms-link">Cookie Policy</a></p>

        <p data-testid="moreTerms"><a href="#" className="terms-link">Accessibility</a> <a href="#" className="terms-link">Ads info</a> <a href="#" className="terms-link">More</a></p>
        <p data-testid="twitterInc" className="twitter-inc">© 2022 Twitter, Inc.</p>
      </div>

    </div>
  );
}