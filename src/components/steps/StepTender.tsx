import {Button, Grid, Stack} from "@mui/material";
import {NoteAdd, Reply} from "@mui/icons-material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {clearFormState, goFSUStep, goUploadStep} from "../../redux/formTender/reducers";
import {AlertDialog} from "../dialogs";
import TenderFormBox from "../forms/tender/TenderForm";


export default function StepTender(){
  const formTender = useAppSelector(state => state.tenderForm.formTender);
  const dispatch = useAppDispatch();

  const handleUpload = () => {
    dispatch(goUploadStep());
  }

  const handleGoFSU = () => {
    dispatch(goFSUStep());
  }

  return <Stack spacing={2} sx={{width: 1}} >

    <TenderFormBox />

    <Grid item container direction="row" justifyContent="space-between">
      <ButtonCancel />

      <Stack direction={"row"} spacing={3}>
        <Button variant={"outlined"}
                disabled={!(formTender?.value)}
                startIcon={<NoteAdd/>}
                onClick={handleUpload}>Carica</Button>

        <Button variant={"contained"}
                disabled={!(formTender?.value)}
                onClick={handleGoFSU} >Avanti</Button>
      </Stack>
    </Grid>
  </Stack>

}

const ButtonCancel = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePositive = () => {
    setOpen(false);
    navigate(-1);
    dispatch(clearFormState())
  }

  const handleNegative = () => {
    setOpen(false)
  }


  return <>
    <Button onClick={() => setOpen(true)} variant={"outlined"} startIcon={<Reply/>}>Annulla</Button>
    <AlertDialog title={"Annullare i progressi ?"}
                 message={"Confermando perderai tutti i dati inseriti o i dati modificati. Vuoi continuare"}
                 open={open}
                 onClickNegative={handleNegative}
                 onClickPositive={handlePositive}/>
  </>
}