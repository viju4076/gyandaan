import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import RenderPost from "../Post/RenderPost";
import ClassPost from "../Post/ClassPost";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER } from "../../actions/types";
import Searchbar from "../Navbar/Searchbar";
import "./index.css";
import Rating from "./Rating";
function Intro(props) {
  //console.log('props', profileUser);
  const [feeds, setFeeds] = useState([]);

  const [user, setUser] = useState(
    useSelector((state) => state.user.update_user)
  );
  let userId = useSelector((state) => state.user.user_id);

  const [profileUser, setProfileUser] = useState(props.profileUser);
  const [isFollowing, setIsFollowing] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    // fetch(`/isfollowing/`)

    fetch(`/getpost/${profileUser._id}`)
      .then((data) => data.json())
      .then((data) => {
        console.log("in get post", data.post);
        if (data.status == 200) {
          setFeeds(data.post);

          console.log("follow dekhna hai ", data.isFollowing);
          setIsFollowing(data.isFollowing);
        }
      });
  }, []);
  const handleClick = async (e) => {
    var res = await fetch("/changeFollower", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: profileUser._id,
        isFollowing: isFollowing,
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
      setProfileUser(res.profileUser);
      console.log("profileUser", res.profileUser);
      window.alert(res.msg);
      dispatch({
        type: UPDATE_USER,
        payload: {
          update_user: res.loggedInUser,
        },
      });

      //History.push("/home");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="searchcomponent" style={{ top: "0" }}>
        <Searchbar />
      </div>
      <div class="container mt-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-7">
            <div class="card p-3 py-4">
              <div class="text-center">
                {" "}
                <img
                 src={profileUser.avataar?profileUser.avataar.link:"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"}
                  width="100"
                  class="rounded-circle"
                />{" "}
              </div>
              <div class="text-center mt-3">
                {" "}
                <span class="bg-secondary p-1 px-4 rounded text-white">
                  {profileUser.isTeacher ? "Teacher" : "Student"}
                </span>
                <h5 class="mt-2 mb-0"> {profileUser.username}</h5>{" "}
                <span>{profileUser.qualifications}</span>
                <div class="px-4 mt-1">
                  <p class="fonts">
                    followers: {profileUser.followers.length}{" "}
                  </p>
                  <p class="fonts">
                    followings: {profileUser.following.length}{" "}
                  </p>
                </div>
                <div className="gyandaanRating">
                  <div className="globalRating">
                    <div className="internalRating">Gyandaan Rating</div>
                    <div className="internalRating">
                      {props.globalRating}
                      <span class="fa fa-star checked"></span>
                    </div>
                  </div>
                  <div className="userRating">
                    <div className="internalRating">
                      <Rating />
                    </div>
                    <div className="internalRating">
                      {props.userRating}
                      <span class="fa fa-star checked"></span>
                    </div>
                  </div>
                </div>
                <ul class="social-list">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </ul>
                <div class="buttons">
                  {" "}
                  <button
                    class="btn btn-outline-primary px-4"
                    data-toggle="tooltip"
                    title="click to follow"
                    onClick={handleClick}
                  >
                    {!isFollowing ? "Follow" : "Unfollow"}
                  </button>{" "}
                  <button class="btn btn-primary px-4 ms-3">Contact</button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
      {userId && (
        <div className="xyz mt-5">
          {feeds &&
            feeds.map((feed) => (
              <ClassPost
                key={feed._id}
                id={feed._id}
                name={feed.name}
                link={feed.link}
                description={feed.description}
                dateTime={feed.formattedDateTime}
                heading={feed.heading}
                attendees={feed.attendees}
                isAttending={feed.attendees.includes(userId)}
                formattedStartDate={feed.formattedStartDate}
                userAvataar={feed.senderAvataar}
              />
            ))}
        </div>
      )}
      {/* {feeds&&feeds.map(feed => <ClassPost
        key={feed._id}
        id={feed._id}
        name={feed.name}
        link={feed.link}
        description={feed.description}
        dateTime={feed.formattedDateTime}
        heading={feed.heading}
        attendees= {feed.attendees}
        isAttending={feed.attendees.includes(user._id)}
      />)} */}
    </div>
  );
}

export default Intro;
