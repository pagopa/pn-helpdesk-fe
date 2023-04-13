import { useEffect, useReducer } from "react";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { ErrorResponse, Pa, searchPaResponse } from "../../api/apiRequestTypes";
import { useSelector, useDispatch } from 'react-redux';
import { PaginationData } from "../Pagination/types";
import CustomPagination from "../Pagination/Pagination";
import { calculatePages } from "../../helpers/pagination.utility";
import useConfirmDialog from "../confirmationDialog/useConfirmDialog";
import { FieldsProperties } from "../formFields/FormFields";
import FilterTable from "../forms/filterTable/FilterTable";
import PaList from "../../components/apikey/PaList";

import apiRequest from '../../api/apiRequests';


type GroupsTable =
  | 'name'

type ReducerState = {
  paList: Array<Pa>,
  paginationData: {
    limit: number,
    page: number,
    total: number,
    pagesKey: Array<string>,
  },
  filters: {
    paName: string
  },
  selectedPa: string
};


type PaginationActionType = { type: 'pagination', payload: { limit: number, page: number }};

type FilterActionType = { type: 'filter', payload: { paName: string }};

type SelectPaActionType = { type: 'selectPa', payload: string };

type FetchPaActionType = { type: 'fetchPa', payload: searchPaResponse};

type Action = PaginationActionType | FilterActionType | SelectPaActionType | FetchPaActionType;

const reducer = (state: ReducerState, action: Action): ReducerState => {
  const {payload, type} = action;
  switch(type) {
    case 'fetchPa': {
      const {items, total, lastEvaluatedKey} = payload;
      const pagesKey = [...state.paginationData.pagesKey];
      if (state.paginationData.pagesKey.findIndex(pageKey => lastEvaluatedKey === pageKey) === -1) {
        pagesKey.push(lastEvaluatedKey);
      }
      return {...state, paList: items, paginationData: {...state.paginationData, pagesKey, total}}
    }
    case 'filter': return {...state, filters: payload};
    case 'pagination': {
      const newPaginationData = {...state.paginationData};
      if (action.payload.limit !== newPaginationData.limit) {
        newPaginationData.pagesKey = [];
        newPaginationData.page = 0;
      }

      newPaginationData.limit = action.payload.limit;
      newPaginationData.page = action.payload.page;
      return {...state, paginationData: newPaginationData};
    }
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
    pagesKey: [],
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
  const reduxDispatch = useDispatch();

  const confirmDialog = useConfirmDialog();
  const { paginationData } = state;
  const { paList } = state;
  const { filters } = state;

  useEffect(() => {
    reduxDispatch(spinnerActions.updateSpinnerOpened(true));
    const { limit } = state.paginationData; 
    const { paName } = state.filters;
    const lastEvaluatedId = paginationData.page === 0 ? "" : paginationData.pagesKey[paginationData.page - 1];
    apiRequest.searchPa({limit, paName, lastKey: lastEvaluatedId})
      .then(res => {
        dispatch({type:"fetchPa", payload: res});
        reduxDispatch(spinnerActions.updateSpinnerOpened(false));
      })
  }, [paginationData.limit, paginationData.page, filters.paName])

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
    const {limit, page} = paginationData;
    dispatch({type: 'pagination', payload: {limit, page}});
  };


  const pagesToShow: Array<number> = calculatePages(
    paginationData.limit,
    paginationData.total,
    Math.min(paginationData.pagesKey.length + 1, 3),
    paginationData.page + 1
  );


  const handleFiltersSubmit = (filters: any) => {
    const {paName} = filters;
    dispatch({type: "filter", payload: {paName}});
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