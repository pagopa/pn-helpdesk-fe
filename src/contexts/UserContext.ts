import { createContext } from "react";
import { UserData } from "../model/user-permission";

export interface UserContextData {
    currentUser: UserData | null,
    setCurrentUser: (u: UserData) => void,
}

const initialUserContextValue: UserContextData = {
    currentUser: null,
    setCurrentUser: (_1) => {}
}

export const UserContext = createContext(initialUserContextValue);
