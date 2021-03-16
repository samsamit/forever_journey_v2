import { useMutation } from "@apollo/client";
import React from "react";
import { CHARACTERS_DELETE } from "../../controllers/character/characterController";
import {
  deleteCharacter,
  deleteCharacterVariables,
} from "../../types/deleteCharacter";
import { CharacterRef } from "../../types/globalTypes";

interface IProps {
  character: CharacterRef;
}

export const CharacterCard = (props: IProps) => {
  const [deleteCharacter, { data, error, loading }] = useMutation<
    deleteCharacter,
    deleteCharacterVariables
  >(CHARACTERS_DELETE);
  const { character } = props;
  if (!character) {
    return <p>Error</p>;
  }
  if (error) console.log(error);
  return (
    <div style={{ height: 100 }}>
      <h4>
        {character.name || "null"} - {character.race || "null"}
      </h4>
      <button
        style={{ float: "right" }}
        onClick={() => deleteCharacter({ variables: { id: character.id! } })}
      >
        {loading ? "Loading" : "Del"}
      </button>
    </div>
  );
};
