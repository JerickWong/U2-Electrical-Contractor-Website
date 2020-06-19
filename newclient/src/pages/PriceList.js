import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbars from '../components/Navbar/Navbars';
import Price from './Price'

function PriceList() {
    return (
        <div>
            <Navbars/>
            <Route exact path="/Price" component={Price}></Route>
        </div>
    );
}

export default PriceList;