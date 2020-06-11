import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Header} from './components/Header/Header';
import {Sidebar} from './components/Sidebar/Sidebar';

export default class MtsDisplay extends Component{
    render(){
        return(
            <React.Fragment>
                <Router>
                    <Route path = "/Header">
                        <Header />
                    </Route>
                    <Route path = "/Sidebar">
                        <Sidebar />
                    </Route>
                </Router>
            </React.Fragment>
        );
    }
}