import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbars from '../components/Navbar/Navbars';
import MtsList from './MtsList';
import MtsWindow from './MtsWindow'

function Mts() {
    return (
        <div>
            <Navbars />
            <Route exact path="/Mts" component={MtsList}></Route>
            <Route path="/MtsWindow" component={MtsWindow}></Route>
        </div>
    );
}

export default Mts;