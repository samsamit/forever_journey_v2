import { Card, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../GlobalState/store";
import { MapStateEnum } from "../Map/MapTypes";
import { CharacterBattleCard } from "./CharacterBattleCard";
interface IProps {}
export const CharacterContainer = (props: IProps) => {
  const gameState = useSelector((state: IRootState) => state.gameState);
  if (
    !gameState.activeCharacter &&
    gameState.map.mapState !== MapStateEnum.SelectStartPosition
  ) {
    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        {gameState.playerParty.map(
          (data, i) =>
            data && (
              <Grid item key={i} sm={4} xs={12}>
                <CharacterBattleCard characterData={data} />
              </Grid>
            )
        )}
      </Grid>
    );
  }
  if (gameState.activeCharacter) {
    return (
      <CharacterBattleCard
        characterData={gameState.activeCharacter}
        variant="full"
      />
    );
  }
  return <div>error</div>;
};
