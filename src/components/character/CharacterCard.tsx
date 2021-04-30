import { Avatar, Card, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { CharacterRef } from "../../types/globalTypes";
import { PartySelect } from "../Party/PartySelect";
import { RemovePartyButton } from "../Party/RemovePartyButton";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: "100%",
    padding: "0 10px 0 10px ",
    height: 80,
    display: "inline-block",
    backgroundColor: "#3da813",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
interface IProps {
  character?: CharacterRef;
}

export const CharacterCard = (props: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { character } = props;

  const charUpdate = (char: CharacterRef) => {
    console.table(char);
  };

  if (character)
    return (
      <Card className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={4}>
            {" "}
            {character.name + " - " + character.race}
          </Grid>
          <Grid item xs={4}>
            {character.party ? (
              <RemovePartyButton characterId={character.id!} />
            ) : (
              <PartySelect character={character} />
            )}
          </Grid>
          <Grid item>
            {character.avatarPath && (
              <Avatar className={classes.avatar} src={character.avatarPath} />
            )}
          </Grid>
        </Grid>
      </Card>
    );
  else {
    return <Card className={classes.root}>"Loading..."</Card>;
  }
};
