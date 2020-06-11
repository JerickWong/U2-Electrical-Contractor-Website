import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import MtsWindow from './MtsWindow';
import Navbars from '../components/Navbar/Navbars';

function Mts() {
    return (
        <Router>
            <div className="mts">
                <Navbars />
                <Switch>
                    <Route path="/" component={MtsWindow}></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Mts;