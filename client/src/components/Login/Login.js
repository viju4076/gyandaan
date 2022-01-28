import React, { useState, useEffect } from 'react';
import './Login.css';
import {
    IS_USER_LOGGED_IN,
    SET_USER_ID,
    LOGGED_IN_USER
} from '../../actions/types';
import {Link,useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function Login() { 
    const History = useHistory();
    const [email, setEmail]=useState('');
    const[password,setPassword]=useState('');
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.signup.is_user_logged_in);

    useEffect(() => {
        fetch('/auth')
            .then(data =>data.json())
            .then(data=> {
                if (data.status == 200) {
                    console.log("auth called",data);
                    dispatch({ type: IS_USER_LOGGED_IN, payload: true });
                  //  dispatch({type:LOGGED_IN_USER,payload: {userId: data.userId}});
                   

                }
            });
            

    }, [isUserLoggedIn]);


    const loginUser =async (e) =>{
        e.preventDefault();
        const res = await fetch('/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });
        const data=res.json();
        console.log(res.status);
        if(res.status === 400 || !data){
            window.alert("Invalid Credentials");
        }
        else{
            window.alert("User logged in Successfully");
            dispatch({ type: IS_USER_LOGGED_IN, payload: true });
          //  dispatch({})
            

            History.push("/");
        }
    }
    return (
        <div className='login'>
             <div className="logo">
          <h2>
            <span>G</span>yaan
            <span>D</span>aan
          </h2>
        </div>
            <div className='login_container'>
                <h1>Sign in</h1>
                <form method="POST">
                    <h5>Email ID</h5>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='btn btn-info'style={{marginLeft:"40%",fontSize:"15px"}} onClick={loginUser} > Sign In </button>
                </form>
                <Link to="/signup">
                <button className='btn btn-info' style={{marginTop:"4%",marginLeft:"15%",fontSize:"15px"}} > Create your GyaanDaan Account</button>
                </Link>
            </div>
        </div>
    )
}

export default Login;
