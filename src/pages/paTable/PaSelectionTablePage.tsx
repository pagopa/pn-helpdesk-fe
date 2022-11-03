import React from "react";
import MainLayout from "../mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Box,
    Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomPagination from "../../components/Pagination/CustomPagination";
import PaSelectionTableRow from "./PaSelectionTableRow";

const PaSelectionTablePage = ({ email }: any) => {
    const navigate = useNavigate();
    const pa_list = [
        {
            pa_name: "Comune di Roma"
        },
        {
            pa_name: "Comune di Fiumicino"
        },
        {
            pa_name: "Comune di Frosinone"
        },
        {
            pa_name: "Comune di Viterbo"
        },
        {
            pa_name: "Comune di Latina"
        },
    ]
    const totalElements = pa_list.length;

    function handleTableRowClick(ind: number) {
        console.log(ind)
    }

    return (
        <MainLayout email={email}>
            <h2>Tabella di selezione delle Pubbliche Amministrazioni</h2>
            <TableContainer sx={{ marginBottom: '10px' }}>
                <Table stickyHeader aria-label='Tabella di item'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome PA</TableCell>
                            <TableCell>Selezione</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: 'background.paper' }}>
                        {pa_list.map((pa, ind) => (
                            <PaSelectionTableRow
                                key={ind}
                                pa={pa}
                                
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                totalElements > 0 && (
                    <CustomPagination
                        paginationData={{
                            size: 10,
                            page: 1,
                            totalElements
                        }}
                        onPageRequest={() => { return }}
                        pagesToShow={[1]}
                        eventTrackingCallbackPageSize={undefined}
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
                )
            }
        </MainLayout >
    );
};
export default PaSelectionTablePage;


