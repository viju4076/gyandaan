import React from 'react'
import Intro from './Intro'
import './index.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Index() {

    const { objectId } = useParams();
    const [user, setUser] = useState('');
    useEffect(() => {
        fetch(`/profile/${objectId}`)
            .then(data => data.json())
            .then(data => {
                console.log('above if statement', data.user);
                if (data.status == 200) {
                    setUser(data.user);
                    console.log("user ki profile", data.user);
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
