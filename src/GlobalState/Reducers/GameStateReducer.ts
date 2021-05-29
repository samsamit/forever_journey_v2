import { union } from "lodash";
import { generateEnemyParty } from "../../components/battle/enemyLogic";
import { setActionForActiveChar } from "../../components/Map/MapFunctions/CharacterAction";
import { calculatePartyInit, drawMap, getActiveChar, getBaseMap, getMapByState } from "../../components/Map/MapFunctions/MapFunctions";
import { handleClick } from "../../components/Map/MapFunctions/TileClick";
import { handleTurnEnd } from "../../components/Map/MapFunctions/TurnEndActions";
import { IMapState, MapStateEnum, mapPosition, IActionPlan } from "../../components/Map/MapTypes";
import { AttributesRef, CharacterRef } from "../../types/globalTypes"
import { ReducerInput } from "../store"

export interface CharacterMatchState{
    character: CharacterRef,
    isAi: boolean,
    battleStats?: AttributesRef | null | undefined;
    currentStats?: AttributesRef | null | undefined;
    color: string;
    position?: mapPosition,
    affectedArea?: Array<mapPosition>, //Enables draving movement options and attack range
    initiative?: number,
    actionState: ActionStateEnum,
    PlannedMove?: IActionPlan,
}

export enum ActionStateEnum {
    noAction,
    move,
    attack
}

export const getActionStates = () => {
    return Object.keys(ActionStateEnum).filter(key => isNaN(Number(key)) && key);
}

export interface IGameState {
    ongoingBattle: boolean;
    players: Array<CharacterMatchState>;
    activeCharacter: string | undefined;
    map: IMapState;
}

const initialState: IGameState = {
    ongoingBattle: false,
    players: [],
    activeCharacter: undefined,
    map:{
        baseMap: getBaseMap(),
        mapState: MapStateEnum.none
    }
}

export const START_BATTLE = "START_BATTLE";
export const INIT_BATTLE = "INIT_BATTLE";
export const CLICK_TILE = "CLICK_TILE";
export const ACTIVATE_CHARACTER = "ACTIVATE_CHARACTER";
export const SET_MAP_STATE = "SET_MAP_STATE";
export const SETUP_ACTION = "SETUP_ACTION";

export default (state: IGameState = initialState,  action: ReducerInput): IGameState => {
    switch (action.type) {
        // Changes game state to be ready for battle actions
        case START_BATTLE:
            let newPartyData: Array<CharacterMatchState> = [];
            action.data.forEach((obj: CharacterRef, i: number) => {
                newPartyData.push({character: obj, battleStats: obj.attributes, isAi: false, currentStats: obj.attributes, actionState: ActionStateEnum.noAction, color: getColor(i)});
            })
            let newPlayers = union(newPartyData, generateEnemyParty(4))
            return {
                ...state,
                ongoingBattle: true,
                players: newPlayers,
                map: {
                    baseMap: drawMap({...state, players: newPlayers,  map:{...state.map, mapState: MapStateEnum.SelectStartPosition}}),
                    mapState: MapStateEnum.SelectStartPosition
                }
            }
        
        // Sets maps state and changes game state by the action
        case SET_MAP_STATE:{
            let newParty = [...state.players];
            switch(action.data){
                case MapStateEnum.TurnAction:
                    newParty = calculatePartyInit(state.players);
                    break;
                case MapStateEnum.TurnEnd:
                    return handleTurnEnd(state);
            }
            return{
                ...state,
                players: newParty,
                map:{
                    baseMap: drawMap({...state, map:{...state.map, mapState: action.data}}),
                    mapState: action.data
                }
            }}

    // Resets battle to initial state
    case INIT_BATTLE:
            return initialState;

    // Activates character to state
    case ACTIVATE_CHARACTER:
            return {
                ...state,
                activeCharacter: state.activeCharacter === action.data ? undefined : action.data
            }

    // Handles tile click and all its actions
    case CLICK_TILE:
        return handleClick(state, action.data);

    // Selects action for activated character. Mutates state based on that
    case SETUP_ACTION:
        return setActionForActiveChar(state, action.data);

    default:
        return state
    }
}

// Just for testing - assigns color for each character
const getColor = (i: number): string => {
    switch(i){
        case 0:
            return "#eb4034"
        case 1:
            return "#c0eb34"
        case 2: 
            return "#34ebd9"
        case 3:
            return "#e234eb"
        default:
            return "white"
    }
}