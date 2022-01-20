import { Avatar } from '@material-ui/core'
import { ChatOutlined, SendOutlined, ShareOutlined, ThumbUpSharp } from '@material-ui/icons'
import React, { forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InputOption from './InputOption'
import './classPost.css'
import Comment from "./Comment/Comment";



const ClassPost =  (props) => {
   const[visible,setVisible]=useState(false);
    const [isAttending, setIsAttending]= useState(props.isAttending);
    
    console.log("shreya",props);
    
    useEffect(() => {
    //     fetch('/profile/userkiprofile')
    //     .then(data => data.json())
    //     .then(data => {
    //         console.log('above if statement', data);
    //         if (data.status == 200) {
                
    //             console.log("inside profile", data.user);
    //console.log("shreya",props.userId,props.attendees.includes(props.userId));
               // setIsAttending(props.attendees.includes(props.userId));
    //         }
    //     })
    setIsAttending(props.isAttending);

     },[])
  
    const handleJoin = () => {
        window.open(props.link, "_blank");
    }
    const opencomment = (e) =>{
        console.log("button clicked");
     setVisible(!visible);
    }
    const handleAttend = async(e)=>{
        console.log("feed ki id",props.id);
        var res = await fetch("/changeattendee", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "isAttending" : isAttending,
              "postId": props.id,


            }),
          });
          res = await res.json();
          if (res.status === "400") {
           console.log("Cannot change attendee");
          } else {
            console.log("changed attendee successfully");
            setIsAttending(res.isAttending);
          }
       
    }
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
    console.log('posts ke props', props);

    return (
        <div className='post'>
            <div className='post_side'>

                <div className="post_header">
                    <Avatar>{props.name[0]}</Avatar>

                    <div className="post_info">
                        <h2>{props.name}</h2>
                        {/* <a href ={props.link} target="_blank">Join Class</a> */}
                        <p>{(props.dateTime)}</p>
                    </div>
                </div>
               
               {<div className='post_sider'>

                    {
                        
                        !isAttending?
                    <button className=' btn btn-lg btn-warning'data-toggle="tooltip" title="Click to attend this class"onClick={handleAttend} >Attend</button>
                         
                         : <button className=' btn btn-lg btn-success'data-toggle="tooltip" title="Click here to not attend the class"onClick={handleAttend}>Attending</button>
                    }

                    
                </div>
}

            </div>
  


            <div className="post_body" >
                <div className="headingAndTiming" data-toggle="tooltip" title="click to join meet" onClick={handleJoin}>
                    <div className='heading'>
                        <p>{props.heading}</p>
                    </div>
                    <div className='timing'>
                        <p>spam</p>
                    </div>
                </div>
                <div className='description'>
                    <p>{props.description}</p>
                </div>

            </div>
            <div className="post_buttons">
                <InputOption Icon={ThumbUpSharp} title="Like" data-toggle="tooltip" color="gray"></InputOption>
                <button Icon={ChatOutlined} class="btn btn-primary" onClick={opencomment}> Comment </button>
            </div>
            {visible && <Comment postid={props.id}/>}
        </div>
    )
}

export default ClassPost
