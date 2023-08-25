import List from '@mui/material/List';
import { ListItemButton, ListItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { Pa } from '../../api/apiRequestTypes';

type DefaultPaItemProps = {
  pa: Pa;
};
const DefaultPaItem = ({ pa }: DefaultPaItemProps) => (
    <ListItem style={{ backgroundColor: 'white' }} data-testid="paList-item" divider={true}>
      <ListItemText primary={pa.name} />
    </ListItem>
  );

type PaListProps = {
  items: Array<Pa>;
  itemComponent?: (pa: Pa) => React.ReactElement;
  showEmptyMessage?: boolean;
};
const PaList = ({ items, itemComponent, showEmptyMessage = false }: PaListProps) => {
  const emptyListItem = (
    <ListItemButton
      style={{ backgroundColor: 'white' }}
      key={`empty-list`}
      data-testid="empty-list"
    >
      <ListItemText primary={'Non sono stati trovati elementi.'} />
    </ListItemButton>
  );

  return (
    <>
      <List component={'nav'} data-testid="paList">
        {items.length > 0 &&
          items.map((pa) =>
            itemComponent ? itemComponent(pa) : <DefaultPaItem key={`list-${pa.id}`} pa={pa} />
          )}
        {showEmptyMessage && items.length === 0 && emptyListItem}
      </List>
    </>
  );
};

export default PaList;
