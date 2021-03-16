import { useMutation } from "@apollo/client";
import {
  IconButton,
  Dialog,
  DialogTitle,
  LinearProgress,
  TextField,
  Button,
} from "@material-ui/core";
import HumanEditIcon from "mdi-react/HumanEditIcon";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { CHARACTERS_EDIT } from "../../controllers/character/characterController";
import {
  editCharacterVariables,
  editCharacter_updateCharacter,
} from "../../types/editCharacter";
import { CharacterPatch, CharacterRef } from "../../types/globalTypes";
interface IProps {
  character: CharacterRef;
}
export const EditCharacterButton = (props: IProps) => {
  const { character } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setopen] = useState(false);
  const [editedChar, seteditedChar] = useState<CharacterPatch>({
    name: character.name,
    race: character.race,
  });

  const [editChar, { loading, error }] = useMutation<
    editCharacter_updateCharacter,
    editCharacterVariables
  >(CHARACTERS_EDIT);

  const onChange = (e: any) => {
    seteditedChar({ ...editedChar, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await editChar({
      variables: {
        patch: {
          filter: { id: [props.character.id ? props.character.id : ""] },
          set: editedChar,
        },
      },
    });
    if (error) enqueueSnackbar(error, { variant: "error" });
    else
      enqueueSnackbar("Character saved succesfully!", { variant: "success" });
    setopen(false);
  };

  return (
    <>
      <IconButton size="small" onClick={() => setopen(true)}>
        <HumanEditIcon />
      </IconButton>
      <Dialog onClose={() => setopen(false)} open={open}>
        <DialogTitle>Edit Character</DialogTitle>
        <form style={{ margin: 20 }}>
          <TextField
            variant="outlined"
            id="name"
            label="Name"
            value={editedChar.name ? editedChar.name : ""}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            id="race"
            label="Race"
            value={editedChar.race ? editedChar.race : ""}
            onChange={onChange}
          />
          <Button variant="outlined" color="primary" onClick={onSubmit}>
            Save
          </Button>
        </form>
        {loading && <LinearProgress />}
      </Dialog>
    </>
  );
};
