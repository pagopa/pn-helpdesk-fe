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
import {setDetailDriver} from "../../redux/deliveriesDrivers/reducers";
import {DeliveryDriver} from "../../model";


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