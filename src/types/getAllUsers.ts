/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAllUsers
// ====================================================

export interface getAllUsers_queryUser_characters_attributes {
  __typename: "Attributes";
  hp: number | null;
  atk: number | null;
  mov: number | null;
}

export interface getAllUsers_queryUser_characters {
  __typename: "Character";
  id: string;
  name: string;
  race: string;
  attributes: getAllUsers_queryUser_characters_attributes | null;
  party: string | null;
}

export interface getAllUsers_queryUser {
  __typename: "User";
  username: string;
  email: string;
  characters: (getAllUsers_queryUser_characters | null)[] | null;
  parties: (string | null)[];
  role: UserRole;
}

export interface getAllUsers {
  queryUser: (getAllUsers_queryUser | null)[] | null;
}
