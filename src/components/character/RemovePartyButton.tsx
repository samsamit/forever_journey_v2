import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { CHARACTERS_EDIT } from "../../controllers/character/characterController";
import {
  editCharacter,
  editCharacterVariables,
} from "../../types/editCharacter";
import AccountMultipleRemoveIcon from "mdi-react/AccountMultipleRemoveIcon";
import { IconButton, Tooltip } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_CHARACTER } from "../../GlobalState/Reducers/UserReducer";
import { CharacterRef } from "../../types/globalTypes";
interface IProps {
  characterId: string;
}
export const RemovePartyButton = (props: IProps) => {
  const { characterId } = props;
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (data && data.updateCharacter?.character) {
      dispatch({
        type: UPDATE_CHARACTER,
        data: data.updateCharacter?.character[0],
      });
      enqueueSnackbar("Party cleared!", { variant: "success" });
    }
  }, [data]);

  if (error) enqueueSnackbar(error, { variant: "error" });

  return (
    <Tooltip title="Remove from party">
      <IconButton onClick={remove}>
        <AccountMultipleRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
function dispatch(arg0: {
  type: string;
  data:
    | import("../../types/editCharacter").editCharacter_updateCharacter_character
    | null;
}) {
  throw new Error("Function not implemented.");
}
