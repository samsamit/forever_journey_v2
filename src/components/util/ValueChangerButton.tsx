import { ButtonGroup, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PlusThickIcon from "mdi-react/PlusThickIcon";
import MinusThickIcon from "mdi-react/MinusThickIcon";
interface IProps {
  inputValue: number;
  label: string;
  handleChange: (value: number) => any;
}
export const ValueChangerButton = (props: IProps) => {
  const { inputValue, handleChange, label } = props;
  const [value, setvalue] = useState(inputValue);

  useEffect(() => {
    handleChange(value);
  }, [value]);

  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button onClick={() => setvalue(value - 1)}>
        <MinusThickIcon />
      </Button>
      <TextField label={label} value={value} />
      <Button onClick={() => setvalue(value + 1)}>
        <PlusThickIcon />
      </Button>
    </ButtonGroup>
  );
};
