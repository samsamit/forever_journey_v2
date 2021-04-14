/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeParty
// ====================================================

export interface removeParty_deleteParty_party {
  __typename: "Party";
  name: string;
}

export interface removeParty_deleteParty {
  __typename: "DeletePartyPayload";
  party: (removeParty_deleteParty_party | null)[] | null;
}

export interface removeParty {
  deleteParty: removeParty_deleteParty | null;
}

export interface removePartyVariables {
  party: string;
}
