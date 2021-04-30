import { CharacterRef } from "../../types/globalTypes";

export interface ITile{
    content: string;
    character?: CharacterRef;
    avatar?: string;
    state: TileStateEnum;
}

export interface mapPosition{
    x: number,
    y: number,
}

export enum TileStateEnum{
    idle,
    selected,
    active,
    moveChar,
    hasChar
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