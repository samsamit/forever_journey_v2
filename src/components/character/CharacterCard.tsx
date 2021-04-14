import { Card, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { CharacterRef } from "../../types/globalTypes";
import { PartySelect } from "./PartySelect";
import { RemovePartyButton } from "./RemovePartyButton";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    padding: 20,
    width: "100%",
    height: 80,
    display: "inline-block",
    backgroundColor: "#3da813",
  },
});
interface IProps {
  character?: CharacterRef;
}

export const CharacterCard = (props: IProps) => {
  const classes = useStyles();
  const { character } = props;
  if (character)
    return (
      <Card className={classes.root}>
        <Grid container>
          <Grid item>{character.name + " - " + character.race}</Grid>
          <Grid item>
            {character.party ? (
              <RemovePartyButton characterId={character.id!} />
            ) : (
              <PartySelect character={character} />
            )}
          </Grid>
        </Grid>
      </Card>
    );
  else {
    return <Card className={classes.root}>"Loading..."</Card>;
  }
};
