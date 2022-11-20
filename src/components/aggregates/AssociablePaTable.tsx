import { useEffect, useMemo, useState, memo, SyntheticEvent } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Pagination
} from '@mui/material';
import { Pa } from '../../types';
import { FieldsProperties } from "../formFields/FormFields";
import FilterTable from "../forms/filterTable/FilterTable";
import usePagination from '../../hooks/usePagination';
import CustomPagination from '../pagination/CustomPagination';
import ItemsTable from '../table/table';
import { Column, Item, PaColumn } from "../../types";
import PaTable from './PaTable';

type Props = {
    paList : Array<Pa>,
    handleSelection:(pa: Pa, selected: boolean) => void,
}

const AssociablePaTable = ({paList, handleSelection}: Props) => {
    
    const fields = [FieldsProperties["Nome PA"]];

    const [filters, setFilters] = useState({name: ""}); 
    
    const handleFiltersSubmit = (filters: any) => {
        setFilters(filters);
    }

    const filterPredicate = (pa: Pa) => {
        return pa.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1;
    }

    const paListFiltered = useMemo(() => {
        return filters.name ? paList.filter(filterPredicate) : paList;
    }, [filters.name, paList.length]);

    return (
        <>
            <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} filters={filters} />
            <PaTable paList={paListFiltered} onSelect={handleSelection} />
        </>
    );
}
export default AssociablePaTable;