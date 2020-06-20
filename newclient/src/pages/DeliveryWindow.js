import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import Delivery from './Delivery';

function DeliverSummary() {
    return (
        <div>
            <AdminNavbar />
            <Route exact path="/Deliver" component={Delivery}></Route>
        </div>
    );
}

export default DeliverSummary;