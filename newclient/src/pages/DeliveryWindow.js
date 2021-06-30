import React, { useState } from 'react';
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import Delivery from './Delivery';

function DeliverSummary() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <AdminNavbar setIsOpen={setIsOpen}/>
            <Route exact path="/Deliver" render={() => (<Delivery isOpen={isOpen}/>)}></Route>
        </div>
    );
}

export default DeliverSummary;