import {ReportEstimate} from "../../model";
import {Button} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

export function ButtonScheduleReport({report}: {report: ReportEstimate}) {


  return <Button startIcon={<RefreshIcon/>}>Riprova</Button>
}