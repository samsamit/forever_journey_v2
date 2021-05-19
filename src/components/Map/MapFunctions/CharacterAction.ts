import { cloneDeep } from "lodash";
import { exit } from "node:process";
import { IGameState, ActionStateEnum, CharacterMatchState } from "../../../GlobalState/Reducers/GameStateReducer";
import { MapType, TileStateEnum } from "../MapTypes";
import { clearMap } from "./MapFunctions";
import { handleTilesInArea } from "./TileClick";

export const setActionForActiveChar = (GameState: IGameState, newAction: ActionStateEnum): IGameState => {
    const newGameState: IGameState = cloneDeep(GameState);
    const {activeCharacter, playerParty} = newGameState;
    const targetCharIndex = playerParty.findIndex(char => char.character.name === activeCharacter);
    if(targetCharIndex >= 0){
        newGameState.playerParty[targetCharIndex].actionState = newAction;
        newGameState.map.baseMap = mutateMapByAction(newGameState.map.baseMap, playerParty);
    }
    return newGameState;
}

const mutateMapByAction = (map: MapType, party: Array<CharacterMatchState>): MapType => {
    let newMap = [...map];
    party.forEach(char => {
        if(!char.position) return;
        switch(char.actionState){
            case ActionStateEnum.noAction:
                newMap = clearMap(newMap, char.character.name);
                break;
            case ActionStateEnum.move:
                newMap = handleTilesInArea(char.position, 1, newMap, TileStateEnum.moveChar, char);
                break;
            case ActionStateEnum.attack:
                newMap = handleTilesInArea(char.position, 1, newMap, TileStateEnum.active, char);
                break;
            default:
                break;
        }
    });
    return newMap;
}