import { useMutation } from "@apollo/client";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import React, { useEffect, useState } from "react";
import DeleteIcon from "mdi-react/DeleteIcon";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { updateUser, updateUserVariables } from "../../types/updateUser";
import { UPDATE_USER } from "../../controllers/user/userController";
import { useDispatch } from "react-redux";
import { UPDATE_PARTIES } from "../../GlobalState/Reducers/UserReducer";

interface IProps {
  username: string;
  partyName: string;
}
export const DeletePartyButton = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const [deleteParty, { loading, error, data }] = useMutation<
    updateUser,
    updateUserVariables
  >(UPDATE_USER);

  if (error) console.log(error);
  const onConfirm = async () => {
    await deleteParty({
      variables: {
        patch: {
          filter: { username: { eq: props.username } },
          remove: { parties: [props.partyName] },
        },
      },
    });
    console.log(error);
    if (error) enqueueSnackbar(error, { variant: "error" });
    else enqueueSnackbar("Party deleted succesfully!", { variant: "success" });
    setopen(false);
  };

  useEffect(() => {
    if (data && data.updateUser?.user) {
      dispatch({
        type: UPDATE_PARTIES,
        data: data.updateUser?.user[0]?.parties,
      });
    }
  }, [data]);

  return (
    <>
      <IconButton onClick={() => setopen(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog onClose={() => setopen(false)} open={open}>
        <DialogTitle>Are you sure you want to delete this party?</DialogTitle>
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
