import { gql } from "@apollo/client"


export const SIGNUP = gql`
mutation singup(
  $username: String!,
  $email: String!,
  $password: String!
  $password2: String!
){
  signup(
    username: $username, 
    email: $email,
    password: $password,
    password2: $password2
  ){
    username
    token
    errors{
      password
      username
    }
  }
}
`;