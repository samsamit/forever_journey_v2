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
import { keys } from "ts-transformer-keys";
import { CHARACTERS_EDIT } from "../../controllers/character/characterController";
import {
  editCharacterVariables,
  editCharacter_updateCharacter,
} from "../../types/editCharacter";
import {
  AttributesRef,
  CharacterPatch,
  CharacterRef,
} from "../../types/globalTypes";
import { ValueChangerButton } from "../util/ValueChangerButton";
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
    attributes: {
      atk: character.attributes?.atk,
      hp: character.attributes?.hp,
      mov: character.attributes?.mov,
    },
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

  const handleAttributeChange = (id: string, value: number) => {
    seteditedChar({ ...editedChar, attributes: { [id]: value } });
  };

  console.log(editedChar.attributes);
  const attrKeys = Object.keys(editedChar.attributes!);
  console.log(attrKeys);
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
          {attrKeys.map((key, i) => (
            <ValueChangerButton
              key={i}
              label={key}
              inputValue={(editedChar.attributes as any)[key]}
              handleChange={(value) => handleAttributeChange(key, value)}
            />
          ))}

          <Button variant="outlined" color="primary" onClick={onSubmit}>
            Save
          </Button>
        </form>
        {loading && <LinearProgress />}
      </Dialog>
    </>
  );
};
