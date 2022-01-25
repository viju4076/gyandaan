
import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import "./Table.css";
import ShortProfile from '../Profile/ShortProfile';
import TopRatedTable from './TopRatedTable'

function Index() {
    //const user=useSelector(selectUser);
    const dispatch = useDispatch();

    let user = useSelector(state => state.user.update_user);
    const [follwing, setFollowing] = useState([]);
    const [TopUsers, setTopUsers] = useState();
    const [upcomingClasses,setUpcomingClasses]=useState();
    const handleClick =()=>{
        window.open("/classes", "_blank");
    }
    
    useEffect(() => {
        console.log('useeffect right');
        fetch('/getfollowing')
            .then(data => data.json())
            .then(data => {
                setFollowing(data.following);
            })

        fetch('/getTopRated')
            .then(data => data.json())
            .then(data => {
                console.table(data.users);
                setTopUsers(data.users);
            })
            fetch('/getUpcomingClasses')
            .then(data => data.json())
            .then(data => {

            // console.table('upcoming classes',data.classes, data.classes[0].duration);
                setUpcomingClasses(data.classes);
              
            })

    }


        , [user]);


    const profileShow = (e) => {
        console.log('gupta', e.target.name);
        History.push('/profile/' + e.target.name);
    }


    const recentItem = (topic) => {
        return (<div className="sidebar_recentItem">
            <span className="badge badge-pill badge-light">
                # {topic}
            </span>
        </div>)
    };

    return (
        <div className="sidebar">
            <div className="sidebar_Top">
            <div className="sidebar_bottom1"> 
                <p>Upcoming Classes </p>
                
                {
                  upcomingClasses&&upcomingClasses.map((element)=>
                      
                      <div className='sidebarClass '  data-toggle="tooltip" title="click to see all classes" style= {{cursor:"pointer"}}  >
                      
                       <h3 className='sidebarHeading' onClick={handleClick}>{element.heading}</h3>
                     
                       <a href={"/profile/"+element.senderId}><h4 className='sidebarHeading1' >{element.name}</h4></a>
                
                       <h6>{element.difference}</h6>
                        
                      </div>
                     

                  )
                }

            </div>
                <div className="sidebar_top">
                    <TopRatedTable users={TopUsers} />
                </div>


                <div className="sidebar_stats">

                </div>
            </div>
            <div className="sidebar_bottom">
                <p>Skills</p>
                {
                    user && user.areasOfInterest && user.areasOfInterest.length > 0 && user.areasOfInterest.map(interest => (interest.isSelected && recentItem(interest.skill)))

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
                    follwing.map(user => <ShortProfile
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

export default Index
