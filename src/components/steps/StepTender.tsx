import {Button, Grid, Stack} from "@mui/material";
import {NoteAdd, Reply} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {addedTender, clearFormState, goFSUStep, goUploadStep} from "../../redux/formTender/reducers";
import {AlertDialog} from "../dialogs";
import TenderFormBox from "../forms/tender/TenderForm";
import {getDetailTender} from "../../redux/formTender/actions";
import {Tender} from "../../model";


export default function StepTender(){
  const formTender = useAppSelector(state => state.tenderForm.formTender);
  const dispatch = useAppDispatch();
  const {tenderCode} = useParams();

  useEffect(() => {
    if (tenderCode && !formTender.value){
      dispatch(getDetailTender(tenderCode));
    }
  }, [])


  const handleUpload = () => {
    dispatch(goUploadStep());
  }

  const handleGoFSU = () => {
    dispatch(goFSUStep());
  }

  const handleChangeTenderData = (newTender : Tender) => {
    dispatch(addedTender(newTender));
  }

  return <Stack spacing={2} sx={{width: 1}} >

    <TenderFormBox key={"TENDER-"+formTender.value?.code} initialValue={formTender.value} onChanged={handleChangeTenderData} />

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