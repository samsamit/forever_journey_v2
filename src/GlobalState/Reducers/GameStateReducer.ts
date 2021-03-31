import { getBaseMap, getMapByState, handleTileClick } from "../../components/Map/MapFunctions";
import { CharacterRef } from "../../types/globalTypes"
import { mapPosition } from "../../types/mapTypes"
import { ReducerInput } from "../store"

interface characterMatchState{
    character: CharacterRef,
    position: mapPosition,

}

export interface ITile{
    content: string;
    character?: CharacterRef,
    bgColor: string;
    state: TileStateEnum;
}
export enum TileStateEnum{
    idle,
    selected,
    active,
    moveChar
}
export type MapType = Array<Array<ITile>>;
export interface IMapState {
    baseMap: MapType;
    mapState: MapStateEnum;
}

export enum MapStateEnum{
    none,
    SelectStartPosition,
}

export interface IGameState {
    ongoingBattle: boolean;
    playerParty: Array<characterMatchState>;
    map: IMapState;
}

const initialState: IGameState = {
    ongoingBattle: false,
    playerParty: [],
    map:{
        baseMap: getBaseMap(),
        mapState: MapStateEnum.none
    }
}

export const START_BATTLE = "START_BATTLE";
export const INIT_BATTLE = "INIT_BATTLE";
export const CLICK_TILE = "CLICK_TILE";

export default (state: IGameState = initialState,  action: ReducerInput): IGameState => {
    switch (action.type) {

        case START_BATTLE:
            return {
                ...state,
                ongoingBattle: true,
                playerParty: action.data,
                map: {
                    baseMap: getMapByState(MapStateEnum.SelectStartPosition),
                    mapState: MapStateEnum.SelectStartPosition
                }
            }

        case INIT_BATTLE:
            return initialState;

    case CLICK_TILE:
        let curMap = handleTileClick({clickId: action.data.id, map: state.map});
        return {
            ...state, 
            map:{
                ...state.map, 
                baseMap: curMap
            }
        }
    default:
        return state
    }
}