import React from 'react';
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import MtsWindow from './MtsWindow';
import Navbars from '../components/Navbar/Navbars';

function MtsWindowDisplay() {
    return (
        <div>
            <Navbars />
            <Route path="/MtsWindow" component={MtsWindow}></Route>
        </div>
    );
}

export default MtsWindowDisplay;