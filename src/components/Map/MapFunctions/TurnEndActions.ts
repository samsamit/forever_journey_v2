import { cloneDeep } from "lodash";
import { ActionStateEnum, CharacterMatchState, IGameState } from "../../../GlobalState/Reducers/GameStateReducer";
import { MapStateEnum, MapType } from "../MapTypes";
import { drawMap } from "./MapFunctions";

export const handleTurnEnd = (state: IGameState): IGameState => {
    let modifiedGameState = cloneDeep(state);
    const {playerParty} = modifiedGameState;
    modifiedGameState.playerParty = handlePartyEndTurn(playerParty);
    modifiedGameState.activeCharacter = undefined;
    modifiedGameState.map.mapState = MapStateEnum.TurnAction;
    console.log("Turn end handled...");
    modifiedGameState.map.baseMap = drawMap(modifiedGameState);
    return modifiedGameState;
}

const handlePartyEndTurn = (party: CharacterMatchState[]): CharacterMatchState[] => {
    let newParty = party.map(char => {
        if(char.PlannedMove?.targetAction === ActionStateEnum.move) char.position = char.PlannedMove?.targetPosition;
        char.PlannedMove = undefined;
        char.actionState = ActionStateEnum.noAction;
        char.affectedArea = undefined;
        char.initiative = undefined;
        return char;
    });
    return newParty;
}