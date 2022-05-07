import React from 'react';
import "../../Styles/Sidebar.css";

interface Option {
 icon: any;
 onClick: (() => Promise<any>) | undefined;
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