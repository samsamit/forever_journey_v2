import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import React, { useEffect, useState } from "react";
import { CHARACTERS_ADD } from "../../controllers/character/characterController";
import { addCharacter, addCharacterVariables } from "../../types/addCharacter";
import PlusCircleIcon from "mdi-react/PlusCircleIcon";
import { useSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import { UPDATE_CHARACTER } from "../../GlobalState/Reducers/UserReducer";
import { useDispatch } from "react-redux";

interface IProps {
  user: string;
}
export const CreateCharacterButton = (props: IProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [newChar, setnewChar] = useState<addCharacterVariables>({
    name: "",
    owner: { username: props.user },
    race: "",
    avatarPath: "",
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
    console.log({
      ...newChar,
      avatarPath: `/TestAvatars/con${Math.floor(Math.random() * 42) + 1}.png`,
    });
    await addChar({
      variables: {
        ...newChar,
        avatarPath: `/TestAvatars/con${Math.floor(Math.random() * 42) + 1}.png`,
      },
    });
    if (error) enqueueSnackbar(error, { variant: "error" });
    else
      enqueueSnackbar("Character created succesfully!", { variant: "success" });
    setnewChar({ ...newChar, name: "", race: "" });
  };
  if (error) console.log(error);

  useEffect(() => {
    if (data) {
      dispatch({ type: UPDATE_CHARACTER, data: data.addCharacter?.character });
    }
  }, [data]);

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
