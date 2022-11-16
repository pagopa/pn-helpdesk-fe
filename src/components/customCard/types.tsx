import { SxProps } from "@mui/material";
import { ReactNode } from "react";

export interface CardHeaderType {
    avatar?: ReactNode,
    title?: ReactNode,
    sx?: SxProps
}

export interface CardActionType {
    id: string,
    component: ReactNode,
    onClick?: () => void
}