import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { categories } from "../../categories/index.js";
import { UPDATE_USER, LOGGED_IN_USER } from '../../actions/types';
import { GiConsoleController } from 'react-icons/gi';
import axios from "axios";


function Index() {

    const [user, setUser] = useState(null);
    const skills = [];
    const [Categories, setCategories] = useState(skills);
    const [isTeacher, setIsTeacher] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [qualifications, setQualifications] = useState('');

    for (var i = 0; i < categories.length; i++) {
        skills.push({ id: categories[i].id, skill: categories[i].skill, isSelected: false });
    }
    const form = useRef(null);
    const form1 = useRef(null);
    const dispatch = useDispatch();
    const handleTeacher = (e) => {
        setIsTeacher(!isTeacher);
    }
    const handleClick = (e) => {

        let newCategories = Categories.map(el => (
            el.id == e.target.id ? { ...el, isSelected: !el.isSelected } : el
        ))
        setCategories(newCategories);

        console.log("*************************", newCategories);

    }

    const handleAvatar =  (e) => {
        e.preventDefault();
        console.log(e.target[0].files[0]);
        let file=e.target[0].files[0];
        const formdata = new FormData();
        formdata.append('file', file);
        // formdata.append('teamId', props.clickedTeamId);
        // formdata.append('datetime', getTimeStamp());

        axios({
            method: 'post',
            url: '/updateavataar',
            data: formdata,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(data =>data.data).then(data=> {
              
            if (data.status == 200) {
                console.log('-----------------',data)
                 window.location.reload();
                
            }
        })
            .catch(err => {
                console.log(err);

                alert("error in upload");
            });



    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       // console.log("name", e.target, e.target[0].value, "mail", e.target[1].value, "phone", e.target[2].value, e.target[5].value);
        var categories=isTeacher?Categories:[];
        var qualifications=isTeacher?e.target[5].value:null;
        var res = await fetch('/updateprofile', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "isTeacher": isTeacher,
                "areasOfInterest": categories,
                "qualifications": qualifications,
                "email": e.target[1].value,
                "username": e.target[0].value,
                "phone": e.target[2].value,

            })
        });
        res = await res.json();
        setUser(res.updatedUser);
        console.log(res.status);
        console.log("New user data ", res.updatedUser);
        if (res.status === "400" || !res.updatedUser) {
            window.alert("Cannot update profile");
        }
        else {
            window.alert("Profile updated successfully");
            dispatch({
                type: UPDATE_USER, payload: {
                    update_user:
                        res.updatedUser
                }
            });
        }

        window.location.reload();

        console.log(Categories);
        console.log(qualifications);
    }

    useEffect(() => {
        fetch('/profile/userkiprofile')
            .then(data => data.json())
            .then(data => {
                if (data.status == 200) {
                    console.log(data.user);
                    setUser(data.user);
                    setIsTeacher(data.user.isTeacher);
                    setCategories(data.user.areasOfInterest.length ? (data.user.areasOfInterest) : skills);
                    setUsername(data.username);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setQualifications(data.qualifications);
                }
            })


    }, []);







    return (
        <>
            <Navbar />
            {user &&

                <div class="container rounded bg-white mt-5 mb-5">

                    <div class="row">

                        <div class="col-md-4 border-right">
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src={user.avataar?user.avataar.link:"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"}/><span class="font-weight-bold">{user && user.username}</span><span class="text-black-50">{user && user.email}</span><span> </span></div>
                            <form onSubmit={handleAvatar} ref={form1} >
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Choose avatar</label>
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                                    <button class="btn btn-primary " type="submit">Upload avatar</button>
                                </div>

                            </form>
                        </div>
                        <form onSubmit={handleSubmit} ref={form} >
                             <div class="col-md-12 " style={{display:"flex"}}>
                            <div class="col-md-7 border-right">
                                <div class="p-3 py-5">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h4 class="text-right">Profile Settings</h4>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-12"><label class="labels">Full Name</label><input type="text" class="form-control" placeholder={user.username} defaultValue={user.username}
                                        /></div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder={user.email} defaultValue={user.email}
                                        /></div>
                                        <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder={user.phone} defaultValue={user.phone}
                                        /></div>


                                    </div>
                                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                                </div>
                            </div>


                            <div class="col-md-5">
                                <div class="p-4 py-5">

                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isTeacher} style={{ height: "20px", width: "20px" }} onClick={handleTeacher} />
                                        <label class="form-check-label" for="flexCheckDefault" style={{ marginLeft: "10px" }}>
                                            <h2>Teacher</h2>
                                        </label>
                                    </div>

                                    {isTeacher && <div class="teacherClass">
                                        <div class="col-md-12"><label class="labels">Qualifications</label><input type="text" class="form-control" placeholder={user.qualifications} defaultValue={user.qualifications}
                                        /></div>
                                        <div class="col-md-12">

                                            <label for="areaOfInterest" class="col-form-label">Area of Interest</label>
                                            <div class="dropdown show">
                                                <a class="btn btn-secondary dropdown-toggle btn-lg" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Area of Interest
                                                </a>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <div class="form-check">
                                                        {

                                                            //  {todos.map((message) => <Item key={message} message={message} />)}
                                                            Categories.map(category => (<li>
                                                                <input class="form-check-input" type="checkbox" value="1" checked={category.isSelected} id={category.id} onClick={handleClick} />
                                                                <label class="form-check-label" for={category.id} >
                                                                    {category.skill}
                                                                </label>
                                                            </li>))
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                    }     </div>

                            </div>
                        </div>
                     </form>
                    </div>

                </div>

            }

        </>
    );
}

export default Index;




