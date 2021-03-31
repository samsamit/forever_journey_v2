import classes from "*.module.css";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useSelector } from "react-redux";
import { CharacterCard } from "../components/character/CharacterCard";
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
  const user = useSelector((state: IRootState) => state.user);

  const characters = () => {
    let cards;
    if (user.userInfo?.characters) {
      cards = user.userInfo!.characters!.map((character) => (
        <CharacterCard character={character!} />
      ));
    } else cards = <Card>"No characters"</Card>;
    return <>{cards}</>;
  };
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="space-around"
      alignItems="stretch"
    >
      <Grid item xs={10}>
        {characters()}
      </Grid>
      <Grid item xs={2}>
        <UserCard user={user} />
      </Grid>
    </Grid>
  );
};
