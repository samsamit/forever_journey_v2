/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: login
// ====================================================

export interface login_login_user_characters_attributes {
  __typename: "Attributes";
  hp: number | null;
  atk: number | null;
  mov: number | null;
}

export interface login_login_user_characters {
  __typename: "Character";
  name: string;
  race: string;
  id: string;
  party: string | null;
  attributes: login_login_user_characters_attributes | null;
}

export interface login_login_user {
  __typename: "User";
  username: string;
  email: string;
  role: UserRole;
  parties: (string | null)[];
  characters: (login_login_user_characters | null)[] | null;
}

export interface login_login {
  __typename: "LoginPayload";
  user: login_login_user | null;
  token: string | null;
  error: string | null;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  username: string;
  password: string;
}
