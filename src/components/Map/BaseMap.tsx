import { Avatar, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  CharacterMatchState,
  CLICK_TILE,
} from "../../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../../GlobalState/store";
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
    flex: 1,
    aspectRatio: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "solid 1px black",
    color: "black",
    userSelect: "none",
  },
  avatar: {
    border: "3px solid",
    padding: 2,
  },
});

interface IProps {}
export const BaseMap = (props: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { map, playerParty } = useSelector(
    (state: IRootState) => state.gameState
  );

  const tileClicked = (e: any) => {
    e.preventDefault();
    let { x, y } = getTileIndex(e.target.id);
    if (e.type === "contextmenu") console.log(map.baseMap[x][y]);
    else dispatch({ type: CLICK_TILE, data: e.target.id });
  };

  const getCharacterGameData = (name: string): CharacterMatchState => {
    return playerParty.filter((char) => char.character.name === name)[0];
  };

  const getBgColor = (tile: ITile) => {
    return tile.bgColor ? tile.bgColor : getTileColor(tile.state);
  };

  const mapTiles = map.baseMap.map((row, i) => (
    <div key={i} className={classes.row}>
      {row.map((tile, j) => {
        const char = tile?.characterData?.character;
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
            {char?.avatarPath && (
              <Avatar
                className={classes.avatar}
                style={{
                  borderColor: `${getCharacterGameData(char?.name!).color}`,
                  pointerEvents: "none",
                  boxShadow: `0 0 10px ${
                    getCharacterGameData(char?.name!).color
                  }`,
                }}
                src={char.avatarPath}
              />
            )}
          </div>
        );
      })}
    </div>
  ));

  return <div className={classes.container}>{mapTiles}</div>;
};
