import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { TenderStatusChip } from '../deliveriesDrivers/TenderStatusChip';
import { Tender } from '../../model';
import { RowDataInfo } from './DataInfo';

export const tenderRowsInfo: Array<RowDataInfo> = [
  {
    id: 'name',
    label: 'Identificazione',
    render: (data) => <Typography>{data?.name}</Typography>,
  },
  {
    id: 'startDate',
    label: 'Data inizio',
    render: (data) => (
      <Typography>
        {data?.startDate ? format(new Date(data.startDate), 'dd-MM-yyyy HH:mm') : ''}
      </Typography>
    ),
  },
  {
    id: 'endDate',
    label: 'Data fine',
    render: (data) => (
      <Typography>
        {data?.endDate ? format(new Date(data.endDate), 'dd-MM-yyyy HH:mm') : ''}
      </Typography>
    ),
  },
  {
    id: 'status',
    label: 'Stato',
    render: (data) => <TenderStatusChip data={data as Tender} />,
  },
];
