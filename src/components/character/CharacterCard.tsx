import { useMutation } from "@apollo/client";
import { Card, makeStyles } from "@material-ui/core";
import React from "react";
import { CHARACTERS_DELETE } from "../../controllers/character/characterController";
import {
  deleteCharacter,
  deleteCharacterVariables,
} from "../../types/deleteCharacter";
import { CharacterRef } from "../../types/globalTypes";

const useStyles = makeStyles({
  root: {
    margin: 20,
    width: "100%",
    height: 80,
    display: "inline-block",
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
        {character.name + " - " + character.race}
      </Card>
    );
  else {
    return <Card className={classes.root}>"Loading..."</Card>;
  }
};
