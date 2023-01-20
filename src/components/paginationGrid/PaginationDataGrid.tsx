import {DataGrid, gridClasses, GridRowParams} from "@mui/x-data-grid";
import React from "react";
import {ModelType} from "./index";
import {getColumn} from "./ColumnsDefinition";
import {Page} from "../../model";



interface PaginationProps<T> {
  type: ModelType,
  data: Page<T>,
  onPageChange?: (page:number) => void
  onPageSizeChange?: (pageSize:number) => void
  onClickItem?: (id: string | number) => void
}


export function PaginationDataGrid<T>(props:PaginationProps<T>) {

  const rowClickHandler = (rowData: GridRowParams) => {
    props.onClickItem?.(rowData.id);
  }


  return <>
    <DataGrid
    rows={props.data.content}
    columns={getColumn(props.type)}
    onRowClick={rowClickHandler}
    experimentalFeatures={{ newEditingApi: true }}
    disableVirtualization
    page={props.data.page}
    rowsPerPageOptions={[10, 25, 50, 100]}
    paginationMode={"server"}
    pageSize={props.data.size}
    rowCount={props.data.total}
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