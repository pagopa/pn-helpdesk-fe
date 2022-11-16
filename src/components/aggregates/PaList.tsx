import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader, Pagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Pa } from '../../types';
import usePagination from '../../hooks/usePagination';
import CustomPagination from '../Pagination/CustomPagination';

type Props = {
    paList : Array<Pa>,
    handleSelection: undefined | Function
}

const PaList = ({paList, handleSelection} : Props) => {
    console.log("render Pa List");
    const { handlePaginationChange, limit, page, pagesToShow, slicedList, total } = usePagination(paList);
    return (
        <>
            {slicedList.length > 0 && <List>
                {slicedList.map((pa) => (
                    <ListItemButton 
                        key={`list-${pa.id}`} 
                        secondaryAction={
                            handleSelection !== undefined ? (
                                <IconButton edge="end" aria-label="delete" onClick={(evt) => handleSelection(pa, false)}>
                                    <ClearIcon />
                                </IconButton>
                            ) : ""
                        }
                        divider={true}
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