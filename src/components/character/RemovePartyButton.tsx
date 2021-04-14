import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { CHARACTERS_EDIT } from "../../controllers/character/characterController";
import {
  editCharacter,
  editCharacterVariables,
} from "../../types/editCharacter";
import DeleteIcon from "mdi-react/DeleteIcon";
import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
interface IProps {
  characterId: string;
}
export const RemovePartyButton = (props: IProps) => {
  const { characterId } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [removeParty, { error, data }] = useMutation<
    editCharacter,
    editCharacterVariables
  >(CHARACTERS_EDIT);

  const remove = () => {
    removeParty({
      variables: {
        patch: {
          filter: { id: [characterId] },
          remove: { party: null },
        },
      },
    });
  };

  if (data) {
    console.log(data);
    enqueueSnackbar("Party cleared!", { variant: "success" });
  }

  if (error) enqueueSnackbar(error, { variant: "error" });

  return (
    <Tooltip title="Remove party">
      <IconButton onClick={remove}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};
