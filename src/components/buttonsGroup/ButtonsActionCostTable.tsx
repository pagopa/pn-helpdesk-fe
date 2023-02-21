import {useAppDispatch} from "../../redux/hook";

import {IconButton, Stack, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {CostDTO} from "../../generated";
import {resetSelectedCost, setSelectedCost} from "../../redux/costs/reducers";
import {Cost} from "../../model";
import {apiPaperChannel} from "../../api/paperChannelApi";
import {AxiosError} from "axios";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";

export function ButtonsActionCostTable(props:{value:CostDTO}){
  const dispatch = useAppDispatch();


  const handleClickEdit = () => {
    const value = {
      uid: props.value.uid,
      price: props.value.price,
      priceAdditional: props.value.priceAdditional,
      type: (props.value?.cap) ? "NATIONAL" :  "INTERNATIONAL",
      cap: props.value.cap,
      zone: props.value.zone,
      internationalProductType: (props.value?.zone) ? props.value.productType : undefined,
      nationalProductType: (props.value?.cap) ? props.value.productType : undefined
    } as Cost

    dispatch(setSelectedCost(value))
  }


  const handleDeleteCost = async () => {
    try {
      dispatch(spinnerActions.updateSpinnerOpened(true));
      await apiPaperChannel().deleteCost(props.value!.tenderCode as string , props.value!.driverCode as string, props.value!.uid as string)
      dispatch(resetSelectedCost());
      dispatch(spinnerActions.updateSpinnerOpened(false));
    } catch (e){
      let message = "Errore durante l'eliminazione del costo";
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
    <Stack direction={"row"} spacing={1}>

      <Tooltip title="Modifica costo">
        <IconButton size={"small"} color="primary" component="label" onClick={handleClickEdit}>
          <EditIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Elimina costo">
        <IconButton size={"small"}
                    onClick={handleDeleteCost}
                    sx={{color: "red"}}
                    component="label">
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
    </Stack>
  </>

}