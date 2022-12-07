import { useMemo, useState, useCallback } from 'react';
import { Pa } from '../../api/apiRequestTypes';
import { FieldsProperties } from "../formFields/FormFields";
import FilterTable from "../forms/filterTable/FilterTable";
import PaTable from '../aggregates/PaTable';

type Props = {
    paList : Array<Pa>,
    handleSelection:(pa: Pa, selected: boolean) => void,
}

const AssociablePaTable = ({paList, handleSelection}: Props) => {
    
    const fields = useMemo(() => [FieldsProperties["Nome PA"]], []);

    const [filters, setFilters] = useState({name: ""}); 
    
    const handleFiltersSubmit = useCallback((filters: any) => {
        setFilters(filters);
    }, [])

    const paListFiltered = useMemo(() => {
        const filterPredicate = (pa: Pa) => {
            return pa.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1;
        }

        return filters.name ? paList.filter(filterPredicate) : paList;
    }, [filters.name, paList.length]);

    return (
        <>
            <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} />
            <PaTable paList={paListFiltered} onSelect={handleSelection}></PaTable>
        </>
    );
}
export default AssociablePaTable;

