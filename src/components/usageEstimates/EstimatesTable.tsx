import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ModelType, PaginationDataGrid } from "../paginationGrid";
import { EstimateHistory, EstimatesPageableRequest, Page} from "../../model";
import React, { useCallback, useEffect } from "react";
import { changeFilterDrivers } from "../../redux/deliveriesDrivers/reducers";
import {getAllEstimate} from "../../redux/usageEstimates/actions";
import {changeFilterEstimates} from "../../redux/usageEstimates/reducers";
import {useNavigate} from "react-router-dom";
import {GET_DETAIL_USAGE_ESTIMATE_ROUTE} from "../../navigation/router.const";

export function EstimatesTable(){
  const usageEstimate = useAppSelector(state => state.usageEstimate);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleOnClickItem = (row: EstimateHistory) => {
    navigate(GET_DETAIL_USAGE_ESTIMATE_ROUTE(usageEstimate.pagination.paId!, row.referenceMonth))
  }


  return <PaginationDataGrid <EstimateHistory>
                                        data={(usageEstimate.historyEstimate.history) ? {
                                          content: [usageEstimate.historyEstimate.actual, ...usageEstimate.historyEstimate.history.content],
                                          page: usageEstimate.historyEstimate.history.number,
                                          total: usageEstimate.historyEstimate.history.totalElements
                                        } as Page<EstimateHistory> : {} as Page<EstimateHistory> }
                                         type={ModelType.USAGE_ESTIMATES}
                                         loading={usageEstimate.loading}
                                         onClickItem={handleOnClickItem}
                                         rowId={row => row.referenceMonth}
                                         onPageChange={handleOnPageChange}
                                         onPageSizeChange={handleOnPageSizeChange}/>

}