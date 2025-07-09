import { ChangeEvent, useState } from 'react';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Pagination as MuiPagination,
  PaginationItem,
  SxProps,
} from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

import { PaginationData, A11yPaginationLabelsTypes } from './types';

type Props = {
  /** The actual paginationData */
  paginationData: PaginationData;
  /** The function to be invoked if the user change paginationData */
  onPageRequest: (r: PaginationData) => void;
  /** The list of numbers of the elements per page */
  elementsPerPage?: Array<number>;
  /** an array containing pages to show */
  pagesToShow?: Array<number>;
  /** custom style */
  sx?: SxProps;
};

const getA11yPaginationLabels = (
  type: A11yPaginationLabelsTypes,
  page: number,
  selected: boolean
): string => {
  // eslint-disable-next-line functional/no-let
  let ariaStr = '';
  switch (type) {
    case 'first':
      ariaStr = 'primo elemento';
      break;
    case 'last':
      ariaStr = 'ultimo elemento';
      break;
    case 'page':
      ariaStr = `pagina ${page.toString()}`;
      break;
    case 'next':
      ariaStr = 'Vai alla pagina successiva';
      break;
    case 'previous':
      ariaStr = 'Vai alla pagina precedente';
      break;
  }
  if (selected) {
    ariaStr += `, elemento selezionato`;
  }
  return ariaStr;
};

/** Selfcare custom table available pages component */
export default function Pagination({
  paginationData,
  onPageRequest,
  elementsPerPage = [5, 10, 20, 50, 100],
  pagesToShow,
  sx,
}: Props) {
  const limit = paginationData.limit || elementsPerPage[0];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeElementsPerPage = (selectedSize: number) => {
    if (limit !== selectedSize) {
      paginationData.limit = selectedSize;
      // reset current page
      paginationData.page = 0;
      onPageRequest(paginationData);
    }
    handleClose();
  };

  return (
    <Grid container sx={sx}>
      <Grid
        item
        xs={4}
        display="flex"
        justifyContent="start"
        alignItems={'center'}
        data-testid="itemsPerPageSelector"
        className="items-per-page-selector"
      >
        <Button
          sx={{ color: 'text.primary', fontWeight: 400 }}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={<ArrowDropDown />}
          aria-label={'Righe per pagina'}
        >
          {limit}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'Righe per pagina',
          }}
        >
          {elementsPerPage.map((ep) => (
            <MenuItem key={ep} onClick={() => handleChangeElementsPerPage(ep)}>
              {ep}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      <Grid
        item
        xs={8}
        display="flex"
        justifyContent="end"
        alignItems={'center'}
        data-testid="pageSelector"
        className="page-selector"
      >
        <MuiPagination
          sx={{ display: 'flex' }}
          aria-label={'Menu Paginazione'}
          color="primary"
          variant="text"
          shape="circular"
          page={paginationData.page + 1}
          count={Math.ceil(paginationData.total / limit)}
          getItemAriaLabel={getA11yPaginationLabels}
          renderItem={(props2) => {
            if (
              pagesToShow &&
              props2.type === 'page' &&
              props2.page !== null &&
              pagesToShow.indexOf(props2.page) === -1
            ) {
              return null;
            }
            return <PaginationItem {...props2} sx={{ border: 'none' }} />;
          }}
          onChange={(_event: ChangeEvent<unknown>, value: number) =>
            onPageRequest({
              ...paginationData,
              page: value - 1,
            })
          }
        />
      </Grid>
    </Grid>
  );
}
