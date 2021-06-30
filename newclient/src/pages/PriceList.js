import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbars from '../components/Navbar/Navbars';
import Price from './Price'

function PriceList() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Navbars setIsOpen={setIsOpen}/>
            <Route exact path="/Price" render={() => (<Price isOpen={isOpen}/>)}></Route>
        </div>
    );
}

export default PriceList;