import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {useAppDispatch} from "../../redux/hook";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {setDetailDriver, setDialogCosts} from "../../redux/deliveriesDrivers/reducers";
import {DeliveryDriver} from "../../model";
import {usePaperChannel} from "../../hooks/usePaperChannel";
import {DropdownMenu} from "./DropdownMenu";


export function ButtonsActionDriverTable(props:{value:any}){
  const dispatch = useAppDispatch();
  const {deleteDriver} = usePaperChannel();

  const handleClickEdit = () => {
    dispatch(setDetailDriver(props.value as DeliveryDriver))
  }

  const handleDeleteDriver = () => {
    deleteDriver(props.value.tenderCode, props.value.taxId);
  }

  return <>
    <DropdownMenu id={"menu-button-driver"}>
      <MenuList>
        <MenuItem onClick={handleClickEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Modifica</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteDriver}>
          <ListItemIcon>
            <DeleteIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Elimina</ListItemText>
        </MenuItem>
      </MenuList>
    </DropdownMenu>
  </>

}

export function ButtonShowCosts(props:{value:any}) {
  const dispatch = useAppDispatch();

  const handleClickShowCosts = () => {
    const driver = props.value as DeliveryDriver
    dispatch(setDialogCosts({tenderCode: driver.tenderCode, driverCode: driver.taxId }))
  }

  return <IconButton onClick={handleClickShowCosts}>
    <VisibilityIcon/>
  </IconButton>
}