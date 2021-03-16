/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_getUser_characters {
  __typename: "Character";
  id: string;
  name: string;
  race: string;
}

export interface getUser_getUser {
  __typename: "User";
  characters: (getUser_getUser_characters | null)[] | null;
}

export interface getUser {
  getUser: getUser_getUser | null;
}

export interface getUserVariables {
  user: string;
}
