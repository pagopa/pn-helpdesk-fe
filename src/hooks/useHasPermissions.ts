import { useMemo } from "react";
import { Permission } from "../model/user-permission";
import { useCurrentUser } from "./useCurrentUser";

// added for PN-4348 and PN-4461
export function useHasPermissions(requiredPermissions: Array<Permission>) {
  const { currentUser } = useCurrentUser();

  const hasAllPermissions: boolean = useMemo(
    () => requiredPermissions.every(perm => currentUser?.permissions.includes(perm)), 
    [currentUser, requiredPermissions]
  );

  // An anonymous (i.e. non logged) user cannot access to any route
  // which asks for permissions, even if the set of permissions is empty.
  // In this way we can set the empty set of permissions to routes which can be accessible
  // for any logged user, but not for anonymous access.
  return !!sessionStorage.getItem("token") && hasAllPermissions;
}