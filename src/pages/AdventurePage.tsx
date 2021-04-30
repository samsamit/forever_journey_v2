import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartBattle } from "../components/battle/StartBattle";
import { BaseMap } from "../components/Map/BaseMap";
import { BattleButtons } from "../components/battle/BattleButtons";
import { MapStateEnum } from "../components/Map/MapTypes";
import { INIT_BATTLE } from "../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../GlobalState/store";
import { CharacterContainer } from "../components/battle/CharacterContainer";
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
      justify="space-evenly"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{MapStateEnum[gameState.map.mapState]}</Grid>
      <Grid item style={{ width: "90vw" }} className={classes.mapRoot}>
        <BaseMap />
      </Grid>
      <Grid item style={{ width: "90vw" }}>
        <CharacterContainer />
      </Grid>
      <Grid item style={{ width: "90vw" }}>
        <BattleButtons />
      </Grid>
      <Grid item style={{ width: "90vw" }}>
        <Button onClick={() => dispatch({ type: INIT_BATTLE })}>
          Reset battle
        </Button>
      </Grid>
    </Grid>
  );
};
