import { Grid } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { ModelType, PaginationDataGrid } from '../paginationGrid';
import { Page } from '../../model';
import { getCosts } from '../../redux/costs/actions';
import { CostDTO } from '../../api/paperChannel';
import { changePaginationCost } from '../../redux/costs/reducers';

interface CostsTableProps {
  tenderCode: string;
  driverCode: string;
  withActions: boolean;
}
export function CostsTable(props: CostsTableProps) {
  const costsStore = useAppSelector((state) => state.costs);
  const dispatch = useAppDispatch();

  const fetchCosts = useCallback(() => {
    const filter = {
      ...costsStore.pagination,
      tenderCode: props.tenderCode,
      driverCode: props.driverCode,
    };
    // eslint-disable-next-line
    dispatch(getCosts(filter));
  }, [costsStore.pagination]);

  useEffect(() => {
    fetchCosts();
  }, [fetchCosts]);

  const handleOnPageChange = (page: number) => {
    dispatch(changePaginationCost({ ...costsStore.pagination, page: page + 1 }));
  };

  const handleOnPageSizeChange = (size: number) => {
    dispatch(changePaginationCost({ ...costsStore.pagination, page: 1, tot: size }));
  };

  return (
    <Grid item>
      <PaginationDataGrid<CostDTO>
        data={costsStore?.costs ? costsStore?.costs : ({} as Page<CostDTO>)}
        type={!props.withActions ? ModelType.COST : ModelType.COST_WITH_ACTIONS}
        loading={false}
        rowId={(row) => row!.uid}
        onPageChange={handleOnPageChange}
        onPageSizeChange={handleOnPageSizeChange}
      />
    </Grid>
  );
}
