import { Card, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { START_BATTLE } from "../../GlobalState/Reducers/GameStateReducer";
import { CharacterRef } from "../../types/globalTypes";
interface IProps {}
export const StartBattle = (props: IProps) => {
  const dispatch = useDispatch();
  const [selectedParty, setselectedParty] = useState<Array<CharacterRef>>();
  const [error, seterror] = useState<string>();
  const startBattle = () => {
    if (selectedParty && selectedParty.length > 0) {
      dispatch({ type: START_BATTLE, data: selectedParty });
    } else {
      seterror("No party selected");
    }
  };
  return (
    <Card>
      {error && (
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      )}
      <Button onClick={startBattle}>Start battle</Button>
    </Card>
  );
};
