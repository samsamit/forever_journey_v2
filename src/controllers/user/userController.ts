import { gql } from "@apollo/client";

export const GET_ALL_USER = gql`
query getAllUsers{
  queryUser{
    username
    role
    email
    characters{
      id
      race
      name
      attributes{
          hp
          atk
          mov
        }
    }
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