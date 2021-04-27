import { Button, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../GlobalState/store";
import { MapStateEnum } from "./MapTypes";
interface IProps {}
export const MapStateButton = (props: IProps) => {
  const gameState = useSelector((state: IRootState) => state.gameState);
  const [buttonText, setbuttonText] = useState("StateButton");
  const [disabled, setdisabled] = useState(true);
  const [tooltip, settooltip] = useState("");

  useEffect(() => {
    switch (gameState.map.mapState) {
      case MapStateEnum.SelectStartPosition:
        setbuttonText("Place characters in the map");
        setdisabled(true);
        break;
      case MapStateEnum.ReadyToStartBattle:
        setbuttonText("Confirm starting positions");
        setdisabled(false);
    }
  }, [gameState.map.mapState]);

  const buttonClick = () => {};
  return (
    <Tooltip title={tooltip}>
      <Button disabled={disabled} onClick={buttonClick}>
        {buttonText}
      </Button>
    </Tooltip>
  );
};
