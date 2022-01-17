import React,{useEffect, useState} from 'react'
import Navbar  from '../Navbar/Navbar';
import RenderPost from '../Post/RenderPost';
import ClassPost from '../Post/ClassPost';

function Intro({ user }) {
    console.log('props', user);
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
       
      fetch(`/getpost/${user._id}`)
        .then(data => data.json())                                                                                        
        .then(data => {
          console.log('in get post', data.post);
          if (data.status == 200) {
  
            setFeeds(data.post);
  
  
          }
        })
    }, [])
    return (
        <div>
            <Navbar/>
            <div class="container mt-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-7">
                        <div class="card p-3 py-4">
                            <div class="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle" /> </div>
                            <div class="text-center mt-3"> <span class="bg-secondary p-1 px-4 rounded text-white">{user.isTeacher ? "Teacher" : "Student"}</span>
                                <h5 class="mt-2 mb-0"> {user.username}</h5> <span>{user.qualifications}</span>
                                <div class="px-4 mt-1">
                                    <p class="fonts">followers: {user.followers.length} </p>
                                    <p class="fonts">followings: {user.following.length} </p>
                                </div>
                                {/* <ul class="social-list">
                                    <p>Hello</p>
                                    <li><i class="fa fa-facebook"></i></li>
                                    <li><i class="fa fa-dribbble"></i></li>
                                    <li><i class="fa fa-instagram"></i></li>
                                    <li><i class="fa fa-linkedin"></i></li>
                                    <li><i class="fa fa-google"></i></li>
                                </ul> */}
                                <div class="buttons"> <button class="btn btn-outline-primary px-4">Follow</button> <button class="btn btn-primary px-4 ms-3">Contact</button> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='xyz mt-5'>
                {feeds.map(feed => <ClassPost
                key={feed._id}
                name={feed.name}
                link={feed.link}
                description={feed.description}
          />)}
            </div>
            
        </div>
    )
}

export default Intro
