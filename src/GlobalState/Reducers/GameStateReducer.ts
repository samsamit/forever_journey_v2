import { calculatePartyInit, getBaseMap, getMapByState, handleTileClick } from "../../components/Map/MapFunctions";
import { IMapState, MapStateEnum, mapPosition } from "../../components/Map/MapTypes";
import { CharacterRef } from "../../types/globalTypes"
import { ReducerInput } from "../store"

export interface CharacterMatchState{
    character: CharacterRef,
    position?: mapPosition,
    initiative?: number,
}

export interface IGameState {
    ongoingBattle: boolean;
    playerParty: Array<CharacterMatchState>;
    activeCharacter: CharacterMatchState | undefined;
    map: IMapState;
}

const initialState: IGameState = {
    ongoingBattle: false,
    playerParty: [],
    activeCharacter: undefined,
    map:{
        baseMap: getBaseMap(),
        mapState: MapStateEnum.none
    }
}

export const START_BATTLE = "START_BATTLE";
export const INIT_BATTLE = "INIT_BATTLE";
export const CLICK_TILE = "CLICK_TILE";
export const ACTIVATE_CHARACTER = "ACTIVATE_CHARACTER";
export const SET_MAP_STATE = "SET_MAP_STATE";

export default (state: IGameState = initialState,  action: ReducerInput): IGameState => {
    switch (action.type) {
        case START_BATTLE:
            let newPartyData: Array<CharacterMatchState> = [];
            action.data.forEach((obj: CharacterRef) => {
                newPartyData.push({character: obj});
            })
            
            return {
                ...state,
                ongoingBattle: true,
                playerParty: newPartyData,
                map: {
                    baseMap: getMapByState(MapStateEnum.SelectStartPosition, state.map.baseMap),
                    mapState: MapStateEnum.SelectStartPosition
                }
            }

        case SET_MAP_STATE:
            let newParty = [...state.playerParty];
            switch(action.data){
                case MapStateEnum.TurnAction:
                    newParty = calculatePartyInit(state.playerParty);
            }
            return{
                ...state,
                playerParty: newParty,
                map:{
                    baseMap: getMapByState(action.data, state.map.baseMap),
                    mapState: action.data
                }
            }

    case INIT_BATTLE:
            return initialState;

    case ACTIVATE_CHARACTER:
            return {
                ...state,
                activeCharacter: state.activeCharacter?.character.name === action.data.character?.name ? undefined : action.data
            }

    case CLICK_TILE:
        return handleTileClick(state, action.data);

    default:
        return state
    }
}