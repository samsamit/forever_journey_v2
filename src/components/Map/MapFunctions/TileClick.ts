import { cloneDeep, constant, findIndex, isEqual } from "lodash";
import { ActionStateEnum, CharacterMatchState, IGameState } from "../../../GlobalState/Reducers/GameStateReducer";
import { drawMap, getActiveChar } from "./MapFunctions";
import { IActionPlan, ITile, mapPosition, MapStateEnum, MapType, TileStateEnum } from "../MapTypes";
import { C_mapSize } from "../../../constants";

export const handleClick = (state: IGameState, clickPosition: string): IGameState => {
    let modifiedGameState = cloneDeep(state);
    let {activeCharacter, playerParty, map:{mapState, baseMap}} = modifiedGameState;
    let activeCharIndex = findIndex(playerParty, (char) => (char.character.name === activeCharacter));
    let activeCharacterData = playerParty[activeCharIndex];
    const position = getTileIndex(clickPosition);
    const tile = baseMap[position.x][position.y];
    const tileCharacterName = tile.characterData?.character.name;
    switch(mapState){
        case MapStateEnum.ReadyToStartBattle:
        case MapStateEnum.SelectStartPosition:
            if(!activeCharacterData) break;
            if(tile.state !== TileStateEnum.moveChar) break;
            if(tile.characterData && tileCharacterName !== activeCharacter){
                const charIndex = findIndex(playerParty, (char) => (char.character.name === tileCharacterName));
                playerParty[charIndex].position = undefined;
            }
            if(!isEqual(activeCharacterData.position, position)){
                activeCharacterData.position = position;
            }else{
                activeCharacterData.position = undefined;
            }
            modifiedGameState.map.mapState = isAllPlaced(playerParty) ?  MapStateEnum.ReadyToStartBattle : MapStateEnum.SelectStartPosition;
            break;

        case MapStateEnum.TurnAction:
            if(activeCharacterData && tileIsAvailableForAction(activeCharacter, activeCharacterData.actionState, tile)){
                activeCharacterData.PlannedMove = makeActionPlan(activeCharacterData.actionState, position);
                activeCharacterData.actionState = ActionStateEnum.noAction;
            }
            break;

    }
    //If tile has character make it active character
    if(tileCharacterName){
        if(!activeCharacter || (activeCharacter !== tileCharacterName && activeCharacterData.actionState === ActionStateEnum.noAction)){
            modifiedGameState.activeCharacter = tileCharacterName!;
        }
    }

    baseMap = drawMap(modifiedGameState);
    return modifiedGameState;
}

const makeActionPlan = (action: ActionStateEnum, position: mapPosition) => {
    let newPlan: IActionPlan = {
        targetAction: action,
        targetPosition: position,
    }
    return newPlan;
}

const tileIsAvailableForAction = (charName: string | undefined, action: ActionStateEnum, tile: ITile) => {
    if(!charName) return false;
    let available: boolean = false;
    
    switch(action){
        case ActionStateEnum.move:
            available = tile.allyAffectors?.length === 0;
            console.log(tile.allyAffectors?.length);
            break;
        default:
            available = tile.availableToPlayer.includes(charName);
            break;
    }
    
    console.log('tileAvailableForAction ' + available);
    return available;
}
 
export const getTileIndex = (tileId: string): mapPosition => {
    const indexes = tileId.split(',');
    return {x: Number(indexes[0]), y: Number(indexes[1])}
}

const isAllPlaced = (party: Array<CharacterMatchState>): boolean => {
    let plcasedCouner = 0;
    party.forEach(char => {
        if(char.position) plcasedCouner++;
    })
    return plcasedCouner === party.length;
}

export const handleTilesInArea = (target: mapPosition, range: number, curMap: MapType, tileState: TileStateEnum, activeCharacter?: CharacterMatchState): MapType => {
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

export const getTilesInRange = (targetTile: mapPosition, range: number): Array<mapPosition> => {
    const {x, y} = targetTile;
    let TilesInRange: mapPosition[] = [];
    for(let i = -range; i < range+1; i++){
        for(let j = -range; j < range+1; j++){
            //Check if the index is inside map
            if((i+x) >= 0 && (i+x) < C_mapSize
            && (j+y) >= 0 && (j+y) < C_mapSize
            && i !== 0 || j !== 0){
                if(Math.abs(i) + Math.abs(j) <= range){
                TilesInRange.push({x: (i+x), y: (j+y)});
                }
            }
        }
    }
 return TilesInRange;
}