/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListChars
// ====================================================

export interface ListChars_getUser_characters {
  __typename: "Character";
  name: string;
  race: string;
}

export interface ListChars_getUser {
  __typename: "User";
  characters: (ListChars_getUser_characters | null)[];
}

export interface ListChars {
  getUser: ListChars_getUser | null;
}

export interface ListCharsVariables {
  user: string;
}
