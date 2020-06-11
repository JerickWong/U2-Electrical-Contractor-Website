import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faClipboardList, faTags, faStickyNote} from "@fortawesome/free-solid-svg-icons";
import '../../styles/navbar.css';

export const Sidebar = () => (
        <div className="sidenav">
            <a href="#" className="features"><FontAwesomeIcon icon = {faFileAlt}/>New MTS</a>
            <a href="#" className="features"><FontAwesomeIcon icon = {faClipboardList}/>MTS List</a>
            <a href="#" className="features"><FontAwesomeIcon icon = {faStickyNote}/>New Quotation</a>
            <a href="#" className="features"><FontAwesomeIcon icon = {faTags}/>Price List</a>
        </div>
   
)