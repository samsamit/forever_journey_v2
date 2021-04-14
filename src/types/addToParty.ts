/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CharacterRef } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addToParty
// ====================================================

export interface addToParty_updateParty_party {
  __typename: "Party";
  name: string;
}

export interface addToParty_updateParty {
  __typename: "UpdatePartyPayload";
  party: (addToParty_updateParty_party | null)[] | null;
}

export interface addToParty {
  updateParty: addToParty_updateParty | null;
}

export interface addToPartyVariables {
  party: string;
  characterId: CharacterRef;
}
