import { useMutation } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHARACTERS_EDIT } from "../../controllers/character/characterController";
import { UPDATE_CHARACTER } from "../../GlobalState/Reducers/UserReducer";
import { IRootState } from "../../GlobalState/store";
import {
  editCharacter,
  editCharacterVariables,
} from "../../types/editCharacter";
import { CharacterRef } from "../../types/globalTypes";
interface IProps {
  character: CharacterRef;
}
export const PartySelect = (props: IProps) => {
  const { character } = props;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [party, setparty] = useState<string>(
    character.party ? character.party : ""
  );
  const parties = useSelector(
    (state: IRootState) => state.user.userInfo?.parties
  );
  const [changeParty, { error, data }] = useMutation<
    editCharacter,
    editCharacterVariables
  >(CHARACTERS_EDIT);

  const handleChange = async (e: any) => {
    setparty(e.target.value);
    await changeParty({
      variables: {
        patch: {
          filter: { id: [character.id!] },
          set: { party: e.target.value },
        },
      },
    });
    console.log("changeParty");
  };

  useEffect(() => {
    if (data && data.updateCharacter?.character) {
      console.log(data);
      dispatch({
        type: UPDATE_CHARACTER,
        data: data.updateCharacter?.character[0],
      });
    }
  }, [data]);

  if (error) {
    enqueueSnackbar(error, { variant: "error" });
  }

  return (
    <FormControl>
      <InputLabel id="label">Party</InputLabel>
      <Select
        variant="outlined"
        labelId="label"
        value={party}
        onChange={handleChange}
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
  );
};
