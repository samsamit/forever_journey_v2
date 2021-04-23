import { gql } from "@apollo/client"
import jwt from "jsonwebtoken";
import { UserRole } from "../types/globalTypes";

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

export const LOGIN = gql`
  query login($username: String!, $password: String!){
  login(username: $username, password: $password){
    user{
      username
      email
      role
      parties
      characters{
        name
        race
        id
        party
        attributes{
          hp
          atk
          mov
        }
        avatarPath
      }
    }
    token
    error
  }
}
`;


export const getTokenData = (token: string): {valid: boolean, data?: {username?: string, role?: UserRole}} => {
  if(token){
    const decodedToken = jwt.decode(token!, { json: true });
    const valid = Date.now() < decodedToken?.exp! * 1000;
    return {valid, data: decodedToken?.data}
  }
return {valid: false};
}