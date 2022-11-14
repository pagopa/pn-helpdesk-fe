import { createContext } from "react";
import { ContextType } from "./ConfirmationTypes";

export default createContext<ContextType | undefined>(undefined);
