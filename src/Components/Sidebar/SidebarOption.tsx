import React from 'react';
import "../../Styles/Sidebar.css";

interface Option {
 icon: any;
 title: string;
};

export default function SidebarOption({ icon, title }: Option) {
  return (
   <div className="sidebar-option">
     {icon}
     <h1>{title}</h1>
   </div>
  );
}