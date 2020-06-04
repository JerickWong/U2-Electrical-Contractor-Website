import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header} from './components/Header';

class MtsWindow extends Component{
    render() {
        return(
            <div>
                <Header />
            </div>
        );
    }
}

ReactDOM.render(
    <MtsWindow />, document.getElementById("header")
);