import React from 'react';
import Intro from './Intro';
import './index.css';
import { UPDATE_USER, LOGGED_IN_USER } from '../../actions/types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";

function Index() {

    const { objectId } = useParams();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        
        fetch(`/profile/${objectId}`)
            .then(data => data.json())
            .then(data => {
                console.log('above if statement', data.user);
                if (data.status == 200) {
                    setUser(data.user);
                    // console.log("*************asdf****************user ki profile", data);
                    dispatch({
                        type: UPDATE_USER, payload: {
                            update_user: data.loggedInUser
                        }
                    });
                    dispatch({
                        type: LOGGED_IN_USER, payload: {
                            user_id: data.loggedInUser._id
                        }
                    });
                }
            })

    }, []);
    return (
        <div>
            {user && <Intro profileUser={user} />}
        </div>
    )
}

export default Index
