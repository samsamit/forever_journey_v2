/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CharacterRef } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: removeFromParty
// ====================================================

export interface removeFromParty_updateParty_party {
  __typename: "Party";
  name: string;
}

export interface removeFromParty_updateParty {
  __typename: "UpdatePartyPayload";
  party: (removeFromParty_updateParty_party | null)[] | null;
}

export interface removeFromParty {
  updateParty: removeFromParty_updateParty | null;
}

export interface removeFromPartyVariables {
  party: string;
  characterId: CharacterRef;
}
