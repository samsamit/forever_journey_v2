import classes from "*.module.css";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React from "react";
import { useSelector } from "react-redux";
import { IUserState } from "../../GlobalState/Reducers/UserReducer";
import { IRootState } from "../../GlobalState/store";
const useStyle = makeStyles({
  root: {
    margin: 20,
    height: 200,
  },
});
interface IProps {}
export const UserCard = (props: IProps) => {
  const user = useSelector((state: IRootState) => state.user);
  const classes = useStyle();
  return (
    <Card className={classes.root}>
      {user.userInfo ? user.userInfo?.username : "Loading..."}
    </Card>
  );
};
