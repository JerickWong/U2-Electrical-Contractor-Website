import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import MtsList from './MtsList';

function AdminMts() {
    return (
        <div>
            <AdminNavbar />
            <Route exact path="/AdminMts" component={MtsList}></Route>
        </div>
    );
}

export default AdminMts;