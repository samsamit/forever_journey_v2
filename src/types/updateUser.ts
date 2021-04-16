/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_user_characters_attributes {
  __typename: "Attributes";
  atk: number | null;
  hp: number | null;
  mov: number | null;
}

export interface updateUser_updateUser_user_characters {
  __typename: "Character";
  attributes: updateUser_updateUser_user_characters_attributes | null;
  id: string;
  name: string;
  party: string | null;
  race: string;
}

export interface updateUser_updateUser_user {
  __typename: "User";
  email: string;
  parties: (string | null)[];
  role: UserRole;
  username: string;
  characters: (updateUser_updateUser_user_characters | null)[] | null;
}

export interface updateUser_updateUser {
  __typename: "UpdateUserPayload";
  user: (updateUser_updateUser_user | null)[] | null;
}

export interface updateUser {
  updateUser: updateUser_updateUser | null;
}

export interface updateUserVariables {
  patch: UpdateUserInput;
}
