import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ClassPost from './ClassPost';
import "./RenderPost.css";
export default function RenderPost(props) {
  const [feeds, setFeeds] = useState([]);
  //const [isAttending, setIsAttending]= useState()  
  let user=useSelector(state=>state.user.update_user);
  useEffect(() => {
    fetch('/getpost/userkiprofile')
      .then(data => data.json())
      .then(data => {
        //console.log('in get post', data.post);
        if (data.status == 200) {
          setFeeds(data.post);
          console.log("*******************************feeds are set and userid=",props.userId);
        }
      })
  }, [])

  return (

    <div className="xyz">
      {feeds&&feeds.map(feed => <ClassPost
        key={feed._id}
        id={feed._id}
        name={feed.name}
        link={feed.link}
        description={feed.description}
        dateTime={feed.formattedDateTime}
        heading={feed.heading}
        attendees= {feed.attendees}
        userId= {props.userId}
        formattedStartDate= {feed.formattedStartDate}
        isAttending={feed.attendees.includes(props.userId)}
        isLiked={feed.likes.includes(props.userId)}
        likes= {feed.likes.length}
        user={user}
        userAvataar={feed.senderAvataar}
      />)}

    </div>
  );
}