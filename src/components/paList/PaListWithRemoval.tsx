import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Pa } from '../../api/apiRequestTypes';
import PaginatedComponent from '../paginatedComponent/PaginatedComponent';
import PaList from './PaList';

type Props = {
    items : Array<Pa>,
    onClick: (pa: Pa, selected: boolean) => void
}

const PaListWithRemoval = ({items, onClick} : Props) => {
    return (
        <>
            <PaginatedComponent<Pa> list={items} defaultLimit={5} displayedPage={2}>
                {slicedList => (
                    <PaList 
                        items={slicedList} 
                        itemComponent={
                            (pa) => (
                                <ListItem
                                    key={`list-${pa.id}`} 
                                    divider={true}
                                    data-testid="paList-item"
                                    secondaryAction={
                                        <IconButton 
                                            edge="end" 
                                            aria-label="delete" 
                                            data-testid={`paList-deleteButton-${pa.id}`}
                                            onClick={(evt) => onClick(pa, false)}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText primary={pa.name} />
                                </ListItem>
                            )
                        }
                    />
                )}
            </PaginatedComponent>
        </>
    );
}

export default PaListWithRemoval;