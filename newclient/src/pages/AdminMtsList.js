import React, { useState } from 'react';
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
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