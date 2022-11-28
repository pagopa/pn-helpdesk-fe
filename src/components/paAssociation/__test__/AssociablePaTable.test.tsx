import { fireEvent, RenderResult, waitFor, screen, within, act } from '@testing-library/react';
import AssociablePaTable from '../AssociablePaTable';
import { reducer } from '../../../__tests__/testReducer';
import {pa_list} from '../../../api/mock_agg_response';
import { DEFAULT_PAGINATION_LIMIT } from '../../../hooks/usePagination';

describe(" AssociablePaTable without selection", () => {
    let result: RenderResult | undefined;
    let mockedData = pa_list.items;
    let mockHandleSelection = jest.fn();
    beforeEach(() => {
        result = reducer(<AssociablePaTable paList={mockedData} handleSelection={mockHandleSelection} />);
    })
    it("renders", () => {
        const itemsPerPageSelector = result?.queryByTestId('itemsPerPageSelector');
        expect(itemsPerPageSelector).toBeInTheDocument();
        const paTable = result?.queryByTestId('paTable');
        expect(paTable).toBeInTheDocument();
        const paTableHead = result?.queryByTestId('paTable-head');
        expect(paTableHead).toBeInTheDocument();
        const tableRows = result?.queryAllByTestId('paTable-row');
        expect(tableRows).toHaveLength(DEFAULT_PAGINATION_LIMIT); //default pagination limit is 5
    });
    
    it("change items per page", async () => {
        const itemsPerPageSelectorBtn = result?.container.querySelector(
            '[data-testid="itemsPerPageSelector"] > button'
        );
        fireEvent.click(itemsPerPageSelectorBtn!);
        const itemsPerPageDropdown = await waitFor(() => screen.queryByRole('presentation'));
        expect(itemsPerPageDropdown).toBeInTheDocument();
        const itemsPerPageItem = within(itemsPerPageDropdown!).queryByText('100');
        fireEvent.click(itemsPerPageItem!);
        const tableRows = result?.queryAllByTestId('paTable-row');
        expect(tableRows).toHaveLength(mockedData.length);
    })

    it("filters pa by name", async () => {
        const nameInput = screen.getByRole("textbox", {name: "Nome PA"});
        const filterButton = screen.getByRole("button", {name: "Filtra"});
        const clearFiltersButton = screen.getByRole("button", {name: "Rimuovi Filtri"});

        fireEvent.change(nameInput!, { target: { value: "abcd" } });
        fireEvent.click(filterButton);
        await waitFor(() => {
            expect(filterButton).not.toBeDisabled();
            expect(clearFiltersButton).not.toBeDisabled();
            const tableRows = result?.queryAllByTestId('paTable-row');
            expect(tableRows).toHaveLength(0);
        });
    })

    it("handle selection", async () => {
        const firstRowCheckboxMui = result?.getByTestId(`paTable-row-checkbox-${mockedData[0].id}`);
        const firstRowCheckboxElement = firstRowCheckboxMui?.querySelector('input[type="checkbox"]');

        fireEvent.click(firstRowCheckboxElement!);
        
        await waitFor(() => {
            expect(mockHandleSelection).toBeCalledTimes(1);
            expect(mockHandleSelection).toBeCalledWith(mockedData[0], true);
        })
       
    })
})
