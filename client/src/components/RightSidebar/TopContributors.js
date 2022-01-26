import React from 'react';
import './Table.css'
import { Link } from "react-router-dom";

function TopContributors({ users }) {

    return (
        <div >
            <div className='tableHeading'>
                <h2>Top Contributors</h2>
            </div>
            <table class="toprated table table-bordered table-striped mb-0 ">
                <thead>
                    <tr>
                        <th className='th-sm ratedHeading'>Rank</th>
                        <th className='th-sm ratedHeading'>Name</th>
                        <th className='th-sm ratedHeading'>Classes</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((event, index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td> <Link to={"/profile/" + event._id.senderId} >{event._id.name}</Link> </td>
                            <td>{event.totalPosts}</td>

                        </tr>)}
                </tbody>
            </table>
        </div>);









}

export default TopContributors;
