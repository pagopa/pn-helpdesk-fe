import { RenderResult, fireEvent, waitFor, within, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../mocks/mockReducer';
import apiRequests from '../../../api/apiRequests';
import PaSection from '../PaSection';
import { search_pa } from '../../../api/mock_agg_response';

const DEFAULT_LIMIT = 10;

describe('PaSection tests with API success call', () => {
  let result: RenderResult | undefined;

  // Mocked data fetched on first mount
  const mockedData = search_pa(DEFAULT_LIMIT, '', '');
  const onSelect = jest.fn();

  beforeEach(() => {
    // mock api
    const apiSpySearchPa = jest.spyOn(apiRequests, 'searchPa');
    apiSpySearchPa.mockImplementation((params) => {
      const { lastEvaluatedId, limit, paName } = params;
      const res = search_pa(limit!, lastEvaluatedId!, paName);
      return Promise.resolve(res);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    result = undefined;
  });

  it('render', async () => {
    result = renderWithProviders(<PaSection onSelect={onSelect} selectedPa="" />);

    // Renders filter
    expect(result?.getByRole('textbox', { name: 'Nome PA' }));
    expect(result?.getByTestId('apply-filters'));
    expect(result?.getByTestId('clear-filters'));

    // Renders PaList with fetched elements
    await waitFor(() => {
      expect(result?.queryAllByTestId('paList-item')).toHaveLength(DEFAULT_LIMIT);
    });

    // Renders Pagination
    const pageSelector = result?.queryByTestId('pageSelector');
    expect(pageSelector).toBeInTheDocument();
  });

  it('change items per page', async () => {
    result = renderWithProviders(<PaSection onSelect={onSelect} selectedPa="" />);

    // Renders PaList with fetched elements
    await waitFor(() => {
      expect(result?.queryAllByTestId('paList-item')).toHaveLength(DEFAULT_LIMIT);
    });

    // Select 10 as new pagination limit
    const itemsPerPageSelectorBtn = result?.container.querySelector(
      '[data-testid="itemsPerPageSelector"] > button'
    );
    fireEvent.click(itemsPerPageSelectorBtn!);
    const itemsPerPageDropdown = await waitFor(() => screen.queryByRole('presentation'));
    expect(itemsPerPageDropdown).toBeInTheDocument();
    const newLimit = 10;
    const itemsPerPageItem = within(itemsPerPageDropdown!).queryByText(String(newLimit));
    fireEvent.click(itemsPerPageItem!);

    // Verify that component shows 10 elements
    await waitFor(() => {
      expect(result?.queryAllByTestId('paList-item')).toHaveLength(newLimit);
    });
  });

  it('change page', async () => {
    result = renderWithProviders(<PaSection onSelect={onSelect} selectedPa="" />);

    // Renders PaList with fetched elements
    await waitFor(() => {
      expect(result?.queryAllByTestId('paList-item')).toHaveLength(DEFAULT_LIMIT);
    });

    const pageSelector = await result?.findByTestId('pageSelector');
    const pageButtons = pageSelector?.querySelectorAll('button');
    // depends on mocked data. we should have always 10 items retrieved and total with others 12 elements
    fireEvent.click(pageButtons![2]);

    // Verify that component shows again 10 elements
    await waitFor(() => {
      expect(result?.queryAllByTestId('paList-item')).toHaveLength(DEFAULT_LIMIT);
    });
  });

  it('filter', async () => {
    result = renderWithProviders(<PaSection onSelect={onSelect} selectedPa="" />);

    // Renders PaList with fetched elements
    await waitFor(() => {
      expect(result?.queryAllByTestId('paList-item')).toHaveLength(DEFAULT_LIMIT);
    });

    const paNameInput = result?.getByRole('textbox', { name: 'Nome PA' });
    const firstPaName = mockedData.items[0].name;
    fireEvent.change(paNameInput!, { target: { value: firstPaName } });

    const filterButton = result?.getByTestId('apply-filters');
    fireEvent.click(filterButton!);

    await waitFor(() => {
      expect(result?.queryAllByTestId('paList-item')).toHaveLength(1);
    });
  });

  it('select PA', async () => {
    result = renderWithProviders(<PaSection onSelect={onSelect} selectedPa="" />);

    // Renders PaList with fetched elements
    await waitFor(() => {
      expect(result?.queryAllByTestId('paList-item')).toHaveLength(DEFAULT_LIMIT);
    });

    // Click on first item
    const firstItem = result?.queryAllByTestId('paList-item')[0];
    fireEvent.click(firstItem);

    expect(onSelect).toBeCalled();
  });
});

describe('PaSection tests with API error call', () => {
  let result: RenderResult | undefined;
  const onSelect = jest.fn();

  beforeEach(() => {
    // mock api
    const apiSpySearchPa = jest.spyOn(apiRequests, 'searchPa');
    apiSpySearchPa.mockImplementation(() => Promise.reject({}));
  });

  it('render', async () => {
    result = renderWithProviders(<PaSection onSelect={onSelect} selectedPa="" />);

    // Renders filter
    expect(result?.getByRole('textbox', { name: 'Nome PA' }));
    expect(result?.getByTestId('apply-filters'));
    expect(result?.getByTestId('clear-filters'));

    // Renders PaList without elements
    await waitFor(() => {
      expect(result?.getByText('Non sono stati trovati elementi.')).toBeInTheDocument();
    });

    // Renders Pagination
    const pageSelector = result?.queryByTestId('pageSelector');
    expect(pageSelector).toBeInTheDocument();
  });
});
