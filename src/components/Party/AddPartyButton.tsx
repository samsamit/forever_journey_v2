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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_USER } from "../../controllers/user/userController";
import { UPDATE_PARTIES } from "../../GlobalState/Reducers/UserReducer";
import { UserRef } from "../../types/globalTypes";
import { updateUserVariables, updateUser } from "../../types/updateUser";

interface IProps {
  User: UserRef;
  variant: "small" | "big";
}

export const AddPartyButton = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();
  const [partyName, setpartyName] = useState("");

  const [editUser, { loading, error, data }] = useMutation<
    updateUser,
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

  useEffect(() => {
    if (data && data.updateUser?.user && open) {
      console.log(data);
      dispatch({
        type: UPDATE_PARTIES,
        data: data.updateUser.user[0]?.parties,
      });
      enqueueSnackbar("PArty added succesfully!", { variant: "success" });
      setopen(false);
    }
  }, [data]);

  return (
    <>
      {props.variant === "small" ? (
        <IconButton size="small" onClick={() => setopen(true)}>
          <PencilIcon />
        </IconButton>
      ) : (
        <Button endIcon={<PencilIcon />}> Create party: </Button>
      )}
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
