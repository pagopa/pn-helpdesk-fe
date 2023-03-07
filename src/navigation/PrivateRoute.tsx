import { Navigate } from "react-router-dom";
import { useHasPermissions } from "../hooks/useHasPermissions";
import { Permission } from "../model/user-permission";

const PrivateRoute = ({ roles, children }: { roles: Array<Permission>, children: JSX.Element }): JSX.Element => {
  const accepted = useHasPermissions(roles);
  return accepted ? children : <Navigate to="/" replace={true} />;
};

export default PrivateRoute;
