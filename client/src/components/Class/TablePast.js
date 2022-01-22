import React from 'react';
import './Table.css'
function TablePast({classess}) {
  return (
    <div className='table-wrapper-scroll-y my-custom-scrollbar row justify-content-center'>
       
       <div className='tableHeading'>
       <h2>Past Classes</h2>
       </div>
        <table class="table table-bordered table-striped mb-0 ">
            <thead>
                <tr>
                    <th className='th-sm'>ClassName</th>
                    <th className='th-sm'>Teacher</th>
                    <th className='th-sm'>StartTime</th>
                    <th className='th-sm'>Duration</th>
                    <th className='th-sm'>Registered</th>
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
                        <td >
                            <div className="tableRegistered">
                            <div >
                              {event.attendees.length} 
                           </div>
                           <div className="icon fa fa-users"> 
                             
                             </div>
                            
                             </div>
                           
                        </td>
                    </tr>)}
            </tbody>
        </table>
    </div>);


      
    
    



  
}

export default TablePast;
