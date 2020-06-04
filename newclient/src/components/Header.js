import React, {Component} from 'react';
import { Navbar } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

export class Header extends Component{
    render(){
        return(
            <Navbar expand="lg">
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
        );
    }
}
