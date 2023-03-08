import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// added for PN-4348
export function useCurrentUser() {
  const userContext = useContext(UserContext);

  return { 
    currentUser: userContext.currentUser, setCurrentUser: userContext.setCurrentUser,
    clearCurrentUser: userContext.clearCurrentUser,
  };
}
