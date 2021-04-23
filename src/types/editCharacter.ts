/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCharacterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editCharacter
// ====================================================

export interface editCharacter_updateCharacter_character_attributes {
  __typename: "Attributes";
  hp: number | null;
  atk: number | null;
  mov: number | null;
}

export interface editCharacter_updateCharacter_character {
  __typename: "Character";
  id: string;
  name: string;
  race: string;
  attributes: editCharacter_updateCharacter_character_attributes | null;
  party: string | null;
  avatarPath: string | null;
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
