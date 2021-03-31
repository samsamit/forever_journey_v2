import classes from "*.module.css";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React from "react";
import { IUserState } from "../../GlobalState/Reducers/UserReducer";
const useStyle = makeStyles({
  root: {
    margin: 20,
    height: 200,
  },
});
interface IProps {
  user: IUserState;
}
export const UserCard = (props: IProps) => {
  const { user } = props;
  const classes = useStyle();
  return (
    <Card className={classes.root}>
      {user.userInfo ? user.userInfo?.username : "Loading..."}
    </Card>
  );
};
