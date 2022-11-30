import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox
} from '@mui/material';
import { Pa } from '../../api/apiRequestTypes';
import usePagination from '../../hooks/usePagination';
import CustomPagination from '../Pagination/Pagination';

type PaBodyTableRowProps = {
    pa: Pa,
    onSelect?: (pa: Pa, selected: boolean) => void
}

const PaBodyTableRow = ({ pa, onSelect }: PaBodyTableRowProps) => {

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>, pa: Pa) => {
        let checked = evt.target.checked;
        onSelect!(pa, checked);
    };

    return (
        <TableRow data-testid="paTable-row">
            {onSelect && <TableCell>
                <Checkbox
                    id={`check-${pa.id}`}
                    name={`input-check-${pa.id}`}
                    checked={pa.selected}
                    data-testid={`paTable-row-checkbox-${pa.id}`}
                    onChange={(evt) => handleChange(evt, pa)}
                />
            </TableCell>
            }
            <TableCell>{pa.name}</TableCell>
        </TableRow>
    )
}

type PaTableHeadProps = {
    onSelect?: (pa: Pa, selected: boolean) => void
}
const PaTableHead = ({ onSelect }: PaTableHeadProps) => {

    return (
        <TableRow data-testid="paTable-head">
            {onSelect && <TableCell width={"10%"}></TableCell>}
            <TableCell width={onSelect ? "90%" : "100%"}>Nome PA</TableCell>
        </TableRow>
    )
}


type PaTableProps = {
    paList: Array<Pa>,
    onSelect?: (pa: Pa, selected: boolean) => void
}

const PaTable = ({ paList, onSelect }: PaTableProps) => {
    const head = <PaTableHead onSelect={onSelect} />;

    const { handlePaginationChange, limit, page, pagesToShow, slicedList, total } = usePagination(paList, 5);

    const rows = slicedList.map((pa) => (
        <PaBodyTableRow key={`row-${pa.id}`} pa={pa} onSelect={onSelect} />
    ))

    return (
        <>
            <TableContainer data-testid="paTable">
                <Table stickyHeader aria-label='Tabella di Pubbliche amministrazioni'>
                    <TableHead>
                        {head}
                    </TableHead>
                    <TableBody sx={{ backgroundColor: 'background.paper' }}>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
            {paList.length > 0 && <CustomPagination
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

    )
}
export default PaTable;