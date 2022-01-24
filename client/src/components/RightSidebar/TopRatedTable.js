import React from 'react';
import './Table.css'
import { Link } from "react-router-dom";
function TopRatedTable({ users }) {

    return (
        <div >
            <div className='tableHeading'>
                <h2>Top Rated Users</h2>
            </div>
            <table class="toprated table table-bordered table-striped mb-0 ">
                <thead>
                    <tr>
                        <th className='th-sm ratedHeading'>Rank</th>
                        <th className='th-sm ratedHeading'>name</th>
                        <th className='th-sm ratedHeading'>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((event, index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td> <Link to={"/profile/" + event._id} >{event.username}</Link> </td>
                            <td>{event.globalRating}</td>

                        </tr>)}
                </tbody>
            </table>
        </div>);









}

export default TopRatedTable;
