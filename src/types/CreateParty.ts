/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRef } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateParty
// ====================================================

export interface CreateParty_addParty_party {
  __typename: "Party";
  name: string;
}

export interface CreateParty_addParty {
  __typename: "AddPartyPayload";
  party: (CreateParty_addParty_party | null)[] | null;
}

export interface CreateParty {
  addParty: CreateParty_addParty | null;
}

export interface CreatePartyVariables {
  name: string;
  owner: UserRef;
}
