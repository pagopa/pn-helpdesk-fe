import { fireEvent, RenderResult } from '@testing-library/react';
import { pa_list } from '../../../api/mock_agg_response';
import { DEFAULT_PAGINATION_LIMIT } from '../../../hooks/usePagination';
import { reducer } from '../../../mocks/mockReducer';
import PaTable from '../PaTable';

describe('PaTable without selection', () => {
  let result: RenderResult | undefined;
  const mockedData = pa_list.items;
  beforeEach(() => {
    result = reducer(<PaTable paList={mockedData} />);
  });
  it('renders', () => {
    const itemsPerPageSelector = result?.queryByTestId('itemsPerPageSelector');
    expect(itemsPerPageSelector).toBeInTheDocument();
    const paTable = result?.queryByTestId('paTable');
    expect(paTable).toBeInTheDocument();
    const paTableHead = result?.queryByTestId('paTable-head');
    expect(paTableHead).toBeInTheDocument();
    const tableRows = result?.queryAllByTestId('paTable-row');
    expect(tableRows).toHaveLength(DEFAULT_PAGINATION_LIMIT);
  });
});

describe('PaTable with selection', () => {
  let result: RenderResult | undefined;
  const mockedData = pa_list.items;
  const mockHandleSelection = jest.fn();
  beforeEach(() => {
    result = reducer(<PaTable paList={mockedData} onSelect={mockHandleSelection} />);
  });
  it('handle selection click', () => {
    const itemsPerPageSelector = result?.queryByTestId('itemsPerPageSelector');
    expect(itemsPerPageSelector).toBeInTheDocument();
    const tableRows = result?.queryAllByTestId('paTable-row');
    expect(tableRows).toHaveLength(DEFAULT_PAGINATION_LIMIT);
    const firstRowCheckboxMui = result?.getByTestId(`paTable-row-checkbox-${mockedData[0].id}`);
    const firstRowCheckboxElement = firstRowCheckboxMui?.querySelector('input[type="checkbox"]');
    fireEvent.click(firstRowCheckboxElement!);
    // expect(firstRowCheckboxElement).toBeChecked();
    expect(mockHandleSelection).toBeCalledTimes(1);
    expect(mockHandleSelection).toBeCalledWith(mockedData[0], true);
  });
});
