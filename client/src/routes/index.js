import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "../components/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
function Routes() {
    var isUserLoggedIn = useSelector(state => state.signup.is_user_logged_in);
     const dispatch = useDispatch();
 
    return (
        <div>
 <BrowserRouter>
        <div className="page-content">
<<<<<<< HEAD
          {/* <Switch>
            <Route path="/" exact
=======
          <Switch>
            <Route path="/" 
>>>>>>> 857adbc141ad354ee82813381ea54ff000448128
              render={() => {
                return (
                  isUserLoggedIn ?
                    <Redirect to="/home" /> :
                    <Redirect to="/login" />
                )
              }}

            />

          </Switch> */}
          <Route path="/home" component={Home} exact/>
          <Route path="/login" component={Login} exact />
          {/* <Route path="/check" component={CheckPage} exact /> */}
          <Route path="/signup" component={Register} exact /> 
        </div>
      </BrowserRouter>

        </div>
    )
}

export default Routes
