import React from "react";
import { NavBar } from "./components/navbar";
import Explore from "./components/pages/explore/Explore";
import Form from "./components/pages/form/Form";
import Maps from "./components/pages/map/Maps";
import How from "./components/pages/how/How";
import Impact from "./components/pages/impact/Impact";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditExplore from "./components/pages/explore/EditExplore";
import MapsInst from "./components/pages/map/MapsInst";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Maps />
          </Route>
          <Route exact path="/maps">
            <MapsInst />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/how">
            <How />
          </Route>
          <Route path="/impact">
            <Impact />
          </Route>
          <Route path="/edit">
            <EditExplore />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
