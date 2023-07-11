import React, {Fragment, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DescriptionIcon from '@mui/icons-material/Description';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {ReportEstimate} from "../../model";

interface ButtonLogReportProps {
  report: ReportEstimate
}

export function ButtonLogReport(props:ButtonLogReportProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  const handleClickShowLog = () => setOpen(true);

  return <Fragment>
    <IconButton onClick={handleClickShowLog}>
      <DescriptionIcon/>
    </IconButton>
    <Dialog
      maxWidth={"lg"}
      onClose={handleClose}
      aria-labelledby="log-dialog-log-error"
      open={open}
    >
      <DialogTitle>
        LOG
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            {props.report.errorMessage}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Chiudi
        </Button>
      </DialogActions>
    </Dialog>

  </Fragment>


}