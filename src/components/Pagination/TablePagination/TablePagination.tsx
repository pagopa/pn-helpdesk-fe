import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { PaginationData } from '../types';

type Props = {
    page: number,
    total: number,
    limit: number,
    eventHandler: (event: PaginationData) => void
}

export default function TablePaginationBE({page, total, limit, eventHandler} : Props) {

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        eventHandler({
            page: newPage,
            total: total,
            limit: limit
        })
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        eventHandler({
            page: 0,
            total: total,
            limit: parseInt(event.target.value, 10)
        })
    };

    const customDisplayRows = ({ from, to, count } : any) => {
        return `${from}-${to} di ${count !== -1 ? count : `più di ${to}`}`;
    }

    return (
        <>
            {total > 0 && (
                <TablePagination
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={limit}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={customDisplayRows}
                    labelRowsPerPage={""}
                />
            )}
        </>
    );
}