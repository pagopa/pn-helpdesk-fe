import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import usePagination from '../../hooks/usePagination';
import CustomPagination from '../Pagination/Pagination';
import { Pa } from '../../api/apiRequestTypes';

type Props = {
    paList : Array<Pa>,
    handleSelection?: (pa: Pa, selected: boolean) => void
}

const PaList = ({paList, handleSelection} : Props) => {
    const { handlePaginationChange, limit, page, pagesToShow, slicedList, total } = usePagination(paList);
    return (
        <>
            {slicedList.length > 0 && <List data-testid="paList">
                {slicedList.map((pa) => (
                    <ListItemButton 
                        key={`list-${pa.id}`} 
                        secondaryAction={
                            handleSelection !== undefined ? (
                                <IconButton edge="end" aria-label="delete" data-testid={`paList-deleteButton-${pa.id}`} onClick={(evt) => handleSelection(pa, false)}>
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
                ))
                }
            </List>}
            {slicedList.length > 0 && <CustomPagination 
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

export default PaList;