import { ListItemButton, ListItemText } from '@mui/material';
import { Pa } from '../../api/apiRequestTypes';
import PaList from './PaList';
type Props = {
  items: Array<Pa>;
  onClick: (pa: Pa) => void;
  selectedPa: string;
};

const PaListWithSelection = ({ items, onClick, selectedPa }: Props) => (
  <PaList
    items={items}
    itemComponent={(pa: Pa) => (
      <ListItemButton
        style={{ backgroundColor: 'white' }}
        onClick={() => onClick(pa)}
        key={`list-${pa.id}`}
        data-testid="paList-item"
        selected={selectedPa === pa.id}
      >
        <ListItemText primary={pa.name} />
      </ListItemButton>
    )}
    showEmptyMessage
  />
);

export default PaListWithSelection;
