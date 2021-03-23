/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_user_characters {
  __typename: "Character";
  name: string;
  race: string;
}

export interface updateUser_updateUser_user {
  __typename: "User";
  username: string;
  role: UserRole;
  email: string;
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