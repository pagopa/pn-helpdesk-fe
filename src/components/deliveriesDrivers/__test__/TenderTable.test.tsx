import { TenderTable } from "../TenderTable";
import { reducer } from "../../../mocks/mockReducer";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import * as reactRedux from "../../../redux/hook";
import React from "react";
import { Page, Tender, TenderStatusEnum } from "../../../model";


const tenderStore = {
  loading: false,
  allData: {
    page: 1,
    size: 10,
    total: 1,
    content: Array<Tender>(
      {code: "1", name: "BRT", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderStatusEnum.CREATED} )
  } as Page<Tender>,
  selected: {},
  pagination: {
    page:1,
    tot:10,
    force: false
  }
};

describe("TenderTableTest", () => {
  const useSelectorSpy = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, "useAppDispatch");
  const mockDispatch = jest.fn();

  const mockingStore  = (state:any) => {
    const reduxStore = {
      tender: state
    }
    useSelectorSpy.mockImplementation((s:any) => s(reduxStore))
  }

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockDispatch)
    mockingStore(tenderStore);
  });

  afterEach(() => {
    cleanup()
    useSelectorSpy.mockClear()
    useDispatchSpy.mockClear()
  });

  it("whenTendersAreRecovered", async () => {
    reducer( <TenderTable />);

    const grid = await screen.findByRole('grid');
    expect(grid).toBeInTheDocument()
  });

  it("whenChangedPageSize", async () => {

    mockingStore({...tenderStore, allData: {}})
    reducer( <TenderTable />);
    const buttons =  screen.getAllByRole('button')

    fireEvent.mouseDown(buttons[0]);

    const role = screen.queryByRole("listbox");
    expect(role).toBeInTheDocument();
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

  });
})