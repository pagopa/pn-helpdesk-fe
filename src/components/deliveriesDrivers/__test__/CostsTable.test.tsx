import { CostsTable } from "../CostsTable";
import configureStore from "redux-mock-store";
import * as reactRedux from "../../../redux/hook";
import { cleanup, screen } from "@testing-library/react";
import React from "react";
import { reducer } from "../../../mocks/mockReducer";
import { CostDTO, InternationalZoneEnum, ProductTypeEnumDto } from "../../../api/paperChannel";


const costsTable = {
  costs: {
    page: 1,
    size: 10,
    total: 1,
    content: Array<CostDTO>({ uid: "0", tenderCode: "12345", driverCode: "54321", price: 123, priceAdditional: 456, productType: ProductTypeEnumDto.Ar, cap: ["01234", "56789"], zone: InternationalZoneEnum._1 },
      { uid: "1", tenderCode: "67890", driverCode: "09876", price: 321, priceAdditional: 654, productType: ProductTypeEnumDto.Ar, cap: ["00100", "09512"], zone: InternationalZoneEnum._2 })
  },
  selectedCost: {
    type: "NATIONAL", nationalProductType: "AR", internationalProductType: "AR", price: 123, priceAdditional: 456, cap: ["01234", "56789"], zone: "ZONE_1"
  },
  pagination: {
    tenderCode: "1",
    page: 1,
    tot: 10
  },
  error: false,
};
describe("Costs Table Test", () => {

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
    mockingStore(costsTable);
  });

  afterEach(() => {
    cleanup()
  });

  it("whenCostAreRecovered", async () => {
    reducer(<CostsTable tenderCode={"12345"} driverCode={"67890"} withActions={true}/>)
    const grid = await screen.findByRole('grid');
    expect(grid.getAttribute("aria-rowcount")).toEqual("3");
  })

  it("whenCostAreRecoveredWithNoActions", async () => {
    reducer(<CostsTable tenderCode={"12345"} driverCode={"67890"} withActions={false}/>)

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  })

  it("whenCostAreNotRecovered", async () => {
    const local = {...costsTable, costs: undefined}
    delete local.costs
    // @ts-ignore
    delete local.withActions;
    mockingStore(local);

    reducer(<CostsTable tenderCode={"12345"} driverCode={"67890"} withActions={true}/>)
    const grid = await screen.findByRole('grid');
    expect(grid.getAttribute("aria-rowcount")).toEqual("1");
  })

  it("whenCostAreRecoveredWithChangedPageSize", async () => {
    const local = {...costsTable,   pagination: {
        tenderCode: "1",
        page: 1,
        tot: 20
      }}
    mockingStore(local);
    reducer(<CostsTable tenderCode={"12345"} driverCode={"67890"} withActions={true}/>)
  })
})