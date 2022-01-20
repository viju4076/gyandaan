import CreateIcon from "@material-ui/icons/Create";
import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
//import TimePicker from "./TimePicker";

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
    console.log("button", e.target[3].value, e.target[4].value);
    //date e.target[3].value, time e.target[4].value
   const startDate = e.target[3].value+"T"+ e.target[4].value+':00';
   const endDate = e.target[3].value+"T"+ e.target[5].value+':00';
   console.log("Date",startDate, endDate);

    post = {
      heading: e.target[0].value,
      link: e.target[1].value,
      description: e.target[2].value,
      startDate: startDate,
      endDate: endDate,
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
            {/* <div id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker">
              <input placeholder="Select date" type="text" id="example" class="form-control"/>
                <label for="example">Try me...</label>
                <i class="fas fa-calendar input-prefix" tabindex/>
            </div> */}
            <div className="time">
              <p className="timeLabel">Date</p>
              <Form.Control type="date" name='date_of_class' className="formClass" />
              <p className="timeLabel">Start Time</p>
              <Form.Control type="time" name='start_time ' className="formClass" />
              <p className="timeLabel">End time</p>
              <Form.Control type="time" name='start_time ' className="formClass" />
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
