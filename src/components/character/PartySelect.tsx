import { useMutation } from "@apollo/client";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CHARACTERS_EDIT } from "../../controllers/character/characterController";
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
  const [party, setparty] = useState<string>(
    character.party ? character.party : ""
  );
  const parties = useSelector(
    (state: IRootState) => state.user.userInfo?.parties
  );
  const [changeParty, { loading, error, data }] = useMutation<
    editCharacter,
    editCharacterVariables
  >(CHARACTERS_EDIT);

  const handleChange = (e: any) => {
    setparty(e.target.value);
    changeParty({
      variables: {
        patch: {
          filter: { id: [character.id!] },
          set: { party: e.target.value },
        },
      },
    });
  };

  if (data) {
    console.log(data);
  }

  if (error) enqueueSnackbar(error, { variant: "error" });

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
