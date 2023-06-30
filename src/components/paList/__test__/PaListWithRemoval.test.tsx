import { render, fireEvent, RenderResult } from '@testing-library/react';
import { search_pa } from '../../../api/mock_agg_response';
import PaListWithRemoval from '../PaListWithRemoval';

const DEFAULT_LIMIT = 5;
describe("PaListWithRemoval tests", () => {
    let result: RenderResult | undefined;
    let mockedData = search_pa(DEFAULT_LIMIT, "", "").items;

    let onClick = jest.fn();

    beforeEach(() => {
        result = render(<PaListWithRemoval items={mockedData} onClick={onClick}  />);
    })

    it("render all items", () => {
        const listItems = result?.queryAllByTestId('paList-item');
        //Default limit is 5
        expect(listItems).toHaveLength(DEFAULT_LIMIT);
    })

    it("click on remove item", async () => {
        const itemsPerPageSelector = result?.queryByTestId('itemsPerPageSelector');
        expect(itemsPerPageSelector).toBeInTheDocument();
        const listItems = result?.queryAllByTestId('paList-item');
        expect(listItems).toHaveLength(5); //default pagination limit is 5
        const deleteFirstItemButton = result?.queryByTestId(`paList-deleteButton-${mockedData[0].id}`);
        fireEvent.click(deleteFirstItemButton!);
        expect(onClick).toBeCalledTimes(1);
    })

})