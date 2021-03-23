import { handleTileClick, testMapData } from "../../components/Map/MapFunctions";
import { ReducerInput } from "../store"
export interface ITile{
    content: string;
    bgColor: string;
    state: TileStateEnum;
}
export enum TileStateEnum{
    idle,
    selected,
    active
}
export type MapType = Array<Array<ITile>>;
export interface IMapState {
    baseMap: MapType;
}



const initialState: IMapState = {
    baseMap: testMapData(),
}

export const INIT_MAP = "INIT_MAP";
export const CLICK_TILE = "CLICK_TILE";

export default (state: IMapState = initialState,  action: ReducerInput): IMapState => {
    switch (action.type) {

    case INIT_MAP:
        return{
            baseMap: action.data.mapData
        }

    case CLICK_TILE:
        let curMap = state.baseMap;
        curMap = handleTileClick(action.data.id, curMap);
        return {baseMap: curMap}

    default:
        return state
    }
}