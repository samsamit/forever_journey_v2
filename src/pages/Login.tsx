import { useLazyQuery } from "@apollo/client";
import {
  Card,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import AccountCircleIcon from "mdi-react/AccountCircleIcon";
import LockIcon from "mdi-react/LockIcon";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { LOGIN } from "../controllers/authController";
import { LOGIN_USER } from "../GlobalState/Reducers/UserReducer";
import { login, loginVariables } from "../types/login";

const useStyles = makeStyles({
  margin: {
    margin: "20px",
  },
});

export const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [login, { loading, error, data }] = useLazyQuery<login, loginVariables>(
    LOGIN
  );
  const [formData, setformData] = useState<loginVariables>({
    password: "admin6",
    username: "admin",
  });

  const handleChange = (e: any) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    login({ variables: formData });
  };

  useEffect(() => {
    if (data?.login.token) {
      console.log(data.login);
      enqueueSnackbar(
        `Login succesfull! Welcome ${data?.login.user?.username}`,
        {
          variant: "success",
        }
      );
      dispatch({
        type: LOGIN_USER,
        data: { user: data.login.user, token: data.login.token },
      });
      history.push("/");
    }
  }, [data, login]);

  if (error) {
    enqueueSnackbar(error, { variant: "error" });
  }

  return (
    <Card>
      {loading && <LinearProgress />}
      <form onSubmit={onSubmit}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="h3">Login</Typography>
          <TextField
            required
            className={classes.margin}
            id="username"
            label="Username"
            variant="outlined"
            onChange={handleChange}
            value={formData.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            className={classes.margin}
            id="password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            variant="outlined"
            error={data?.login.error ? true : false}
            helperText={data?.login.error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button color="primary" variant="outlined" type="submit">
            Login
          </Button>
          <Link to="/signup">
            <Typography variant="h6">Signup</Typography>
          </Link>
        </Grid>
      </form>
    </Card>
  );
};
