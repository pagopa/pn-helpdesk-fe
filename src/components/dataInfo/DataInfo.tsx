import { Box, Grid, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

export interface RowDataInfo {
  id: string;
  label: string;
  render: (data: any) => ReactNode;
}

export interface DataInfoProps {
  data: any;
  rows: Array<RowDataInfo>;
}

export function DataInfo(props: DataInfoProps) {
  return (
    <Grid container spacing={1} data-testid={'dataInfo'}>
      {props.rows.map((row) => (
        <Grid key={row.id} container direction="row" sx={{ width: 1 }} spacing={1}>
          <Box sx={{ width: '50%' }}>
            <Typography>{row.label}</Typography>
          </Box>
          <Box sx={{ width: '50%' }}>
            {row.render(props.data)}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
