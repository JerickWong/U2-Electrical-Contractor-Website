import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import DeliverSum from './DeliverSum';

function DeliverSummary() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <AdminNavbar setIsOpen={setIsOpen}/>
            <Route exact path="/DeliverSummary" render={() => (<DeliverSum isOpen={isOpen}/>)}></Route>
        </div>
    );
}

export default DeliverSummary;