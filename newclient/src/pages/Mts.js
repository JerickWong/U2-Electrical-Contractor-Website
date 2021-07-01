import React, { useState } from 'react';
import { Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbars from '../components/Navbar/Navbars';
import MtsList from './MtsList';
import MtsWindow from './MtsWindow'

function Mts() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Navbars  setIsOpen={setIsOpen}/>
            <Route exact path="/Mts" render={() => (<MtsList isOpen={isOpen}/>)}></Route>
            <Route path="/MtsWindow" component={MtsWindow}></Route>
        </div>
    );
}

export default Mts;