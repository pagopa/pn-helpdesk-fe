import {ReportEstimate} from "../../model";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

interface ButtonDownloadReportProps {
  report: ReportEstimate,
  type: "SOURCE" | "TARGET"
}

export function ButtonDownloadReport(props: ButtonDownloadReportProps){

  if (props.type === "TARGET" && !props.report.reportZipKey){
    return null
  }

  return <IconButton>
    <CloudDownloadIcon/>
  </IconButton>

}