
import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import "./index.css";


function Sidebar() {
  //const user=useSelector(selectUser);
  const dispatch = useDispatch();
  
  let user=useSelector(state=>state.user.update_user);
  
  useEffect(()=>{
         
  }
        

  ,[user]); 
   

  const recentItem= (topic)=>{
      return (<div className="sidebar_recentItem">
          <span className="sidebar_hash">
            #  
          </span>
          <p>{topic}</p>
      </div>)
  };
  
    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <img src="https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg" alt=""/>
                { <Avatar >{user&&user.email&&user.email.charAt(0)} </Avatar> }
                <h2>{user&&user.username}</h2>
                <h4>{user&&user.email}</h4>
            </div>
            <div className="sidebar_stats">
              <div className="sidebar_stat">
               {user&&user.isTeacher&&
                <p><span class="label label-primary">Teacher</span></p>
              
               }
                
              </div>
              <div className="sidebar_stat">
              <p>Views on post</p>
                <p className="sidebar_statNumber">2,234</p>
              </div>

            </div>
        <div className="sidebar_bottom">
            <p>Recent</p>
            {
              user&&user.areasOfInterest&&user.areasOfInterest.length>0&&user.areasOfInterest.map(interest=> (interest.isSelected&&recentItem(interest.skill)))

            }
            {
              recentItem(user&&user.qualifications)
            }
            {/* {recentItem('reactjs')}
            {recentItem('programming')}
            {recentItem('design')}
            {recentItem('developer')}
            */}
            
        </div>

        </div>
    )
}

export default Sidebar
