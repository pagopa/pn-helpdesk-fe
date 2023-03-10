import { createContext } from "react";
import { UserData } from "../model/user-permission";

export interface UserContextData {
    currentUser: UserData | null,
    setCurrentUser: (u: UserData) => void,
    clearCurrentUser: () => void,
}

const initialUserContextValue: UserContextData = {
    currentUser: null,
    setCurrentUser: (_1) => {},
    clearCurrentUser: () => {}
}

export const UserContext = createContext(initialUserContextValue);
