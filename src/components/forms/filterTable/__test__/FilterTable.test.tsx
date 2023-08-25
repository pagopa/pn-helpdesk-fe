import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reducer } from '../../../../mocks/mockReducer';
import { FieldsProperties } from '../../../formFields/FormFields';
import FilterTable from '../FilterTable';

describe('FilterTable tests', () => {
  const mockSubmitFn = jest.fn();
  const fields = [FieldsProperties['Nome aggregazione']];

  beforeEach(async () => {
    reducer(<FilterTable fields={fields} onFiltersSubmit={mockSubmitFn} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const getButtons = () => {
    const filterButton = screen.getByRole('button', { name: 'Filtra' });
    const clearFiltersButton = screen.getByTestId('clear-filters');

    return { filterButton, clearFiltersButton };
  };

  it('renders', () => {
    const input = screen.getByRole('textbox', { name: fields[0].label });
    expect(input).toBeInTheDocument();
    const { filterButton, clearFiltersButton } = getButtons();

    expect(filterButton).not.toBeDisabled();
    expect(clearFiltersButton).toBeDisabled();
  });

  it('apply filters', async () => {
    const input = screen.getByRole('textbox', { name: fields[0].label }) as HTMLInputElement;
    const { filterButton } = getButtons();

    fireEvent.change(input!, { target: { value: 'abcd' } });
    await waitFor(() => expect(input.value).toBe('abcd'));
    fireEvent.click(filterButton);
    await waitFor(() => expect(mockSubmitFn).toBeCalledWith({ [fields[0].name]: 'abcd' }));
  });

  // it("clear filters", async () => {
  //     const input = screen.getByRole("textbox", {name: fields[0].label}) as HTMLInputElement;
  //     const { clearFiltersButton } = getButtons();
  //     expect(clearFiltersButton).toBeDisabled();

  //     fireEvent.change(input!, { target: { value: "abcd" } });
  //     await waitFor(() => expect(clearFiltersButton).not.toBeDisabled());

  //     fireEvent.click(clearFiltersButton);
  //     await waitFor(() => expect(mockSubmitFn).toBeCalledWith({[fields[0].name]: ""}));
  // })
});
