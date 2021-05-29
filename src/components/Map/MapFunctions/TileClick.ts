import { cloneDeep, findIndex, isEqual } from "lodash";
import { ActionStateEnum, CharacterMatchState, IGameState } from "../../../GlobalState/Reducers/GameStateReducer";
import { drawMap } from "./MapFunctions";
import { IActionPlan, IMapState, ITile, mapPosition, MapStateEnum, MapType, TileStateEnum } from "../MapTypes";
import { C_mapSize } from "../../../constants";

export const handleClick = (state: IGameState, clickPosition: string): IGameState => {
    let modifiedGameState = cloneDeep(state);
    let {activeCharacter, players, map:{mapState, baseMap}} = modifiedGameState;
    let activeCharIndex = findIndex(players, (char) => (char.character.name === activeCharacter));
    let activeCharacterData = players[activeCharIndex];
    const position = getTileIndex(clickPosition);
    const tile = baseMap[position.x][position.y];
    const tileCharacterName = tile.characterData?.character?.name;
    switch(mapState){
        case MapStateEnum.ReadyToStartBattle:
        case MapStateEnum.SelectStartPosition:
            if(!activeCharacterData) break;
            if(tile.state !== TileStateEnum.moveChar) break;
            if(tile.characterData && tileCharacterName !== activeCharacter){
                const charIndex = findIndex(players, (char) => (char.character.name === tileCharacterName));
                players[charIndex].position = undefined;
            }
            if(!isEqual(activeCharacterData.position, position)){
                activeCharacterData.position = position;
                activeCharacter = undefined;
            }else{
                activeCharacterData.position = undefined;
            }
            modifiedGameState.map.mapState = isAllPlaced(players) ?  MapStateEnum.ReadyToStartBattle : MapStateEnum.SelectStartPosition;
            break;

        case MapStateEnum.TurnAction:
            if(activeCharacterData && tileIsAvailableForAction(activeCharacter, activeCharacterData.actionState, tile)){
                activeCharacterData.PlannedMove = makeActionPlan(activeCharacterData.actionState, position, baseMap);
                activeCharacterData.actionState = ActionStateEnum.noAction;
            }
            break;

    }
    //If tile has character make it active character
    MakeActive: {
        if(!tileCharacterName) break MakeActive;
        if(tile.characterData?.isAi) break MakeActive;
        if(activeCharacter && activeCharacter === tileCharacterName) break MakeActive;
        if(activeCharacterData && activeCharacterData.actionState !== ActionStateEnum.noAction) break MakeActive;
        modifiedGameState.activeCharacter = tileCharacterName!;
        console.log('New active character: ' + tileCharacterName);
    }

    baseMap = drawMap(modifiedGameState);
    return modifiedGameState;
}

const makeActionPlan = (action: ActionStateEnum, position: mapPosition, map: MapType) => {
    let newPlan: IActionPlan = {
        targetAction: action,
        targetPosition: position,
        affectedPlayers: []
    }
    if(map[position.x][position.y]?.characterData?.character?.name) newPlan.affectedPlayers.push(map[position.x][position.y]!.characterData!.character.name!);
    return newPlan;
}

const tileIsAvailableForAction = (charName: string | undefined, action: ActionStateEnum, tile: ITile) => {
    if(!charName) return false;
    let available: boolean = false;
    
    switch(action){
        case ActionStateEnum.move:
            available = !tile.characterData && tile.availableToPlayer.includes(charName);
            break;
        case ActionStateEnum.noAction:
            available = false;
            break;
        default:
            available = tile.availableToPlayer.includes(charName);
            break;
    }
    
    console.log('tileAvailableForAction ' + available + ' ' + ActionStateEnum[action]);
    return available;
}
 
export const getTileIndex = (tileId: string): mapPosition => {
    const indexes = tileId.split(',');
    return {x: Number(indexes[0]), y: Number(indexes[1])}
}

const isAllPlaced = (party: Array<CharacterMatchState>): boolean => {
    let plcasedCouner = 0;
    party.forEach(char => {
        if(char.position || char.isAi) plcasedCouner++;
    })
    return plcasedCouner === party.length;
}

export const handleTilesInArea = (target: mapPosition, range: number | null | undefined, curMap: MapType, tileState: TileStateEnum, activeCharacter?: CharacterMatchState): MapType => {
    const area = getTilesInRange(target, range);
    let newMap: MapType = [...curMap];
    area.forEach(({x, y}) => {
        if(activeCharacter){
            switch(activeCharacter.actionState){
                case ActionStateEnum.move:
                    if(!newMap[x][y].characterData){
                        newMap[x][y].state = tileState;
                        newMap[x][y].availableToPlayer.push(activeCharacter.character.name!);
                    };
                    break;
                default:
                    newMap[x][y].state = tileState;
                    newMap[x][y].availableToPlayer.push(activeCharacter.character.name!);
                    break;
            }
        }else{
            newMap[x][y].state = tileState;
        }
    });
    return newMap;
}

export const getTilesInRange = (targetTile: mapPosition, range: number | null | undefined): Array<mapPosition> => {
    const {x, y} = targetTile;
    let TilesInRange: mapPosition[] = [];
    if(!range) range = 1;
    for(let i = -range; i < range+1; i++){
        for(let j = -range; j < range+1; j++){
            let position: mapPosition = {x: i+x, y: j+y};
            //Check if the index is inside map
            if(checkIfPositionInMap(position)){
                if(Math.abs(i) + Math.abs(j) <= range){
                TilesInRange.push({x: (i+x), y: (j+y)});
                }
            }
        }
    }
 return TilesInRange;
}

const checkIfPositionInMap = ({x, y}: mapPosition): boolean => {
    if(x < 0 || y < 0) return false;
    if(x >= C_mapSize || y >= C_mapSize) return false;
    return true;
}