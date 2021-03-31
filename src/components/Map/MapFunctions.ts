import { C_mapSize, mapStartAreaHeight } from "../../constants";
import { MapType, ITile, TileStateEnum, MapStateEnum, IMapState } from "../../GlobalState/Reducers/GameStateReducer";
import { CharacterRef } from "../../types/globalTypes";

export const getBaseMap = (): MapType => {
    const initTile: ITile = {
        bgColor: "white",
        content: "",
        state: TileStateEnum.idle
    }
    let newMap = [];
    for(let i = 0; i < C_mapSize; i++){
        let thisArray = [];
        for(let j = 0; j < C_mapSize; j++){
            let newTile = JSON.parse(JSON.stringify(initTile));
            thisArray.push(newTile)
        }
        newMap.push(thisArray);
    }
    return newMap;
}

export const getMapByState = (state: MapStateEnum): MapType => {
    switch(state){
        case MapStateEnum.SelectStartPosition:
            const baseMap = getBaseMap();
           for(let i = 0; i < mapStartAreaHeight; i++){
                for(let j = 0; j < C_mapSize; j++){
                    baseMap[(C_mapSize-1) - i][j].bgColor = "gray";
                    baseMap[(C_mapSize - 1) - i][j].state = TileStateEnum.moveChar;
                }
            } 
            return baseMap;

        default:
            return getBaseMap();
    }
}

const getTileIndex = (tileId: string): {i: number, j: number} => {
    const indexes = tileId.split(',');
    const i = Number(indexes[0]);
    const j = Number(indexes[1]);
    return {i, j}
}

export interface mapTileClickData{
    clickId: string;
    map: IMapState;
    character?: CharacterRef;
}

export const handleTileClick = (clickData: mapTileClickData): MapType => {
    const {map, clickId} = clickData;
    const {i, j} = getTileIndex(clickId);
    let modifyMap = [...map.baseMap];
    switch(modifyMap[i][j].state){
        case TileStateEnum.idle:
            modifyMap[i][j].state = TileStateEnum.selected;
            modifyMap[i][j].bgColor = "red";
            modifyMap[i][j].content = "1";
            modifyMap = handleTileActivation(clickId, modifyMap, 4);
            break;
        
        case TileStateEnum.selected:
            modifyMap.forEach(row => row.forEach(tile => {
                tile.content = "0";
                tile.bgColor = "white";
                tile.state = TileStateEnum.idle;
            }));
            break;

        case TileStateEnum.moveChar:
            break;
            
        default:
            break;
    }
    return modifyMap;
}

const handleTileActivation = (tileId: string, map: MapType, range: number): MapType => {
    const mapToModify = map;
    const {i, j} = getTileIndex(tileId);
    //Loop trough every index in range of start point
    for(let x = -range; x < range+1; x++){
        for(let y = -range; y < range+1; y++){
            //Check if the index is inside map
            if((x+i) >= 0 && (x+i) < mapToModify.length 
            && (y+j) >= 0 && (y+j) < mapToModify.length 
            && x !== 0 || y !== 0){
                //if the cordinates sum is larger that range then skip them
                if(Math.abs(x) + Math.abs(y) <= range){
                    mapToModify[(x+i)][(y+j)].state = TileStateEnum.active;
                    mapToModify[(x+i)][(y+j)].bgColor = "green";
                    mapToModify[(x+i)][(y+j)].content = "2";
                }
            }
        }
    }
    return mapToModify;
}