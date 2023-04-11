import { useCallback, useEffect } from "react";
import { Column, Item } from "../table/tableTypes";
import ItemsTable from '../table/table';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { ErrorResponse, Pa, getAggregateParams } from "../../api/apiRequestTypes";
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
import { Alert, Grid } from "@mui/material";
import PaList from "../../components/apikey/PaList";


type GroupsTable =
  | 'name'

/**
 * GroupsTable page
 * @component
 */
const GroupsTable = () => {
  const isUserWriter = useHasPermissions([Permission.API_KEY_WRITE]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmDialog = useConfirmDialog();

  const filters = useSelector(filtersSelector);

  const paginationData = useSelector(paginationSelector);

  const aggregates = useSelector(aggregatesSelector);

  /*const fetchAggregates = useCallback(() => {
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
  )*/

  const handlePaginationChange = (paginationData: PaginationData) => {
    dispatch(setPagination({ limit: paginationData.limit, page: paginationData.page }));
  };

  const pagesToShow: Array<number> = calculatePages(
    paginationData.limit,
    paginationData.total,
    Math.min(paginationData.pagesKey.length + 1, 3),
    paginationData.page + 1
  );


  const USER_WRITER_COLUMNS: Array<Column<GroupsTable>> = [
    {
      id: 'name',
      label: 'Lista Pa',
      width: '20%',
      getCellLabel(value: string) {
        return value;
      }
    }
  ];
  const rows: Array<Item> = aggregates.map((n, i) => ({
    ...n
  }));

  const handleFiltersSubmit = (filters: any) => {
    dispatch(setFilters(filters));
  }

  const fields = [FieldsProperties["Nome ListaPa"]];

  const paList: Array<Pa> = [
    {
      id: "001",
      name: "Comune di Camposano",
    },
    {
      id: "002",
      name: "Comune di Cicciano"
    },
    {
      id: "003",
      name: "Comune di Nola"
    },
    {
      id: "004",
      name: "Comune di Napoli"
    },
    {
      id: "005",
      name: "Comune di Casamarciano"
    }
  ];

  const handleSelection = (pa: Pa) => {
    alert(pa.id)
  }
  return (
    <>
      <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} />
      <PaList paList={paList} onSelection={handleSelection} />
    </>
  );
};
export default GroupsTable;