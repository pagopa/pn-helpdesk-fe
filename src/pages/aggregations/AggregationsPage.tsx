import React from "react";
import { AggregationColumn, Column, Item } from "../../types";
import MainLayout from "../mainLayout/MainLayout";
import ItemsTable from '../../components/table/table';
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useNavigate } from "react-router-dom";

/**
 * Aggregations page
 * @component
 */
const AggregationsPage = ({email}: any) => {
    const navigate = useNavigate();
    const totalElements = 11;
    const aggregations = [
        {
          aggregateId: "1-a",
          aggregationName: "Aggregazione 1",
          AWSApiKey: "TestAWSAPI1",
          usagePlan: "MEDIUM",
          paAssociate: 2,
          createdAt: "2022-11-01T20:00:00Z",
          lastUpdate: "2022-11-02T22:00:00Z"
        },
        {
          aggregateId: "2-a",
          aggregationName: "Aggregazione 2",
          AWSApiKey: "TestAWSAPI2",
          usagePlan: "HIGH",
          paAssociate: 0,
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
          id: 'AWSApiKey',
          label: 'ApiKey',
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
          id: 'paAssociate',
          label: 'Num PA Associate',
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
        <MainLayout email={email}>
            <h2>Gestione Aggregazioni ApiKey</h2>

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
        </MainLayout>
    );
};
export default AggregationsPage;


