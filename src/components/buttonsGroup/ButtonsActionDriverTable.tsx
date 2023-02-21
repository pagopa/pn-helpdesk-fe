import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {useAppDispatch} from "../../redux/hook";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {resetStateDrivers, setDetailDriver, setDialogCosts} from "../../redux/deliveriesDrivers/reducers";
import {DeliveryDriver} from "../../model";
import {apiPaperChannel} from "../../api/paperChannelApi";
import {AxiosError} from "axios";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";


export function ButtonsActionDriverTable(props:{value:any}){
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    dispatch(setDetailDriver(props.value as DeliveryDriver))
  }

  const handleDeleteDriver = async () => {
    try {
      const driver = props.value as DeliveryDriver
      dispatch(spinnerActions.updateSpinnerOpened(true));
      await apiPaperChannel().deleteDriver(driver.tenderCode, driver.taxId)
      dispatch(spinnerActions.updateSpinnerOpened(false));
      dispatch(resetStateDrivers());
    } catch (e){
      let message = "Errore durante l'eliminazione del recapitista";
      if (e instanceof AxiosError && e?.response?.data?.detail){
        message = e.response.data.detail;
      }
      dispatch(spinnerActions.updateSpinnerOpened(false));
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(400));
      dispatch(snackbarActions.updateMessage(message));
    }
  }

  return <>
    <IconButton
      id="button-action-tenders"
      aria-controls={open ? 'action-tenders-positioned-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <MoreVertIcon/>
    </IconButton>
    <Menu id="action-tenders-positioned-menu"
          aria-labelledby="button-action-tenders"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
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
    </Menu>
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