import React ,{useEffect, useState} from 'react';
import { UPDATE_USER } from '../../actions/types';
import { useSelector, useDispatch } from "react-redux";
import Navbar from '../Navbar/Navbar';
import Sidebar from "../Sidebar";
import "./index.css";
function Home() {
    const [user, setUser]= useState({email: 'xyz'});
   const dispatch = useDispatch();
    useEffect(() => {
      fetch('/profile')
          .then(data =>data.json())
          .then(data=> {
              console.log('above if statement',data);
              if (data.status == 200) {
                   setUser(data.user);
                   dispatch({type:UPDATE_USER,payload: {
                        update_user:data.user
                    }});
                  
              }
          })
          
  
  },[]);
    return (
        <div>
             <Navbar/>
             <div className="external">
                <Sidebar  />
                <h1>home screen</h1> 
             </div>
        </div>
    )
}

export default Home
  