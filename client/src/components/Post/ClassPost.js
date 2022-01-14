import { Avatar } from '@material-ui/core'
import { ChatOutlined, SendOutlined, ShareOutlined, ThumbUpSharp } from '@material-ui/icons'
import React,{forwardRef} from 'react'
import InputOption from './InputOption'
import './classPost.css'
const ClassPost = (props) => {
    console.log(props);
    return (
        <div className='post'>
            <div className="post_header">
                <Avatar>{props.name[0]}</Avatar>
                <div className="post_info">
                    <h2>{props.name}</h2>
                    <a href ={props.link} target="_blank">Join Class</a>
                </div>   
            </div>
            <div className="post_body">
                <p>{props.description}</p>
            </div>
            <div className="post_buttons">
                <InputOption Icon={ThumbUpSharp} title="Like" color="gray"></InputOption>
                <InputOption Icon={ChatOutlined} title="Comment" color="gray"></InputOption>
                {/* <InputOption Icon={ShareOutlined} title="Share" color="gray"></InputOption>
                <InputOption Icon={SendOutlined} title="Send" color="gray"></InputOption>
            */}
            </div>
        </div>
    )
}

export default ClassPost
