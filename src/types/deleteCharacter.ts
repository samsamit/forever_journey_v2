/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteCharacter
// ====================================================

export interface deleteCharacter_deleteCharacter_character {
  __typename: "Character";
  name: string;
}

export interface deleteCharacter_deleteCharacter {
  __typename: "DeleteCharacterPayload";
  character: (deleteCharacter_deleteCharacter_character | null)[] | null;
}

export interface deleteCharacter {
  deleteCharacter: deleteCharacter_deleteCharacter | null;
}

export interface deleteCharacterVariables {
  id: string;
}
