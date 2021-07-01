import React from 'react';
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import MtsWindow from './MtsWindow';

function AdminMtsWindow() {
    return (
        <div>
            <AdminNavbar />
            <Route exact path="/AdminMtsWindow" component={MtsWindow}></Route>
        </div>
    );
}

export default AdminMtsWindow;