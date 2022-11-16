import React, { useEffect, useState } from "react";
import { Column, Item } from "../../types";
import ItemsTable from '../table/table';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import FilterTableAggregates from "../forms/filterTableAggregates/FilterTableAggregates";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { getAggregateParams } from "../../api/apiRequestTypes";
import { useSelector, useDispatch } from 'react-redux';
import { filtersSelector, paginationSelector, aggregatesSelector, setPagination, setAggregates } from '../../redux/aggregateSlice';
import { PaginationData } from "../../components/Pagination/types";
import apiRequests from '../../api/apiRequests';
import CustomPagination from "../../components/Pagination/CustomPagination";
import { calculatePages } from "../../helpers/pagination.utility";
import useConfirmDialog from "../confirmationDialog/useConfirmDialog";

type AggregateColumn = 
| 'id'
| 'name'
| 'usagePlanTemplate'
| 'createdAt'
| 'lastUpdate'

/**
 * AggregatesTable page
 * @component
 */
const AggregatesTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const confirmDialog = useConfirmDialog();

    const filters = useSelector(filtersSelector);

    const paginationData = useSelector(paginationSelector);

    const aggregates = useSelector(aggregatesSelector);

    const fetchAggregates = () => {
      dispatch(spinnerActions.updateSpinnerOpened(true));
      //take the lastEvaluated id and name from the pagesKey array using page as index.
      const lastEvaluatedId = paginationData.page === 0 ? "" : paginationData.pagesKey[paginationData.page - 1].lastEvaluatedId;
      const lastEvaluatedName = paginationData.page === 0 ? "" : paginationData.pagesKey[paginationData.page - 1].lastEvaluatedName;
      let params : getAggregateParams = {
        name: filters.name,
        limit: paginationData.limit,
        lastEvaluatedId,
        lastEvaluatedName
      }
      apiRequests.getAggregates(params)
        .then(
          res => {
            dispatch(spinnerActions.updateSpinnerOpened(false));
            dispatch(setAggregates(res));
          }
        ).catch(
          err => {
            dispatch(snackbarActions.updateSnackbacrOpened(true));
            dispatch(snackbarActions.updateStatusCode("400"));
            dispatch(spinnerActions.updateSpinnerOpened(false));
          }
        )
    }

    useEffect(
      () => {
        fetchAggregates();
      }, [filters.name, paginationData.page, paginationData.limit]
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
      confirmDialog({title: "Elimina aggregazione", message: "Sicuro di voler effettuare l'operazione?"})
        .then(() => callDelete(id))
        .catch(() => {});
    }

    const pagesToShow: Array<number> = calculatePages(
      paginationData.limit,
      paginationData.total,
      Math.min(paginationData.pagesKey.length + 1, 3),
      paginationData.page + 1
    );

    const columns: Array<Column<AggregateColumn>> = [
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
            id: 'usagePlanTemplate',
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
            return <DeleteIcon sx={{ color: red[500] }} />;
          },
          onClick(row: Item) {
            handleClickDelete(row.id);
          },
        }
      ];
    const rows: Array<Item> = aggregates.map((n, i) => ({
    ...n
    }));

    function handleRowClick(row: Item) {
      navigate(`/aggregate/${row.id}`);
    }
    
    return (
      <>
        <FilterTableAggregates />
        <ItemsTable columns={columns} rows={rows} />
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


