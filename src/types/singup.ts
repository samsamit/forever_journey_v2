/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: singup
// ====================================================

export interface singup_signup_errors {
  __typename: "ErrorList";
  password: string | null;
  username: string | null;
}

export interface singup_signup {
  __typename: "SignupPayload";
  username: string | null;
  token: string | null;
  errors: singup_signup_errors | null;
}

export interface singup {
  signup: singup_signup;
}

export interface singupVariables {
  username: string;
  email: string;
  password: string;
  password2: string;
}
