import {
  Card,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  makeStyles,
} from "@material-ui/core";
import AccountCircleIcon from "mdi-react/AccountCircleIcon";
import AtIcon from "mdi-react/AtIcon";
import LockIcon from "mdi-react/LockIcon";
import LockOutlineIcon from "mdi-react/LockOutlineIcon";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import { SIGNUP } from "../controllers/authController";
import { singup, singupVariables } from "../types/singup";

const useStyles = makeStyles({
  margin: {
    margin: "20px",
  },
});

export const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [signUp, { loading, error, data }] = useMutation<
    singup,
    singupVariables
  >(SIGNUP);
  const [confpasswordError, setconfpasswordError] = useState<string | null>(
    null
  );
  const [formData, setformData] = useState<singupVariables>({
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  const handleChange = (e: any) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setconfpasswordError(null);
    console.log(formData);
    if (formData.password === formData.password2)
      signUp({ variables: formData });
    else setconfpasswordError("Passwords dont match!");
  };

  if (data?.signup.token) {
    enqueueSnackbar(`SignUp succesfull! Welcome ${data?.signup.username}`, {
      variant: "success",
    });
    window.localStorage.setItem("token", data?.signup.token);
    return <Redirect to="/" />;
  }
  if (error) {
    enqueueSnackbar(error, { variant: "error" });
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="h3">Sign Up</Typography>
          <TextField
            required
            className={classes.margin}
            id="username"
            label="Username"
            variant="outlined"
            onChange={handleChange}
            error={data?.signup.errors?.username ? true : false}
            helperText={data?.signup.errors?.username}
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
            type="password"
            variant="outlined"
            error={data?.signup.errors?.password ? true : false}
            helperText={data?.signup.errors?.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button color="primary" variant="outlined" type="submit">
            SignUp
          </Button>
        </Grid>
      </form>
    </Card>
  );
};
