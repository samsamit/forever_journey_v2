import { gql } from "@apollo/client";

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
        id
      name
      race
      attributes{
        hp
        atk
        mov
      }
      party
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
        id
      name
      race
      attributes{
        hp
        atk
        mov
      }
      party
      }
    }
  }
`;
