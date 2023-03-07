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

  return hasAllPermissions;
}