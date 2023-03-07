import { ReactNode, useState } from "react"
import { UserData } from "../model/user-permission"
import { UserContext } from "./UserContext";

export function UserContextProvider(props: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);
    
    return <UserContext.Provider value={{currentUser, setCurrentUser}}>
        {props.children}
    </UserContext.Provider>
}
