import React from 'react';
import "../Styles/Trend.css";
import { MoreHoriz } from "@mui/icons-material";

interface TrendInterface {
 trendTopic: string;
 trendRelevance: string;
 trending: string;
 trendBody?: string;
 trendFooter?: string;
 trendingWith1?: string;
 trendingWith2?: string;
 trendPhotoUrl?: string;
};

export default function Trend({ trendTopic, trendRelevance, trending, trendBody, trendFooter, trendingWith1, trendingWith2, trendPhotoUrl }: TrendInterface) {
  return (
    <div className="trend-container">

     <div className="trend-text">
      <div className="trend-header">
       <p>{trendTopic} · {trendRelevance} {!trendPhotoUrl && <MoreHoriz className="trend-dots" />}</p> 
      </div>
      <div className="trend">
       <p className="trending">{trending}</p>
       {trendBody && <p className="trend-body">{trendBody}</p>}
      </div>
      {trendFooter && <p className="trend-footer">{trendFooter}</p>}
      {trendingWith1 && trendingWith2 && 
      <p className="trending-with">Trending with <a className='trending-with-link' href="#">{trendingWith1}</a>, <a className='trending-with-link' href="#"> {trendingWith2}</a></p>}
     </div>

     {trendPhotoUrl && <img src={trendPhotoUrl} alt={trending} height={100} width={100} />}
    </div>
  );
}