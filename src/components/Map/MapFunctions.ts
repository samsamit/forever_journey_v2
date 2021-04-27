import { C_mapSize, mapStartAreaHeight } from "../../constants";
import { CharacterMatchState, IGameState } from "../../GlobalState/Reducers/GameStateReducer";
import { CharacterRef } from "../../types/globalTypes";
import { IMapState, ITile, MapStateEnum, MapType, TileStateEnum } from "./MapTypes";
import isEqual from "lodash/isEqual";

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

export const handleTileClick = (GameState: IGameState, position: string): IGameState => {
    const {activeCharacter, playerParty, map:{baseMap, mapState}} = GameState;
    const {i, j} = getTileIndex(position);
    let modifiedmapState = mapState;
    let modifiedMap = baseMap;
    let modifiedParty = playerParty;
    let modifiedCharacter = activeCharacter;
    const tileData = baseMap[i][j];
    switch(mapState){
        case MapStateEnum.ReadyToStartBattle:
        case MapStateEnum.SelectStartPosition: 
            if(tileData.state != TileStateEnum.moveChar || !activeCharacter) break;
            const newtile = tileData;
            //Delete same character from old tile
            if(activeCharacter.position && !isEqual(activeCharacter.position, {x:i, y:j})){
                const {x, y} = activeCharacter.position;
                modifiedMap[x][y].character = undefined;
            }
           
            //Handle char deletion
            modifiedParty = modifiedParty.map(char => {
                if(newtile.character?.name === char.character.name){
                char.position = undefined;
                }
                if(char.character.name === activeCharacter.character.name
                    && tileData.character?.name !== activeCharacter.character.name){
                char.position = {x:i, y:j};
                }
                return char;
            });

            // Remove or add character
            if(tileData.character?.name === activeCharacter.character.name){
                newtile.character = undefined;
            }else{
                newtile.character = activeCharacter.character;
            }
            modifiedMap[i][j] = newtile;
            isAllPlaced(modifiedParty) ? modifiedmapState = MapStateEnum.ReadyToStartBattle : modifiedmapState = MapStateEnum.SelectStartPosition;
            break;

        default:
            break;
    }
    return {...GameState, activeCharacter: modifiedCharacter, playerParty, map: {baseMap: modifiedMap, mapState: modifiedmapState}};
}

const isAllPlaced = (party: Array<CharacterMatchState>): boolean => {
    let plcasedCouner = 0;
    party.forEach(char => {
        if(char.position) plcasedCouner++;
    })
    return plcasedCouner === party.length;
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