import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useAppDispatch} from "../../redux/hook";
import {resetState} from "../../redux/dialog/reducers";
import {useNavigate} from "react-router-dom";
import {clearFormState} from "../../redux/formTender/reducers";
import {TYPE_DIALOG} from "./index";
import CostsBox from "../forms/costs/CostsForm";

function DialogCostForm(){
  return <>
    <DialogTitle>Costo</DialogTitle>
    <CostsBox fsu={false}/>
  </>
}

function AlertCancelFormTender() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlePositive = () => {
    dispatch(resetState());
    navigate(-1);
    dispatch(clearFormState());
  }

  return <>
    <DialogTitle>Annullare le modifiche ?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Tornando indietro, perderai tutti i dati inseriti nel form. Vuoi continuare ?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => dispatch(resetState())}>No</Button>
      <Button onClick={handlePositive} autoFocus>
        Si
      </Button>
    </DialogActions>
  </>
}

export const correctDialogContent = (type: TYPE_DIALOG) => {
  switch (type){
    case TYPE_DIALOG.ALERT_CANCEL_FORM_TENDER:
      return <AlertCancelFormTender/>
    case TYPE_DIALOG.DIALOG_COST_FORM:
      return <DialogCostForm/>
    default:
      return null;
  }
}