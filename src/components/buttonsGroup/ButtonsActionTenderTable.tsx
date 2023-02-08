import {IconButton, Stack, Tooltip} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {useAppDispatch} from "../../redux/hook";
import {useNavigate} from "react-router-dom";
import {addSelected} from "../../redux/tender/reducers";
import {CREATE_TENDER_ROUTE, GET_DETAIL_TENDER} from "../../navigation/router.const";


export function ButtonsActionTenderTable(props:{value:any}){
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickShowDetail = () => {
    dispatch(addSelected(props.value));
    navigate(GET_DETAIL_TENDER);
  }

  const handleClickEdit = () => {
    navigate(CREATE_TENDER_ROUTE+"/"+props.value.code)
  }

  return <>
    <Stack direction={"row"} spacing={1}>
      <Tooltip title="Dettaglio gara">
        <IconButton size={"small"} color="primary" component="label" onClick={handleClickShowDetail} >
          <InfoIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Modifica gara">
        <IconButton size={"small"} color="primary" component="label" onClick={handleClickEdit}>
          <EditIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Convalida gara">
        <IconButton size={"small"} color="primary" component="label">
          <EditIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Elimina gara">
        <IconButton size={"small"} sx={{color: "red"}} component="label">
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
    </Stack>
  </>

}