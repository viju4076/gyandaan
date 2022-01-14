import CreateIcon from "@material-ui/icons/Create";
import React, { useEffect, useState, useRef } from "react";

import "./index.css";
import ImageIcon from "@material-ui/icons/Image";
import {
  CalendarToday,
  CalendarViewDay,
  EventNote,
  Subscriptions,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import ClassPost from "./ClassPost";
//import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move";
function Index() {

  

  let post;
  const form = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    post = {
      heading: e.target[0].value,
      link: e.target[1].value,
      description: e.target[2].value,
    };

    var res = await fetch("/addpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: post,
      }),
    });
    res = await res.json();
    if (res.status === "400") {
      window.alert("Cannot add post");
    } else {
      window.alert("Added post successfully");
      form.current.reset();
    }
  };


  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <CreateIcon />
          <form ref={form} className="externalpost" onSubmit={handleSubmit}>
            <div className="direction">
              <h3>Heading</h3>
              <textarea
                class="form-control"
                name="heading"
                id="Textarea1"
                rows="1"
              ></textarea>
            </div>
            <div className="direction">
              <h3>Link</h3>
              <textarea
                class="form-control"
                name="link"
                id="Textarea2"
                rows="1"
              ></textarea>
            </div>
            <div className="direction">
              <h3>Description</h3>
              <textarea
                class="form-control"
                name="description"
                id="Textarea3"
                rows="3"
              ></textarea>
            </div>
            <div className="btndirection">
              <button type="submit" class="btn-primary">
                Post
              </button>
            </div>
          </form>
        </div>
        <div className="feed_inputOptions">
          {/* <InputOption Icon={ImageIcon} title='Photo' color='#70B5F9'   />
                   <InputOption Icon={Subscriptions} title='Video' color='#E7A33E'   />
                   <InputOption Icon={EventNote} title='Event' color='#C0CBCD'   />
                   <InputOption Icon={CalendarViewDay} title='WriteArticle' color='#7FC15E'   />
               */}
        </div>
      </div>
      
       
      
      {/* <Post name="vijay" description="this is a test" 
            message="This worked"
        /> */}
    </div>
  );
}

export default Index;
