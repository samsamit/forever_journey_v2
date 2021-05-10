import { ActionStateEnum, CharacterMatchState } from "../../GlobalState/Reducers/GameStateReducer";
import { CharacterRef } from "../../types/globalTypes";


export enum TileStateEnum{
    idle,
    selected,
    active,
    moveChar,
    hasChar
}
export interface ITile{
    characterData?: CharacterMatchState;
    allyAffectors: Array<string>;
    enemyAffectors: Array<string>;
    availableToPlayer: Array<string>;
    state: TileStateEnum;
    bgColor?: string;
}
export interface mapPosition{
    x: number,
    y: number,
}


export type MapType = Array<Array<ITile>>;
export interface IMapState {
    baseMap: MapType;
    mapState: MapStateEnum;
}

export enum MapStateEnum{
    none,
    SelectStartPosition,
    ReadyToStartBattle,
    TurnAction,
    TurnEnd
}

export interface IActionPlan{
    targetPosition?: mapPosition,
    targetAction: ActionStateEnum,
}