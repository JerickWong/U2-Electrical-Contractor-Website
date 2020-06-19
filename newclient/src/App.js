import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginBox from "./components/Login/Login";
import Mts from "./pages/Mts";
import MtsWindowDisplay from "./pages/MtsWindowDisplay";
import PriceList from "./pages/PriceList";
import AdminPriceList from "./pages/AdminPriceList";
import AdminMts from "./pages/AdminMtsList";
import AdminMtsWindow from "./pages/AdminMtsWindow";
import DeliverSummary from "./pages/DeliveredSummary";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={LoginBox} />
                    <Route exact path="/Mts" component={Mts} />
                    <Route exact path="/MtsWindow" component={MtsWindowDisplay} />
                    <Route exact path="/Price" component={PriceList} />
                    <Route exact path="/AdminPrice" component={AdminPriceList} />
                    <Route exact path="/AdminMts" component={AdminMts}/>
                    <Route exact path="/Deliver" component={DeliverSummary}/>
                    <Route exact path="/AdminMtsWindow" component={AdminMtsWindow}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;