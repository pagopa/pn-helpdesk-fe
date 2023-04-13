import { useCallback, useEffect, useReducer } from "react";
import { Column, Item } from "../table/tableTypes";
import ItemsTable from '../table/table';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { ErrorResponse, Pa, getAggregateParams, searchPaResponse, searchPaType } from "../../api/apiRequestTypes";
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
import { setVirtualKeys } from "../../redux/virtualKeysSlice";

import apiRequest from '../../api/apiRequests';


type GroupsTable =
  | 'name'

type ReducerState = {
  paList: Array<Pa>,
  paginationData: {
    limit: number,
    page: number,
    total: number,
    lastEvaluatedKey?: string
  },
  filters: {
    paName: string
  },
  selectedPa: string
};


type PaginationActionType = { type: 'pagination', payload: { limit: number, page: number, total: number }};

type FilterActionType = { type: 'filter', payload: { paName: string }};

type SelectPaActionType = { type: 'selectPa', payload: string };

type FetchPaActionType = { type: 'fetchPa', payload: searchPaResponse};

type Action = PaginationActionType | FilterActionType | SelectPaActionType | FetchPaActionType;

const reducer = (state: ReducerState, action: Action): ReducerState => {
  const {payload, type} = action;
  switch(type) {
    case 'fetchPa': return {...state, paList: payload.items, paginationData: {...state.paginationData, lastEvaluatedKey: payload.lastEvaluatedKey}}
    case 'filter': return {...state, filters: payload};
    case 'pagination': return {...state, paginationData: payload};
    case 'selectPa': return {...state, selectedPa: payload};
    default: return {...state};
  }
}

const initialState : ReducerState = {
  paList: [],
  paginationData: {
    limit: 10,
    page: 0,
    total: 0,
    lastEvaluatedKey: ""
  },
  filters: {
    paName: ""
  },
  selectedPa: ""
}

/**
 * GroupsTable page
 * @component
 */
const GroupsTable = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isUserWriter = useHasPermissions([Permission.API_KEY_WRITE]);
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const confirmDialog = useConfirmDialog();
  const { paginationData } = state;
  const { paList } = state;

  useEffect(() => {
    reduxDispatch(spinnerActions.updateSpinnerOpened(true));
    const { limit, lastEvaluatedKey } = state.paginationData; 
    const { paName } = state.filters;
    apiRequest.searchPa({limit, paName, lastKey: lastEvaluatedKey})
      .then(res => {
        dispatch({type:"fetchPa", payload: res});
        reduxDispatch(spinnerActions.updateSpinnerOpened(false));
      })
  }, [])

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
    const {limit, page, total} = paginationData;
    dispatch({type: 'pagination', payload: {limit, page, total}});
  };


  const pagesToShow: Array<number> = [0, 1, 2];
  // const pagesToShow: Array<number> = calculatePages(
  //   paginationData.limit,
  //   paginationData.total,
  //   Math.min(paginationData.pagesKey.length + 1, 3),
  //   paginationData.page + 1
  // );


  const handleFiltersSubmit = (filters: any) => {
    // dispatch(setFilters(filters));
  }

  const fields = [FieldsProperties["Nome ListaPa"]];

  const handleSelection = (pa: Pa) => {
    // apiRequests.searchApiKey(pa.id)
    //   .then(res => {
    //     dispatch(setVirtualKeys(res));
    //   })
    //   .catch(err => {
    //     dispatch(snackbarActions.updateSnackbacrOpened(true))
    //     dispatch(snackbarActions.updateStatusCode(400))
    //     dispatch(snackbarActions.updateMessage("Errore"))
    //     console.log("Errore: ", err)
    //   })
    //   .finally(() => { dispatch(spinnerActions.updateSpinnerOpened(false)) })
  }
  return (
    <>
      <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} />
      <PaList paList={paList} onSelection={handleSelection} />
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
export default GroupsTable;