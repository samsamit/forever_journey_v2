import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import AccountPlusIcon from "mdi-react/AccountPlusIcon";
import { useSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import { AddUserInput, UserRole } from "../../types/globalTypes";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ADD_USER } from "../../controllers/user/userController";
import { addUserVariables, addUser_addUser } from "../../types/addUser";
import InputLabel from "@material-ui/core/InputLabel";

interface IProps {}
export const CreateUserButton = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [newUser, setnewUser] = useState<AddUserInput>({
    username: "",
    email: "",
    password: "",
    role: UserRole.USER,
  });
  const [open, setopen] = useState(false);
  const [addUser, { loading, error }] = useMutation<
    addUser_addUser,
    addUserVariables
  >(ADD_USER);

  const onChange = (e: any) => {
    setnewUser({ ...newUser, [e.target.id]: e.target.value });
    console.log(e.target.id + " " + e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(newUser);
    await addUser({ variables: { user: newUser } });
    if (error) enqueueSnackbar(error, { variant: "error" });
    else
      enqueueSnackbar("Character created succesfully!", { variant: "success" });
    setnewUser({
      ...newUser,
      username: "",
      password: "",
      email: "",
      role: UserRole.USER,
    });
  };

  if (error) console.log(error);
  const roleKeys = Object.values(UserRole);

  return (
    <>
      <IconButton size="small" onClick={() => setopen(true)}>
        <AccountPlusIcon />
      </IconButton>
      <Dialog onClose={() => setopen(false)} open={open}>
        <DialogTitle>Character creation</DialogTitle>
        <form style={{ margin: 20 }}>
          <TextField
            variant="outlined"
            id="username"
            label="Username"
            value={newUser.username}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            value={newUser.email}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            value={newUser.password}
            onChange={onChange}
          />
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role"
            value={newUser.role}
            onChange={(e) =>
              setnewUser({ ...newUser, role: e.target.value as UserRole })
            }
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

        {loading && <p>Loading...</p>}
      </Dialog>
    </>
  );
};
