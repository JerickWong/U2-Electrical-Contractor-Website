import {React, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faClipboardList, faTags, faStickyNote} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/navbar.css';

export default class Sidebar extends Component {
    render(){
        return(
        <Router>
            <div className="sidenav">
                <a className="features"><FontAwesomeIcon icon = {faFileAlt}/>New MTS</a>
                <a className="features"><FontAwesomeIcon icon = {faClipboardList}/>MTS List</a>
                <a className="features"><FontAwesomeIcon icon = {faStickyNote}/>New Quotation</a>
                <a className="features"><FontAwesomeIcon icon = {faTags}/>Price List</a>
            </div>
        </Router>
        );
    }
}
