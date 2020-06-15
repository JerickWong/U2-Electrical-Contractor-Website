import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbars from '../components/Navbar/Navbars';
import MtsList from './MtsList';

function Mts() {
    return (
        <div>
            <Navbars />
            <Route exact path="/Mts" component={MtsList}></Route>
        </div>
    );
}

export default Mts;