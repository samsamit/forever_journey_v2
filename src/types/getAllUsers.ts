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
  race: string;
  name: string;
  attributes: getAllUsers_queryUser_characters_attributes | null;
}

export interface getAllUsers_queryUser {
  __typename: "User";
  username: string;
  role: UserRole;
  email: string;
  characters: (getAllUsers_queryUser_characters | null)[] | null;
}

export interface getAllUsers {
  queryUser: (getAllUsers_queryUser | null)[] | null;
}
