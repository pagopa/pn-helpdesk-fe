import {DataGrid, gridClasses, GridRowParams, GridValidRowModel} from "@mui/x-data-grid";
import React from "react";
import {ModelType} from "./index";
import {getColumn} from "./ColumnsDefinition";
import {Page} from "../../model";


interface PaginationProps<T> {
  type: ModelType,
  data: Page<T>,
  loading: boolean,

  rowId ?: (row: GridValidRowModel) => any
  onPageChange?: (page:number) => void
  onPageSizeChange?: (pageSize:number) => void
  onClickItem?: (item: T) => void
}


export function PaginationDataGrid<T>(props:PaginationProps<T>) {

  const rowClickHandler = (rowData: GridRowParams) => {
    props.onClickItem?.(rowData.row as T);
  }

  return <>
    <DataGrid
      rows={(props.data?.content) ? props.data.content : []}
      columns={getColumn(props.type)}
      onRowClick={rowClickHandler}
      experimentalFeatures={{ newEditingApi: true }}
      disableVirtualization
      page={(props.data?.content) ? props.data.page : 0}
      rowsPerPageOptions={[10, 25, 50, 100]}
      paginationMode={"server"}
      getRowId={props?.rowId}
      loading={props.loading}
      pageSize={(props.data?.content) ? props.data.size : 10}
      rowCount={(props.data?.content) ? props.data.total : 0}
      onPageChange={props.onPageChange}
      onPageSizeChange={props.onPageSizeChange}
      sx={{
        height:"400px",
        [`& .${gridClasses.row}`]: {
          bgcolor: (theme) => "background.default",
        },
      }}
    />
  </>
}