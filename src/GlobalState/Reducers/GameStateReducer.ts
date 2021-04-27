import { getBaseMap, getMapByState, handleTileClick } from "../../components/Map/MapFunctions";
import { IMapState, MapStateEnum, mapPosition } from "../../components/Map/MapTypes";
import { CharacterRef } from "../../types/globalTypes"
import { ReducerInput } from "../store"

export interface CharacterMatchState{
    character: CharacterRef,
    position?: mapPosition,
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
                    baseMap: getMapByState(MapStateEnum.SelectStartPosition),
                    mapState: MapStateEnum.SelectStartPosition
                }
            }

    case INIT_BATTLE:
            return initialState;

    case ACTIVATE_CHARACTER:
            return {
                ...state,
                activeCharacter: action.data
            }

    case CLICK_TILE:
        return handleTileClick(state, action.data);

    default:
        return state
    }
}