import React, { useEffect } from 'react';
import { useState } from 'react';
import './Table.css'
import TableUpcoming from './TableUpcoming';
import TablePast from "./TablePast";
function Table() {
    const [classess, setClassess] = useState();
    const [pastClassess, setPastClassess] = useState();
    const [upcomingClassess, setUpcomingClassess] = useState();
  
    useEffect(() => {
        fetch('/getpost/userkiprofile')
            .then(data => data.json())
            .then(data => {
                //console.log('in get post', data.post);
                if (data.status == 200) {

                    setClassess(data.post);
                    setUpcomingClassess(data.upcoming);
                    setPastClassess(data.past);                   
                    //console.log("*******************************feeds are set and userid=", props.userId);
                    console.log('uli', data.post);
                }
            })
    }, [])

    return(
       <div className="externalClass">
            <TableUpcoming classess={upcomingClassess}/>
            <TablePast classess={pastClassess}/>

            
            
            </div> );   
    
   
}

export default Table;
