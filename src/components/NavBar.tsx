import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { Link } from "react-router-dom";
interface IProps {}
export const NavBar = (props: IProps) => {
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
          <Link to="/character">Character</Link>
          <Link to="/admin">admin</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/">Home</Link>
          <Link to="/">Home</Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
