import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import MtsWindow from './MtsWindow';
import Navbars from '../components/Navbar/Navbars';

function MtsWindowDisplay() {
    return (
        <div>
            <Navbars />
            <Route exact path="/MtsWindow" component={MtsWindow}></Route>
        </div>
    );
}

export default MtsWindowDisplay;