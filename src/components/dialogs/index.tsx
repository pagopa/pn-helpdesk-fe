import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";
import CostsForm from "../forms/costs/CostsForm";
import {Cost} from "../../model";
import {CostsTable} from "../deliveriesDrivers/CostsTable";

interface DialogBaseProps {
  open: boolean,
  onClickNegative : () => void,
  onClickPositive : () => void,
}

interface DriverCostsDialogProps extends DialogBaseProps {
  tenderCode: string,
  driverCode: string
}

export function DriverCostsDialog(props:DriverCostsDialogProps){
  return <>
    <Dialog open={props.open} onClose={props.onClickNegative} fullWidth maxWidth={"lg"}>
      <DialogTitle>Costi del recapitista</DialogTitle>
      <DialogContent>
        <CostsTable key={props.tenderCode+props.driverCode} tenderCode={props.tenderCode} driverCode={props.driverCode} withActions={false}/>
      </DialogContent>
    </Dialog>
  </>
}


interface CostDialogProps extends DialogBaseProps{
  fsu: boolean
  tenderCode:string,
  driverCode: string
  cost ?: Cost
}


export function CostDialog(props: CostDialogProps){
  return <>
    <Dialog open={props.open} onClose={props.onClickNegative}>
      <DialogTitle>Costo</DialogTitle>
      <CostsForm tenderCode={props.tenderCode} driverCode={props.driverCode}
                 fsu={props.fsu} cost={props.cost}
                 onSave={props.onClickPositive}
                 onCancel={props.onClickNegative}/>
    </Dialog>
  </>
}


interface AlertDialogProps extends DialogBaseProps {
  title: string,
  message: string,
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