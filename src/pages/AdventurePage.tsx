import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CharacterBattleCard } from "../components/battle/CharacterBattleCard";
import { StartBattle } from "../components/battle/StartBattle";
import { CharacterCard } from "../components/character/CharacterCard";
import { BaseMap } from "../components/Map/BaseMap";
import { MapStateButton } from "../components/Map/MapStateButton";
import { INIT_BATTLE } from "../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../GlobalState/store";
interface IProps {}
const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  mapRoot: {
    width: "80%",
  },
});
export const AdventurePage = (props: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const gameState = useSelector((state: IRootState) => state.gameState);
  if (!gameState.ongoingBattle) return <StartBattle />;
  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <Grid item className={classes.mapRoot}>
        <BaseMap />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {gameState.playerParty.map(
            (data, i) =>
              data && (
                <Grid item key={i}>
                  <CharacterBattleCard characterData={data} />
                </Grid>
              )
          )}
        </Grid>
      </Grid>
      <Grid item>
        <MapStateButton />
      </Grid>
      <Grid item>
        <Button onClick={() => dispatch({ type: INIT_BATTLE })}>
          Reset battle
        </Button>
      </Grid>
    </Grid>
  );
};
