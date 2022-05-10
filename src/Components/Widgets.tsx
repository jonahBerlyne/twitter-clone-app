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
      </div>

    </div>
  );
}