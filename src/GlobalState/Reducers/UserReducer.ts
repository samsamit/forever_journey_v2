import { UserRef } from "../../types/globalTypes";
import { ReducerInput } from "../store"

export interface IUserState {
    loggedIn: boolean;
    token: string;
    userInfo?: UserRef;
}

const initialState: IUserState = {
    loggedIn: false,
    userInfo: undefined,
    token: ''
}

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export default (state: IUserState = initialState,  action: ReducerInput): IUserState => {
    switch (action.type) {

    case LOGIN_USER:
        return {
            userInfo: action.data.user,
            token: action.data.token,
            loggedIn: true,
        }
    
    case LOGOUT_USER:
        return initialState

    default:
        return state
    }
}