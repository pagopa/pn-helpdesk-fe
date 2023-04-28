import { render, fireEvent, RenderResult } from '@testing-library/react';
import { search_pa } from '../../../api/mock_agg_response';
import PaListWithSelection from '../PaListWithSelection';

const DEFAULT_LIMIT = 5;
describe("PaListWithSelection tests", () => {
    let result: RenderResult | undefined;
    let mockedData = search_pa(DEFAULT_LIMIT, "", "").items;

    let onClick = jest.fn();

    it("render all items", () => {
        result = render(<PaListWithSelection items={mockedData} onClick={onClick} selectedPa={mockedData[0].id} />);
        const listItems = result?.queryAllByTestId('paList-item');
        //Default limit is 5
        expect(listItems).toHaveLength(DEFAULT_LIMIT);
    })

    it("select item", async () => {
        result = render(<PaListWithSelection items={mockedData} onClick={onClick} selectedPa={mockedData[0].id} />);

        const listItems = result?.queryAllByTestId('paList-item');
        expect(listItems).toHaveLength(mockedData.length);
        fireEvent.click(listItems![0]);
        expect(onClick).toBeCalled();
    })

    it("render selected item", () => {
        result = render(<PaListWithSelection items={mockedData} onClick={onClick} selectedPa={mockedData[0].id} />);
        const listItems = result?.queryAllByTestId('paList-item');
        expect(listItems).toHaveLength(mockedData.length);
        expect(listItems[0]).toHaveClass("Mui-selected");
    })
})