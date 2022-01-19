import { Avatar } from '@material-ui/core'
import { ChatOutlined, SendOutlined, ShareOutlined, ThumbUpSharp } from '@material-ui/icons'
import React, { forwardRef } from 'react'
import InputOption from './InputOption'
import './classPost.css'




const ClassPost = (props) => {
    const handleJoin = () => {
        window.open(props.link, "_blank");
    }
    const dateTime = (date) => {
        var currentdate = new Date();
        var dateStringWithTime = new Date('YYYY-MM-DD HH:MM:SS');
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        return date;
    }
    console.log('posts ke props', props);

    return (
        <div className='post'>
            <div className="post_header">
                <Avatar>{props.name[0]}</Avatar>
                <div className="post_info">
                    <h2>{props.name}</h2>
                    {/* <a href ={props.link} target="_blank">Join Class</a> */}
                    <p>{(props.dateTime)}</p>
                </div>
            </div>
            <div className="post_body" >
                <div className="headingAndTiming" data-toggle="tooltip" title="click to join meet" onClick={handleJoin}>
                    <div className='heading'>
                        <p>{props.heading}</p>
                    </div>
                    <div className='timing'>
                        <p>spam</p>
                    </div>
                </div>
                <div className='description'>
                    <p>{props.description}</p>
                </div>

            </div>
            <div className="post_buttons">
                <InputOption Icon={ThumbUpSharp} title="Like" data-toggle="tooltip" color="gray"></InputOption>
                <InputOption Icon={ChatOutlined} title="Comment" color="gray"></InputOption>
                {/* <InputOption Icon={ShareOutlined} title="Share" color="gray"></InputOption>
                <InputOption Icon={SendOutlined} title="Send" color="gray"></InputOption>
            */}
            </div>
        </div>
    )
}

export default ClassPost
