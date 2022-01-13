import CreateIcon from '@material-ui/icons/Create';import React, { useEffect, useState } from 'react'
import './index.css'
import ImageIcon from '@material-ui/icons/Image';
import { CalendarToday, CalendarViewDay, EventNote, Subscriptions } from '@material-ui/icons';
import { useSelector } from 'react-redux';
//import { selectUser } from './features/userSlice';
//import FlipMove from 'react-flip-move';
function Index() {
    //const user=useSelector(selectUser);
   const [posts,setPosts]=useState([]);
   const [input,setInput]=useState('');
    useEffect(()=>{
        
    },[])

   const sendPost=(event)=>{
      
       setInput('');
   }

    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon/>
                    <form>
                        <input value={input} onChange={e=>setInput(e.target.value)} type="text"/>
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
               <div className="feed_inputOptions">
                 
                 <button class="btn-primary" >Post</button>
                   {/* <InputOption Icon={ImageIcon} title='Photo' color='#70B5F9'   />
                   <InputOption Icon={Subscriptions} title='Video' color='#E7A33E'   />
                   <InputOption Icon={EventNote} title='Event' color='#C0CBCD'   />
                   <InputOption Icon={CalendarViewDay} title='WriteArticle' color='#7FC15E'   />
               */}
               </div>

            </div>
   {/* <FlipMove>
      {posts.map(({id,data:{name,description,message,photoUrl}})=> <Post
        key={id}
        name={name}
        description={description}
        message={message}
        photoUrl={photoUrl}

      />

      )}
      </FlipMove>
       */}

        {/* <Post name="vijay" description="this is a test" 
            message="This worked"
        /> */}

        </div>
    )
}

export default Index
