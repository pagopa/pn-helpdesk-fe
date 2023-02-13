import {useAppDispatch} from "../../redux/hook";

import {IconButton, Stack, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {CostDTO} from "../../generated";
import {setSelectedCost} from "../../redux/fsuAndDrivers/reducers";
import {Cost} from "../../model";

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

  return <>
    <Stack direction={"row"} spacing={1}>

      <Tooltip title="Modifica costo">
        <IconButton size={"small"} color="primary" component="label" onClick={handleClickEdit}>
          <EditIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Elimina costo">
        <IconButton size={"small"} sx={{color: "red"}} component="label">
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
    </Stack>
  </>

}