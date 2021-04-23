import { getBaseMap, getMapByState, handleTileClick, mapTileClickData } from "../../components/Map/MapFunctions";
import { IMapState, MapStateEnum } from "../../components/Map/MapTypes";
import { CharacterRef } from "../../types/globalTypes"
import { mapPosition } from "../../types/mapTypes"
import { ReducerInput } from "../store"
import isEqual from "lodash/isEqual";
export interface CharacterMatchState{
    character: CharacterRef,
    position: mapPosition,
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
                newPartyData.push({character: obj, position: {x: null, y: null}});
                console.log(obj);
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
        const clickData: mapTileClickData = {
            curMap: state.map,
            position: action.data,
            activeCharacter: state.activeCharacter
        }
        const {curMap, activeCharacter: newActiveCharacter} = handleTileClick(clickData);
        let newParty = state.playerParty;
        if(!isEqual(state.activeCharacter, newActiveCharacter)){
            newParty = newParty.map(char => char.character.name === newActiveCharacter?.character.name ? newActiveCharacter! : char!);
        }
        return {
            ...state,
            playerParty: newParty,
            map: curMap
        }
    default:
        return state
    }
}