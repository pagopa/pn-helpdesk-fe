import { reducer } from "../../../../mocks/mockReducer";
import {cleanup, fireEvent, screen, act} from "@testing-library/react";
import React from "react";
import { CostsForm } from "../CostsForm";
import { Cost } from "../../../../model";
import * as paperChannelApi from "../../../../api/paperChannelApi";
import { CapDto, CapResponseDto } from "../../../../api/paperChannel";
import {COST_TYPE} from "../fields";
import * as reactRedux from "../../../../redux/hook";

const selectedCost = {
  type: "NATIONAL",
  nationalProductType: "AR",
  internationalProductType: undefined,
  price: 123,
  priceAdditional: 456,
  cap: ["01234", "56789"],
  zone: undefined
} as Cost


const capResponse = {
   content: [{
     cap: "21034"
   }as CapDto]
} as CapResponseDto

describe("CostsForm Test", () => {
  const saveMockFn = jest.fn();
  const dispatchMockFn = jest.fn();
  const retrieveCapsMockFn = jest.fn();
  const retrieveCapsSpy = jest.spyOn(paperChannelApi, "retrieveCaps");

  beforeEach(() => {
    const dispatchSpy = jest.spyOn(reactRedux, "useAppDispatch");
    dispatchSpy.mockReturnValue(dispatchMockFn);
    retrieveCapsSpy.mockImplementation(retrieveCapsMockFn);
    retrieveCapsSpy.mockResolvedValue(capResponse);
  });
  afterEach(cleanup);


  it('whenNewCostThenRenderOnlySelectType', async function () {
    reducer(<CostsForm fsu={true}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)
    const inputs = screen.queryAllByRole("textbox");
    expect(inputs.length).toEqual(0)

    const [buttonSelect, buttonCancel, buttonSave] = screen.getAllByRole("button");
    expect(buttonSelect).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
    expect(buttonSave).toBeInTheDocument();

    fireEvent.mouseDown(buttonSelect);

    await act(async () => {
      const options = screen.getAllByRole("option");
      await expect(options.length).toEqual(2);
      await expect(options[0].textContent).toEqual(COST_TYPE[0].label);
      await expect(options[1].textContent).toEqual(COST_TYPE[1].label);
    })
  });

  it('whenChooseNationalCostTypeThenCapAutocompleteIsRendered', async function () {
    reducer(<CostsForm fsu={true}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)
    const select = screen.getByTestId("typeCost-select-custom")
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.change(select.children[1], {
      target: {
        value: COST_TYPE[0].key
      }
    })

    await act( async () => {
      const inputs = screen.getAllByRole("textbox");
      await expect(inputs.length).toEqual(2);
      expect(screen.getByTestId("caps-autocomplete")).toBeInTheDocument()
    })
  });


  it('whenHaveInitialCostNationalThenShowData', async function () {
    reducer(<CostsForm fsu={true}
                       cost={selectedCost}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)

    await act(async () => {
      const select = screen.getByTestId("typeCost-select-custom");
      // eslint-disable-next-line testing-library/no-node-access
      await expect(select.children[1]).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-node-access
      await expect(select.children[1].getAttribute("value")).toEqual(selectedCost.type)

      const selectProductType = screen.getByTestId("nationalProductType-select-custom");
      // eslint-disable-next-line testing-library/no-node-access
      await expect(selectProductType.children[1]).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-node-access
      await expect(selectProductType.children[1].getAttribute("value")).toEqual(selectedCost.nationalProductType)

      const [basePrice, additionalPrice] = screen.getAllByRole("textbox");
      await expect(basePrice.getAttribute("value")).toEqual(selectedCost.price+"")
      await expect(additionalPrice.getAttribute("value")).toEqual(selectedCost.priceAdditional+"")

    })



  });


})