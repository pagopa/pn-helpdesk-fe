import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
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
import {addSelected, resetAllTenderState} from "../../redux/tender/reducers";
import {CREATE_TENDER_ROUTE, TENDER_DETAIL_ROUTE} from "../../navigation/router.const";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {apiPaperChannel} from "../../api/paperChannelApi";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import {AxiosError} from "axios";


export function ButtonsActionTenderTable(props:{value:any}){
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickShowDetail = () => {
    dispatch(addSelected(props.value));
    navigate(TENDER_DETAIL_ROUTE);
  }

  const handleClickEdit = () => {
    navigate(CREATE_TENDER_ROUTE+"/"+props.value.code)
  }

  const handleDeleteTender = async () => {
    try {
      dispatch(spinnerActions.updateSpinnerOpened(true));
      await apiPaperChannel().deleteTender(props.value.code);
      dispatch(resetAllTenderState());
      dispatch(spinnerActions.updateSpinnerOpened(false));
    } catch (e){
      let message = "Errore durante l'eliminazione della gara";
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
    </Menu>
  </>

}