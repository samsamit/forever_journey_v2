import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { CharacterPage } from "./pages/CharacterPage";
import { AdminPage } from "./pages/AdminPage";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/character" component={CharacterPage} />
          <Route exact path="/admin" component={AdminPage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
