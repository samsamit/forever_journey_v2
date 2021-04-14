import { useMutation, useQuery } from "@apollo/client";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { GET_ALL_USER } from "../../controllers/user/userController";
import { getAllUsers, getAllUsers_queryUser } from "../../types/getAllUsers";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import { CreateCharacterButton } from "../character/CreateCharacterButton";
import { Divider, Fab } from "@material-ui/core";
import { DeleteCharacterButton } from "../character/DeleteCharacterButton";
import { EditCharacterButton } from "../character/EditCharacterButton";
import { CharacterRef } from "../../types/globalTypes";
import { CreateUserButton } from "../user/CreateUserButton";
import { DeleteUserButton } from "../user/DeleteUserButton";
import { EditUserButton } from "../user/EditUserButton";

const useStyles = makeStyles({
  table: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  charTable: {
    border: "solid 2px green",
  },
});

interface IRowProps {
  user: getAllUsers_queryUser;
}

const Row = (props: IRowProps) => {
  const { user } = props;

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const hasChars = user.characters?.length
    ? user.characters?.length > 0
    : false;

  return (
    <React.Fragment>
      <TableRow hover className={classes.table}>
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell align="right">{user.role}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell>
          {hasChars ? (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </IconButton>
          ) : (
            <CreateCharacterButton user={user.username} />
          )}
        </TableCell>
        <TableCell align="right">
          <EditUserButton User={user} />
        </TableCell>
        <TableCell align="right">
          <DeleteUserButton username={user.username} />
        </TableCell>
      </TableRow>
      {hasChars && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              className={classes.charTable}
            >
              <Divider />
              <Box margin={1}>
                <Table size="small" aria-label="characters">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <CreateCharacterButton user={user.username} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Race</TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hasChars &&
                      user!.characters?.map((character) => (
                        <TableRow hover key={character?.id}>
                          <TableCell component="th" scope="row">
                            {character?.name}
                          </TableCell>
                          <TableCell>{character?.race}</TableCell>
                          <TableCell>
                            <EditCharacterButton
                              character={character as CharacterRef}
                            />
                          </TableCell>
                          <TableCell>
                            <DeleteCharacterButton charId={character!.id} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};
interface IProps {}
export const UserTable = (props: IProps) => {
  const classes = useStyles();
  const { data, loading, error } = useQuery<getAllUsers>(GET_ALL_USER, {
    pollInterval: 500,
  });

  return (
    <div>
      {error && <p>Error getting users</p>}
      {loading && <p>loading</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CreateUserButton />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Characters</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.queryUser?.map(
              (user, i) => user && <Row key={i} user={user} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
