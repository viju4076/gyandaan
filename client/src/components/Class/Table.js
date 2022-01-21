import React, { useEffect } from 'react';
import { useState } from 'react';
import './Table.css'
function Table() {
    const [classess, setClassess] = useState();
    useEffect(() => {
        fetch('/getpost/userkiprofile')
            .then(data => data.json())
            .then(data => {
                //console.log('in get post', data.post);
                if (data.status == 200) {

                    setClassess(data.post);
                    //console.log("*******************************feeds are set and userid=", props.userId);
                    console.log('uli', data.post);
                }
            })
    }, [])

    return <div className='table-wrapper-scroll-y my-custom-scrollbar row justify-content-center'>
        <table class="table table-bordered table-striped mb-0 ">
            <thead>
                <tr>
                    <th className='th-sm'>ClassName</th>
                    <th className='th-sm'>Teacher</th>
                    <th className='th-sm'>StartTime</th>
                    <th className='th-sm'>Duration</th>
                    <th className='th-sm'>Status</th>
                </tr>
            </thead>
            <tbody>
                {/*heading
name
startDate
endDate
link*/ }
                {classess && classess.map(event =>
                    <tr>
                        <td>{event.heading}</td>
                        <td>{event.name}</td>
                        <td>{event.formattedStartDate}</td>
                        <td>{event.duration} hours</td>
                        <td>{event.link}</td>
                    </tr>)}
            </tbody>
        </table>
    </div>;
}

export default Table;
