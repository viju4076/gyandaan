import { combineReducers } from "redux";
// import globalReducer from './globalReducer';
// import postReducer from './postReducer'
 import signupReducer from "./signupReducer";
 import getProfileReducer from "./getProfileReducer"
 import userReducer from "./userReducer"
// import socketReducer from "./socketReducer";
// import authReducer from "./authReducer";
// import signupFormReducer from './signupFormReducer';
// import loginFormReducer from './loginFormReducer';
// import userReducer from './userReducer';
// import courseReducer from './courseReducer';
// import domainReducer from './domainReducer'
// import quizReducer from './quizReducer';

export default combineReducers({
     signup: signupReducer,
      user:userReducer
    // socket: socketReducer
})