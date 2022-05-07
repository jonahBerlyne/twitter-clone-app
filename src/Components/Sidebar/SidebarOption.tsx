import React from 'react';
import "../../Styles/Sidebar.css";

interface Option {
 icon: any;
 onClick: undefined | (() => Promise<any>);
 title: string;
};

export default function SidebarOption({ icon, onClick, title }: Option) {
  return (
   <div className="sidebar-option" onClick={onClick}>
     {icon}
     <h1>{title}</h1>
   </div>
  );
}