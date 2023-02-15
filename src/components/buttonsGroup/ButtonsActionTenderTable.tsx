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
import {addSelected} from "../../redux/tender/reducers";
import {CREATE_TENDER_ROUTE, TENDER_DETAIL_ROUTE} from "../../navigation/router.const";
import MoreVertIcon from '@mui/icons-material/MoreVert';


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
        <MenuItem onClick={handleClickEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Modifica</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SystemUpdateAltIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Convalida</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Elimina</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  </>

}