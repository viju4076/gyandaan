import {
    IS_USER_LOGGED_IN, SET_USER_ID
  } from '../actions/types'
  
  const initState = {
    is_user_logged_in:false,
    userId : ""
  }
  
  export default function global(state=initState, action) {
    switch (action.type) {
        case IS_USER_LOGGED_IN:
          console.log("inside reducer");
          return {
            ...state, 
            is_user_logged_in: action.payload
          }
        case SET_USER_ID:
          return {
            ...state, 
            userId: action.payload
          }
        default:
          return state;
    }
  }