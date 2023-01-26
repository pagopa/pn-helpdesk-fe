import {Dialog} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {resetState} from "../../redux/dialog/reducers";
import {correctDialogContent} from "./contents";


export function CustomDialog(){
  const state = useAppSelector(state => state.dialog);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(resetState());
  }


  return <Dialog
    open={state.open}
    onClose={handleClose}>

    {
      (state.open && state.type) ? correctDialogContent(state.type) : null
    }

  </Dialog>

}