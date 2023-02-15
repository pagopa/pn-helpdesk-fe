import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {ModelType, PaginationDataGrid} from "../paginationGrid";
import {Page} from "../../model";
import {Grid} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {changeFilterDrivers} from "../../redux/deliveriesDrivers/reducers";
import {getCosts} from "../../redux/costs/actions";
import {CostDTO} from "../../generated";

interface CostsTable{
  tenderCode: string,
  driverCode: string,
}
export function CostsTable(props:CostsTable){
  const costsStore = useAppSelector(state => state.costs);
  const dispatch = useAppDispatch();

  const fetchCosts = useCallback(() => {
    const filter = {
      ...costsStore.pagination,
      tenderCode: props.tenderCode,
      driverCode: props.driverCode,
    }
    dispatch(getCosts(filter))
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
                                         type={ModelType.COST}
                                         loading={false}
                                         rowId={row => row!.uid}
                                         onPageChange={handleOnPageChange}
                                         onPageSizeChange={handleOnPageSizeChange}/>
  </Grid>
}