import { ReactNode, useCallback, useEffect, useReducer, useState } from "react";
import { Column, Item } from "../table/tableTypes";
import ItemsTable from '../table/table';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { ErrorResponse, getAggregateParams, searchApikeyResponse, virtualKey } from "../../api/apiRequestTypes";
import { useSelector, useDispatch } from 'react-redux';
import { filtersSelector, paginationSelector, aggregatesSelector, setPagination, setAggregates, resetState, setFilters } from '../../redux/aggregateSlice';
import { VirtualKeySelector } from "../../redux/virtualKeysSlice";
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
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { Box, Button, FormControlLabel, Grid, Typography } from "@mui/material";


type VirtualKeyColumn =
  | 'name'
  | 'groups'
  | 'state'
  | 'pdnd'

type ReducerState = {
  virtualkeyList: Array<virtualKey>,
  filters: {
    keyName: string
  },
  selectedVirtualKey: string
};

type Props = {
  id: string
}
/**
 * VirtualKeyTable page
 * @component
 */
const VirtualKeyTable = ({ id }: Props) => {

  const [virtualkeyList, setVirtualKeyList] = useState<virtualKey[]>([]);

  const isUserWriter = useHasPermissions([Permission.API_KEY_WRITE]);

  const navigate = useNavigate();

  const confirmDialog = useConfirmDialog();

  const virtualKeys = useSelector(VirtualKeySelector);

  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(spinnerActions.updateSpinnerOpened(true));
    apiRequests.searchApiKey(id)
      .then(res => {
        setVirtualKeyList(res.items)
        reduxDispatch(spinnerActions.updateSpinnerOpened(false));
      })
  }, [id])

  const handlePaginationChange = (paginationData: PaginationData) => {
    //dispatch(setPagination({ limit: paginationData.limit, page: paginationData.page }));
  };

  const pagesToShow: Array<number> = [0, 1, 2];
  /*const pagesToShow: Array<number> = calculatePages(
    paginationData.limit,
    paginationData.total,
    Math.min(paginationData.pagesKey.length + 1, 3),
    paginationData.page + 1
  );*/

  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const USER_WRITER_COLUMNS: Array<Column<VirtualKeyColumn>> = [
    {
      id: 'name',
      label: 'Nome',
      width: '20%',
      getCellLabel(value: string) {
        return value;
      }
    },
    {
      id: 'groups',
      label: 'Gruppi',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      }
    },
    {
      id: 'state',
      label: 'Stato',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      }
    },
    {
      id: 'pdnd',
      label: (<FormControlLabel sx={{ marginLeft: 0.019 }}
        value="end"
        control={<Checkbox />}
        label={<Typography sx={{ fontWeight: 600 }}>Flag Interoperabilita'</Typography>}
        labelPlacement="end"
      />
      ),
      width: '20%',
      getCellLabel(value: string) {
        return (<Checkbox
          checked={value === "1"}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        )
      }
    }
  ];
  const rows: Array<Item> = virtualkeyList.map((n, i) => ({
    ...n
  }));

  return (
    <>
      <ItemsTable columns={USER_WRITER_COLUMNS} rows={rows} />
      <Box paddingTop={3}>
        <Grid direction={"row-reverse"} container marginTop={0.1}>
          <Button
            variant="outlined"
            type="submit"
          //onClick={handleClickUpdate}
          >
            Salva modifiche
          </Button>
        </Grid>
      </Box>
    </>

  );
};
export default VirtualKeyTable;