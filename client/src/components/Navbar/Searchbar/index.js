import React, { useEffect, useState } from "react";
import './index.css';
// import $ from "jquery";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
function Index() {
  const [searchUser, setSearchUser] = useState([{ username: '', _id: '' }]);
 
  const profileShow = (e) => {
    console.log('gupta', e.target.name);
      window.open('/profile/' + e.target.name);
  }

  
  const handleChange = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    var res = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.value,
      }),
    });
    res = await res.json();
    // console.log(res);
    if (res.status === "400") {
      window.alert("cannot match the specified value");
    } else {
      var result = res.users.map(function (a) { return { _id: a._id, username: a.username } });
      setSearchUser(result);
    }
  };
  return (
    
      <div className="searchboxouter">

       
           <div className="searchbox">
           <input
              type="text"
              className="searchbar"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
            <SearchIcon className="fa fa-search search" style={{color:"blue"}} />
           </div>
            

        <div className="internallist">
          <div class="list-group" >
            {

            searchUser.map(user => <Link to={"/profile/" + user._id} class="list-group-item list-group-item-action active">
            {user.username}
            </Link> )
            }
        </div>
        </div>
      </div>
  );
}

export default Index;
