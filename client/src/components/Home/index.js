import React, { useEffect, useState } from 'react';
import { UPDATE_USER, LOGGED_IN_USER } from '../../actions/types';
import { useSelector, useDispatch } from "react-redux";
import Navbar from '../Navbar/Navbar';
import Sidebar from "../Sidebar";
import Post from "../Post";
import RenderPost from '../Post/RenderPost';
import "./index.css";
import Searchbar from "../Navbar/Searchbar";
function Home() {
    // const [user, setUser]= useState({email: 'xyz'});
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch('/profile/userkiprofile')
            .then(data => data.json())
            .then(data => {
                console.log('above if statement', data);
                if (data.status == 200) {
                    setUser(data.user);
                    console.log("inside profile", data.user);
                    dispatch({
                        type: UPDATE_USER, payload: {
                            update_user: data.user
                        }
                    });
                    dispatch({
                        type: LOGGED_IN_USER, payload: {
                            user_id: data.user._id
                        }
                    });
                    

                }
            })


    }, []);
    return (
        <div>
            <Navbar />
            <div className='searchcomponent'>
                <Searchbar />
            </div>
            <div className="externalHome">
                <div className='internal1'>
                    <Sidebar />
                </div>


                <div className='internal2'>
                    <div className='postGenerator'>
                        {user&&user.isTeacher && <Post />}
                    </div>

                    <div className='feeds'>
                       {user&& <RenderPost userId= {user._id}/>}
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Home
