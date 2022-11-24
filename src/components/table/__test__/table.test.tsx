import Table from '../table';
import { reducer } from '../../../__tests__/testReducer';
import { fireEvent, RenderResult, waitFor, screen, within, act } from '@testing-library/react';
import { Column, Item } from '../../../types';

describe("Table tests", () => {
    let result : RenderResult | undefined;
    const handleColumnClick = jest.fn();
    type MockColumn = 'id' | 'name';
    const columns: Array<Column<MockColumn>> = [
        {
            id: 'id',
            label: 'Id column',
            width: '50%',
            sortable: false,
            getCellLabel(value: string) {
              return value;
            },
            onClick(row: Item, col: Column<MockColumn>) {
              handleColumnClick(row, col);
            },
        },
        {
            id: 'name',
            label: 'Name column',
            width: '50%',
            getCellLabel(value: string) {
                return value;
            },
            onClick(row: Item, col: Column<MockColumn>) {
                handleColumnClick(row, col);
            },
        }
    ];
    const rows: Array<Item> = [
        { id: 'row-1', 'name': 'Row 1-1' },
        { id: 'row-2', 'name': 'Row 2-1' },
        { id: 'row-3', 'name': 'Row 3-1' }
    ];

    beforeEach(() => {
        result = reducer(<Table columns={columns} rows={rows} />);
    })

    it("renders table", () => {
        const table = screen.getByRole('table');
        expect(table).toHaveAttribute('aria-label', 'Tabella di item');

        //check tablehead rows and columns
        const tableHead = table.querySelector('thead');
        const tableColumns = tableHead!.querySelectorAll('th');
        expect(tableColumns).toHaveLength(columns.length);
        tableColumns.forEach((column, i) => {
            expect(column).toHaveTextContent(columns[i].label);
        });

        //check tablebody rows and columns
        const tableBody = table.querySelector('tbody');
        const tableRows = tableBody!.querySelectorAll('tr');
        expect(tableRows).toHaveLength(rows.length);
        tableRows.forEach((row, i) => {
            const tableColumns = row.querySelectorAll('td');
            expect(tableColumns).toHaveLength(columns.length);
            tableColumns.forEach((column, j) => {
                expect(column).toHaveTextContent(rows[i][columns[j].id].toString());
            });
        });
    });

    it('click on a column', () => {

        const table = screen.getByRole('table');
        const tableBody = table.querySelector('tbody');
        const firstRow = tableBody!.querySelector('tr');
        const tableColumns = firstRow!.querySelectorAll('td');
        fireEvent.click(tableColumns[0]);
        expect(handleColumnClick).toBeCalledTimes(1);
        expect(handleColumnClick).toBeCalledWith(rows[0], columns[0]);
    });
});