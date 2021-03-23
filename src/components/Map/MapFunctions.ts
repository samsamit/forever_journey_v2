import { ITile, MapType, TileStateEnum } from "../../GlobalState/Reducers/MapReducer";

export const testMapData = (): MapType => {
    const size = 20;
    const initTile: ITile = {
        bgColor: "white",
        content: "0",
        state: TileStateEnum.idle
    }
    return Array(size).fill(Array(size).fill(initTile));
}

const getTileIndex = (tileId: string): {i: number, j: number} => {
    const indexes = tileId.split(',');
    const i = Number(indexes[0]);
    const j = Number(indexes[1]);
    return {i, j}
}

export const handleTileClick = (tileId: string, map: MapType): MapType => {
    const {i, j} = getTileIndex(tileId);
    let modifyMap = map;
    switch(modifyMap[i][j].state){
        case TileStateEnum.idle:
            modifyMap[i][j].state = TileStateEnum.selected;
            modifyMap[i][j].bgColor = "red";
            modifyMap[i][j].content = "1";
            modifyMap = handleTileActivation(tileId, modifyMap, 2);
            break;
        
        case TileStateEnum.selected:
            modifyMap.forEach(row => row.forEach(tile => {
                tile.content = "0";
                tile.bgColor = "white";
                tile.state = TileStateEnum.idle;
            }));
            break;

        default:
            break;
    }
    return modifyMap;
}

const handleTileActivation = (tileId: string, map: MapType, range: number): MapType => {
    const mapToModify = map;
    const {i, j} = getTileIndex(tileId);
    //Loop trough every index in range of start point
    for(let x = -range; x < range+1; x++){
        for(let y = -range; y < range+1; y++){
            //Check if the index is inside map
            if((x+i) >= 0 && (x+i) < mapToModify.length 
            && (y+j) >= 0 && (y+j) < mapToModify.length 
            && x !== 0 || y !== 0){
                //if the cordinates sum is larger that range then skip them
                if(Math.abs(x) + Math.abs(y) <= range){
                    mapToModify[(x+i)][(y+j)].state = TileStateEnum.active;
                    mapToModify[(x+i)][(y+j)].bgColor = "green";
                    mapToModify[(x+i)][(y+j)].content = "2";
                }
            }
        }
    }
    return mapToModify;
}