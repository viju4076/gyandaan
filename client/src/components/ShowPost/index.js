import { Avatar } from '@material-ui/core'
import { ChatOutlined, SendOutlined, ShareOutlined, ThumbUpSharp } from '@material-ui/icons'
import React, { forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
 import Comment from "../Post/Comment/Comment";
import { useParams } from "react-router-dom";
import InputOption from "../Post/InputOption"
import Navbar from "../Navbar/Navbar";
import "./index.css";
import Sidebar from '../Sidebar';
const Index =  () => {
    const [user,setUser]=useState(null);
    const [postUser,setPostUser]=useState(null);
    const [rating,setRating]=useState('');
    const [post, setPost]= useState(null);
    const [isLiked, setIsLiked] = useState();
    const { objectId } = useParams();
    const [likes, setLikes]= useState();
    useEffect(() => {

       


        fetch(`/posts/${objectId}`)
        .then(data => data.json())
        .then(data => {
            if (data.status == 200) {
                console.log("inside post", data.post);
            setPost(data.post);
            setUser(data.user);
            setIsLiked(data.post.likes.includes(data.user._id));
            setLikes(data.post.likes.length);
         
            
        fetch(`/profile/${data.post.senderId}`)
      .then((data) => data.json())
      .then((data) => {
        if (data.status == 200) {

          setPostUser(data.user);
          console.log("data ka user",data);
          setRating(data.userRating.rating);
         
          // console.log("*************asdf****************user ki profile", data);
          
        }
      });







            }
            else{
                window.alert(data.msg);
            }
        })
     },[])
    const handleJoin = () => {
        // window.open(post.link, "_blank");
    }
    // const handleAttend = async(e)=>{
    //     console.log("feed ki id",post.id);
    //     var res = await fetch("/changeattendee", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           "postId": post.id,
    //         }),
    //       });
    //       res = await res.json();
    //       if (res.status === "400") {
    //        console.log("Cannot change attendee");
    //       } else {
    //         console.log("changed attendee successfully");
    //         setIsAttending(res.isAttending);
    //       }
       
    // }

    const dateTime = (date) => {
        var currentdate = new Date();
        var dateStringWithTime = new Date('YYYY-MM-DD HH:MM:SS');
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        return date;
    }
    const handleLike = async (e) =>{
        
        console.log("Like clicked");
        const res=await fetch("/changeLike", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
               postid:post._id,
               isLiked: isLiked,
            })
        });
        const data=await res.json();
        console.log(data);
        if(data.status === 210 || !data){
            window.alert("Cann't Like");
          //  console.log("Invalid Registration");
        }
        else{
         console.log("Liked done");
         setIsLiked(data.isLiked);
         
        
            //console.log("Successful Registration");
     }
    }
    // console.log('posts ke post', post);

    return (
        <>
        <Navbar/>
        <div className="externalShow">
          <Sidebar user={postUser}/>
          <div className="postExternal">
        <div className='post2'>
             <div className='post_side'>

                <div className="post_header">
                {post&&(post.senderAvataar?<Avatar src={post.senderAvataar} />:<Avatar>{post.name && post.name.charAt(0)} </Avatar>)}

                    <div className="post_info">
                        <h2>{post && post.name}</h2>
                        {post &&  <a href ={post.link} target="_blank">Join Class</a> }
                        <p>{post && (post.dateTime)}</p>
                    </div>
                </div>
               
               {/* {<div className='post_sider'>

                    {
                        
                        !isAttending?
                    <button className=' btn btn-lg btn-warning'data-toggle="tooltip" title="Click to attend this class"onClick={handleAttend} >Attend</button>
                         
                         : <button className=' btn btn-lg btn-success'data-toggle="tooltip" title="Click here to not attend the class"onClick={handleAttend}>Attending</button>
                    }

                    
                </div>
} */}

            </div>
  


            <div className="post_body1" >
                <div className="headingAndTiming" data-toggle="tooltip" title="click to join meet" onClick={handleJoin}>
                    <div className='heading'>
                        <p>{post && post.heading}</p>
                    </div>
                    <div className='timing'>
                        <p>{post && post.formattedStartDate}</p>
                    </div>
                </div>
                <div className='description'>
                    <p>{post && post.description}</p>
                </div>

            </div>
            <div className="post_buttons">
                <button Icon={ThumbUpSharp}  class="btn btn-primary" onClick={handleLike} >{isLiked?"Liked":"Like"}</button>
                <button Icon={ChatOutlined} class="btn btn-primary" > Comment </button>
              
              
            </div>
            <div>
                {isLiked?<li>Liked by you  {likes>1?"and "+ (likes-1)+" others":""}</li>
                :likes>0&&<li>Liked by {likes} others</li>
                }
            </div>
            {post && user &&  <Comment postid={post._id} user={user}/>} 
            </div>
        </div>
  
        </div>
              </>
    )
}

export default Index
