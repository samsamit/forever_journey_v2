import { useMutation } from "@apollo/client";
import { Button, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER } from "../../controllers/user/userController";
import { LOGOUT_USER } from "../../GlobalState/Reducers/UserReducer";
import { IRootState } from "../../GlobalState/store";
import { UserRole } from "../../types/globalTypes";
import {
  updateUser_updateUser,
  updateUserVariables,
} from "../../types/updateUser";
const useStyle = makeStyles({
  root: {
    margin: 20,
    height: 200,
  },
});
interface IProps {}
export const UserCard = (props: IProps) => {
  const user = useSelector((state: IRootState) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyle();
  const dispatch = useDispatch();
  const [editUser, { loading, error }] = useMutation<
    updateUser_updateUser,
    updateUserVariables
  >(UPDATE_USER);

  const makeAdmin = async () => {
    await editUser({
      variables: {
        patch: {
          filter: { username: { eq: user.userInfo?.username } },
          set: {
            role: UserRole.ADMIN,
          },
        },
      },
    });
    dispatch({ type: LOGOUT_USER });
    enqueueSnackbar("You are now admin! Please login again.", {
      variant: "success",
    });
  };

  return (
    <Card className={classes.root}>
      {user.userInfo ? user.userInfo?.username : "Loading..."}
      {user.userInfo?.role !== UserRole.ADMIN && (
        <Button onClick={makeAdmin}>Make me ADMIN!</Button>
      )}
    </Card>
  );
};
