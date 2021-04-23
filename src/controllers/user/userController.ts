import { gql } from "@apollo/client";

export const GET_ALL_USER = gql`
query getAllUsers{
  queryUser{
    username
    email
    characters{
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
    parties
    role
  }
}
`;

export const ADD_USER = gql`
mutation addUser(
  $user: AddUserInput!,
){
 addUser(input: [$user]){
  user{
    username
  }
} 
}
`;


export const UPDATE_USER = gql`
mutation updateUser($patch: UpdateUserInput!){
  updateUser(input: $patch){
    user{
    username
    email
    characters{
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
    parties
    role
  }
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($username: String!){
 deleteUser(filter: {
  username: {eq: $username}
}){
  user{
    username
  }
} 
}
`;