import { stat } from 'fs';

import {
    LOGGED_IN_USER,
    UPDATE_USER
 } from '../actions/types'
 
 const initState = {
   
   update_user:{},
   user_id:"",
  
 }
 
 export default function global(state=initState, action) {
   switch (action.type) {
      case  UPDATE_USER:
        console.log("inside upate user");
        console.log("payload",action.payload.update_user);
        return {
            ...state, 
            
            update_user: action.payload.update_user
          
        }
        case LOGGED_IN_USER:
          console.log("inside logged in user",action.payload.user_id);
          return {
            ...state,
            user_id: action.payload.user_id
          }
       default:
         return state;
   }
 }