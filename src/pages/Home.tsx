import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useSelector } from "react-redux";
import { CharacterCard } from "../components/character/CharacterCard";
import { UserCard } from "../components/user/UserCard";
import { IRootState } from "../GlobalState/store";

interface IProps {}
export const Home = (props: IProps) => {
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
    <Grid container>
      <Grid item sm={10}>
        {characters()}
      </Grid>
      <Grid item sm="auto">
        <UserCard user={user} />
      </Grid>
    </Grid>
  );
};
