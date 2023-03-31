import {Grid, Typography} from "@mui/material";
import React from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface FinalBalance {
  id: string;
  label: string;
  file: File;
}

interface FinalBalancesProps {
  finalBalances: Array<FinalBalance>;
}

export function FinalBalances(props: FinalBalancesProps) {
  return <Grid item container spacing={1} data-testid={'finalBalances'}>
    {
      props.finalBalances.map(finalBalance => (
        <Grid key={finalBalance.id} item container direction="row" width="1">
          <Grid item width="25%">
            <AttachFileIcon />
          </Grid>
          <Grid item width="75%">
            <Typography>
              {finalBalance.label}
            </Typography>
          </Grid>
        </Grid>
      ))
    }
  </Grid>
}