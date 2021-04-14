import { ButtonGroup, Button, TextField, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import PlusThickIcon from "mdi-react/PlusThickIcon";
import MinusThickIcon from "mdi-react/MinusThickIcon";
interface IProps {
  inputValue: number;
  label: string;
  handleChange: (value: number) => any;
}

const useStyle = makeStyles({
  root: {
    height: "50px",
    margin: "5px 0 5px 0",
  },
  leftBtn: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: "100%",
  },
  rightBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: "100%",
  },
  textBox: {
    height: "100%",
    "& .MuiOutlinedInput-root": {
      height: "100%",
    },

    "& fieldset": {
      borderRadius: 0,
    },
  },
});

export const ValueChangerButton = (props: IProps) => {
  const classes = useStyle();
  const { inputValue, handleChange, label } = props;
  const [value, setvalue] = useState(inputValue);

  const valueChanged = (newValue: number) => {
    setvalue(newValue);
    handleChange(value);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        className={classes.leftBtn}
        color="primary"
        onClick={() => valueChanged(value - 1)}
      >
        <MinusThickIcon />
      </Button>
      <TextField
        variant="outlined"
        inputProps={{ classes: { input: classes.textBox } }}
        className={classes.textBox}
        label={label}
        value={value}
      />
      <Button
        variant="outlined"
        className={classes.rightBtn}
        color="primary"
        onClick={() => valueChanged(value + 1)}
      >
        <PlusThickIcon />
      </Button>
    </div>
  );
};
