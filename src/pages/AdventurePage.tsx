import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartBattle } from "../components/battle/StartBattle";
import { BaseMap } from "../components/Map/BaseMap";
import { INIT_BATTLE } from "../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../GlobalState/store";
interface IProps {}
export const AdventurePage = (props: IProps) => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: IRootState) => state.gameState);
  if (!gameState.ongoingBattle) return <StartBattle />;
  else
    return (
      <>
        <BaseMap />
        <Button onClick={() => dispatch({ type: INIT_BATTLE })}>
          Reset battle
        </Button>
      </>
    );
};
