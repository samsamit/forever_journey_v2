import React from "react";
import { UserTable } from "../components/admin/UserTable";
interface IProps {}
export const AdminPage = (props: IProps) => {
  return (
    <div>
      <UserTable />
    </div>
  );
};
