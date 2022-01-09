import React, { useState  } from "react";
import "./Navbar.css";
import { GET_PROFILE } from '../../actions/types';
import {
  IS_USER_LOGGED_IN,
  SET_USER_ID
} from '../../actions/types';
import { useSelector, useDispatch } from "react-redux";
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import SearchIcon from "@material-ui/icons/Search";
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {Link,useHistory} from "react-router-dom";
//import { BrowserRouter as router , Route, Link, NavLink, Switch} from "react-router-dom";
//import { NavLink } from "react-router-dom";
import { NavLink, Router } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";
const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [open,setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const History = useHistory();
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.signup.is_user_logged_in);
const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}
const handleLogout = e =>{
  console.log("Button clicked");
  fetch("/logout")
  .then(data=> {
    console.log(data.status);
      if (data.status == 200) {
        console.log("Logged out");
           dispatch({ type: IS_USER_LOGGED_IN, payload: false });
           dispatch({type: GET_PROFILE, payload: false});
          // dispatch({type:SET_USER_ID,payload: data.userId});
         
         
      }
  });
}
    return (
      <>
        <nav className="main-nav">
          {}

          <div className="logo">
            <h2>
              <span>G</span>yaan
              <span>D</span>aan
            </h2>
          </div>
  
          {/* 2nd menu part  */}
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }>
            <ul>
                <li>
                <input className="header__searchInput" type="text" />
                  <SearchIcon className="header__searchIcon" />
                </li>
                <li>
                <NavLink to="/contact" className="main-navbar" activeClassName="main-nav-active">Categories
                </NavLink>  
                </li>
                <li>
                <NavLink to="/addasteacher" className="main-navbar" activeClassName="main-nav-active">Add as teacher
                </NavLink>  
                </li>
              <li>
              <NavLink to="/contact" className="main-navbar" activeClassName="main-nav-active">Contact us
                </NavLink>
              </li>
            </ul>
          </div>
  
          {/* 3rd social media links */}
          <div className="social-media">
            <ul className="social-media-desktop">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100075450080489"
                  target="_thapa">
                  <FaFacebookSquare className="facebook" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ngochanakyapahal/"
                  target="_thapa">
                  <FaInstagramSquare className="instagram" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                  target="_thapa">
                  <FaYoutubeSquare className="youtube" />
                </a>
              </li>
              <li>
                <Button onClick = {handleLogout}> Logout </Button>
              </li>
            </ul>
  
            {/* hamburget menu start  */}
            <div className="hamburger-menu">
              <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <GiHamburgerMenu />
              </a>
            </div>
          </div>
        </nav>
      </>
    );
  };
  
  export default Navbar;