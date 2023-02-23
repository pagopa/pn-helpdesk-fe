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
import {useDeletePaperChannel} from "../../hooks/useDeletePaperChannel";
import {DropdownMenu} from "./DropdownMenu";


export function ButtonsActionTenderTable(props:{value:any}){
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {deleteTender} = useDeletePaperChannel();

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

  return <>
    <DropdownMenu id={"menu-button-tender"}>
      <MenuList>

        <MenuItem onClick={handleClickShowDetail}>
          <ListItemIcon>
            <InfoIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Dettagli</ListItemText>
        </MenuItem >
        {
          (props.value?.status && props.value.status === "CREATED") ?
            <MenuItem onClick={handleClickEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText>Modifica</ListItemText>
            </MenuItem>
            : null
        }

        {
          (props.value?.status && props.value.status !== "ENDED") ?
            <MenuItem>
              <ListItemIcon>
                <SystemUpdateAltIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText>{(props.value.status === "IN_PROGRESS") ? "Torna in Bozza" : "Convalida"}</ListItemText>
            </MenuItem>
            : null
        }


        {
          (props.value?.status && props.value.status === "CREATED") ?
            <MenuItem onClick={handleDeleteTender}>
              <ListItemIcon>
                <DeleteIcon fontSize="small"/>
              </ListItemIcon>
              <ListItemText>Elimina</ListItemText>
            </MenuItem>
            : null
        }


      </MenuList>
    </DropdownMenu>
  </>

}