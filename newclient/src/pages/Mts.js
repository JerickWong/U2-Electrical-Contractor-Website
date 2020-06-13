import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import MtsWindow from './MtsWindow';
import Navbars from '../components/Navbar/Navbars';
import MtsList from './MtsList';

function Mts() {
    return (
        <Router>
            <Navbars />
            <Switch>
                <Route exact path="/Mts" component={MtsWindow}></Route>
                <Route exact path="/MtsList" component={MtsList}></Route>
            </Switch>
        </Router>
    );
}

export default Mts;