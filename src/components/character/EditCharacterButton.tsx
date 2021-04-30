import { useMutation } from "@apollo/client";
import {
  IconButton,
  Dialog,
  DialogTitle,
  LinearProgress,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import HumanEditIcon from "mdi-react/HumanEditIcon";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHARACTERS_EDIT } from "../../controllers/character/characterController";
import { UPDATE_CHARACTER } from "../../GlobalState/Reducers/UserReducer";
import { IRootState } from "../../GlobalState/store";
import {
  editCharacterVariables,
  editCharacter_updateCharacter,
} from "../../types/editCharacter";
import { CharacterPatch, CharacterRef } from "../../types/globalTypes";
import { ValueChangerButton } from "../util/ValueChangerButton";
interface IProps {
  character: CharacterRef;
}
export const EditCharacterButton = (props: IProps) => {
  const { character } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setopen] = useState(false);
  const parties = useSelector(
    (state: IRootState) => state.user.userInfo?.parties
  );
  const [editedChar, seteditedChar] = useState<CharacterPatch>({
    name: character.name,
    race: character.race,
    attributes: {
      atk: character.attributes?.atk,
      hp: character.attributes?.hp,
      mov: character.attributes?.mov,
    },
    party: character.party,
  });

  const [editChar, { loading, error, data }] = useMutation<
    editCharacter_updateCharacter,
    editCharacterVariables
  >(CHARACTERS_EDIT);

  const onChange = (e: any) => {
    console.log(e.target.id);
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
    seteditedChar({
      ...editedChar,
      attributes: { ...editedChar.attributes, [id]: value },
    });
  };

  const handlePartyChange = (e: any) => {
    seteditedChar({
      ...editedChar,
      party: e.target.value,
    });
  };
  const attrChangers = Object.keys(editedChar.attributes!).map((key, i) => (
    <ValueChangerButton
      key={i}
      label={key}
      inputValue={(editedChar.attributes as any)[key]}
      handleChange={(value) => handleAttributeChange(key, value)}
    />
  ));

  useEffect(() => {
    if (data) {
      dispatch({ type: UPDATE_CHARACTER, data: data.character });
    }
  }, [data]);

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
          {attrChangers}
          <FormControl>
            <InputLabel id="label">Party</InputLabel>
            <Select
              variant="outlined"
              labelId="label"
              value={editedChar.party ? editedChar.party : ""}
              onChange={handlePartyChange}
            >
              <MenuItem value={""}>No party</MenuItem>
              {parties &&
                parties.map(
                  (party, i) =>
                    party && (
                      <MenuItem key={i} value={party!}>
                        {party}
                      </MenuItem>
                    )
                )}
            </Select>
          </FormControl>
          <Button variant="outlined" color="primary" onClick={onSubmit}>
            Save
          </Button>
        </form>
        {loading && <LinearProgress />}
      </Dialog>
    </>
  );
};
