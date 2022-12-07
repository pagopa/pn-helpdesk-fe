import { fireEvent, RenderResult, waitFor, screen, within } from '@testing-library/react';
import PaList from '../PaList';
import { reducer } from '../../../__tests__/testReducer';
import {pa_list} from '../../../api/mock_agg_response';

describe("  PaList without selection", () => {
    let result: RenderResult | undefined;
    let mockedData = pa_list.items;
    beforeEach(() => {
        result = reducer(<PaList paList={mockedData} />);
    })
    it("renders", () => {
        const itemsPerPageSelector = result?.queryByTestId('itemsPerPageSelector');
        expect(itemsPerPageSelector).toBeInTheDocument();
        const listItems = result?.queryAllByTestId('paList-item');
        expect(listItems).toHaveLength(5); //palist pagination limit is 5
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
        const listItems = result?.queryAllByTestId('paList-item');
        expect(listItems).toHaveLength(mockedData.length);
    })
})

describe("PaList with selection", () => {
    let result: RenderResult | undefined;
    let mockedData = pa_list.items;
    let mockHandleSelection = jest.fn();
    beforeEach(() => {
        result = reducer(<PaList paList={mockedData} onSelection={mockHandleSelection}/>);
    })
    it("handle selection click", () => {
        const itemsPerPageSelector = result?.queryByTestId('itemsPerPageSelector');
        expect(itemsPerPageSelector).toBeInTheDocument();
        const listItems = result?.queryAllByTestId('paList-item');
        expect(listItems).toHaveLength(5); //default pagination limit is 5
        const deleteFirstItemButton = result?.queryByTestId(`paList-deleteButton-${mockedData[0].id}`);
        fireEvent.click(deleteFirstItemButton!);
        expect(mockHandleSelection).toBeCalledTimes(1);
        expect(mockHandleSelection).toBeCalledWith(mockedData[0], false);
    });
})