import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
  query ListChars($user: String!) {
    getUser(username: $user) {
      characters {
        name
        race
      }
    }
  }
`;