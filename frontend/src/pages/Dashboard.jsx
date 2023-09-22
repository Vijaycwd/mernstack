import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    return (
        <div className="container-fluid m-0 p-0 d-flex">
            <Sidebar/>
            <main><p>Dashboard</p></main>
        </div>
    );
};
export default Dashboard;