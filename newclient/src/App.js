import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginBox from "./Login";
import MtsDisplay from "./pages/MtsDisplay";

function App(){
    return(
        <Router>
            <div className = "App">
                <Switch>
                    <Route path="/Login" component={LoginBox} />
                    <Route exact path="/MtsDisplay" component={MtsDisplay}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;