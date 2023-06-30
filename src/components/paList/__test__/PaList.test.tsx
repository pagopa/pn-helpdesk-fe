import { render } from '@testing-library/react';
import PaList from '../PaList';
import { pa_list } from '../../../api/mock_agg_response';
import { Pa } from '../../../api/apiRequestTypes';
import { ListItem, ListItemText } from '@mui/material';

describe("PaList without itemComponent", () => {
    let mockedData = pa_list.items;

    it("renders with emptyMessage", () => {
        let result = render(<PaList items={[]} showEmptyMessage />);
        expect(result.getByText("Non sono stati trovati elementi."))
    })

    it("renders all items", () => {
        let result = render(<PaList items={mockedData} showEmptyMessage />);
        const listItems = result?.queryAllByTestId('paList-item');
        expect(listItems).toHaveLength(mockedData.length);
    })
})

describe("PaList with itemComponent", () => {
    let mockedData = pa_list.items;

    let itemComponent = (pa: Pa) => <ListItem data-testid="paList-item" key={pa.id}><ListItemText primary={pa.name} /></ListItem>

    it("renders all elements", () => {
        let result = render(<PaList items={mockedData} itemComponent={itemComponent} showEmptyMessage />);
        const listItems = result?.queryAllByTestId('paList-item');
        expect(listItems).toHaveLength(mockedData.length);
    })
})