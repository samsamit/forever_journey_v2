import { useMutation } from "@apollo/client";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import DeleteIcon from "mdi-react/DeleteIcon";
import {
  deleteUser_deleteUser,
  deleteUserVariables,
} from "../../types/deleteUser";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { DELETE_USER } from "../../controllers/user/userController";

interface IProps {
  username: string;
}
export const DeleteUserButton = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setopen] = useState(false);
  const [deleteChar, { error, loading }] = useMutation<
    deleteUser_deleteUser,
    deleteUserVariables
  >(DELETE_USER);

  if (error) console.log(error);
  const onConfirm = async () => {
    await deleteChar({ variables: { username: props.username } });
    console.log(error);
    if (error) enqueueSnackbar(error, { variant: "error" });
    else enqueueSnackbar("User deleted succesfully!", { variant: "success" });
    setopen(false);
  };

  return (
    <>
      <IconButton onClick={() => setopen(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog onClose={() => setopen(false)} open={open}>
        <DialogTitle>
          Are you sure you want to delete <b>{props.username}</b> User?
        </DialogTitle>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button onClick={() => onConfirm()} color="primary">
                Delete
              </Button>
              <Button onClick={() => setopen(false)} color="secondary">
                Cancel
              </Button>
            </>
          )}
        </Grid>
      </Dialog>
    </>
  );
};
