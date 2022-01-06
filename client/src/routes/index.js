import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "../components/Home";

function Routes() {
    // var isUserLoggedIn = useSelector(state => state.signup.is_user_logged_in);
    // const dispatch = useDispatch();
 
    return (
        <div>
 <BrowserRouter>
        <div className="page-content">
          {/* <Switch>
            <Route path="/"
              render={() => {
                return (
                  isUserLoggedIn ?
                    <Redirect to="/home" /> :
                    <Redirect to="/login" />
                )
              }}

            />

          </Switch> */}
          <Route path="/" component={Home} exact />
          {/* <Route path="/login" component={Login} exact />
          <Route path="/check" component={CheckPage} exact />
          <Route path="/signup" component={Signup} exact /> */}
        </div>
      </BrowserRouter>

        </div>
    )
}

export default Routes
