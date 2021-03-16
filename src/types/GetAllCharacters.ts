/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllCharacters
// ====================================================

export interface GetAllCharacters_getUser_characters {
  __typename: "Character";
  id: string;
  name: string;
  race: string;
}

export interface GetAllCharacters_getUser {
  __typename: "User";
  characters: (GetAllCharacters_getUser_characters | null)[] | null;
}

export interface GetAllCharacters {
  getUser: GetAllCharacters_getUser | null;
}

export interface GetAllCharactersVariables {
  user: string;
}
