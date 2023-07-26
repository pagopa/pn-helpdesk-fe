import { allNavigationItems } from '../navigation/navigation.utils';
import { useCurrentUser } from './useCurrentUser';

export function useNavigationItems() {
  const { currentUser } = useCurrentUser();
  const currentUserPermissions = currentUser?.permissions;

  const availableItems = allNavigationItems.filter((item) =>
    item.permissions?.every((requiredPermission) =>
      currentUserPermissions?.includes(requiredPermission)
    )
  );

  return {
    availableItems,
  };
}
