import { useMemo, useState } from 'react';
import { Pa } from '../../types';
import { FieldsProperties } from "../formFields/FormFields";
import FilterTable from "../forms/filterTable/FilterTable";
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
            <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} />
            <PaTable paList={paListFiltered} onSelect={handleSelection} />
        </>
    );
}
export default AssociablePaTable;