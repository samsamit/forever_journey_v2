/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCharacterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editCharacter
// ====================================================

export interface editCharacter_updateCharacter_character {
  __typename: "Character";
  name: string;
  race: string;
}

export interface editCharacter_updateCharacter {
  __typename: "UpdateCharacterPayload";
  character: (editCharacter_updateCharacter_character | null)[] | null;
}

export interface editCharacter {
  updateCharacter: editCharacter_updateCharacter | null;
}

export interface editCharacterVariables {
  patch: UpdateCharacterInput;
}
