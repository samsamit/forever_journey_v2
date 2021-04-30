import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { get, keys } from "lodash";
import React from "react";
import { AttributesRef } from "../../types/globalTypes";
interface IProps {
  attributes: AttributesRef;
}
export const AttributeSheet = ({ attributes }: IProps) => {
  const attrKeys = keys(attributes);
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      style={{ padding: 10 }}
    >
      {attrKeys.map((key, i) => {
        if (key[0] !== "_") {
          return (
            <Grid key={i} item xs={4} style={{ textAlign: "center" }}>
              <Typography>{key + ": " + get(attributes, key)}</Typography>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};
