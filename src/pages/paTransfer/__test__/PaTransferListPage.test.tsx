import { waitFor, screen, within, fireEvent, act } from '@testing-library/react';
import PaTransferListPage from '../PaTransferListPage';
import { renderWithProviders } from '../../../mocks/mockReducer';
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import apiRequests from '../../../api/apiRequests';
import { aggregates_list, pa_list_associated, move_pa } from '../../../api/mock_agg_response';

describe('PaTransferListPage test', () => {
  // Override default timeout
  jest.setTimeout(10000);

  const mockApiGetAggregates = jest.fn();
  const mockApiGetAssociatedPaList = jest.fn();
  const mockApiMovePa = jest.fn();
  const apiSpyGetAggregates = jest.spyOn(apiRequests, 'getAggregates');
  const apiSpyGetAssociatedPaList = jest.spyOn(apiRequests, 'getAssociatedPaList');
  const apiSpyMovePa = jest.spyOn(apiRequests, 'movePa');

  beforeEach(() => {
    // mock api
    apiSpyGetAggregates.mockImplementation(mockApiGetAggregates);
    apiSpyGetAggregates.mockResolvedValue(aggregates_list);

    apiSpyGetAssociatedPaList.mockImplementation(mockApiGetAssociatedPaList);
    apiSpyGetAssociatedPaList
      .mockResolvedValueOnce(pa_list_associated)
      .mockResolvedValueOnce({
        ...pa_list_associated,
        items: pa_list_associated.items.slice(1),
      })
      .mockResolvedValueOnce({
        ...pa_list_associated,
        items: pa_list_associated.items.slice(1),
      })
      .mockResolvedValueOnce(pa_list_associated);

    apiSpyMovePa.mockImplementation(mockApiMovePa);
    apiSpyMovePa.mockResolvedValue(move_pa);
  });

  it('renders', async () => {
    renderWithProviders(
      <ConfirmationProvider>
        <PaTransferListPage email="test" />
      </ConfirmationProvider>
    );
    const agg1Autocomplete = screen.getByRole('combobox', { name: 'Aggregazione di partenza' });
    const agg2Autocomplete = screen.getByRole('combobox', { name: 'Aggregazione di destinazione' });
    await waitFor(() => {
      expect(agg1Autocomplete).toBeInTheDocument();
      expect(agg2Autocomplete).toBeInTheDocument();
    });

    const paListContainer = screen.getAllByRole('list');
    expect(paListContainer).toHaveLength(2);

    // Check that both lists are empty
    const paListFirstAggregate = paListContainer[0];
    expect(paListFirstAggregate).toBeEmptyDOMElement();
    const paListSecondAggregate = paListContainer[1];
    expect(paListSecondAggregate).toBeEmptyDOMElement();
  });

  it('select aggregates', async () => {
    renderWithProviders(
      <ConfirmationProvider>
        <PaTransferListPage email="test" />
      </ConfirmationProvider>
    );
    const agg1Autocomplete = screen.getByTestId('sender-agg-autocomplete');
    const input = within(agg1Autocomplete).getByRole('combobox');
    const agg2Autocomplete = screen.getByTestId('receiver-agg-autocomplete');
    const input2 = within(agg2Autocomplete).getByRole('combobox');

    await waitFor(() => expect(apiSpyGetAggregates).toBeCalledWith({ lastEvaluatedId: '' }));

    const paListContainer = screen.getAllByRole('list');
    const firstAggregateId = aggregates_list.items[0].id;
    const firstAggregateName = aggregates_list.items[0].name;
    const secondAggregateName = aggregates_list.items[1].name;
    const secondAggregateId = aggregates_list.items[1].id;

    // Select first aggregate option in first autocomplete field

    fireEvent.focus(agg1Autocomplete);
    fireEvent.change(input, { target: { value: firstAggregateName } });
    fireEvent.keyDown(agg1Autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(agg1Autocomplete, { key: 'Enter' });
    await waitFor(() => expect(input).toHaveValue(firstAggregateName));
    // When first aggregate is selected the second aggregate is enabled
    expect(input2).not.toBeDisabled();
    // Check if first list is filled with the api response
    await waitFor(() => expect(apiSpyGetAssociatedPaList).toBeCalled());
    const paListFirstAggregate = await within(paListContainer[0]).findAllByRole('listitem');
    expect(paListFirstAggregate).toHaveLength(pa_list_associated.items.length);

    // Select second aggregate option in second autocomplete field
    fireEvent.focus(agg2Autocomplete);
    fireEvent.change(input2, { target: { value: secondAggregateName } });
    fireEvent.keyDown(agg2Autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(agg2Autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(agg2Autocomplete, { key: 'Enter' });
    await waitFor(() => expect(input2).toHaveValue(secondAggregateName));
    await waitFor(() => expect(apiSpyGetAssociatedPaList).toBeCalled());
    const paListSecondAggregate = await waitFor(() =>
      within(paListContainer[1]).getAllByRole('listitem')
    );
    expect(paListSecondAggregate).toHaveLength(pa_list_associated.items.length - 1);

    // Check first checkbox in pa list
    const firstCheckBoxPa = within(paListFirstAggregate[0]).getByRole('checkbox');
    fireEvent.click(firstCheckBoxPa);

    // Click on Transfer button
    const transferButton = screen.getByRole('button', { name: 'Trasferisci' });
    expect(transferButton).not.toBeDisabled();
    fireEvent.click(transferButton);

    await act(async () => {
      expect(apiSpyMovePa).toBeCalled();
      expect(apiSpyGetAssociatedPaList).toHaveBeenCalledWith(firstAggregateId);
      expect(apiSpyGetAssociatedPaList).toHaveBeenCalledWith(secondAggregateId);
    });

    // Check the lists after move api has been called.
    const updatedPaListContainer = screen.getAllByRole('list');
    const updatedPaListFirstAggregate = within(updatedPaListContainer[0]).getAllByRole('listitem');
    expect(updatedPaListFirstAggregate).toHaveLength(pa_list_associated.items.length - 1);
    const updatedPaListSecondAggregate = within(updatedPaListContainer[1]).getAllByRole('listitem');
    expect(updatedPaListSecondAggregate).toHaveLength(pa_list_associated.items.length);

    expect(screen.getByRole('button', { name: 'Trasferisci' })).toBeDisabled();
  });
});
