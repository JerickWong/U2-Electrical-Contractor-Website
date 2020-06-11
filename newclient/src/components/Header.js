import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { Navbar } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import '../styles/navbar.css';

export default class Header extends Component{
render(){
    return(
    <Router>
        <Navbar className="navbar" expand="lg" sticky="top">
            <FontAwesomeIcon icon={faAngleLeft}/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Logged in as: Employee
                    </Navbar.Text>
                    <Navbar.Text>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                    </Navbar.Text>
                </Navbar.Collapse>
        </Navbar> 
    </Router>  
    );
    }
}
