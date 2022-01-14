import React from "react";
// import $ from "jquery";
import SearchIcon from "@material-ui/icons/Search";

function Index() {
    const handleChange =async(e) =>{
        console.log(e.target.value);
        var res = await fetch("/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             name:e.target.value
            }),
          });
          res = await res.json();
        //   if (res.status === "400") {
        //     window.alert("Cannot add post");
        //   } else {
        //     window.alert("Added post successfully");
        //     form.current.reset();
        //   }
        };
    return(
        <>
        <form class="form-inline d-flex justify-content-center md-form form-sm ">
        <input class="searchbar" type="text" placeholder="Search"
          aria-label="Search" onChange={handleChange}/>
        <SearchIcon className="header__searchIcon"/>
      </form>
      </>
    );
}

export default Index;
