import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {ModelType, PaginationDataGrid} from "../paginationGrid";
import {DeliveryDriver, Page} from "../../model";
import {Grid} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {changeFilterDrivers} from "../../redux/deliveriesDrivers/reducers";
import {getAllDrivers} from "../../redux/deliveriesDrivers/actions";

interface DeliveriesDriverTableProps{
  tenderCode: string,
  onlyFsu?: boolean
  withActions: boolean
}
export function DeliveriesDriverTable(props:DeliveriesDriverTableProps){
  const driversStore = useAppSelector(state => state.deliveries);
  const dispatch = useAppDispatch();

  const fetchDrivers = useCallback(() => {
    const filter = {
      ...driversStore.pagination,
      tenderCode: props.tenderCode,
      fsu: props.onlyFsu,
    }
    dispatch(getAllDrivers(filter))
  }, [driversStore.pagination])

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers])

  const handleOnPageChange = (page:number) => {
    dispatch(changeFilterDrivers({...driversStore.pagination, page:page}))
  }

  const handleOnPageSizeChange = (size:number) => {
    dispatch(changeFilterDrivers({...driversStore.pagination, page:1, tot:size}))
  }

  return <Grid item container>
    <PaginationDataGrid <DeliveryDriver> data={(driversStore?.allData) ? driversStore?.allData : {} as Page<DeliveryDriver> }
                                         type={(!props.withActions) ? ModelType.DELIVERY_DRIVER : ModelType.DELIVERY_DRIVER_WITH_ACTIONS}
                                         loading={false}
                                         rowId={row => row!.taxId}
                                         onPageChange={handleOnPageChange}
                                         onPageSizeChange={handleOnPageSizeChange}/>
  </Grid>
}