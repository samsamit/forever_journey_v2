import { Button, Card, Grid, makeStyles, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_MAP_STATE } from "../../GlobalState/Reducers/GameStateReducer";
import { IRootState, ReducerInput } from "../../GlobalState/store";
import { MapStateEnum } from "../Map/MapTypes";
import fill from "lodash/fill";
interface BattleButtonsOptions {
  buttonText: string;
  disabled: boolean;
  tooltip: string;
  dispatchData?: ReducerInput;
}
const ButtonInit: BattleButtonsOptions = {
  buttonText: "",
  disabled: false,
  tooltip: "",
};

const useStyle = makeStyles({
  root: {
    height: "150px",
  },
  gridBox: {},
  actionButton: {
    fontSize: "2vw",
    height: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "inline-block",
  },
});

export const BattleButtons = () => {
  const classes = useStyle();
  const gameState = useSelector((state: IRootState) => state.gameState);
  const dispatch = useDispatch();
  const [buttonOptions, setbuttonOptions] = useState<
    Array<BattleButtonsOptions>
  >(fill(Array(4), ButtonInit));

  useEffect(() => {
    switch (gameState.map.mapState) {
      case MapStateEnum.SelectStartPosition:
        updateButtonState(0, {
          buttonText: "Select starting positions",
          disabled: true,
          tooltip: "First select starting positions",
        });

        break;
      case MapStateEnum.ReadyToStartBattle:
        updateButtonState(0, {
          buttonText: "Confirm starting positions",
          disabled: false,
          tooltip: "",
          dispatchData: { type: SET_MAP_STATE, data: MapStateEnum.TurnAction },
        });
        break;
    }
  }, [gameState.map.mapState]);

  const updateButtonState = (id: number, data: BattleButtonsOptions) => {
    let newArray = [...buttonOptions];
    newArray[id] = data;
    setbuttonOptions(newArray);
  };

  const buttonClick = (dispatchData: ReducerInput | undefined) => {
    dispatchData && dispatch(dispatchData);
  };

  return (
    <Card className={classes.root}>
      <Grid
        style={{ height: "100%" }}
        container
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
      >
        {buttonOptions.map((button, i) => (
          <Grid key={i} item xs={6} className={classes.gridBox}>
            <Tooltip title={button.tooltip}>
              <span>
                <Button
                  fullWidth
                  variant="outlined"
                  className={classes.actionButton}
                  disabled={button.disabled}
                  onClick={() => buttonClick(button.dispatchData)}
                >
                  {button.buttonText}
                </Button>
              </span>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
