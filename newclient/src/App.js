import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginBox from "./components/Login/Login";
import Mts from "./pages/Mts";
import MtsWindowDisplay from "./pages/MtsWindowDisplay";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={LoginBox} />
                    <Route exact path="/Mts" component={Mts} />
                    <Route exact path="/MtsWindow" component={MtsWindowDisplay} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;