import React,{useState,useEffect} from 'react';
import { Avatar } from '@material-ui/core';
import './Comment.css';
import { useSelector, useDispatch } from "react-redux";
import CommentText from './CommentText';
const Comment = (props) => {
  const [comments,setComments]=useState(null);
  let user=props.user;
  console.log(user);
  // let user=useSelector(state=>state.user.update_user);
  const [desc,setDesc]=useState();
  useEffect(() => {
    fetch(`/getComments/${props.postid}`)
      .then(data => data.json())
      .then(data => {
        console.log('in get post', data.post);
        if (data.status == 200) {
         setComments(data.comments);
        }
      })
  }, [])

  const handleInputs= (e) => {
    let value=e.target.value;
    console.log(value);
    setDesc(value);
}
const submitComment = async (e) =>{
    console.log("clicked");
   e.preventDefault();
   //let newComments=[... comments,{username:user.username,desc:desc}]
 
 const res=await fetch("/addComment", {
       method:"POST",
       headers:{
           "Content-Type":"application/json"
       },
       body: JSON.stringify({
         desc, postid:props.postid
       })
   });
   const data=await res.json();
   console.log(data);
   if(data.status === 422 || !data){
       window.alert("Cannot do comment");
     //  console.log("Invalid Registration");
   }
   else{
     setComments(data.comments);
    console.log(data.comments);
     window.alert("Comment Successful");
     setDesc("");
       //console.log("Successful Registration");
}
  }
  return( 
    <div class="container">
    <div class="d-flex justify-content-center row" id="commentstarting" >
        <div class="d-flex flex-column col-md-12">
            <div class="coment-bottom bg-white p-2 px-4">
                <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                {Object.keys(user).length!== 0 &&  <Avatar >{user.email&&user.email.charAt(0)} </Avatar> }
                <input type="text" class="form-control mr-3" placeholder="Add comment" onChange={handleInputs} value={desc}/>
                <button class="btn btn-primary" type="button" onClick={submitComment}>Comment</button></div>
                {comments && comments.map(comment=><CommentText
                username={comment.senderName}
                desc={comment.description}
                dateTime={comment.dateTime}

              />)}
            </div>
        </div>
    </div>
</div>
);
};

export default Comment;
