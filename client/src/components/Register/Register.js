import React,{useState} from 'react';
import './Register.css';
import {Link,useHistory } from "react-router-dom";

function Register() {
     const History = useHistory();
 const [user,setUser]=useState({
     username:"",email:"",phone:"",password:"",cpassword:""
 });
 let name,value;
 const handleInputs= (e) => {
     name =e.target.name;
     value=e.target.value;
     console.log(name);
     console.log(value);
     setUser({... user, [name]:value});
 }
 function handleclick(event){
     event.preventDefault();
     console.log(user);
 }
 const PostData = async (e) =>{
     console.log("clicked");
    e.preventDefault();
    const {username,email,phone,password,cpassword} = user;
    const res=await fetch("/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username,email,phone,password,cpassword
        })
    });
    const data=await res.json();
    console.log(data);
    if(data.status === 422 || !data){
        window.alert("Invalid registration");
        console.log("Invalid Registration");
    }
    else{
        window.alert("Registration Successful");
        console.log("Successful Registration");
        History.push("/Login");
    }
 }
    return (
        <div className='register'>
            <Link to='/'>
                <img
                    className='register_logo'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"/>
            </Link>
            <div className='register_container'>
                <h1>Sign in</h1>
                <form method='post'>
                    <h5>Full Name</h5>
                    <input type='text' name="username" id="name" autoComplete='off'
                        value={user.username} 
                        onChange={handleInputs}/>
                    <h5>Email ID</h5>
                    <input type='text' name="email" id="email" autoComplete='off'
                        value={user.email} 
                        onChange={handleInputs}/>
                    <h5>Mobile Number</h5>
                    <input type='text' name="phone" id="phone" autoComplete='off'
                        value={user.phone} 
                        onChange={handleInputs}/>
                    <h5>Password</h5>
                    <input type='password' name="password" id="password" autoComplete='off'
                        value={user.password} 
                        onChange={handleInputs}/>
                    <h5>Confirm Password</h5>
                    <input type='password' name="cpassword" id="cpassword" autoComplete='off'
                        value={user.cpassword} 
                        onChange={handleInputs}/>
                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register"
                    onClick={PostData}/>
                </form>
                <p>
                    By signing in you agree to Amazon condition of Use and sale. Please see our privacy notes,
                    our cookies notice and our internet based Ads notice.
                </p>
                <Link to="/Login">
                <button className='loginbutton'> Already Sign in ? Login here</button>
                </Link>
            </div>
        </div>
    )
}

export default Register;
