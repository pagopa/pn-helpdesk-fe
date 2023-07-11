import {useAppDispatch, useAppSelector} from "../../redux/hook";
import React, {useCallback, useEffect} from "react";
import {EstimatesPageableRequest, Page, ReportEstimate, ReportPageableRequest} from "../../model";
import {ModelType, PaginationDataGrid} from "../paginationGrid";
import {changeFilterReport} from "../../redux/report/reducers";
import {getAllReport} from "../../redux/report/actions";


export function ReportEstimatesTable() {
  const reportEstimate = useAppSelector(state => state.reportEstimate);
  const dispatch = useAppDispatch();

  const fetchReports = useCallback(() => {
    if (reportEstimate.pagination?.paId){
      const filter = {
        ...reportEstimate.pagination
      } as EstimatesPageableRequest
      dispatch(getAllReport(filter))
    }
    //eslint-disable-next-line
  }, [reportEstimate.pagination])

  useEffect(() => {
    fetchReports();
  }, [fetchReports])

  const handleOnPageChange = (page:number) => {
    dispatch(changeFilterReport({...reportEstimate.pagination, page:page+1} as ReportPageableRequest))
  }

  const handleOnPageSizeChange = (size:number) => {
    dispatch(changeFilterReport({...reportEstimate.pagination, page:1, tot:size}))
  }


  return <PaginationDataGrid <ReportEstimate>
                              data={(reportEstimate.data?.content) ?
                                  {
                                    content: reportEstimate.data.content,
                                    page: reportEstimate.data.number,
                                    total: reportEstimate.data.totalElements
                                  } as Page<ReportEstimate>
                                :
                                  {} as Page<ReportEstimate>
                              }
                              type={ModelType.REPORTS_ESTIMATE}
                              loading={reportEstimate.loading}
                              rowId={row => row.reportKey}
                              onPageChange={handleOnPageChange}
                              onPageSizeChange={handleOnPageSizeChange}/>
}