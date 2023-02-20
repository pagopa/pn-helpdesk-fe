import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {ModelType, PaginationDataGrid} from "../paginationGrid";
import {DeliveryDriver, Page} from "../../model";
import {Grid} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {changeFilterDrivers, setDialogCosts} from "../../redux/deliveriesDrivers/reducers";
import {getAllDrivers} from "../../redux/deliveriesDrivers/actions";
import {DriverCostsDialog} from "../dialogs";
import {resetStateCost} from "../../redux/costs/reducers";

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
    // eslint-disable-next-line
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

    {
      (driversStore.dialogCost?.driverCode) ?
        <DriverCostsDialog tenderCode={driversStore.dialogCost.tenderCode}
                           driverCode={driversStore.dialogCost.driverCode}
                           open={!!driversStore.dialogCost?.driverCode}
                           onClickNegative={() => {
                             dispatch(setDialogCosts(undefined))
                             dispatch(resetStateCost())
                           }} onClickPositive={() => {}} />: null
    }

  </Grid>
}