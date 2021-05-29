import { makeStyles, useTheme } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { PaletteColor } from "@material-ui/core/styles/createPalette";
import React from "react";
import { theme } from "../../globalTheme";

const useStyles = makeStyles({
  root: {
    height: ({ height }: styleProps) => height + "%",
  },
  colorPrimary: {
    backgroundColor: ({ color }: styleProps) => color.dark,
  },
  barColorPrimary: {
    backgroundColor: ({ color }: styleProps) => color.light,
  },
});

interface styleProps {
  color: PaletteColor;
  height: number;
}

interface IProps {
  value: number;
  maxValue: number;
  styles: styleProps;
}

export const BarIndicator = ({ value, maxValue, styles }: IProps) => {
  const valuePercent = (value / maxValue) * 100;
  const classes = useStyles(styles);
  return (
    <LinearProgress
      variant="determinate"
      value={valuePercent}
      className={classes.root}
      classes={{
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
      }}
    />
  );
};
