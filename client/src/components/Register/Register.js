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
    if(!data||data.status === "210" ){
        window.alert(data.msg);
        console.log("Invalid Registration");
        
    }
    else{
        window.alert(data.msg);
        console.log("Successful Registration");
        History.push("/Login");
    }
 }
    return (
        <div className='register'>
            <div className="logo">
          <h2>
            <span>G</span>yaan
            <span>D</span>aan
          </h2>
        </div>
            <div className='register_container'>
                <h1>Sign in</h1>
                <form method='post'>
                    <h5>Full Name</h5>
                    <input type='text' name="username" id="name" autoComplete='off' placeholder='Enter Name'
                        value={user.username} 
                        onChange={handleInputs}/>
                    <h5>Email ID</h5>
                    <input type='text' name="email" id="email" autoComplete='off' placeholder='Enter Email'
                        value={user.email} 
                        onChange={handleInputs}/>
                    <h5>Mobile Number</h5>
                    <input type='text' name="phone" id="phone" autoComplete='off' placeholder='Enter phone Number'
                        value={user.phone} 
                        onChange={handleInputs}/>
                    <h5>Password</h5>
                    <input type='password' name="password" id="password" autoComplete='off' placeholder='******'
                        value={user.password} 
                        onChange={handleInputs}/>
                    <h5>Confirm Password</h5>
                    <input type='password' name="cpassword" id="cpassword" autoComplete='off'  placeholder='******'
                        value={user.cpassword} 
                        onChange={handleInputs}/>
                    <button className='btn btn-info' style={{marginLeft:"40%",fontSize:"15px"}}onClick={PostData}>Register</button>
                </form>
                <Link to="/Login">
                <button className='btn btn-info' style={{marginTop:"5px",marginLeft:"15%",fontSize:"15px"}} > Already Sign in ? Login here</button>
                </Link>
            </div>
        </div>
    )
}

export default Register;
