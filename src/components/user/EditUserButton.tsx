import { useMutation } from "@apollo/client";
import {
  IconButton,
  Dialog,
  DialogTitle,
  LinearProgress,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import PencilIcon from "mdi-react/PencilIcon";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { UPDATE_USER } from "../../controllers/user/userController";
import { UserPatch, UserRef, UserRole } from "../../types/globalTypes";
import {
  updateUserVariables,
  updateUser_updateUser,
} from "../../types/updateUser";
interface IProps {
  User: UserRef;
}
export const EditUserButton = (props: IProps) => {
  const { User } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setopen] = useState(false);
  const [editedUser, seteditedChar] = useState<UserPatch>({
    email: User.email,
    role: User.role,
  });

  const [editUser, { loading, error }] = useMutation<
    updateUser_updateUser,
    updateUserVariables
  >(UPDATE_USER);

  const onChange = (e: any) => {
    seteditedChar({ ...editedUser, [e.target.id]: e.target.value });
  };
  const onSelect = (e: any) => {
    seteditedChar({ ...editedUser, role: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await editUser({
      variables: {
        patch: {
          filter: { username: { eq: props.User.username } },
          set: editedUser,
        },
      },
    });
    if (error) enqueueSnackbar(error, { variant: "error" });
    else enqueueSnackbar("User saved succesfully!", { variant: "success" });
    setopen(false);
  };

  const roleKeys = Object.values(UserRole);

  return (
    <>
      <IconButton size="small" onClick={() => setopen(true)}>
        <PencilIcon />
      </IconButton>
      <Dialog onClose={() => setopen(false)} open={open}>
        <DialogTitle>Character creation</DialogTitle>
        <form style={{ margin: 20 }}>
          <TextField
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            value={editedUser.email}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            value={editedUser.password}
            onChange={onChange}
          />
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role"
            value={editedUser.role}
            onChange={onSelect}
          >
            <MenuItem value={roleKeys[0]}>{roleKeys[0]}</MenuItem>
            <MenuItem value={roleKeys[1]}>{roleKeys[1]}</MenuItem>
          </Select>
          <Button variant="outlined" color="primary" onClick={onSubmit}>
            Save
          </Button>
        </form>
        {roleKeys.forEach((key, i) => {
          <p>
            {key}
            {i}
          </p>;
        })}

        {loading && <LinearProgress />}
      </Dialog>
    </>
  );
};
