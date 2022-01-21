
import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import ShortProfile from '../Profile/ShortProfile';


function Sidebar() {
  //const user=useSelector(selectUser);
  const dispatch = useDispatch();
  
  let user=useSelector(state=>state.user.update_user);
  const [follwing,setFollowing] = useState([]);
  useEffect(()=>{
    
      fetch('/getfollowing')
      .then(data=>data.json())
      .then(data=>{
        setFollowing(data.following);
      })

  }
        

  ,[user]); 
   
  
  const profileShow = (e) => {
    console.log('gupta', e.target.name);
    History.push('/profile/' + e.target.name);
  }


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
              <div className="sidebar_avatar">
                { <Avatar >{user&&user.email&&user.email.charAt(0)} </Avatar> }
                </div>
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
              <p>followers:</p>
                <p className="sidebar_statNumber">{user&&user.followers&&user.followers.length}</p>
                <p>following:</p>
                <p className="sidebar_statNumber">{user&&user.following&&user.following.length}</p>
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

        <div className="sidebar_bottom">
            <p>following:</p>
            {
              follwing.map(user=><ShortProfile
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
