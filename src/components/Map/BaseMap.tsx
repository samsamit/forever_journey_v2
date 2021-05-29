import { Avatar, makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CharacterMatchState,
  CLICK_TILE,
} from "../../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../../GlobalState/store";
import { AttributesRef, CharacterRef } from "../../types/globalTypes";
import { BarIndicator } from "../util/BarIndicator";
import { getTileColor } from "./MapFunctions/MapFunctions";
import { getTileIndex } from "./MapFunctions/TileClick";
import { ITile, TileStateEnum } from "./MapTypes";

const useStyles = makeStyles({
  container: {
    minWidth: "10vw",
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  tile: {
    position: "relative",
    flex: 1,
    aspectRatio: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "solid 1px rgba(0,0,0,0.25)",
    color: "black",
    userSelect: "none",
  },
  avatar: {
    border: "3px solid",
    padding: 2,
  },
  statusBar: {
    margin: 2,
    position: "absolute",
    bottom: 0,
    height: "12%",
    width: "90%",
  },
});

interface IProps {}
export const BaseMap = (props: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { map, players } = useSelector((state: IRootState) => state.gameState);

  const tileClicked = (e: any) => {
    e.preventDefault();
    let { x, y } = getTileIndex(e.target.id);
    if (e.type === "contextmenu") console.log(map.baseMap[x][y]);
    else dispatch({ type: CLICK_TILE, data: e.target.id });
  };

  const getBgColor = (tile: ITile) => {
    return tile.bgColor ? tile.bgColor : getTileColor(tile.state);
  };

  const mapTiles = map.baseMap.map((row, i) => (
    <div key={i} className={classes.row}>
      {row.map((tile, j) => {
        const charData = tile?.characterData;
        return (
          <div
            key={j}
            className={classes.tile}
            onClick={tileClicked}
            onContextMenu={tileClicked}
            id={`${i},${j}`}
            style={{
              backgroundColor: `${getBgColor(tile)}`,
            }}
          >
            {charData?.character?.avatarPath && (
              <>
                <Avatar
                  className={classes.avatar}
                  style={{
                    borderColor: `${
                      charData?.color ? charData.color : "white"
                    }`,
                    pointerEvents: "none",
                    boxShadow: `0 0 10px ${
                      charData?.color ? charData.color : "white"
                    }`,
                  }}
                  src={charData?.character.avatarPath}
                />
                {charData.battleStats && charData.currentStats && (
                  <div className={classes.statusBar}>
                    {charData.battleStats.hp && (
                      <BarIndicator
                        value={charData.currentStats!.hp!}
                        maxValue={charData.battleStats!.hp!}
                        styles={{ color: theme.palette.health, height: 50 }}
                      />
                    )}
                    <BarIndicator
                      value={1}
                      maxValue={1}
                      styles={{ color: theme.palette.mana, height: 50 }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  ));

  return <div className={classes.container}>{mapTiles}</div>;
};
