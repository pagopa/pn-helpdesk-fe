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
import PaginatedComponent from '../paginatedComponent/PaginatedComponent';
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
        
    const rows = paList.map((pa) => (
        <PaBodyTableRow key={`row-${pa.id}`} pa={pa} onSelect={onSelect} />
    ))

    return (
        <> 
            <PaginatedComponent<Pa> list={paList} displayedPage={3} defaultLimit={10}>
                {(slicedList) => (
                    <TableContainer data-testid="paTable">
                        <Table stickyHeader aria-label='Tabella di Pubbliche amministrazioni'>
                            <TableHead>
                                {head}
                            </TableHead>
                            <TableBody sx={{ backgroundColor: 'background.paper' }}>
                                {slicedList.map((pa) => (
                                    <PaBodyTableRow key={`row-${pa.id}`} pa={pa} onSelect={onSelect} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </PaginatedComponent>
        </>

    )
}
export default PaTable;