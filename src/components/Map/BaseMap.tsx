import classes from "*.module.css";
import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    width: 500,
    height: 500,
    backgroundColor: "white",
  },
});

interface IProps {}
export const BaseMap = (props: IProps) => {
  const classes = useStyles();

  const testTiles = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ];

  return <div className={classes.container}></div>;
};
