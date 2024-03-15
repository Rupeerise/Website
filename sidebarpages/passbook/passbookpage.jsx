import React from 'react';
import Navbar from "../../boilerplates/navbar/navbar.jsx";
import Sidebar from "../../boilerplates/sidebar/sidebar.jsx";
import Passbooklisting from './passbooklisting.jsx';
import "./passbookpage.css";

export default function Passbookpage() {
  

  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      
      <div className='passbookpage-body'>
        <Passbooklisting />
      </div>
      
    </>
  )
}