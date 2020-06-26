import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import Accounts from './Accounts'

function AccountsDisplay() {
    return (
        <div>
            <AdminNavbar/>
            <Route exact path="/Accounts" component={Accounts}></Route>
        </div>
    );
}

export default AccountsDisplay;