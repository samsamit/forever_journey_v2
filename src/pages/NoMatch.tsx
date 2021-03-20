import { useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { IRootState } from "../GlobalState/store";
interface IProps {}
export const NoMatch = (props: IProps) => {
  const LoggedIn = useSelector((state: IRootState) => state.user.loggedIn);
  if (!LoggedIn) return <Redirect to="/login" />;
  return <div>404 Not found?!?!</div>;
};
