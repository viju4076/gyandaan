import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { categories } from "../../categories/index.js";

function Index() {

    const [user, setUser] = useState(null);
    const skills = [];
    const [Categories, setCategories] = useState(skills);
    const [isTeacher,setIsTeacher]=useState(false);

    for (var i = 0; i < categories.length; i++) {
        skills.push({ id: categories[i].id, skill: categories[i].skill, isSelected: false });
    }

    const dispatch = useDispatch();

    const handleClick = (e) => {

        let newCategories = Categories.map(el => (
            el.id == e.target.id ? { ...el, isSelected: !el.isSelected } : el
        ))
        setCategories(newCategories);

        console.log("*************************", newCategories);

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

                }
            })


    }, []);







    return (
        <>
            <Navbar />
            <div class="container rounded bg-white mt-5 mb-5">
                <div class="row">
                    <div class="col-md-3 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span class="font-weight-bold">{user && user.username}</span><span class="text-black-50">{user && user.email}</span><span> </span></div>
                    </div>
                    <div class="col-md-5 border-right">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12"><label class="labels">Full Name</label><input type="text" class="form-control" placeholder={user && user.username} value="" /></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder={user && user.email} value="" /></div>
                                <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder={user && user.phone} value="/" /></div>
                            </div>
                            <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                        </div>
                    </div>
                    
                    
                    <div class="col-md-4">
                    <div class="p-4 py-5">
                    
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isTeacher}/>
                    <label class="form-check-label" for="flexCheckDefault">
                     Teacher
                    </label>  
                  </div>
                   
                      {isTeacher&&  <div class="">
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
                            <div class="col-md-12"><label class="labels">Qualifications</label><input type="text" class="form-control" placeholder={user && user.qualifications} value="" /></div>
                            

                        </div>
                    }     </div>
                       
                </div>
                    
            </div></div>

        </>
    );
}

export default Index;




