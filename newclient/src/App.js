import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginBox from "./components/Login/Login";
import Mts from "./pages/Mts";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" component={LoginBox} />
                    <Route exact path="/Mts" component={Mts} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;