import React from "react";
import { AggregationColumn, Column, Item } from "../../types";
import ItemsTable from '../../components/table/table';
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import AggregationFilterTable from "./AggregationFilterTable";
/**
 * Aggregations page
 * @component
 */
const AggregationTable = ({email}: any) => {
    const navigate = useNavigate();
    const totalElements = 11;
    const aggregations = [
        {
          aggregateId: "1-a",
          aggregationName: "Comuni Lombardia",
          usagePlan: "MEDIUM",
          createdAt: "2022-11-01T20:00:00Z",
          lastUpdate: "2022-11-02T22:00:00Z"
        },
        {
          aggregateId: "2-a",
          aggregationName: "Comuni Lazio",
          usagePlan: "LARGE",
          createdAt: "2022-11-01T20:00:00Z",
          lastUpdate: ""
        }
    ]
    const columns: Array<Column<AggregationColumn>> = [
        {
            id: 'aggregationName',
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
          id: 'lastUpdate',
          label: '',
          width: '5%',
          getCellLabel(value: string) {
            return <DeleteIcon sx={{ color: red[500] }} />;
          },
          onClick(row: Item) {
            // handleRowClick(row);
          },
        }
      ];
    const rows: Array<Item> = aggregations.map((n, i) => ({
    ...n,
    id: n.aggregationName + i.toString(),
    }));

    function handleRowClick(row: Item) {
        navigate(`/aggregation/${row.aggregateId}`);
    }

    function handleChangePage() {
        
    }
    
    return (
        <>
          <AggregationFilterTable />
          <ItemsTable columns={columns} rows={rows} />
          {aggregations.length > 0 && (
              <CustomPagination
                  paginationData={{
                      size: 10,
                      page: 1,
                      totalElements
                  }}
                  onPageRequest={handleChangePage}
                  pagesToShow={[1]}
                  eventTrackingCallbackPageSize={undefined}
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
          )}
        </>
    );
};
export default AggregationTable;


