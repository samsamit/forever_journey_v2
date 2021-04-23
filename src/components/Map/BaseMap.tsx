import { Avatar, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { CLICK_TILE } from "../../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../../GlobalState/store";

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
});

interface IProps {}
export const BaseMap = (props: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const map = useSelector((state: IRootState) => state.gameState.map);

  const tileClicked = (e: any) => {
    dispatch({ type: CLICK_TILE, data: e.target.id });
  };

  const mapTiles = map.baseMap.map((row, i) => (
    <div key={i} className={classes.row}>
      {row.map((tile, j) => (
        <div
          key={j}
          className={classes.tile}
          onClick={tileClicked}
          id={`${i},${j}`}
          style={{
            backgroundColor: `${tile.bgColor}`,
          }}
        >
          {tile?.character?.avatarPath ? (
            <Avatar
              alt="Remy Sharp"
              src={tile.character.avatarPath}
              style={{ pointerEvents: "none" }}
            />
          ) : (
            tile.content
          )}
        </div>
      ))}
    </div>
  ));

  return <div className={classes.container}>{mapTiles}</div>;
};
