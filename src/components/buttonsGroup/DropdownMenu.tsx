import React, { ReactNode } from 'react';
import { IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface DropdownMenuProps {
  id: string;
  children: ReactNode;
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleShowMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id={props.id}
        data-testid={props.id}
        aria-controls={open ? 'action-' + props.id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleShowMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={'action-' + props.id}
        data-testid={'action-' + props.id}
        aria-labelledby="button-action-cost"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {props.children}
      </Menu>
    </>
  );
};
