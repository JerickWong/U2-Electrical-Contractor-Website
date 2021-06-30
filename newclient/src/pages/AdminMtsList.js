import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import MtsList from './MtsList';
import AdminMts from './AdminMts';

function AdminMtsList() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <AdminNavbar setIsOpen={setIsOpen}/>
            <Route exact path="/AdminMts" render={() => (<AdminMts isOpen={isOpen}/>)}></Route>
        </div>
    );
}

export default AdminMtsList;