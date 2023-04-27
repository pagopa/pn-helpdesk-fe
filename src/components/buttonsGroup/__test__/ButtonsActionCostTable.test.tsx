import {fireEvent, RenderResult, screen, waitFor} from "@testing-library/react";

import {ButtonsActionCostTable} from "../ButtonsActionCostTable";
import {CostDTO} from "../../../api/paperChannel";
import {reducer} from "../../../mocks/mockReducer";
import * as hook from "../../../redux/hook";
import * as hookPaperChannel from "../../../hooks/usePaperChannel";
import * as hookPermission from "../../../hooks/useHasPermissions";

const cost:CostDTO = {
  cap: ["20110", "99999"],
  driverCode: "ABC-DFR-456",
  price: 1.32,
  priceAdditional: 3.23,
  productType: "AR",
  tenderCode: "LOPPP",
  uid: "ASDHHFJDLSL23",
  zone: undefined
}

const costInternational:CostDTO = {
  cap: undefined,
  driverCode: "ABC-DFR-456",
  price: 1.32,
  priceAdditional: 3.23,
  productType: "AR",
  tenderCode: "LOPPP",
  uid: "ASDHHFJDLSL23",
  zone: "ZONE_1"
}


describe("ButtonActionsCostTable Test", () => {
  let mockDispatchFn: jest.Mock
  let mockDeleteFn: jest.Mock

  const setHasPermission = (value: boolean = true) => {
    const spyUsePermission = jest.spyOn(hookPermission, "useHasPermissions");
    spyUsePermission.mockReturnValue(value)
  }

  beforeEach(async () => {
    const scenario = await doPrepareTestScenario()
    mockDispatchFn = scenario.mockDispatchFn
    mockDeleteFn = scenario.mockDeleteFn
    setHasPermission();
  })

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("Button rendered", async () => {
    reducer(<ButtonsActionCostTable value={cost}/>)
    const element = screen.getByTestId('menu-button-cost');
    const menuElement = screen.queryByTestId("action-menu-button-cost");

    expect(menuElement).toBeNull()
    expect(element).toBeInTheDocument();
  })

  it('When click on Button show Menu', async function () {
    reducer(<ButtonsActionCostTable value={cost}/>)
    const element = screen.getByTestId('menu-button-cost');
    fireEvent.click(element)
    await expect(screen.getByTestId("action-menu-button-cost")).toBeInTheDocument()
    await expect(screen.getByText("Modifica")).toBeInTheDocument()
    await expect(screen.getByText("Elimina")).toBeInTheDocument()

  })

  it("When click on edit menu item with National cost", async function () {
    reducer(<ButtonsActionCostTable value={cost} />)
    const element = screen.getByTestId('menu-button-cost')
    fireEvent.click(element)
    const menuItemEdit = screen.getByText("Modifica")
    await expect(menuItemEdit).toBeInTheDocument()
    fireEvent.click(menuItemEdit)
    await waitFor(async() => {
      await expect(mockDispatchFn).toBeCalledTimes(1);
      expect(mockDispatchFn).toBeCalledWith({
        payload: {
          uid: cost.uid,
          price: cost.price,
          priceAdditional: cost.priceAdditional,
          type: "NATIONAL",
          cap: cost.cap,
          zone: cost.zone,
          internationalProductType: undefined,
          nationalProductType: "AR"
        },
        type: "costSlice/setSelectedCost"
      }
    )
    });


  })

  it("When click on edit menu item with International", async function () {
    reducer(<ButtonsActionCostTable value={costInternational} />)
    const element = screen.getByTestId('menu-button-cost')
    fireEvent.click(element)
    const menuItemEdit = screen.getByText("Modifica")
    await expect(menuItemEdit).toBeInTheDocument()
    fireEvent.click(menuItemEdit)
    await waitFor(async() => {
      await expect(mockDispatchFn).toBeCalledTimes(1);
      expect(mockDispatchFn).toBeCalledWith({
          payload: {
            uid: costInternational.uid,
            price: costInternational.price,
            priceAdditional: costInternational.priceAdditional,
            type: "INTERNATIONAL",
            cap: undefined,
            zone: costInternational.zone,
            internationalProductType: "AR",
            nationalProductType: undefined
          },
          type: "costSlice/setSelectedCost"
        }
      )
    });


  })

  it("When click on delete menu item", async function () {
    reducer(<ButtonsActionCostTable value={cost} />)
    const element = screen.getByTestId('menu-button-cost')
    fireEvent.click(element)
    const menuItemEdit = screen.getByText("Elimina")
    await expect(menuItemEdit).toBeInTheDocument()
    fireEvent.click(menuItemEdit)
    await waitFor(async() => {
      await expect(mockDeleteFn).toBeCalledTimes(1);
      expect(mockDeleteFn).toBeCalledWith(cost.tenderCode,  cost.driverCode, cost.uid);
    })
  })

  it("When permission of write is false", async () => {
    setHasPermission(false);
    reducer(<ButtonsActionCostTable value={cost}/>)

    expect(screen.queryByTestId("menu-button-cost")).not.toBeInTheDocument()

  })

})

type TestScenario = {
  result?: RenderResult;
  mockDispatchFn: jest.Mock;
  mockDeleteFn: jest.Mock;
};

async function doPrepareTestScenario(): Promise<TestScenario> {
  const mockDispatchFn = jest.fn(() => ({
    then: () => Promise.resolve(),
  }));

  const mockDeleteFn = jest.fn();


  // mock dispatch
  const useDispatchSpy = jest.spyOn(hook, 'useAppDispatch');
  useDispatchSpy.mockReturnValue(mockDispatchFn as any);

  const mockUsePaperChannelHook = jest.spyOn(hookPaperChannel, 'usePaperChannel');
  mockUsePaperChannelHook.mockReturnValue({
    changeStatusTender(tenderCode: string, actualStatus: "CREATED" | "VALIDATED"): Promise<void> {
      return Promise.resolve(undefined);
    },
    deleteCost: mockDeleteFn,
    deleteDriver(tenderCode: string, driverCode: string): Promise<void> {
      return Promise.resolve(undefined);
    }, deleteTender(tenderCode: string): Promise<void> {
      return Promise.resolve(undefined);
    }
  })

  return { mockDispatchFn, mockDeleteFn };

}