
import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import ShortProfile from '../Profile/ShortProfile';


function Sidebar(props) {
  //const user=useSelector(selectUser);
  const dispatch = useDispatch();
  
  let user=props.user;
  console.log('***********',props.user.following);
  // useEffect(()=>{
    
  //     fetch('/getfollowing')
  //     .then(data=>data.json())
  //     .then(data=>{
  //       setFollowing(data.following);
  //     })

  // }
        

  // ,[user]); 
   
  
  const profileShow = (e) => {
    console.log('gupta', e.target.name);
    History.push('/profile/' + e.target.name);
  }


  const recentItem= (topic)=>{
      return (<div className="sidebar_recentItem">
          <span className="badge badge-pill badge-light">
          # {topic}
          </span>
      </div>)
  };
  
    return (
        <div className="sidebar">
          <div className="sidebar_Top">
            <div className="sidebar_top">
              <div className="sidebar_avatar">
                { <Avatar >{user&&user.email&&user.email.charAt(0)} </Avatar> }
                </div>
                <h2>{user&&user.username}</h2>
                <h4>{user&&user.qualifications}</h4>
                <div className="globalRating">
                    <div className="internalRating">Gyandaan Rating</div>
                    <div className="internalRating">
                      {user&&user.globalRating}
                      <span class="fa fa-star checked"></span>
                    </div>
                  </div>
            </div>
           
           
            <div className="sidebar_stats">
              <div className="sidebar_stat">
               {user&&user.isTeacher&&
                <p><span class="badge badge-warning" style={{fontSize:"15px"}}>Teacher</span></p>
              
               }
                
              </div>


              <div className="sidebar_stat">
               
                <div className="stat">
                <p><span class="badge badge-pill badge-secondary">Followers</span></p>
                
                <p className="sidebar_statNumber">{user&&user.followers&&user.followers.length}</p>
                
                </div>
                <div className="stat">
                <p ><span class="badge badge-pill badge-secondary">Following</span></p>
                <p className="sidebar_statNumber">{user&&user.following&&user.following.length}</p>
              
                </div>
                </div>

            </div>
            </div>
        <div className="sidebar_bottom">
            <p>Skills</p>
            {
              user&&user.areasOfInterest&&user.areasOfInterest.length>0&&user.areasOfInterest.map(interest=> (interest.isSelected&&recentItem(interest.skill)))

            }
           
            {/* {recentItem('reactjs')}
            {recentItem('programming')}
            {recentItem('design')}
            {recentItem('developer')}
            */}
            
        </div>

        <div className="sidebar_bottom">
            <p>Following</p>
            {
             user&&user.following&& user.following.map(user=><ShortProfile
                user={user}
              />)
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
