import { useMutation } from "@apollo/client";
import { Card } from "@material-ui/core";
import React from "react";
import { CHARACTERS_DELETE } from "../../controllers/character/characterController";
import {
  deleteCharacter,
  deleteCharacterVariables,
} from "../../types/deleteCharacter";
import { CharacterRef } from "../../types/globalTypes";

interface IProps {
  character?: CharacterRef;
}

export const CharacterCard = (props: IProps) => {
  const { character } = props;
  if (character) return <Card>{character.name + " - " + character.race}</Card>;
  else {
    return <Card>"Loading..."</Card>;
  }
};
