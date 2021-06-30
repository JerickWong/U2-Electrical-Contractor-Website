import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import AdminPrice from './AdminPrice'

function AdminPriceList() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <AdminNavbar setIsOpen={setIsOpen}/>
            <Route exact path="/AdminPrice" render={() => (<AdminPrice isOpen={isOpen}/>)}></Route>
        </div>
    );
}

export default AdminPriceList;