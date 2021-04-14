import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useSelector } from "react-redux";
import { CharacterCard } from "../components/character/CharacterCard";
import { CharacterList } from "../components/character/CharacterList";
import { UserCard } from "../components/user/UserCard";
import { IRootState } from "../GlobalState/store";
const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});
interface IProps {}
export const Home = (props: IProps) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="space-around"
      alignItems="stretch"
    >
      <Grid item xs={10}>
        <CharacterList />
      </Grid>
      <Grid item xs={2}>
        <UserCard />
      </Grid>
    </Grid>
  );
};
