import {
    
    UPDATE_USER
 } from '../actions/types'
 
 const initState = {
   
   update_user:{}
  
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
       default:
         return state;
   }
 }