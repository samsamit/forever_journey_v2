/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddUserInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addUser
// ====================================================

export interface addUser_addUser_user {
  __typename: "User";
  username: string;
  role: UserRole;
}

export interface addUser_addUser {
  __typename: "AddUserPayload";
  user: (addUser_addUser_user | null)[] | null;
}

export interface addUser {
  addUser: addUser_addUser | null;
}

export interface addUserVariables {
  user: AddUserInput;
}
