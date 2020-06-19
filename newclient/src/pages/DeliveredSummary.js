import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import DeliverSum from './DeliverSum';

function DeliverSummary() {
    return (
        <div>
            <AdminNavbar />
            <Route exact path="/Deliver" component={DeliverSum}></Route>
        </div>
    );
}

export default DeliverSummary;