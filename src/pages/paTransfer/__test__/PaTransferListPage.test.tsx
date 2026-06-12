import { waitFor, screen, within, fireEvent } from '@testing-library/react';
import PaTransferListPage from '../PaTransferListPage';
import { renderWithProviders } from '../../../mocks/mockReducer';
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import apiRequests from '../../../api/apiRequests';
import { aggregates_list, pa_list_associated, move_pa } from '../../../api/mock_agg_response';

describe('PaTransferListPage test', () => {
  jest.setTimeout(10000);

  const apiSpyGetAggregates = jest.spyOn(apiRequests, 'getAggregates');
  const apiSpyGetAssociatedPaList = jest.spyOn(apiRequests, 'getAssociatedPaList');
  const apiSpyMovePa = jest.spyOn(apiRequests, 'movePa');

  let isTransferred = false;

  beforeEach(() => {
    isTransferred = false;
    jest.clearAllMocks();

    apiSpyGetAggregates.mockResolvedValue(aggregates_list);
    apiSpyMovePa.mockResolvedValue(move_pa);

    const firstAggregateId = aggregates_list.items[0].id;
    const secondAggregateId = aggregates_list.items[1].id;

    apiSpyGetAssociatedPaList.mockImplementation((idAggregation) => {
      if (idAggregation === firstAggregateId) {
        if (isTransferred) {
          return Promise.resolve({
            ...pa_list_associated,
            items: pa_list_associated.items.slice(1),
          });
        }
        return Promise.resolve(pa_list_associated);
      }

      if (idAggregation === secondAggregateId) {
        if (isTransferred) {
          return Promise.resolve(pa_list_associated);
        }
        return Promise.resolve({
          ...pa_list_associated,
          items: pa_list_associated.items.slice(1),
        });
      }

      return Promise.resolve({ items: [] });
    });
  });

  it('renders', async () => {
    renderWithProviders(
      <ConfirmationProvider>
        <PaTransferListPage email="test" />
      </ConfirmationProvider>
    );
    const agg1Autocomplete = screen.getByLabelText('Aggregazione di partenza');
    const agg2Autocomplete = screen.getByLabelText('Aggregazione di destinazione');
    await waitFor(() => {
      expect(agg1Autocomplete).toBeInTheDocument();
      expect(agg2Autocomplete).toBeInTheDocument();
    });

    const paListContainer = screen.getAllByRole('list');
    expect(paListContainer).toHaveLength(2);

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

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: firstAggregateName } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(input).toHaveValue(firstAggregateName));
    expect(input2).not.toBeDisabled();

    await waitFor(() => expect(apiSpyGetAssociatedPaList).toBeCalledWith(firstAggregateId));
    const paListFirstAggregate = await within(paListContainer[0]).findAllByRole('listitem');
    expect(paListFirstAggregate).toHaveLength(pa_list_associated.items.length);

    fireEvent.focus(input2);
    fireEvent.change(input2, { target: { value: secondAggregateName } });
    fireEvent.keyDown(input2, { key: 'ArrowDown' });
    fireEvent.keyDown(input2, { key: 'Enter' });

    await waitFor(() => expect(input2).toHaveValue(secondAggregateName));
    await waitFor(() => expect(apiSpyGetAssociatedPaList).toBeCalledWith(secondAggregateId));

    const paListSecondAggregate = await waitFor(() =>
      within(paListContainer[1]).getAllByRole('listitem')
    );
    expect(paListSecondAggregate).toHaveLength(pa_list_associated.items.length - 1);

    const firstCheckBoxPa = within(paListFirstAggregate[0]).getByRole('checkbox');
    fireEvent.click(firstCheckBoxPa);

    isTransferred = true;

    const transferButton = screen.getByRole('button', { name: 'Trasferisci' });
    expect(transferButton).not.toBeDisabled();
    fireEvent.click(transferButton);

    await waitFor(() => {
      expect(apiSpyMovePa).toBeCalled();
      expect(apiSpyGetAssociatedPaList).toHaveBeenCalledWith(firstAggregateId);
      expect(apiSpyGetAssociatedPaList).toHaveBeenCalledWith(secondAggregateId);
    });

    const updatedPaListContainer = screen.getAllByRole('list');

    await waitFor(() => {
      const updatedPaListFirstAggregate = within(updatedPaListContainer[0]).getAllByRole('listitem');
      expect(updatedPaListFirstAggregate).toHaveLength(pa_list_associated.items.length - 1);
    });

    const updatedPaListSecondAggregate = within(updatedPaListContainer[1]).getAllByRole('listitem');
    expect(updatedPaListSecondAggregate).toHaveLength(pa_list_associated.items.length);

    expect(screen.getByRole('button', { name: 'Trasferisci' })).toBeDisabled();
  });
});