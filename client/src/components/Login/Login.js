import React, { useState, useEffect } from 'react';
import './Login.css';
import {
    IS_USER_LOGGED_IN,
    SET_USER_ID
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
                    dispatch({type:SET_USER_ID,payload: data.userId});
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
            

            History.push("/");
        }
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className='login_logo'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"/>
            </Link>
            <div className='login_container'>
                <h1>Sign in</h1>
                <form method="POST">
                    <h5>Email ID</h5>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='loginbutton' onClick={loginUser}> Sign In </button>
                </form>
                <p>
                    By signing in you agree to Amazon condition of Use and sale. Please see our privacy notes,
                    our cookies notice and our internet based Ads notice.
                </p>
                <Link to="/signup">
                <button className='registerbutton'> Create your Amazon Account</button>
                </Link>
            </div>
        </div>
    )
}

export default Login;
