import React,{useEffect, useState} from 'react'
import Navbar  from '../Navbar/Navbar';
import RenderPost from '../Post/RenderPost';
import ClassPost from '../Post/ClassPost';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_USER } from '../../actions/types';
function Intro({profileUser}) {
    console.log('props', profileUser);
    const [feeds, setFeeds] = useState([]);
    const [user, setUser]= useState(useSelector(state => state.user.update_user));
   
    const [isFollowing, setIsFollowing ] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
       
        // fetch(`/isfollowing/`)
       
      fetch(`/getpost/${profileUser._id}`)
        .then(data => data.json())                                                                                        
        .then(data => {
          console.log('in get post', data.post);
          if (data.status == 200) {
  
            setFeeds(data.post);
            setUser(data.user);
            console.log(data.user);
            if(data.user&&data.user.following&&data.user.following.includes(profileUser._id)){
                setIsFollowing(true);
            }
           
  
  
          }
        })
       
      
        
    }, [])
    const handleClick = async (e)=>{

        var res = await fetch("/changeFollower", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: profileUser._id,
                isFollowing: isFollowing
            }),
          });
          res = await res.json();
        
          console.log(res.status);
          console.log("New user data ", res.loggedInUser);
          if (res.status === "400" || !res.loggedInUser) {
            window.alert("Cannot follow");
          } else {
            setUser(res.loggedInUser);
            setIsFollowing(!isFollowing);
            console.log("profileUser",res.profileUser);
            window.alert("Button clicked");
            dispatch({
              type: UPDATE_USER,
              payload: {
                update_user: res.loggedInUser,
              },
            });
    
            //History.push("/home");
          }
    }
    return (
        <div>
            <Navbar/>
            <div class="container mt-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-7">
                        <div class="card p-3 py-4">
                            <div class="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle" /> </div>
                            <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white">{profileUser.isTeacher ? "Teacher" : "Student"}</span>
                                <h5 class="mt-2 mb-0"> {profileUser.username}</h5> <span>{profileUser.qualifications}</span>
                                <div class="px-4 mt-1">
                                    <p class="fonts">followers: {profileUser.followers.length} </p>
                                    <p class="fonts">followings: {profileUser.following.length} </p>
                                </div>
                                {/* <ul class="social-list">
                                    <p>Hello</p>
                                    <li><i class="fa fa-facebook"></i></li>
                                    <li><i class="fa fa-dribbble"></i></li>
                                    <li><i class="fa fa-instagram"></i></li>
                                    <li><i class="fa fa-linkedin"></i></li>
                                    <li><i class="fa fa-google"></i></li>
                                </ul> */}
                                <div class="buttons"> <button class="btn btn-outline-primary px-4" onClick={handleClick} >{!isFollowing?"Follow":"Unfollow"}</button> <button class="btn btn-primary px-4 ms-3">Contact</button> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {feeds.map(feed => <ClassPost
            key={feed._id}
            name={feed.name}
            link={feed.link}
            description={feed.description}
          />)}
        </div>
    )
}

export default Intro
