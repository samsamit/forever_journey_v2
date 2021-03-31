import { gql } from "@apollo/client";

export const CHARACTERS_GET_ALL = gql`
  query GetAllCharacters($user: String!) {
    getUser(username: $user) {
      characters {
        id
        name
        race
        attributes{
          hp
          atk
          mov
        }
      }
    }
  }
`;

export const CHARACTERS_ADD = gql`
mutation addCharacter($name: String!, $race: String!, $owner: UserRef!){
    addCharacter(input: [
      {
        name: $name
        race: $race
        owner: $owner
        attributes: {
          hp: 10
          atk: 1
          mov: 1
        }
      },
    ]){
      character{
        name
        race
        owner{
          username
        }
        attributes{
          hp
          atk
          mov
        }
      }
    }
  }
`;

export const CHARACTERS_DELETE = gql`
mutation deleteCharacter($id: ID!){
    deleteCharacter(filter: {id: [$id]}){
      character{
        name
      }
    }
  }
`;


export const CHARACTERS_EDIT = gql`
mutation editCharacter($patch: UpdateCharacterInput!){
    updateCharacter(input:$patch){
      character{
        name
      }
    }
  }
`;