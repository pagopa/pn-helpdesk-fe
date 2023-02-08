import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";
import CostsForm from "../forms/costs/CostsForm";
import {Cost} from "../../model";


interface CostDialogProps {
  fsu: boolean
  cost ?: Cost
  open: boolean,
  onClickNegative : () => void
  onClickPositive : (data: Cost) => void
}


export function CostDialog(props: CostDialogProps){
  return <>
    <Dialog open={props.open} onClose={props.onClickNegative}>
      <DialogTitle>Costo</DialogTitle>
      <CostsForm fsu={props.fsu} cost={props.cost} onSave={props.onClickPositive} onCancel={props.onClickNegative}/>
    </Dialog>
  </>
}


interface AlertDialogProps {
  title: string,
  message: string,
  open: boolean,
  onClickNegative : () => void
  onClickPositive : () => void
}

export function AlertDialog(props: AlertDialogProps){

  return <>
    <Dialog open={props.open} onClose={props.onClickNegative}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClickNegative}>No</Button>
        <Button onClick={props.onClickPositive} autoFocus> Si </Button>
      </DialogActions>
    </Dialog>
  </>

}