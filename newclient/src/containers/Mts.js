import React from 'react';
import {Header} from '../components/Header/Header';
import {Sidebar} from '../components/Sidebar/Sidebar';
import { BrowserRouter } from 'react-router-dom';

export default class Mts extends Component{
    render(){
        return(
            <BrowserRouter>
                <Header/>
                <Sidebar/>
            </BrowserRouter>                            
        );
    }
}