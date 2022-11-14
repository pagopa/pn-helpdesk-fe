import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader, Pagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

type Props = {
    paList : Array<any>,
    handleSelection: undefined | Function
}

const PaList = ({paList, handleSelection} : Props) => {
    return (
        <>
            {paList.length > 0 && <List>
                {paList.map((pa) => (
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
            {paList.length > 0 && <Pagination count={1}/>}
       
        </>
       
    );
}

export default PaList;