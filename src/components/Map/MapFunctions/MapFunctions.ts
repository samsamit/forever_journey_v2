import { C_mapSize, mapStartAreaHeight } from "../../../constants";
import { ActionStateEnum, CharacterMatchState, IGameState } from "../../../GlobalState/Reducers/GameStateReducer";
import { CharacterRef } from "../../../types/globalTypes";
import { IMapState, ITile, MapStateEnum, MapType, TileStateEnum } from "../MapTypes";
import isEqual from "lodash/isEqual";
import { filter, findIndex, pull } from "lodash";

export const getBaseMap = (): MapType => {
    const initTile: ITile = getInitTile();
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

export const getInitTile = (): ITile => {
const initTile = {
    availableToPlayer: [],
    state: TileStateEnum.idle,
    content: "",
    characterData: undefined,
    allyAffectors: [],
    enemyAffectors: [],
}
return initTile;
}

export const getMapByState = ({baseMap, mapState}: IMapState): MapType => {
    let newMap = [...baseMap];
    switch(mapState){
        case MapStateEnum.ReadyToStartBattle:
        case MapStateEnum.SelectStartPosition:
           for(let i = 0; i < mapStartAreaHeight; i++){
                for(let j = 0; j < C_mapSize; j++){
                    let newTile: ITile = {...getInitTile(), state: TileStateEnum.moveChar};
                    newMap[(C_mapSize - 1) - i][j] = newTile;
                }
            } 
            break;

        default:
            newMap = newMap.map(row => row.map(tile => {
                let newTile = tile;
                newTile.state = TileStateEnum.idle;
                newTile.availableToPlayer = [];
                newTile.bgColor = undefined;
                newTile.allyAffectors = [];
                newTile.enemyAffectors = [];
                newTile.characterData = undefined;
                return newTile;
            }));
            break;
    }
    return newMap;
}

export const getTileColor = (state: TileStateEnum): string => {
    switch(state){
        case TileStateEnum.moveChar:
            return "#51f582";
        case TileStateEnum.idle:
            return "white";
        case TileStateEnum.active:
            return "grey";
        default:
            return "white";
    }
}

export const calculatePartyInit = (curParty: Array<CharacterMatchState>): Array<CharacterMatchState> => {
    //Calculates initiative for party characters
    let newParty = [...curParty];
    newParty = newParty.map((charData, i) => {
        let newCahrData = charData;
        newCahrData.initiative = i;
        return newCahrData;
    })
    return newParty;
}

export const getActiveChar = (name: string | undefined, charArray: Array<CharacterMatchState>): CharacterMatchState | undefined => {
    if(!name) return undefined;
    const activeCharacter = filter(charArray, (char) => (char.character.name === name));
    return activeCharacter[0];
}

export const clearMap = (map: MapType, charName?: string | null): MapType => {
    let newMap = map.map(row => row.map(tile => {
        if(charName && tile.availableToPlayer.includes(charName)){
            tile.state = TileStateEnum.idle;
            tile.availableToPlayer = pull(tile.availableToPlayer, charName)
        }
        if(!charName){
            tile.state = TileStateEnum.idle;
            tile.availableToPlayer = [];
        }
        return tile;        
    }));
    return newMap;
}

export const drawMap = (gameState: IGameState): MapType => {
    const {playerParty, map, activeCharacter} = gameState;
    const activeChar = getActiveChar(activeCharacter, playerParty)
    let newMap = getMapByState(map);
    newMap = drawPlayerToMap(newMap, playerParty);
    newMap = drawPlayerPlansToMap(newMap, playerParty, activeChar);
    return newMap;
}

const drawPlayerToMap = (map: MapType, players: CharacterMatchState[]): MapType => {
    players.forEach(char => {
        if(!char.position) return;
        const {x,y} = char.position;
        map[x][y].characterData = char;
        if(!char.affectedArea) return;
        char.affectedArea.forEach(({x,y}) => {
            map[x][y].availableToPlayer.push(char.character.name!);
        });
    })
    return map;
}

const drawPlayerPlansToMap = (map: MapType, players: CharacterMatchState[], activeCharacter?: CharacterMatchState): MapType => {
    players.forEach(char => {
        if(!char.PlannedMove) return;
        if(char.PlannedMove.targetPosition){
            const {x,y} = char.PlannedMove.targetPosition;
            map[x][y].characterData = undefined;
            switch(char.PlannedMove.targetAction){
                case ActionStateEnum.attack:
                    break;
                case ActionStateEnum.move:
                    map[x][y].allyAffectors.push(char.character.name!);
                    if(activeCharacter) map[x][y].bgColor = char.color;
                    break;
                default:
                    break;
            }
        }
    })
    return map;
}