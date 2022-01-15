import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "../components/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Profile from "../components/Profile";
function Routes() {
  var isUserLoggedIn = useSelector(state => state.signup.is_user_logged_in);
  const dispatch = useDispatch();

  return (
    <div>
      <BrowserRouter>
        <div className="page-content">
          <Switch>
            <Route path="/"
              render={() => {
                return (
                  isUserLoggedIn ?
                    <Redirect to="/home" /> :
                    <Redirect to="/login" />
                )
              }}

              exact />

          </Switch>
          <Route path="/home" component={Home} exact />
          <Route path="/login" component={Login} exact />

          <Route path="/signup" component={Register} exact />
          <Route path="/profile/:objectId" component={Profile} exact />
        </div>
      </BrowserRouter>

    </div>
  )
}

export default Routes
