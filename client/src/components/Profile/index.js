import React from "react";
import Intro from "./Intro";
import "./index.css";
import { UPDATE_USER, LOGGED_IN_USER } from "../../actions/types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Index() {
  const [rating, setRating] = useState(0);
  const [globalRating, setGlobalRating] = useState(0);
  const { objectId } = useParams();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`/profile/${objectId}`)
      .then((data) => data.json())
      .then((data) => {
        console.log("above if statement", data.user);
        if (data.status == 200) {
          setUser(data.user);
          setRating(data.userRating.rating);
          setGlobalRating(data.globalRating);
          // console.log("*************asdf****************user ki profile", data);
          dispatch({
            type: UPDATE_USER,
            payload: {
              update_user: data.loggedInUser,
            },
          });
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              user_id: data.loggedInUser._id,
            },
          });
        }
      });
  }, []);
  return (
    <div>
      {user && (
        <Intro
          profileUser={user}
          userRating={rating}
          globalRating={globalRating}
        />
      )}
    </div>
  );
}

export default Index;
