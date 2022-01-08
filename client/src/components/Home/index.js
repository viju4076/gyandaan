import React ,{useEffect, useState} from 'react';
import { GET_PROFILE } from '../../actions/types';
import { useSelector, useDispatch } from "react-redux";
import Navbar from '../Navbar/Navbar';
import Sidebar from "../Sidebar";
import "./index.css";
function Home() {
    const [user, setUser]= useState({email: 'xyz'});
    const dispatch = useDispatch();
    const getProfile = useSelector(state => state.getProfile.get_profile);
    useEffect(() => {
      fetch('/profile')
          .then(data =>data.json())
          .then(data=> {
              if (data.status == 200) {
                   setUser(data.user);
                  // dispatch({ type: IS_USER_LOGGED_IN, payload: true });
                   dispatch({type:GET_PROFILE,payload: true});
                  console.log(data.user);
              }
          });
          
  
  },[getProfile]);
    return (
        <div>
             <Navbar/>
             <div className="external">
                <Sidebar user= {user}/>
                <h1>home screen</h1> 
             </div>
        </div>
    )
}

export default Home
  