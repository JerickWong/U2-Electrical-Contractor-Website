import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import MtsDisplay from "./MtsDisplay";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/MtsDisplay" component={MtsDisplay} />
                </Switch>
            </Router>
        )
    }
}