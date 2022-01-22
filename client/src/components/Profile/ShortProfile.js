import React from 'react'
import { useHistory } from 'react-router-dom';
import "./index.css";
function ShortProfile({user}) {

    const History = useHistory();
    const profileShow = (e) => {
   
        History.push('/profile/' + user._id);
      }


    return (
        <div>
           <p className='shortprofile' onClick={profileShow}>{user.username}</p>
        </div>
    )
}

export default ShortProfile
