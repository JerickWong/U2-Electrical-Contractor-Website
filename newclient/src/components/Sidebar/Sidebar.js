import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faClipboardList, faTags, faStickyNote} from "@fortawesome/free-solid-svg-icons";
import '../../styles/navbar.css';
import MtsList from '../../pages/MtsList'
import Mts from '../../containers/Mts'

const Sidebar = () => (
        <div className="sidenav">
            <Link to='/new-MTS' className="features"><FontAwesomeIcon icon = {faFileAlt}/>New MTS</Link>
            <Link to='/MtsList' className="features"><FontAwesomeIcon icon = {faClipboardList}/>MTS List</Link>
            <Link to='/' className="features"><FontAwesomeIcon icon = {faStickyNote}/>New Quotation</Link>
            <Link to='/' className="features"><FontAwesomeIcon icon = {faTags}/>Price List</Link>

            <Route path='/new-MTS' exact component={Mts} />
            <Route path='/MTSList' exact component={MtsList} />
        </div>
   
)

export default Sidebar