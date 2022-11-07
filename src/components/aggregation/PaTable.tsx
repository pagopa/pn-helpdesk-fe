import React from 'react';
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

type Props = {
    paList : Array<any>,
    paSelectedList: Array<any>,
    handleSelection:(pa: any, selected: boolean) => void,
    
}

const PaTable = ({paList, paSelectedList, handleSelection}: Props) => {
    
    const handleChange = (evt: any, pa: any) => {
        let checked = evt.target.checked;

        handleSelection(pa, checked);
    };

    return (
        <>
            <TableContainer sx={{ marginBottom: '10px' }}>
                <Table stickyHeader aria-label='Tabella di item'>
                    <TableHead>
                        <TableRow>
                            <TableCell width={"10%"}></TableCell>
                            <TableCell width={"90%"}>Nome PA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: 'background.paper' }}>
                        {paList.map((pa, ind) => (
                            <TableRow key={ `row-${pa.id}`}>
                                <TableCell>
                                    <Checkbox checked={paSelectedList.some((item)=> item.id === pa.id)} onChange={ (evt) => handleChange(evt, pa) }/>
                                </TableCell>
                                <TableCell>{pa.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {paList.length > 0 && <Pagination count={1}/>}
        </>
    );
}
export default PaTable;