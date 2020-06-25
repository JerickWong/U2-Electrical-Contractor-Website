import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import MtsList from './MtsList';
import AdminMts from './AdminMts';

function AdminMtsList() {
    return (
        <div>
            <AdminNavbar />
            <Route exact path="/AdminMts" component={AdminMts}></Route>
        </div>
    );
}

export default AdminMtsList;