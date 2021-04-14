/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRef } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addCharacter
// ====================================================

export interface addCharacter_addCharacter_character_owner {
  __typename: "User";
  username: string;
}

export interface addCharacter_addCharacter_character_attributes {
  __typename: "Attributes";
  hp: number | null;
  atk: number | null;
  mov: number | null;
}

export interface addCharacter_addCharacter_character {
  __typename: "Character";
  name: string;
  race: string;
  party: string | null;
  owner: addCharacter_addCharacter_character_owner;
  attributes: addCharacter_addCharacter_character_attributes | null;
}

export interface addCharacter_addCharacter {
  __typename: "AddCharacterPayload";
  character: (addCharacter_addCharacter_character | null)[] | null;
}

export interface addCharacter {
  addCharacter: addCharacter_addCharacter | null;
}

export interface addCharacterVariables {
  name: string;
  race: string;
  owner: UserRef;
}
