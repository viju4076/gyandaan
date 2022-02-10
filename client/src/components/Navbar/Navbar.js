/* eslint-disable no-lone-blocks */
import { Avatar } from '@material-ui/core';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { GET_PROFILE, UPDATE_USER } from "../../actions/types";
import { IS_USER_LOGGED_IN, SET_USER_ID } from "../../actions/types";
import { useSelector, useDispatch } from "react-redux";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useHistory } from "react-router-dom";
import Searchbar from "./Searchbar";
//import { BrowserRouter as router , Route, Link, NavLink, Switch} from "react-router-dom";
//import { NavLink } from "react-router-dom";
import { NavLink, Router } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

import Modal from "../addteacher/modal.js";



const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const History = useHistory();
  const dispatch = useDispatch();
  
  const [updatedUser, setUpdatedUser] = useState(null);
  
 


  useEffect(()=>{
    // let x=;
    fetch('/profile/userkiprofile')
    .then(data => data.json())
    .then(data => {
   
        if (data.status == 200) {
          console.log("**********************",data.user);
             setUpdatedUser(data.user);
            
        }
    })

     
<<<<<<< HEAD
    
    var rect = document.querySelector(".searchbar").getClientRects()[0];
    var list=document.querySelector(".list-group");
    list.style.left = rect.x + "px";
    list.style.width = rect.width + "px";
    console.log(list.getClientRects());
=======
    console.log("dom eleemntsfsafsadfsf",);
    // // var rect1 = document.querySelector(".linkList").getClientRects()[0].getBoundingClientRect();
    // // console.log("ggggggggggg",rect1);
    // var rect = document.querySelector(".searchbar").getClientRects()[0];
    // // rect1.style.left = 280+ "px";

    // var list=document.querySelector(".list-group");
    // // console.log("ffffffffffffffffffffffffffff",rect);
    // //  list.style.left = rect.left+ "px";
    //  list.style.width = rect.width + "px";
    // console.log("jjjjjjjjjjj",list.getClientRects());
>>>>>>> df386ce82c354c49f0be22846f8465414220ad41
  },[])


  const isUserLoggedIn = useSelector((state) => state.signup.is_user_logged_in);
  const handleJoin = () => {
    window.location.replace("/");
}
  const handleLogin=()=>{
    window.location.replace("/login");
  }
 const handleProfile=()=>{
   window.location.replace("/myProfile");
 }
  async function Addteacher() {
    {
      var res = await fetch("/addteacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      res = await res.json();
      setUpdatedUser(res.updatedUser);
      console.log(res.status);
      console.log("New user data ", res.updatedUser);
      if (res.status === "400" || !res.updatedUser) {
        window.alert("Cannot be added as a teacher");
      } else {
        window.alert("Added teacher successfully");
        dispatch({
          type: UPDATE_USER,
          payload: {
            update_user: res.updatedUser,
          },
        });

        //History.push("/home");
      }
    }
  }
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const handleLogout = (e) => {
    console.log("Button clicked");
    fetch("/logout").then((data) => {
      console.log(data.status);
      if (data.status == 200) {
        console.log("Logged out");
        dispatch({ type: IS_USER_LOGGED_IN, payload: false });
        dispatch({ type: GET_PROFILE, payload: false });
        // dispatch({type:SET_USER_ID,payload: data.userId});
        History.push("/login");
      }
    });
  };
  return (
    <div>
      <nav className="main-nav">
        {}

        <div className="logo" onClick={handleJoin} data-toggle="tooltip" title="Go to Home">
          <h2>
            <span>G</span>yaan
            <span>D</span>aan
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul className="linkList">
            <li>
               <div>
                <Searchbar/>
               </div>
              
            </li>
                        <li>
             <NavLink
                to="/classes"
                className="main-navbar"
                activeClassName="main-nav-active"
              >
             Classes
             </NavLink>
            </li>
           <li>
             <div style={{width:"100px", display:"flex", alignItems:"center",flexDirection:"column",marginTop:"5px"}}>
           <i class="fa fa-bell" style={{color:"blue", fontSize:"x-large"}}></i>
           <span style={{fontSize:"12px"}}>Notifications</span>
           </div>
           </li>
            
           <li>
            {updatedUser? <> <div className="navbarAvatar">
              {updatedUser.avataar?<Avatar src={updatedUser.avataar.link} />:<Avatar>{updatedUser.email && updatedUser.email.charAt(0)} </Avatar>}
          </div>
           <li class="nav-item dropdown navbarDropDown">  
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         
        </a>
        
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" onClick={handleProfile}>My Profile</a>
          <a class="dropdown-item"  >Followers</a>
          <a class="dropdown-item"  >Following</a>
          <a class="dropdown-item" onClick={handleLogout} >Logout</a>
          
        </div>
      </li>
         </>
             
              :<li onClick={handleLogin} className="logoutbtn">
                Login 
             
            </li>
            }
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}

      </nav>
    </div>
  );
};

export default Navbar;
