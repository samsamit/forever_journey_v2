import { Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
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
import Grid from "@material-ui/core/Grid";
import { BaseMap } from "./components/Map/BaseMap";
import { AdventurePage } from "./pages/AdventurePage";

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
    <Grid
      style={{ height: "100%" }}
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid item xs={"auto"}>
        <NavBar />
      </Grid>
      <Grid item xs={true}>
        {user.loggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <RoleRoute
              path="/admin"
              userRole={user.userInfo?.role}
              Component={AdminPage}
              targetRole={[UserRole.ADMIN]}
            />
            <Route exact path="/adventure" component={AdventurePage} />
            <Route path="*" component={NoMatch} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />

            <Route path="*" component={NoMatch} />
          </Switch>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
