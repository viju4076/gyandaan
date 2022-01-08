import React from 'react'
import Navbar from '../Navbar/Navbar';
import Sidebar from "../Sidebar";
import "./index.css";
function index() {
    return (
        <div>
             <Navbar/>
             <div className="external">
                <Sidebar/>
                <h1>home screen</h1> 
             </div>
        </div>
    )
}

export default index
  