/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_deleteUser_user {
  __typename: "User";
  username: string;
}

export interface deleteUser_deleteUser {
  __typename: "DeleteUserPayload";
  user: (deleteUser_deleteUser_user | null)[] | null;
}

export interface deleteUser {
  deleteUser: deleteUser_deleteUser | null;
}

export interface deleteUserVariables {
  username: string;
}
