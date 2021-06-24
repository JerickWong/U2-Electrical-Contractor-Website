import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Cost from "./Cost";

function CostDisplay() {
  return (
    <div>
      <AdminNavbar />
      <Route exact path="/Cost" component={Cost}></Route>
    </div>
  );
}

export default CostDisplay;
