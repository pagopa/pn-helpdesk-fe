import { render } from '@testing-library/react';
import { ListItem, ListItemText } from '@mui/material';
import PaList from '../PaList';
import { pa_list } from '../../../api/mock_agg_response';
import { Pa } from '../../../api/apiRequestTypes';

describe('PaList without itemComponent', () => {
  const mockedData = pa_list.items;

  it('renders with emptyMessage', () => {
    const result = render(<PaList items={[]} showEmptyMessage />);
    expect(result.getByText('Non sono stati trovati elementi.'));
  });

  it('renders all items', () => {
    const result = render(<PaList items={mockedData} showEmptyMessage />);
    const listItems = result?.queryAllByTestId('paList-item');
    expect(listItems).toHaveLength(mockedData.length);
  });
});

describe('PaList with itemComponent', () => {
  const mockedData = pa_list.items;

  const itemComponent = (pa: Pa) => (
    <ListItem data-testid="paList-item" key={pa.id}>
      <ListItemText primary={pa.name} />
    </ListItem>
  );

  it('renders all elements', () => {
    const result = render(
      <PaList items={mockedData} itemComponent={itemComponent} showEmptyMessage />
    );
    const listItems = result?.queryAllByTestId('paList-item');
    expect(listItems).toHaveLength(mockedData.length);
  });
});
