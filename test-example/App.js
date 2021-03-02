import "./App.css";
import AuthUser from "./components/pages/AuthUser";
import FormInput from "./components/pages/FormInput";
import UnAuth from "./components/pages/UnAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/pages/navBar/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <UnAuth />
        </Route>
        <Route exact path="/form">
          <FormInput />
        </Route>
        <Route exact path="/auth-user">
          <AuthUser />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
