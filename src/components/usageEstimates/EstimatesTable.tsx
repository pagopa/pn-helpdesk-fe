import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ModelType, PaginationDataGrid } from "../paginationGrid";
import { EstimateHistory, EstimatesPageableRequest, Page} from "../../model";
import React, { useCallback, useEffect } from "react";
import { changeFilterDrivers } from "../../redux/deliveriesDrivers/reducers";
import {getAllEstimate} from "../../redux/usageEstimates/actions";
import {changeFilterEstimates} from "../../redux/usageEstimates/reducers";


export function EstimatesTable(){
  const usageEstimate = useAppSelector(state => state.usageEstimate);
  const dispatch = useAppDispatch();

  const fetchEstimates = useCallback(() => {
    if (usageEstimate.pagination?.paId){
      const filter = {
        ...usageEstimate.pagination
      } as EstimatesPageableRequest
      dispatch(getAllEstimate(filter))
    }
    //eslint-disable-next-line
  }, [usageEstimate.pagination])

  useEffect(() => {
    fetchEstimates();
  }, [fetchEstimates])

  const handleOnPageChange = (page:number) => {
    dispatch(changeFilterEstimates({...usageEstimate.pagination, page:page+1} as EstimatesPageableRequest))
  }

  const handleOnPageSizeChange = (size:number) => {
    dispatch(changeFilterDrivers({...usageEstimate.pagination, page:1, tot:size}))
  }


  return <PaginationDataGrid <EstimateHistory>
                                        data={(usageEstimate.historyEstimate.history) ? {
                                          ...usageEstimate.historyEstimate.history,
                                          page: usageEstimate.historyEstimate.history.number,
                                          total: usageEstimate.historyEstimate.history.totalElements
                                        } as Page<EstimateHistory> : {} as Page<EstimateHistory> }
                                         type={ModelType.USAGE_ESTIMATES}
                                         loading={false}
                                         rowId={row => row.referenceMonth}
                                         onPageChange={handleOnPageChange}
                                         onPageSizeChange={handleOnPageSizeChange}/>

}