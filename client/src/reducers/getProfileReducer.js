import {
     GET_PROFILE
  } from '../actions/types'
  
  const initState = {
    get_profile:false,
   
  }
  
  export default function global(state=initState, action) {
    switch (action.type) {
        case GET_PROFILE:
          console.log("inside reducer");
          return {
            ...state, 
            get_profile: action.payload
          }
        default:
          return state;
    }
  }