import { TableRow, TableCell, Checkbox } from '@mui/material';
import { useState } from 'react';

function PaSelectionTableRow(props: any) {
    const [isClicked, setIsClicked] = useState(false);

    function handleRowClick(){
        setIsClicked(true);
    }    

    return (
        <TableRow onClick={() => {handleRowClick()}}>
            <TableCell>{props.pa.pa_name}</TableCell>
            <TableCell>
                <Checkbox checked={isClicked} disabled={isClicked} />
            </TableCell>
        </TableRow>
    );
}

export default PaSelectionTableRow;