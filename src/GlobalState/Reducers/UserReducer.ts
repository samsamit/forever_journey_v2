import { CharacterRef, UserRef } from "../../types/globalTypes";
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
export const UPDATE_CHARACTER = "UPDATE_CHARACTER";
export const UPDATE_PARTIES = "UPDATE_USER";

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
    
    case UPDATE_CHARACTER:
        const updatedCharacter: CharacterRef = action.data;
        const newCharacters = state.userInfo?.characters && state.userInfo.characters.map(char => 
            (char && char.id === updatedCharacter.id) ? updatedCharacter : char
        );
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                characters: newCharacters,
            },
        }

        case UPDATE_PARTIES:
            return{
                ...state,
                userInfo: {
                    ...state.userInfo,
                    parties: action.data 
                }
            }

    default:
        return state
    }
}