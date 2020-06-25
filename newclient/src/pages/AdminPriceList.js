import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import AdminPrice from './AdminPrice'

function AdminPriceList() {
    return (
        <div>
            <AdminNavbar/>
            <Route exact path="/AdminPrice" component={AdminPrice}></Route>
        </div>
    );
}

export default AdminPriceList;