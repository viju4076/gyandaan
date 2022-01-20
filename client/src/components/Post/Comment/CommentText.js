
import React,{useState} from 'react';

const CommentText = (props) => {
    const[desc,setDesc]=useState();
  return( 
  <div>
         <div class="commented-section mt-2">
                    <div class="d-flex flex-row align-items-center commented-user">
                        
                        <h5 class="mr-2">{props.username}</h5><span class="dot mb-1"></span><span class="mb-1 ml-2">{props.dateTime}</span>
                    </div>
                    <div class="comment-text-sm"><span>{props.desc}</span></div>
                    {/* <div class="reply-section">
                        {<div class="d-flex flex-row align-items-center voting-icons"><i class="fa fa-sort-up fa-2x mt-3 hit-voting"></i><i class="fa fa-sort-down fa-2x mb-3 hit-voting"></i><span class="ml-2">10</span><span class="dot ml-2"></span>
                            <h6 class="ml-2 mt-1">Reply</h6> }
                        </div> */
                    }
                    </div>
                </div>
  );
};

export default CommentText;
