import { useEffect, useReducer } from "react";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { Pa, searchPaResponse } from "../../api/apiRequestTypes";
import { useDispatch } from 'react-redux';
import { PaginationData } from "../Pagination/types";
import CustomPagination from "../Pagination/Pagination";
import { calculatePages } from "../../helpers/pagination.utility";
import { FieldsProperties } from "../formFields/FormFields";
import FilterTable from "../forms/filterTable/FilterTable";
import apiRequest from '../../api/apiRequests';
import PaListWithSelection from "../paList/PaListWithSelection";


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
  }
};

type PaginationActionType = { type: 'pagination', payload: { limit: number, page: number }};

type FilterActionType = { type: 'filter', payload: { paName: string }};

type FetchPaActionType = { type: 'fetchPa', payload: searchPaResponse};

type Action = PaginationActionType | FilterActionType | FetchPaActionType;

const reducer = (state: ReducerState, action: Action): ReducerState => {
  const {payload, type} = action;
  switch(type) {
    case 'fetchPa': {
      const {items, total, lastEvaluatedId} = payload;
      const pagesKey = [...state.paginationData.pagesKey];
      if (state.paginationData.pagesKey.findIndex(pageKey => lastEvaluatedId === pageKey) === -1) {
        pagesKey.push(lastEvaluatedId);
      }
      return {...state, paList: items, paginationData: {...state.paginationData, pagesKey, total}}
    }
    case 'filter': return {...state, filters: payload};
    case 'pagination': {
      const newPaginationData = {...state.paginationData};
      //Reset pagination
      if (action.payload.limit !== newPaginationData.limit) {
        newPaginationData.pagesKey = [];
        newPaginationData.page = 0;
      }

      newPaginationData.limit = action.payload.limit;
      newPaginationData.page = action.payload.page;
      return {...state, paginationData: newPaginationData};
    }
    default: {
      console.error("Invalid action type");
      return {...state};
    }
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
  }
}


type Props = {
  onSelect: (id:string) => void,
  selectedPa: string
}
/**
 * GroupsTable page
 * @component
 */
const PaSection = ({onSelect, selectedPa} : Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();

  const { paginationData } = state;
  const { paList } = state;
  const { filters } = state;

  useEffect(() => {
    let isFetching = true;
    reduxDispatch(spinnerActions.updateSpinnerOpened(true));
    const { limit } = state.paginationData; 
    const { paName } = state.filters;
    const lastEvaluatedId = paginationData.page === 0 ? "" : paginationData.pagesKey[paginationData.page - 1];
    apiRequest.searchPa({limit, paName, lastEvaluatedId})
      .then(res => {
        if(isFetching) {
          dispatch({type:"fetchPa", payload: res});
          reduxDispatch(spinnerActions.updateSpinnerOpened(false));
        }
      })
      .catch(
        err => {
          if(isFetching) {
            reduxDispatch(snackbarActions.updateSnackbacrOpened(true));
            reduxDispatch(snackbarActions.updateStatusCode("400"));
            reduxDispatch(snackbarActions.updateMessage("Non è stato possibile ottenere i dati richiesti"));
            reduxDispatch(spinnerActions.updateSpinnerOpened(false));
          }
        }
      );

    return () => {isFetching = false}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationData.limit, paginationData.page, filters.paName])


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
    onSelect(pa.id);
  }
  return (
    <>
      <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} applyFilterText="" />
      <PaListWithSelection items={paList} onClick={handleSelection} selectedPa={selectedPa} />
      <CustomPagination
        paginationData={{
          limit: paginationData.limit,
          page: paginationData.page,
          total: paginationData.total
        }}
        elementsPerPage={[5, 10]}
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
export default PaSection;