import React, { useMemo, useState } from 'react';
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
import CustomPagination from '../Pagination/CustomPagination';

type Props = {
    paList : Array<Pa>,
    handleSelection:(pa: any, selected: boolean) => void,
}

const PaTable = ({paList, handleSelection}: Props) => {
    
    const fields = [FieldsProperties["Nome PA"]];

    const [filters, setFilters] = useState({name: ""}); 
    
    const handleFiltersSubmit = (filters: any) => {
        setFilters(filters);
    }

    const handleChange = (evt: any, pa: Pa) => {
        let checked = evt.target.checked;
        handleSelection(pa, checked);
    };

    const filterPredicate = (pa: Pa) => {
        return pa.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1;
    }

    const paListFiltered = useMemo(() => {
        console.time("Predicato");
        let fil = filters.name ? paList.filter(filterPredicate) : paList;
        console.timeEnd("Predicato");

        return fil;
    }, [filters.name, paList.length]);

    const { handlePaginationChange, limit, page, pagesToShow, slicedList, total } = usePagination(paListFiltered, 5); 

    return (
        <>
            <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} filters={filters} />
            <TableContainer sx={{ marginBottom: '10px' }}>
                <Table stickyHeader aria-label='Tabella di item'>
                    <TableHead>
                        <TableRow>
                            <TableCell width={"10%"}></TableCell>
                            <TableCell width={"90%"}>Nome PA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: 'background.paper' }}>
                        {slicedList.map((pa) => (
                            <TableRow key={`row-${pa.id}`}>
                                <TableCell>
                                    <Checkbox id={`check-${pa.id}`} name={`input-check-${pa.id}`} checked={pa.selected} onChange={ (evt) => handleChange(evt, pa) }/>
                                </TableCell>
                                <TableCell>{pa.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <table>
                <thead>
                    <th style={{width:"10%"}}></th>
                    <th style={{width:"90%"}}> Nome PA</th>
                </thead>
                <tbody>
                {slicedList.map((pa, ind) => (
                            <tr key={ `row-${pa.id}`}>
                                <td>
                                    <input type="checkbox" id={`check-${pa.id}`} name={`input-check-${pa.id}`} checked={pa.selected} onChange={ (evt) => handleChange(evt, pa) }/>
                                </td>
                                <td>{pa.name}</td>
                            </tr>
                        ))}
                </tbody>
            </table> */}
            
            {paListFiltered.length > 0 && <CustomPagination 
                    paginationData={{
                        limit: limit,
                        page: page,
                        total: total
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
            }
        </>
    );
}
export default PaTable;