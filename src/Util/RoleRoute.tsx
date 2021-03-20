import { useSnackbar } from "notistack";
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getTokenData } from "../controllers/authController";
import { UserRole } from "../types/globalTypes";

interface IProps {
  Component: React.ComponentClass<any> | React.StatelessComponent<any>;
  path: string;
  userRole?: UserRole | null;
  targetRole: Array<UserRole>;
}

export const RoleRoute = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { path, Component, targetRole, userRole } = props;
  const correctRole = userRole && targetRole.includes(userRole);
  if (!correctRole)
    enqueueSnackbar("You dont have the privilege to see this page!", {
      variant: "warning",
    });
  return (
    <Route
      path={path}
      render={(props) =>
        correctRole ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
