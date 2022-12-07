import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Pa } from '../../api/apiRequestTypes';
import PaginatedComponent from '../paginatedComponent/PaginatedComponent';

type Props = {
    paList : Array<Pa>,
    onSelection?: (pa: Pa, selected: boolean) => void
}

const PaList = ({paList, onSelection} : Props) => {
    return (
        <>
            <PaginatedComponent<Pa> list={paList} defaultLimit={5} displayedPage={2}>
                {
                    (slicedList) => slicedList.length > 0 && <List data-testid="paList">
                        {slicedList.map((pa) => (
                            <ListItemButton 
                                key={`list-${pa.id}`} 
                                secondaryAction={
                                    onSelection !== undefined ? (
                                        <IconButton edge="end" aria-label="delete" data-testid={`paList-deleteButton-${pa.id}`} onClick={(evt) => onSelection(pa, false)}>
                                            <ClearIcon />
                                        </IconButton>
                                    ) : ""
                                }
                                divider={true}
                                data-testid="paList-item"
                            >
                                <ListItemText
                                    primary={pa.name}
                                />
                            </ListItemButton >
                        ))}
                    </List>
                }
            </PaginatedComponent>
        </>
    );
}

export default PaList;