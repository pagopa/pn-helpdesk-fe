import {cleanup, screen, within} from "@testing-library/react";
import {reducer} from "../../../mocks/mockReducer";
import React from "react";
import {PaginationDataGrid} from "../PaginationDataGrid";
import {ModelType} from "../index";
import {TenderDTO, TenderDTOStatusEnum} from "../../../generated";
import {Page} from "../../../model";

describe(PaginationDataGrid, () => {

  const setOnClickItemMock = jest.fn();
  const setOnPageChangeMock = jest.fn();
  const setOnPageSizeChangeMock = jest.fn();
  const tender = {
    loading: false,
    allData: {} as Page<TenderDTO>,
    selected: {} as TenderDTO
  };

  afterEach(cleanup);
  beforeEach(() => {
    reducer(<PaginationDataGrid<TenderDTO> data={tender.allData}
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

  it("verify columns size", async() => {
    const grid = await screen.findByRole('grid');
    const columnHeader = within(grid).getAllByRole('columnheader');
    expect(columnHeader).toHaveLength(4);
  })

  it("verify column Identificativo", async() => {
    const grid = await screen.findByRole('grid');
    expect(within(grid).getByText('Identificativo')).toBeTruthy();
  })

  it("verify column Data inizio", async() => {
    const grid = await screen.findByRole('grid');
    expect(within(grid).getByText('Data inizio')).toBeTruthy();
  })

  it("verify column Data fine", async() => {
    const grid = await screen.findByRole('grid');
    expect(within(grid).getByText('Data fine')).toBeTruthy();
  })

  it("verify column Stato", async() => {
    const grid = await screen.findByRole('grid');
    expect(within(grid).getByText('Stato')).toBeTruthy();
  })

  it("verify PaginationDataGrid is empty", async() => {
    const grid = await screen.findByRole('grid');
    expect(within(grid).getByText('No rows')).toBeTruthy();
  })

  it("verify PaginationDataGrid is not Empty", async() => {
    tender.allData = {
      page: 1,
      size: 10,
      total: 3,
      content: Array<TenderDTO>(
        {code: "1", name: "BRT", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderDTOStatusEnum.Created},
        {code: "2", name: "GLS", startDate: "01-31-2022 00:00", endDate: "01-31-2023 00:00", status: TenderDTOStatusEnum.Created},
        {code: "3", name: "UPS", startDate: "01-31-2023 00:00", endDate: "01-31-2024 00:00", status: TenderDTOStatusEnum.Created})
    }

    reducer(<PaginationDataGrid<TenderDTO> data={tender.allData}
                                           type={ModelType.TENDER}
                                           loading={tender.loading}
                                           rowId={row => row.code}
                                           onClickItem={setOnClickItemMock}
                                           onPageChange={setOnPageChangeMock}
                                           onPageSizeChange={setOnPageSizeChangeMock}/>);

    expect(await screen.findByRole('cell', { name: 'BRT' })).toBeTruthy();
    expect(await screen.findByRole('cell', { name: 'GLS' })).toBeTruthy()
    expect(await screen.findByRole('cell', { name: 'UPS' })).toBeTruthy();
  })
})