import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginBox from "./components/Login/Login";
import MtsDisplay from "./pages/MtsDisplay";

function App(){
    return(
        <Router>
            <div className = "App">
                <Switch>
                    <Route path="/MtsDisplay" component={MtsDisplay} />
                    <Route path="/" exact component={LoginBox} />                    
                </Switch>
            </div>
        </Router>
    );
}

export default App;