import { render, fireEvent, waitFor, within, RenderResult, screen } from '@testing-library/react';
import { pa_list } from '../../../api/mock_agg_response';
import PaginatedPaList from '../PaginatedPaList';

describe('PaginatedPaList tests', () => {
  let result: RenderResult | undefined;
  const mockedData = pa_list.items;

  beforeEach(() => {
    result = render(<PaginatedPaList items={mockedData} />);
  });

  it('renders paginated items', () => {
    const itemsPerPageSelector = result?.queryByTestId('itemsPerPageSelector');
    expect(itemsPerPageSelector).toBeInTheDocument();
    const listItems = result?.queryAllByTestId('paList-item');
    // Default limit is 5
    expect(listItems).toHaveLength(5);
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
    const listItems = result?.queryAllByTestId('paList-item');
    expect(listItems).toHaveLength(mockedData.length);
  });
});
