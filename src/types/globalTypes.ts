/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CharacterHasFilter {
  attributes = "attributes",
  name = "name",
  owner = "owner",
  party = "party",
  race = "race",
}

export enum UserHasFilter {
  characters = "characters",
  email = "email",
  parties = "parties",
  role = "role",
  username = "username",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface AddUserInput {
  username: string;
  email: string;
  characters?: (CharacterRef | null)[] | null;
  parties: (string | null)[];
  role: UserRole;
  password: string;
}

export interface AttributesRef {
  hp?: number | null;
  atk?: number | null;
  mov?: number | null;
}

export interface CharacterFilter {
  id?: string[] | null;
  has?: (CharacterHasFilter | null)[] | null;
  and?: (CharacterFilter | null)[] | null;
  or?: (CharacterFilter | null)[] | null;
  not?: CharacterFilter | null;
}

export interface CharacterPatch {
  name?: string | null;
  race?: string | null;
  owner?: UserRef | null;
  attributes?: AttributesRef | null;
  party?: string | null;
}

export interface CharacterRef {
  id?: string | null;
  name?: string | null;
  race?: string | null;
  owner?: UserRef | null;
  attributes?: AttributesRef | null;
  party?: string | null;
}

export interface StringHashFilter {
  eq?: string | null;
  in?: (string | null)[] | null;
}

export interface UpdateCharacterInput {
  filter: CharacterFilter;
  set?: CharacterPatch | null;
  remove?: CharacterPatch | null;
}

export interface UpdateUserInput {
  filter: UserFilter;
  set?: UserPatch | null;
  remove?: UserPatch | null;
}

export interface UserFilter {
  username?: StringHashFilter | null;
  role?: UserRole_hash | null;
  has?: (UserHasFilter | null)[] | null;
  and?: (UserFilter | null)[] | null;
  or?: (UserFilter | null)[] | null;
  not?: UserFilter | null;
}

export interface UserPatch {
  email?: string | null;
  characters?: (CharacterRef | null)[] | null;
  parties?: (string | null)[] | null;
  role?: UserRole | null;
  password?: string | null;
}

export interface UserRef {
  username?: string | null;
  email?: string | null;
  characters?: (CharacterRef | null)[] | null;
  parties?: (string | null)[] | null;
  role?: UserRole | null;
  password?: string | null;
}

export interface UserRole_hash {
  eq?: UserRole | null;
  in?: (UserRole | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
