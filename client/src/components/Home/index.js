import React, { useEffect, useState } from 'react';
import { UPDATE_USER } from '../../actions/types';
import { useSelector, useDispatch } from "react-redux";
import Navbar from '../Navbar/Navbar';
import Sidebar from "../Sidebar";
import Post from "../Post";
import RenderPost from '../Post/RenderPost';
import "./index.css";
function Home() {
    // const [user, setUser]= useState({email: 'xyz'});
    const [user, setUser] = useState(useSelector(state => state.user.update_user));
    const dispatch = useDispatch();
    useEffect(() => {
        fetch('/profile')
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

                }
            })


    }, []);
    return (
        <div>
            <Navbar />
            <div className="external">
                <div className='internal1'>
                    <Sidebar />
                </div>

                <div className='internal2'>
                    <div className='postGenerator'>
                    {user.isTeacher && <Post />}
                    </div>
                    
                    <div className='feeds'>
                    <RenderPost />
                    </div>
                    
                </div>


            </div>

        </div>
    )
}

export default Home
