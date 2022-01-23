import React, { useState } from "react";
import {useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import "./Rating.css";

const Rating = () => {
  const { objectId } = useParams();
  let user = useSelector((state) => state.user.update_user);
  //  const [isSelected, setIsSelected]= new State();
  
  const [desc, setDesc] = useState("");
  const [rating,setRating] = useState();
  const handleSubmit = async(e)=>{

    var res = await fetch("/giveRating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: objectId,
          description: desc,
          rating: rating,
        }),
      });
      res = await res.json();
      if (res.status === "400") {
        console.log("Cannot add rating");
      } else {
        console.log("Rating added successfully");
      }
    };
  const handleClick = async(e) => {
    console.log(e, e.target.checked);
    setRating(e.target.value);
  }
  return (
    <div>
      <button
        type="button"
        class="btn btn-danger"
        data-toggle="modal"
        data-target="#form"
      >
        {" "}
        Your rating{" "}
      </button>
      <div
        class="modal fade"
        id="form"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="text-right cross" data-dismiss="modal">
              {" "}
              <i class="fa fa-times mr-2"></i>{" "}
            </div>
            <div class="card-body text-center">
              {" "}
              <img
                src=" https://i.imgur.com/d2dKtI7.png"
                height="100"
                width="100"
              />
              <div class="comment-box text-center">
                <h4>Add a comment</h4>
                <div class="rating">
                  <input
                    type="radio"
                    name="rating"
                    value={5}
                    id="a5"
                    onClick={handleClick}
                  />
                  <label for="a5">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value={4}
                    id="a4"
                    onClick={handleClick}
                  />
                  <label for="a4">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value={3}
                    id="a3"
                    onClick={handleClick}
                  />
                  <label for="a3">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value={2}
                    id="a2"
                    onClick={handleClick}
                  />
                  <label for="a2">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value={1}
                    id="a1"
                    onClick={handleClick}
                  />
                  <label for="a1">☆</label>
                </div>
                <div class="comment-area">
                  {" "}
                  <textarea
                    class="form-control"
                    placeholder="what is your view?"
                    rows="4"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  ></textarea>{" "}
                </div>
                <div class="text-center mt-4">
                  {" "}
                  <button
                    class="btn btn-success send px-5" data-dismiss="modal"
                    onClick={handleSubmit}
                  >
                    Send message <i class="fa fa-long-arrow-right ml-1"></i>
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
