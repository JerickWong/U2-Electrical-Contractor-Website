import React, { useState } from 'react';
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import Accounts from './Accounts'

function AccountsDisplay() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <AdminNavbar setIsOpen={setIsOpen}/>
            <Route exact path="/Accounts" render={() => (<Accounts isOpen={isOpen}/>)} ></Route>
        </div>
    );
}

export default AccountsDisplay;