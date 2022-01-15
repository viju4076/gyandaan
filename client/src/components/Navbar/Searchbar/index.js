import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import './index.css';
// import $ from "jquery";
import SearchIcon from "@material-ui/icons/Search";
function Index() {
  const [searchUser, setSearchUser] = useState([{ username: '', _id: '' }]);
  const History = useHistory();
  const profileShow = (e) => {
    console.log('gupta', e.target.name);
    History.push('/profile/' + e.target.name);
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
      window.alert("cannot search");
    } else {
      var result = res.users.map(function (a) { return { _id: a._id, username: a.username } });
      setSearchUser(result);
    }
  };
  return (
    <>
      <div className="externallist">
        <div className="internallist">
          <form class="form-inline d-flex justify-content-center md-form form-sm ">
            <input
              class="searchbar"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
            <SearchIcon className="header__searchIcon" />
          </form>
        </div>
        <div className="internallist">
          <div class="list-group " >
            {

              searchUser.map(user => <button type="button" name={user._id} class="list-group-item list-group-item-action active" onClick={profileShow}>
                {user.username}
              </button>)
            }
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
}

export default Index;
