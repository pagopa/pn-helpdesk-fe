import { ReactNode, useCallback, useState } from 'react';
import { UserData } from '../model/user-permission';
import { UserContext } from './UserContext';

export function UserContextProvider(props: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const clearCurrentUser = useCallback(() => setCurrentUser(null), [setCurrentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, clearCurrentUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
