import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import { CHARACTERS_ADD } from "../../controllers/character/characterController";
import { addCharacter, addCharacterVariables } from "../../types/addCharacter";
import PlusCircleIcon from "mdi-react/PlusCircleIcon";
import { useSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";

interface IProps {
  user: string;
}
export const CreateCharacterButton = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [newChar, setnewChar] = useState<addCharacterVariables>({
    name: "",
    owner: { username: props.user },
    race: "",
  });
  const [open, setopen] = useState(false);
  const [addChar, { data, loading, error }] = useMutation<
    addCharacter,
    addCharacterVariables
  >(CHARACTERS_ADD);

  const onChange = (e: any) => {
    setnewChar({ ...newChar, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await addChar({ variables: newChar });
    if (error) enqueueSnackbar(error, { variant: "error" });
    else
      enqueueSnackbar("Character created succesfully!", { variant: "success" });
    setnewChar({ ...newChar, name: "", race: "" });
  };
  if (error) console.log(error);

  return (
    <>
      <IconButton size="small" onClick={() => setopen(true)}>
        <PlusCircleIcon />
      </IconButton>
      <Dialog onClose={() => setopen(false)} open={open}>
        <DialogTitle>Character creation</DialogTitle>
        <form style={{ margin: 20 }}>
          <TextField
            variant="outlined"
            id="name"
            label="Name"
            value={newChar.name}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            id="race"
            label="Race"
            value={newChar.race}
            onChange={onChange}
          />
          <Button variant="outlined" color="primary" onClick={onSubmit}>
            Save
          </Button>
        </form>
        {loading && <p>Loading...</p>}
      </Dialog>
    </>
  );
};
