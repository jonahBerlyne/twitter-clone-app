import React from 'react';
import "../Styles/Trends.css";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function Trends() {
  return (
    <div className='trends'>

      <div className="search-container">
        <input type="search" className='search' readOnly placeholder='Search Twitter' />
        <Search className="search-icon" />
      </div>

    </div>
  );
}