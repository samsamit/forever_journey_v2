import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import localForage from 'localforage';
import {persistReducer} from "redux-persist";
import UserReducer from "./Reducers/UserReducer";
import GameStateReducer from "./Reducers/GameStateReducer";

const w: any = window as any;
const devtools: any = w.devToolsExtension
  ? w.__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any) => f;
const middleware = applyMiddleware(thunk);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const persistConfig = {
  key: 'root',
  storage: localForage,
};

export interface ReducerInput{
    type: string,
    data: any,
}

const reducers = combineReducers({
    user: UserReducer,
    gameState: GameStateReducer
  });
  export type IRootState = ReturnType<typeof reducers>;
  const persisted = persistReducer(persistConfig, reducers);
  
  
  export const store: any = middleware(devtools(createStore))(persisted);