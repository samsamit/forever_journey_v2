import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { CharacterPage } from "./pages/CharacterPage";
import { AdminPage } from "./pages/AdminPage";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { getTokenData } from "./controllers/authController";
import { NoMatch } from "./pages/NoMatch";
import { useSnackbar } from "notistack";
import { RoleRoute } from "./Util/RoleRoute";
import { UserRole } from "./types/globalTypes";
import { IRootState } from "./GlobalState/store";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER } from "./GlobalState/Reducers/UserReducer";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user);
  if (user.loggedIn) {
    if (!getTokenData(user.token).valid) {
      dispatch({ type: LOGOUT_USER });
      enqueueSnackbar("Auth token is not valid anymore. Please login.", {
        variant: "warning",
      });
    }
  }

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        {user.loggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/character" component={CharacterPage} />
            <RoleRoute
              path="/admin"
              userRole={user.userInfo?.role}
              Component={AdminPage}
              targetRole={[UserRole.ADMIN]}
            />
            <Route path="*" component={NoMatch} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route path="*" component={NoMatch} />
          </Switch>
        )}
      </header>
    </div>
  );
}

export default App;
