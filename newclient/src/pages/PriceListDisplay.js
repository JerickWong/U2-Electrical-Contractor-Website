import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import PriceList from './PriceList'

function Mts() {
    return (
        <div>
            <AdminNavbar/>
            <Route exact path="/Price" component={PriceList}></Route>
        </div>
    );
}

export default Mts;