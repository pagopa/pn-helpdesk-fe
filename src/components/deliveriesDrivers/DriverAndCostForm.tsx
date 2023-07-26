import { Button, Card, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { DeliveryDriverForm } from '../forms/deliveryDriver/DeliveryDriverForm';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { resetSelectedCost, resetStateCost, setSelectedCost } from '../../redux/costs/reducers';
import { getDriverDetails, getFsuDetail } from '../../redux/deliveriesDrivers/actions';
import { resetDetailDriver, setDetailDriver } from '../../redux/deliveriesDrivers/reducers';
import { addedFSU } from '../../redux/formTender/reducers';
import { Cost, DeliveryDriver } from '../../model';
import { CostDialog } from '../dialogs';
import { CostsTable } from './CostsTable';

interface DriverAndCostFormProps {
  tenderCode: string;
  fsu: boolean;
  driverCode?: string;
}

export function DriverAndCostForm(props: DriverAndCostFormProps) {
  const driverStore = useAppSelector((state) => state.deliveries);
  const costSelected = useAppSelector((state) => state.costs.selectedCost);
  const dispatch = useAppDispatch();

  const fetchCorrectDriver = useCallback(() => {
    if (props.fsu && props.tenderCode) {
      void dispatch(getFsuDetail(props.tenderCode));
    } else if (!props.fsu && props.tenderCode && props?.driverCode) {
      void dispatch(
        getDriverDetails({
          tenderCode: props.tenderCode,
          driverCode: props.driverCode as string,
        })
      );
    }
  }, [props, dispatch]);

  useEffect(() => {
    fetchCorrectDriver();
    return () => {
      dispatch(resetStateCost());
      dispatch(resetDetailDriver());
    };
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (driverStore.detail?.taxId && props.fsu) {
      dispatch(addedFSU(driverStore.detail));
    }
    // eslint-disable-next-line
  }, [driverStore.detail]);

  return (
    <Grid item container rowSpacing={2}>
      <Grid item>
        <DeliveryDriverForm
          fsu={props.fsu}
          key={`DRIVER_${driverStore?.detail?.taxId}`}
          onChanged={(data: DeliveryDriver) => dispatch(setDetailDriver(data))}
          tenderCode={props.tenderCode}
          initialValue={driverStore.detail}
        />
      </Grid>
      {driverStore.detail?.taxId ? (
        <>
          <Grid item container>
            <Card
              elevation={24}
              sx={{
                width: 1,
                padding: '1rem 2rem',
                boxShadow: '0px 3px 3px -2px ',
                backgroundColor: 'background.paper',
              }}
            >
              <Grid container rowSpacing={2} alignItems={'center'} justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5" component="div">
                    Costi
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant={'outlined'}
                    onClick={() => dispatch(setSelectedCost({} as Cost))}
                    startIcon={<Add />}
                  >
                    Aggiungi
                  </Button>
                </Grid>
              </Grid>
              <CostsTable
                tenderCode={props.tenderCode}
                driverCode={driverStore.detail?.taxId}
                withActions={true}
              />
            </Card>
          </Grid>

          <CostDialog
            cost={costSelected}
            tenderCode={props.tenderCode}
            driverCode={driverStore.detail?.taxId}
            fsu={props.fsu}
            open={!!costSelected}
            onClickPositive={() => dispatch(resetSelectedCost())}
          />
        </>
      ) : null}
    </Grid>
  );
}
