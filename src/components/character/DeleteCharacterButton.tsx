import { useMutation } from "@apollo/client";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import DeleteIcon from "mdi-react/DeleteIcon";
import { CHARACTERS_DELETE } from "../../controllers/character/characterController";
import {
  deleteCharacter_deleteCharacter,
  deleteCharacterVariables,
} from "../../types/deleteCharacter";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";

interface IProps {
  charId: string;
}
export const DeleteCharacterButton = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setopen] = useState(false);
  const [deleteChar, { error, loading }] = useMutation<
    deleteCharacter_deleteCharacter,
    deleteCharacterVariables
  >(CHARACTERS_DELETE);

  if (error) console.log(error);
  const onConfirm = async () => {
    console.log(props.charId);
    await deleteChar({ variables: { id: props.charId } });
    console.log(error);
    if (error) enqueueSnackbar(error, { variant: "error" });
    else
      enqueueSnackbar("Character deleted succesfully!", { variant: "success" });
    setopen(false);
  };

  return (
    <>
      <IconButton onClick={() => setopen(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog onClose={() => setopen(false)} open={open}>
        <DialogTitle>
          Are you sure you want to delete this character?
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
              {" "}
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
