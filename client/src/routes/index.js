import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "../components/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Profile from "../components/Profile";
import Class from "../components/Class";
import ShowPost from "../components/ShowPost";
import EditProfile from "../components/EditProfile";
import Notifications from "../components/Notifications";
function Routes() {
  var isUserLoggedIn;
  isUserLoggedIn = useSelector((state) => state.signup.is_user_logged_in);
  console.log(isUserLoggedIn);

  return (
    <div>
      <BrowserRouter>
        <div className="page-content">
          {/* <Switch>
            <Route path="/"
              render={() => {
                return (
                  (isUserLoggedIn ?
                    <Redirect to="/" /> :
                    <Redirect to="/login" />
                ))
              }}
              exact
               />

          </Switch> */}
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />

          <Route path="/signup" component={Register} exact />
          <Route path="/classes" component={Class} exact />
          <Route path="/profile/:objectId" component={Profile} exact />
          <Route path="/posts/:objectId" component={ShowPost} exact />
          <Route path="/myProfile" component={EditProfile} exact />
          <Route path="/notifications" component={Notifications} exact />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
