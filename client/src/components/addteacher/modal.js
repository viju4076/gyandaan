import React, { useState, useEffect } from "react";
import { categories } from "../../categories/index.js";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROFILE, UPDATE_USER } from '../../actions/types';
import { NavLink, Router } from "react-router-dom";

function Modal() {
    
    const skills = [];
    
    for (var i = 0; i < categories.length; i++) {
        skills.push({ id: categories[i].id, skill: categories[i].skill, isSelected: false });
    }
    const [updatedUser, setUpdatedUser] = useState(useSelector(state => state.user.update_user));
    const dispatch = useDispatch();
   
    useEffect(() => {
        fetch('/profile/userkiprofile')
            .then(data => data.json())
            .then(data => {
                console.log('above if statement', data);
                if (data.status == 200) {
                    setUpdatedUser(data.user);
                    console.log("inside profile", data.user);
                   
                }
            })


    }, []);
    console.log("Inside modal",updatedUser);
    const [Categories, setCategories] = useState((updatedUser&&updatedUser.areasOfInterest&&updatedUser.areasOfInterest.length)?updatedUser.areasOfInterest:skills);

    console.log(Categories);
    const [qualifications, setQualifications] = useState(updatedUser.qualifications?updatedUser.qualifications:"");
    // const dispatch = useDispatch();
   
    // //const [user, setUser] = useState(useSelector(state => state.user.update_user));
    // const dispatch = useDispatch();
    
    
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        console.log("Inside handle sumbit", Categories);

        var res = await fetch('/addteacher', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 "qualifications": qualifications, "areasOfInterest": Categories
            })
          });
          res = await res.json();
          setUpdatedUser(res.updatedUser);
          console.log(res.status);
          console.log("New user data ", res.updatedUser);
          if (res.status === "400" || !res.updatedUser) {
            window.alert("Cannot be added as a teacher");
          }
          else {
            window.alert("Added teacher successfully");
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
    const handleClick = (e) => {

        let newCategories = Categories.map(el => (
            el.id == e.target.id ? { ...el, isSelected: !el.isSelected } : el
        ))
        setCategories(newCategories);
        console.log(e.target);

    }





    return (

        <div>
            
              <NavLink to="/home" className="main-navbar" activeClassName="main-nav-active" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">{(updatedUser&&updatedUser.isTeacher)?"Edit skills":"Add as Teacher"}</NavLink>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
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
                                <div class="form-group">
                                    <label for="qualifications_text" class="col-form-label">Qualifications</label>
                                    <textarea class="form-control" id="qualifications_text" value={qualifications} onChange ={(e)=>{setQualifications(e.target.value)}}></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;