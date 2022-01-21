import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Searchbar from '../Navbar/Searchbar'
import Table from './Table';
function Index() {

    return (
        <div>
            <div>
                <Navbar />
                <div className='searchcomponent' style={{ top: "0" }}>
                    <Searchbar />
                </div>
            </div>

            <Table />
        </div>);
}

export default Index;
