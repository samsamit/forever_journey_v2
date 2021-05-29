import { C_mapSize } from "../../constants";
import {
  ActionStateEnum,
  CharacterMatchState,
} from "../../GlobalState/Reducers/GameStateReducer";
import { CharacterRef } from "../../types/globalTypes";

export const generateEnemyParty = (
  partySize: number
): Array<CharacterMatchState> => {
  let positionStartX = C_mapSize / 2 - partySize / 2;
  let newEnemyParty: Array<CharacterMatchState> = [];
  for (let i = 0; i < partySize; i++) {
    let baseCharacter: CharacterRef = {
      attributes: {
        atk: 1,
        hp: 10,
        mov: 1,
      },
      avatarPath: `/TestAvatars/con${Math.floor(Math.random() * 42) + 1}.png`,
      name: "enemy" + i,
    };
    let newEnemy: CharacterMatchState = {
      character: baseCharacter,
      isAi: true,
      battleStats: { ...baseCharacter.attributes },
      currentStats: { ...baseCharacter.attributes },
      color: "black",
      actionState: ActionStateEnum.noAction,
      position: {
        x: 1,
        y: positionStartX + i,
      },
    };
    newEnemyParty.push(newEnemy);
  }
  console.log(newEnemyParty);
  return newEnemyParty;
};
