import { cloneDeep } from "lodash";
import { ActionStateEnum, CharacterMatchState, IGameState } from "../../../GlobalState/Reducers/GameStateReducer";
import { IActionPlan, MapStateEnum } from "../MapTypes";
import { drawMap } from "./MapFunctions";

export const handleTurnEnd = (state: IGameState): IGameState => {
    let modifiedGameState = cloneDeep(state);
    const {players} = modifiedGameState;
    const planStack = GetPlanStack(players);
    modifiedGameState.players = triggerPlanStack(planStack, modifiedGameState.players);
    modifiedGameState.players = checkPlayerStatus(modifiedGameState.players);
    modifiedGameState.players = resetPlayers(modifiedGameState.players);
    modifiedGameState.activeCharacter = undefined;
    modifiedGameState.map.mapState = MapStateEnum.TurnAction;
    console.log("Turn end handled...");
    modifiedGameState.map.baseMap = drawMap(modifiedGameState);
    return modifiedGameState;
}

const resetPlayers = (players: CharacterMatchState[]): CharacterMatchState[] => {
    let newParty = players.map(char => {
        char.PlannedMove = undefined;
        char.actionState = ActionStateEnum.noAction;
        char.affectedArea = undefined;
        char.initiative = undefined;
        return char;
    });
    return newParty;
}

interface IPlanStack{ plan: IActionPlan, planner: string | null | undefined}
const GetPlanStack = (players: CharacterMatchState[]): Array<IPlanStack> => {
    let planStack: Array<IPlanStack> = [];
    players.forEach(char => {
        if(char.PlannedMove){
            planStack.push({plan: char.PlannedMove,  planner: char.character.name});
        }
    })
    return planStack;
}

const triggerPlanStack = (stack: Array<IPlanStack>, players: CharacterMatchState[]): CharacterMatchState[] => {
    stack.forEach(i => {
        switch(i.plan.targetAction){
            case ActionStateEnum.move:
                players = players.map(char => {
                    if(char.character.name === i.planner){
                        char.position = i.plan.targetPosition
                    }
                    return char;
                })
                break;

            case ActionStateEnum.attack:
                players = players.map(char => {
                    i.plan.affectedPlayers.forEach(affected => {
                        if(char.character.name === affected){
                            let affector = getPlayerDataByName(players, i.planner);
                            if(affector?.battleStats && char.currentStats){
                                char.currentStats.hp! -= affector.battleStats.atk!;
                            }else{
                                console.log('No affector of currentStats');
                            }
                        }
                    })
                    return char;
                })
                break;
        }
    })
    return players;
}

const checkPlayerStatus = (players: CharacterMatchState[]): CharacterMatchState[] => {
    players = players.filter(char => {
        if(char?.currentStats?.hp && char?.currentStats?.hp <= 0){
            return;
        }
        return char;
    })
    return players;
}

const getPlayerDataByName = (players: CharacterMatchState[], name: string | null | undefined): CharacterMatchState | undefined => {
    if(!name) return undefined;
    return players.filter(char => char.character.name === name)[0];
}