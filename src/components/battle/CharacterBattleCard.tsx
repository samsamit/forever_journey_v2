import { CardHeader, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNullishCoalesce } from "typescript";
import {
  ActionStateEnum,
  ACTIVATE_CHARACTER,
  CharacterMatchState,
} from "../../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../../GlobalState/store";
import { CharacterRef } from "../../types/globalTypes";
import { AttributeSheet } from "../character/AttributeSheet";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  gridBorder: {
    border: "2px solid",
  },
  avatar: {
    width: "100px",
    height: "100px",
  },
});
interface IProps {
  characterData: CharacterMatchState;
  variant?: "compact" | "full";
}
export const CharacterBattleCard = ({
  characterData,
  variant = "compact",
}: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const gameState = useSelector((state: IRootState) => state.gameState);
  const charActive = characterData.character.name === gameState.activeCharacter;
  const clickCard = () => {
    dispatch({ type: ACTIVATE_CHARACTER, data: characterData.character.name });
  };

  return (
    <Card className={classes.root} onClick={clickCard}>
      <Grid
        className={classes.gridBorder}
        style={{
          borderColor: `${characterData.color}`,
        }}
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item>
          <CardHeader
            title={characterData.character.name}
            subheader={characterData.character.race}
          />
        </Grid>
        {variant === "full" && (
          <Grid item>{ActionStateEnum[characterData.actionState]}</Grid>
        )}
        {variant === "full" && (
          <Grid item>
            <AttributeSheet attributes={characterData.character.attributes!} />
          </Grid>
        )}
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
