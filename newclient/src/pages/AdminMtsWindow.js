import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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