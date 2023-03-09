import { TenderTable } from "../TenderTable";
import { reducer } from "../../../mocks/mockReducer";
import {act, cleanup, fireEvent, screen, waitFor} from "@testing-library/react";
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
    tot:10,
    force: false
  }
};

describe(TenderTable, () => {

  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  const mockDispatch = jest.fn();

  const mockingStore  = (state:any) => {
    useSelectorMock.mockReturnValue(state);
    const mockStore = configureStore();
    let updatedStore = mockStore(state);
    mockingDispatch(updatedStore);
  }
  const mockingDispatch = (updatedStore:any) => {

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

    mockingStore({...tenderStore, allData: {}})
    reducer( <TenderTable />);
    // eslint-disable-next-line testing-library/no-debugging-utils

    //expect(screen.getByText("No rows")).toBeInTheDocument()

    // const grid = await screen.findByRole('grid');
    const buttons =  screen.getAllByRole('button')

    fireEvent.mouseDown(buttons[0]);



    await act( async ()=> {
      const role = screen.queryByRole("listbox");
      expect(role).toBeInTheDocument();
      screen.debug(role);
      const options = screen.getAllByRole("option");
      expect(options[1]).toBeInTheDocument();
      expect(options[1].textContent).toEqual("25");
      options[1].click()
      await waitFor(async ()=> {
        await expect(mockDispatch).toBeCalledTimes(2)
        expect(mockDispatch).toBeCalledWith({
          payload: {
            ...tenderStore.pagination,
            page: 1,
            tot: 25
          },
          type: "tenderSlice/changeFilterTenders"
        })
      })
    })



    // fireEvent.change(inputBox, { target: { value: 20 } })

  });
})