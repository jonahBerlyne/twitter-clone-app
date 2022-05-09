import React from 'react';
import "../../Styles/Sidebar.css";
import { Auth } from "firebase/auth";

interface Option {
 icon: any;
 onClick: any;
 title: string;
};

export default function SidebarOption({ icon, onClick, title }: Option) {
  return (
   <div className="sidebar-option" onClick={onClick}>
     {icon}
     <p>{title}</p>
   </div>
  );
}