import { useMutation } from "@apollo/client";
import {
  IconButton,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  LinearProgress,
} from "@material-ui/core";
import PencilIcon from "mdi-react/PencilIcon";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { UPDATE_USER } from "../../controllers/user/userController";
import { UserRef, UserRole } from "../../types/globalTypes";
import {
  updateUser_updateUser,
  updateUserVariables,
} from "../../types/updateUser";

interface IProps {
  User: UserRef;
}

export const AddPartyButton = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setopen] = useState(false);
  const [partyName, setpartyName] = useState("");

  const [editUser, { loading, error, data }] = useMutation<
    updateUser_updateUser,
    updateUserVariables
  >(UPDATE_USER);

  const onChange = (e: any) => {
    setpartyName(e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await editUser({
      variables: {
        patch: {
          filter: { username: { eq: props.User.username } },
          set: {
            parties: [partyName],
          },
        },
      },
    });
    if (error) enqueueSnackbar(error, { variant: "error" });
  };

  if (data && open) {
    console.log(data);
    enqueueSnackbar("User saved succesfully!", { variant: "success" });
    setopen(false);
  }

  return (
    <>
      <IconButton size="small" onClick={() => setopen(true)}>
        <PencilIcon />
      </IconButton>
      <Dialog onClose={() => setopen(false)} open={open}>
        <DialogTitle>New party:</DialogTitle>
        <form style={{ margin: 20 }}>
          <TextField
            variant="outlined"
            label="Party name"
            type="text"
            value={partyName}
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
