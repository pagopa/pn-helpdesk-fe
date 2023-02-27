import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {ModelType, PaginationDataGrid} from "../paginationGrid";
import {Page} from "../../model";
import {Grid} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {changeFilterDrivers} from "../../redux/deliveriesDrivers/reducers";
import {getCosts} from "../../redux/costs/actions";
import {CostDTO} from "../../api/paperChannel";

interface CostsTableProps{
  tenderCode: string,
  driverCode: string,
  withActions: boolean
}
export function CostsTable(props:CostsTableProps){
  const costsStore = useAppSelector(state => state.costs);
  const dispatch = useAppDispatch();

  const fetchCosts = useCallback(() => {
    const filter = {
      ...costsStore.pagination,
      tenderCode: props.tenderCode,
      driverCode: props.driverCode,
    }
    dispatch(getCosts(filter))
    //eslint-disable-next-line
  }, [costsStore.pagination])

  useEffect(() => {
    fetchCosts();
  }, [fetchCosts])

  const handleOnPageChange = (page:number) => {
    dispatch(changeFilterDrivers({...costsStore.pagination, page:page}))
  }

  const handleOnPageSizeChange = (size:number) => {
    dispatch(changeFilterDrivers({...costsStore.pagination, page:1, tot:size}))
  }

  return <Grid item>
    <PaginationDataGrid <CostDTO> data={(costsStore?.costs) ? costsStore?.costs : {} as Page<CostDTO> }
                                         type={(!props.withActions) ? ModelType.COST : ModelType.COST_WITH_ACTIONS}
                                         loading={false}
                                         rowId={row => row!.uid}
                                         onPageChange={handleOnPageChange}
                                         onPageSizeChange={handleOnPageSizeChange}/>
  </Grid>
}