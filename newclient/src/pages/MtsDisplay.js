import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router} from "react-router-dom";
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import MtsWindow from '../pages/MtsWindow'

export default class MtsDisplay extends Component{
    render(){
        return(
            <Router>
                <Header />
                <Sidebar />
                <MtsWindow />
            </Router>
        );
    }
}