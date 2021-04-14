import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT_USER } from "../GlobalState/Reducers/UserReducer";
import { IRootState } from "../GlobalState/store";
interface IProps {}
export const NavBar = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const LoggedIn = useSelector((state: IRootState) => state.user.loggedIn);
  const dispatch = useDispatch();
  const logoutEvent = () => {
    dispatch({ type: LOGOUT_USER });
    enqueueSnackbar("Logged out succesfully", {
      variant: "success",
    });
  };
  if (LoggedIn) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Link to="/">Home</Link>
            <Link to="/admin">admin</Link>
            <Link to="/adventure">Adventure</Link>
            <Button onClick={logoutEvent}>Logout</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  } else {
    return <></>;
  }
};
