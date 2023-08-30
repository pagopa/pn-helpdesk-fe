import { fireEvent, RenderResult, waitFor, screen, within } from '@testing-library/react';
import PaginatedComponent from '../PaginatedComponent';
import { reducer } from '../../../mocks/mockReducer';
import { pa_list } from '../../../api/mock_agg_response';

describe('PaginatedComponent with List', () => {
  let result: RenderResult | undefined;
  const mockedData = pa_list.items.map((pa) => pa.name);
  const customLimit = 10;

  const List = ({ list }: { list: Array<string> }) => (
    <ul data-testid="custom-list">
      {list.map((el) => (
        <li key={el}>{el}</li>
      ))}
    </ul>
  );

  beforeEach(() => {
    result = reducer(
      <PaginatedComponent<string> defaultLimit={customLimit} list={mockedData}>
        {(list) => <List list={list} />}
      </PaginatedComponent>
    );
  });

  it('renders', () => {
    const itemsPerPageSelector = result?.queryByTestId('itemsPerPageSelector');
    expect(itemsPerPageSelector).toBeInTheDocument();
    const customList = result?.getByTestId('custom-list');
    const listItems = within(customList!).getAllByRole('listitem');
    expect(listItems).toHaveLength(customLimit);
  });

  it('change items per page', async () => {
    const itemsPerPageSelectorBtn = result?.container.querySelector(
      '[data-testid="itemsPerPageSelector"] > button'
    );
    fireEvent.click(itemsPerPageSelectorBtn!);
    const itemsPerPageDropdown = await waitFor(() => screen.queryByRole('presentation'));
    expect(itemsPerPageDropdown).toBeInTheDocument();
    const itemsPerPageItem = within(itemsPerPageDropdown!).queryByText('100');
    fireEvent.click(itemsPerPageItem!);
    const customList = result?.getByTestId('custom-list');
    const listItems = within(customList!).getAllByRole('listitem');
    expect(listItems).toHaveLength(mockedData.length);
  });
});
