import { fireEvent, screen, within } from '@testing-library/react';
import { reducer } from '../../../mocks/mockReducer';
import Table from '../table';
import { Column, Item, Sort } from '../tableTypes';

describe('Table tests', () => {
  const handleColumnClick = jest.fn();
  const handleSort = jest.fn();
  type MockColumn = 'id' | 'name';
  const columns: Array<Column<MockColumn>> = [
    {
      id: 'id',
      label: 'Id column',
      width: '50%',
      sortable: true,
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
    },
  ];
  const rows: Array<Item> = [
    { id: 'row-1', name: 'Row 1-1' },
    { id: 'row-2', name: 'Row 2-1' },
    { id: 'row-3', name: 'Row 3-1' },
  ];

  const sort: Sort<'Id column'> = {
    orderBy: 'Id column',
    order: 'asc',
  };

  beforeEach(() => {
    reducer(<Table columns={columns} rows={rows} sort={sort} onChangeSorting={handleSort} />);
  });

  it('renders table', () => {
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-label', 'Tabella di item');

    // check tablehead rows and columns
    const tableHead = table.querySelector('thead');
    const tableColumns = tableHead!.querySelectorAll('th');
    expect(tableColumns).toHaveLength(columns.length);
    /* tableColumns.forEach((column, i) => {
            expect(column).toHaveTextContent(columns[i].label);
        }); */

    // check tablebody rows and columns
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

  it('sorts a column', () => {
    const table = screen.getByRole('table');
    const tableHead = table.querySelector('thead');
    const firstColumn = tableHead!.querySelector('th');
    const sortButton = within(firstColumn!).getByRole('button');
    expect(sortButton).toBeInTheDocument();
    fireEvent.click(sortButton);
    expect(handleSort).toBeCalledTimes(1);
    expect(handleSort).toBeCalledWith({ order: 'asc', orderBy: 'id' });
  });
});
