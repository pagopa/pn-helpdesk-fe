import { TenderTable } from "../../../components/deliveriesDrivers/TenderTable";
import { reducer } from "../../../mocks/mockReducer";
import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import * as reactRedux from "../../../redux/hook";
import configureStore from "redux-mock-store";
import React from "react";
import { Page, Tender } from "../../../model";
import { TenderDTOStatusEnum } from "../../../api/paperChannel";


const tenderStore = {
  loading: false,
  allData: {
    page: 1,
    size: 10,
    total: 1,
    content: Array<Tender>(
      {code: "1", name: "BRT", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderDTOStatusEnum.Created} )
  } as Page<Tender>,
  selected: {},
  pagination: {
    page:1,
    tot:20,
    force: false
  }
};

describe(TenderTable, () => {

  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');

  const mockingStore  = (state:any) => {
    useSelectorMock.mockReturnValue(state);
    const mockStore = configureStore();
    let updatedStore = mockStore(state);
    mockingDispatch(updatedStore);
  }
  const mockingDispatch = (updatedStore:any) => {
    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    updatedStore.dispatch = mockDispatch;
  }

  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    mockingStore(tenderStore);
  });

  afterEach(() => {
    cleanup()
  });

  it("whenTendersAreRecovered", async () => {
    reducer( <TenderTable />);
    await act (async ()=> {
      const grid = await screen.findByRole('grid');
      expect(grid).toBeInTheDocument()
    })
  });

  it("whenChangedPageSize", async () => {
    reducer( <TenderTable />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()

    // const grid = await screen.findByRole('grid');
    const button =  screen.getByRole('button', {
      name: /Rows per page: 10/i
    })
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    // fireEvent.change(inputBox, { target: { value: 20 } })

  });
})