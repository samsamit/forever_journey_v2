import { CardHeader, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNullishCoalesce } from "typescript";
import {
  ACTIVATE_CHARACTER,
  CharacterMatchState,
} from "../../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../../GlobalState/store";
import { CharacterRef } from "../../types/globalTypes";
const useStyles = makeStyles({
  avatar: {
    width: "100px",
    height: "100px",
  },
});
interface IProps {
  characterData: CharacterMatchState;
}
export const CharacterBattleCard = (props: IProps) => {
  const { characterData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const activeCharacter = useSelector(
    (state: IRootState) => state.gameState.activeCharacter
  );
  const charActive =
    characterData.character.name === activeCharacter?.character.name;
  const clickCard = () => {
    if (!charActive) {
      dispatch({ type: ACTIVATE_CHARACTER, data: characterData });
    }
  };
  return (
    <Card
      onClick={clickCard}
      style={{ backgroundColor: `${charActive ? "green" : "white"}` }}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item>
          <CardHeader title={characterData.character.name} />
        </Grid>
        <Grid item>
          <CardMedia
            className={classes.avatar}
            image={characterData.character.avatarPath ?? undefined}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
