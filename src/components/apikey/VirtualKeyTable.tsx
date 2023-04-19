import React, { useEffect, useState } from "react";
import { Column, Item } from "../table/tableTypes";
import ItemsTable from '../table/table';
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { KeyType, virtualKey } from "../../api/apiRequestTypes";
import { useDispatch } from 'react-redux';
import apiRequests from '../../api/apiRequests';
import useConfirmDialog from "../confirmationDialog/useConfirmDialog";
import { Alert, Box, Button, CircularProgress, FormControlLabel, Grid, Typography, Checkbox } from "@mui/material";
import PaginatedComponent from "../paginatedComponent/PaginatedComponent";

type VirtualKeyColumn =
  | 'name'
  | 'groups'
  | 'status'
  | 'pdnd'

type Props = {
  id: string
}
/**
 * VirtualKeyTable page
 * @component
 */
const VirtualKeyTable = ({ id }: Props) => {

  const [virtualkeyList, setVirtualKeyList] = useState<Array<virtualKey>>([]);
  const [updatedList, setUpdatedList] = useState<Array<KeyType>>([]);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [needRefresh, setNeedRefresh] = useState<boolean>(false);

  const allSelected = virtualkeyList.length > 0 ? virtualkeyList.every((vk) => vk.pdnd) : false;

  const confirmDialog = useConfirmDialog();

  const reduxDispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;

    if(id !== "") {
      setFetching(true);
      apiRequests.searchApiKey(id)
        .then(res => {
          if(!didCancel) {
            setVirtualKeyList(res.items);
            setUpdatedList([]);
          }
        })
        .catch(err => {
          if(!didCancel) {
            reduxDispatch(snackbarActions.updateStatusCode("400"));
            reduxDispatch(snackbarActions.updateMessage("Non è stato possibile ottenere le Virtual Keys"));
            reduxDispatch(snackbarActions.updateSnackbacrOpened(true));            
          }
        })
        .finally(() => {
          setFetching(false);
          reduxDispatch(spinnerActions.updateSpinnerOpened(false));
        })
    }

    return () => { didCancel = true }
  }, [id, needRefresh, reduxDispatch])


  const handleChange = (vk: virtualKey) => {
    //Update virtualKeyList
    let virtualKeyIndex = virtualkeyList.findIndex((element) => element.id === vk.id);
    let copy = [...virtualkeyList];
    let foundElement = copy[virtualKeyIndex];
    foundElement.pdnd = !foundElement.pdnd;
    setVirtualKeyList(copy); 

    //Update SelectedKeys
    let selectedKeyIndex = updatedList.findIndex((element) => element.id === vk.id);
    let copySelectedKeyList = [...updatedList];
    if(selectedKeyIndex === -1) {
      const {id, pdnd} = vk;
      copySelectedKeyList.push({id, pdnd: !pdnd});
    } else {
      copySelectedKeyList.splice(selectedKeyIndex, 1);
    }
    setUpdatedList(copySelectedKeyList);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelect = allSelected ? false : true;
    let elementToExcludeFromUpdatedList = new Map<string,string>();
    updatedList.filter((vk) => vk.pdnd !== newSelect)
      .forEach(
        (vk,index) => elementToExcludeFromUpdatedList.set(vk.id, vk.id)
      )
    let elementToKeepFromUpdatedList = updatedList.filter((vk) => vk.pdnd === newSelect);
    let elementToChangeFromVirtualKeyList = virtualkeyList.filter(
      (vk) => !elementToExcludeFromUpdatedList.get(vk.id) && vk.pdnd !== newSelect
    ).map(vk => ({id: vk.id, pdnd: newSelect})); 


    setUpdatedList([...elementToKeepFromUpdatedList, ...elementToChangeFromVirtualKeyList]);
    setVirtualKeyList(virtualkeyList.map((vk) => ({...vk, pdnd: newSelect})));
  }

  const COLUMNS: Array<Column<VirtualKeyColumn>> = [
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
      id: 'status',
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
        control={
          <Checkbox 
            checked={allSelected}
            onChange={handleSelectAll}
            data-testid={`vkTable-col-checkbox`}
          />}
        label={<Typography sx={{ fontWeight: 600 }}>Flag Interoperabilita'</Typography>}
        labelPlacement="end"
      />
      ),
      width: '20%',
      getCellLabel(value: boolean, row: virtualKey) {
        return (<Checkbox
          checked={value}
          onChange={() => {handleChange(row)}}
          inputProps={{ 'aria-label': 'controlled' }}
          data-testid={`vkTable-row-checkbox-${row.id}`}
        />
        )
      }
    }
  ];
  const rows: Array<Item> = virtualkeyList.map((n, i) => ({
    ...n
  }));

  if(id === "") {
    return <Box sx={{display:"flex", marginTop:"110px", justifyContent: "center", }}>
      <Alert severity="info">Seleziona un elemento dalla sezione "Seleziona una PA" per visualizzare le corrispettive Virtual keys</Alert>
    </Box>
  }

  if(isFetching) {
    return <Box sx={{display:"flex", marginTop:"110px", justifyContent: "center", }}>
      <CircularProgress color="inherit" />
      <Typography variant="body1">Caricamento in corso...</Typography>
    </Box> 
  }

  const handleSave = () => {
    reduxDispatch(spinnerActions.updateSpinnerOpened(true));
    apiRequests.modifyPdnd({items: updatedList})
      .then((res) => {
        if(res.unprocessedKey && res.unprocessedKey.length > 0) {
          let unprocessedKey = res.unprocessedKey.join(",");
          reduxDispatch(snackbarActions.updateSnackbacrOpened(true));
          reduxDispatch(snackbarActions.updateStatusCode("202"));
          reduxDispatch(snackbarActions.updateMessage("Le seguenti Virtual Keys non sono state modificate con successo: " + unprocessedKey));
        }
        
        setNeedRefresh((refresh) => !refresh);
      }).catch((err) => {
          reduxDispatch(snackbarActions.updateSnackbacrOpened(true));
          reduxDispatch(snackbarActions.updateStatusCode("400"));
          reduxDispatch(snackbarActions.updateMessage("Problemi con la modifica delle Virtual Keys"));
      }).finally(() => {reduxDispatch(spinnerActions.updateSpinnerOpened(false));})
  }

  const handleClickUpdate = () => {
    confirmDialog({title: " Applica modifiche", "message": "Sei sicuro di voler confermare le modifiche?"})
      .then(handleSave)
      .catch(() => {});
  }

  return (
    <>
      <PaginatedComponent<Item> list={rows} defaultLimit={10}>
        {(slicedList) => <ItemsTable columns={COLUMNS} rows={slicedList} />}
      </PaginatedComponent>
      
      <Box paddingTop={3}>
        <Grid direction={"row-reverse"} container marginTop={0.1}>
          <Button
            variant="outlined"
            type="submit"
            onClick={handleClickUpdate}
            disabled={updatedList.length === 0}
          >
            Salva modifiche
          </Button>
        </Grid>
      </Box>
    </>
  );
};
export default VirtualKeyTable;