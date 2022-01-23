import React, { useState } from 'react';
import "./Rating.css";

const Rating = () => {
  //  const [isSelected, setIsSelected]= new State();
    const [rating, setRating] =useState(); 
    const handleClick1= (e)=>{
         console.log(e.target.value, e.target.checked);
    }
    return (
        <div>
            
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#form"> Your rating </button>
            <div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="text-right cross"  data-dismiss="modal"> <i class="fa fa-times mr-2"></i> </div>
                        <div class="card-body text-center"> <img src=" https://i.imgur.com/d2dKtI7.png" height="100" width="100" />
                            <div class="comment-box text-center">
                                <h4>Add a comment</h4>
                                <div class="rating"> 
                                <input type="radio" name="rating" value={5} id="a5" onClick={handleClick1} /><label for="a5">☆</label> 
                                <input type="radio" name="rating" value={4} id="a4" onClick={handleClick1}/><label for="a4">☆</label>
                                <input type="radio" name="rating" value={3} id="a3" onClick={handleClick1}/><label for="a3">☆</label>
                                <input type="radio" name="rating" value={2} id="a2" onClick={handleClick1}/><label for="a2">☆</label>
                                <input type="radio" name="rating" value={1} id="a1" onClick={handleClick1}/><label for="a1">☆</label> 
                                </div>
                                <div class="comment-area"> <textarea class="form-control" placeholder="what is your view?" rows="4"></textarea> </div>
                                <div class="text-center mt-4"> <button class="btn btn-success send px-5"onClick={handleClick1}>Send message <i class="fa fa-long-arrow-right ml-1"></i></button> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
};

export default Rating;