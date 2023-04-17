import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import React from "react";
import {useAppDispatch} from "../../redux/hook";
import {useNavigate} from "react-router-dom";
import {addSelected} from "../../redux/tender/reducers";
import {CREATE_TENDER_ROUTE, TENDER_DETAIL_ROUTE} from "../../navigation/router.const";
import {usePaperChannel} from "../../hooks/usePaperChannel";
import {DropdownMenu} from "./DropdownMenu";
import {useHasPermissions} from "../../hooks/useHasPermissions";
import {Permission} from "../../model/user-permission";


export function ButtonsActionTenderTable(props:{value:any}){
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const canWrite = useHasPermissions([Permission.TENDER_WRITE]);
  const {deleteTender, changeStatusTender} = usePaperChannel();

  const handleClickShowDetail = () => {
    dispatch(addSelected(props.value));
    navigate(TENDER_DETAIL_ROUTE);
  }

  const handleClickEdit = () => {
    navigate(CREATE_TENDER_ROUTE+"/"+props.value.code)
  }

  const handleDeleteTender = () => {
    deleteTender(props.value.code)
  }

  const handleOnChangeStatus = () => {
    if (props.value?.status && props.value.status !== "ENDED" && props.value.status !== "IN_PROGRESS") {
      changeStatusTender(props.value.code, props.value.status);
    }
  }

  return <>
    <DropdownMenu id={"menu-button-tender"}>
      <MenuList>

        <MenuItem onClick={handleClickShowDetail}>
          <ListItemIcon>
            <InfoIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText data-testid={"detail-tender"}>Dettagli</ListItemText>
        </MenuItem >
        {
          (props.value?.status && props.value.status === "CREATED" && canWrite) ?
            <MenuItem onClick={handleClickEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText data-testid={"edit-tender"}>Modifica</ListItemText>
            </MenuItem>
            : null
        }

        {
          (props.value?.status && props.value.status !== "ENDED" && props.value.status !== "IN_PROGRESS" && canWrite) ?
            <MenuItem onClick={handleOnChangeStatus}>
              <ListItemIcon>
                <SystemUpdateAltIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText data-testid={"validated-tender"}>{(props.value.status === "VALIDATED") ? "Torna in Bozza" : "Convalida"}</ListItemText>
            </MenuItem>
            : null
        }


        {
          (props.value?.status && props.value.status === "CREATED" && canWrite) ?
            <MenuItem onClick={handleDeleteTender}>
              <ListItemIcon>
                <DeleteIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText data-testid={"delete-tender"}>Elimina</ListItemText>
            </MenuItem>
            : null
        }


      </MenuList>
    </DropdownMenu>
  </>

}