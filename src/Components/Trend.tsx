import React from 'react';

interface TrendInterface {
 trendTopic: string;
 trendRelevance: string;
 trending: string;
 trendBody?: string;
 trendFooter?: string;
 trendPhotoUrl?: string;
};

export default function Trend({ trendTopic, trendRelevance, trending, trendBody, trendFooter, trendPhotoUrl }: TrendInterface) {
  return (
    <div className="trend-container">

     <div className="trend-text">
      <div className="trend-header">
       {trendTopic}
       {trendRelevance}
      </div>
      <div className="trend">
       <p className="trending">{trending}</p>
       {trendBody && <p className="trend-body">{trendBody}</p>}
      </div>
      {trendFooter && <p className="trend-footer">{trendFooter}</p>}
     </div>

     {trendPhotoUrl && <img src={trendPhotoUrl} alt={trending} />}
    </div>
  );
}