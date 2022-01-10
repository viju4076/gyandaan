import {React,useState} from 'react';

function Addteacher() {
    const [teacherData,setTeacherData]=useState();
    const loginUser =async (e) =>{
        e.preventDefault();
    const res = await fetch('/addteacher',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
           teacherData
        })
    });
    setTeacherData(res.json());
    console.log(res.status);
    if(res.status === 400 || !teacherData){
        window.alert("Invalid Credentials");
    }
    else{
        window.alert("User logged in Successfully");
        //dispatch({ type: IS_USER_LOGGED_IN, payload: true });
        

        //History.push("/home");
    }
}
}

export default Addteacher
