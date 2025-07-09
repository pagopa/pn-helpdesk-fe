import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse, getAggregateParams } from '../../api/apiRequestTypes';
import apiRequests from '../../api/apiRequests';
import { calculatePages } from '../../helpers/pagination.utility';
import { useHasPermissions } from '../../hooks/useHasPermissions';
import { Permission } from '../../model/user-permission';
import * as routes from '../../navigation/router.const';
import {
  aggregatesSelector,
  filtersSelector,
  paginationSelector,
  resetState,
  setAggregates,
  setFilters,
  setPagination,
} from '../../redux/aggregateSlice';
import * as snackbarActions from '../../redux/snackbarSlice';
import * as spinnerActions from '../../redux/spinnerSlice';
import CustomPagination from '../Pagination/Pagination';
import { PaginationData } from '../Pagination/types';
import useConfirmDialog from '../confirmationDialog/useConfirmDialog';
import { FieldsProperties } from '../formFields/FormFields';
import FilterTable from '../forms/filterTable/FilterTable';
import ItemsTable from '../table/table';
import { Column, Item } from '../table/tableTypes';

type AggregateColumn = 'id' | 'name' | 'usagePlan' | 'createdAt' | 'lastUpdate';

/**
 * AggregatesTable page
 * @component
 */
const AggregatesTable = () => {
  const isUserWriter = useHasPermissions([Permission.API_KEY_WRITE]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmDialog = useConfirmDialog();

  const filters = useSelector(filtersSelector);

  const paginationData = useSelector(paginationSelector);

  const aggregates = useSelector(aggregatesSelector);

  const fetchAggregates = useCallback(() => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    // take the lastEvaluated id and name from the pagesKey array using page as index.
    const lastEvaluatedId =
      paginationData.page === 0
        ? ''
        : paginationData.pagesKey[paginationData.page - 1].lastEvaluatedId;
    const lastEvaluatedName =
      paginationData.page === 0
        ? ''
        : paginationData.pagesKey[paginationData.page - 1].lastEvaluatedName;
    const params: getAggregateParams = {
      name: filters.name,
      limit: paginationData.limit,
      lastEvaluatedId,
      lastEvaluatedName,
    };
    apiRequests
      .getAggregates(params)
      .then((res) => {
        dispatch(setAggregates(res));
      })
      .catch(() => {
        dispatch(snackbarActions.updateSnackbarOpened(true));
        dispatch(snackbarActions.updateStatusCode('400'));
        dispatch(snackbarActions.updateMessage('Non è stato possibile ottenere i dati richiesti'));
        dispatch(resetState());
      })
      .finally(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
      });
  }, [filters.name, paginationData.page, paginationData.limit, dispatch, paginationData.pagesKey]);

  useEffect(() => {
    fetchAggregates();
  }, [fetchAggregates]);

  const handlePaginationChange = (paginationData: PaginationData) => {
    dispatch(setPagination({ limit: paginationData.limit, page: paginationData.page }));
  };

  const callDelete = (id: string) => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    apiRequests
      .deleteAggregate(id)
      .then(() => {
        dispatch(snackbarActions.updateStatusCode('200'));
        dispatch(snackbarActions.updateSnackbarOpened(true));
        dispatch(snackbarActions.updateMessage('Aggregazione eliminata con successo'));
        fetchAggregates();
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const error = err.response.data as ErrorResponse;
          dispatch(snackbarActions.updateMessage(error.detail));
        }
        dispatch(snackbarActions.updateSnackbarOpened(true));
        dispatch(snackbarActions.updateStatusCode('400'));
      })
      .finally(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
      });
  };

  const handleClickDelete = (id: string) => {
    confirmDialog({
      title: 'Elimina aggregazione',
      message: "Sicuro di voler effettuare l'operazione?",
    })
      .then(() => callDelete(id))
      .catch(() => {});
  };

  const pagesToShow: Array<number> = calculatePages(
    paginationData.limit,
    paginationData.total,
    Math.min(paginationData.pagesKey.length + 1, 3),
    paginationData.page + 1
  );

  const USER_WRITER_COLUMNS: Array<Column<AggregateColumn>> = [
    {
      id: 'name',
      label: 'Nome aggregazione',
      width: '20%',
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(row);
      },
    },
    {
      id: 'usagePlan',
      label: 'Usage plan',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(row);
      },
    },
    {
      id: 'createdAt',
      label: 'Data creazione',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(row);
      },
    },
    {
      id: 'lastUpdate',
      label: 'Data ultimo aggiornamento',
      width: '20%',
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(row);
      },
    },
    {
      id: 'id',
      label: '',
      width: '5%',
      getCellLabel() {
        return (
          <IconButton aria-label="Cancella aggregato" sx={{ color: red[500] }}>
            <DeleteIcon />
          </IconButton>
        );
      },
      onClick(row: Item) {
        handleClickDelete(row.id);
      },
    },
  ];

  const USER_READER_COLUMNS: Array<Column<AggregateColumn>> = [
    {
      id: 'name',
      label: 'Nome aggregazione',
      width: '20%',
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(row);
      },
    },
    {
      id: 'usagePlan',
      label: 'Usage plan',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(row);
      },
    },
    {
      id: 'createdAt',
      label: 'Data creazione',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(row);
      },
    },
    {
      id: 'lastUpdate',
      label: 'Data ultimo aggiornamento',
      width: '20%',
      getCellLabel(value: string) {
        return value;
      },
      onClick(row: Item) {
        handleRowClick(row);
      },
    },
  ];
  const rows: Array<Item> = aggregates.map((n) => ({
    ...n,
  }));

  function handleRowClick(row: Item) {
    navigate(routes.GET_UPDATE_AGGREGATE_PATH(row.id));
  }

  const handleFiltersSubmit = (filters: any) => {
    dispatch(setFilters(filters));
  };

  const fields = [FieldsProperties['Nome aggregazione']];
  return (
    <>
      <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} />
      <ItemsTable columns={isUserWriter ? USER_WRITER_COLUMNS : USER_READER_COLUMNS} rows={rows} />
      <CustomPagination
        paginationData={{
          limit: paginationData.limit,
          page: paginationData.page,
          total: paginationData.total,
        }}
        onPageRequest={handlePaginationChange}
        pagesToShow={pagesToShow}
        sx={{
          padding: '0',
          '& .items-per-page-selector button': {
            paddingLeft: 0,
            height: '24px',
          },
        }}
      />
    </>
  );
};
export default AggregatesTable;
