import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Pa } from '../../api/apiRequestTypes';
import PaginatedComponent from '../paginatedComponent/PaginatedComponent';

type Props = {
    paList: Array<Pa>,
    onSelection: (pa: Pa) => void
}

const PaList = ({ paList, onSelection }: Props) => {
    return (
        <>
            
                <List data-testid="paList">
                    {paList.map((pa) => (
                        <ListItemButton
                            style={{ backgroundColor: 'white', cursor: 'pointer' }}
                            onClick={() => onSelection(pa)}
                            key={`list-${pa.id}`}
                            divider={true}
                            data-testid="paList-item"
                        >
                            <ListItemText
                                primary={pa.name}
                            />
                        </ListItemButton >
                    ))}
                </List>
        </>
    );
}

export default PaList;