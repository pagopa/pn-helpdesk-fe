import { useCallback, useEffect } from "react";
import { Column, Item } from "../table/tableTypes";
import ItemsTable from '../table/table';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { ErrorResponse, getAggregateParams } from "../../api/apiRequestTypes";
import { useSelector, useDispatch } from 'react-redux';
import { filtersSelector, paginationSelector, aggregatesSelector, setPagination, setAggregates, resetState, setFilters } from '../../redux/aggregateSlice';
import { PaginationData } from "../Pagination/types";
import apiRequests from '../../api/apiRequests';
import CustomPagination from "../Pagination/Pagination";
import { calculatePages } from "../../helpers/pagination.utility";
import useConfirmDialog from "../confirmationDialog/useConfirmDialog";
import * as routes from '../../navigation/router.const';
import { FieldsProperties } from "../formFields/FormFields";
import FilterTable from "../forms/filterTable/FilterTable";
import IconButton from '@mui/material/IconButton';
import { useHasPermissions } from "../../hooks/useHasPermissions";
import { Permission } from "../../model/user-permission";

type AggregateColumn =
  | 'id'
  | 'name'
  | 'usagePlan'
  | 'createdAt'
  | 'lastUpdate'

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
    //take the lastEvaluated id and name from the pagesKey array using page as index.
    const lastEvaluatedId = paginationData.page === 0 ? "" : paginationData.pagesKey[paginationData.page - 1].lastEvaluatedId;
    const lastEvaluatedName = paginationData.page === 0 ? "" : paginationData.pagesKey[paginationData.page - 1].lastEvaluatedName;
    let params: getAggregateParams = {
      name: filters.name,
      limit: paginationData.limit,
      lastEvaluatedId,
      lastEvaluatedName
    }
    apiRequests.getAggregates(params)
      .then(
        res => {
          dispatch(setAggregates(res));
        }
      ).catch(
        err => {
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode("400"));
          dispatch(snackbarActions.updateMessage("Non è stato possibile ottenere i dati richiesti"));
          dispatch(resetState());
        }
      ).finally(() => { dispatch(spinnerActions.updateSpinnerOpened(false)) })
  }, [filters.name, paginationData.page, paginationData.limit, dispatch, paginationData.pagesKey])

  useEffect(
    () => {
      fetchAggregates();
    }, [fetchAggregates]
  )

  const handlePaginationChange = (paginationData: PaginationData) => {
    dispatch(setPagination({ limit: paginationData.limit, page: paginationData.page }));
  };

  const callDelete = (id: string) => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    apiRequests.deleteAggregate(id)
      .then(
        res => {
          dispatch(snackbarActions.updateStatusCode("200"));
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateMessage("Aggregazione eliminata con successo"));
          fetchAggregates();
        }
      )
      .catch(
        err => {
          if (err.response && err.response.data) {
            let error = err.response.data as ErrorResponse;
            dispatch(snackbarActions.updateMessage(error.detail))
          }
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode("400"));
        }
      )
      .finally(
        () => {
          dispatch(spinnerActions.updateSpinnerOpened(false));
        }
      )
  }

  const handleClickDelete = (id: string) => {
    confirmDialog({ title: "Elimina aggregazione", message: "Sicuro di voler effettuare l'operazione?" })
      .then(() => callDelete(id))
      .catch(() => { });
  }

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
      getCellLabel(value: string) {
        return <IconButton aria-label="Cancella aggregato" sx={{ color: red[500] }}>
          <DeleteIcon />
        </IconButton>;
      },
      onClick(row: Item) {
        handleClickDelete(row.id);
      },
    }
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
    }
  ];
  const rows: Array<Item> = aggregates.map((n, i) => ({
    ...n
  }));

  function handleRowClick(row: Item) {
    navigate(routes.GET_UPDATE_AGGREGATE_PATH(row.id));
  }

  const handleFiltersSubmit = (filters: any) => {
    dispatch(setFilters(filters));
  }

  const fields = [FieldsProperties["Nome aggregazione"]];
  return (
    <>
      <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} />
      <ItemsTable columns={isUserWriter ? USER_WRITER_COLUMNS : USER_READER_COLUMNS} rows={rows} />
      <CustomPagination
        paginationData={{
          limit: paginationData.limit,
          page: paginationData.page,
          total: paginationData.total
        }}
        onPageRequest={handlePaginationChange}
        pagesToShow={pagesToShow}
        sx={
          {
            padding: '0',
            '& .items-per-page-selector button': {
              paddingLeft: 0,
              height: '24px',
            }
          }
        }
      />
    </>

  );
};
export default AggregatesTable;


