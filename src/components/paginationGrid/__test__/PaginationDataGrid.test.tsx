import {cleanup, screen, within} from "@testing-library/react";
import {reducer} from "../../../mocks/mockReducer";
import React from "react";
import {PaginationDataGrid} from "../PaginationDataGrid";
import {ModelType} from "../index";
import {TenderDTOStatusEnum} from "../../../api/paperChannel";
import {Page, Tender} from "../../../model";

describe(PaginationDataGrid, () => {

  const setOnClickItemMock = jest.fn();
  const setOnPageChangeMock = jest.fn();
  const setOnPageSizeChangeMock = jest.fn();
  const tender = {
    loading: false,
    allData: {} as Page<Tender>,
    selected: {} as Tender
  };

  afterEach(cleanup);
  beforeEach(() => {
    reducer(<PaginationDataGrid <Tender> data={tender.allData}
                                         type={ModelType.TENDER}
                                         loading={tender.loading}
                                         rowId={row => row.code}
                                         onClickItem={setOnClickItemMock}
                                         onPageChange={setOnPageChangeMock}
                                         onPageSizeChange={setOnPageSizeChangeMock}/>);
  });

  it("verify PaginationDataGrid is rendered", async() => {
    const grid = await screen.findByRole('grid');
    expect(grid).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug(grid)
  })

  it("verify columns size", async () => {
    const grid = await screen.findByRole('grid');
    const columnHeader = within(grid).getAllByRole('columnheader');
    expect(columnHeader).toHaveLength(5);
  })

  it("verify columns", async () => {
    const grid = await screen.findByRole('grid');
    expect(within(grid).getByText('Identificativo')).toBeTruthy();
    expect(within(grid).getByText('Data inizio')).toBeTruthy();
    expect(within(grid).getByText('Data fine')).toBeTruthy();
    expect(within(grid).getByText('Stato')).toBeTruthy();
    expect(within(grid).getByText('No rows')).toBeTruthy();
  })

  it("verify PaginationDataGrid is not Empty", async() => {
    tender.allData = {
      page: 1,
      size: 10,
      total: 3,
      content: Array<Tender>(
        {code: "1", name: "BRT", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderDTOStatusEnum.Created},
        {code: "2", name: "GLS", startDate: "01-31-2022 00:00", endDate: "01-31-2023 00:00", status: TenderDTOStatusEnum.InProgress},
        {code: "3", name: "UPS", startDate: "01-31-2023 00:00", endDate: "01-31-2024 00:00", status: TenderDTOStatusEnum.Validated})
    }

    reducer(<PaginationDataGrid<Tender> data={tender.allData}
                                           type={ModelType.TENDER}
                                           loading={tender.loading}
                                           rowId={row => row.code}
                                           onClickItem={setOnClickItemMock}
                                           onPageChange={setOnPageChangeMock}
                                           onPageSizeChange={setOnPageSizeChangeMock}/>);

    expect(await screen.findByRole('cell', { name: 'BRT' })).toBeTruthy();
    expect(await screen.findByRole('cell', { name: 'GLS' })).toBeTruthy()
    expect(await screen.findByRole('cell', { name: 'UPS' })).toBeTruthy();
    expect(await screen.findByRole('cell', { name: 'UPS' })).toBeTruthy();
    expect(await screen.findByRole('cell', { name: 'UPS' })).toBeTruthy();
    expect(await screen.findByRole('cell', { name: 'UPS' })).toBeTruthy();
  })
})