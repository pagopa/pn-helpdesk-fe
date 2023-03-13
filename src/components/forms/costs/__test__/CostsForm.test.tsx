import { reducer } from "../../../../mocks/mockReducer";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import React from "react";
import { CostsForm } from "../CostsForm";
import { Cost } from "../../../../model";
import * as paperChannelApi from "../../../../api/paperChannelApi";
import { retrieveCaps } from "../../../../api/paperChannelApi";
import { CapDto, CapResponseDto, TenderDTO } from "../../../../api/paperChannel";
import { fieldsCosts } from "../fields";
import * as reactRedux from "../../../../redux/hook";


const CostsFormWithoutCost = () => {
  return <CostsForm tenderCode={"12345"} driverCode={"67890"}
                          fsu={true} cost={undefined}
                          onSave={jest.fn()}
                          onCancel={jest.fn()}/>;
}

const selectedCost = () => {
  return {
    type: "INTERNATIONAL", nationalProductType: "AR", internationalProductType: "AR", price: 123, priceAdditional: 456, cap: ["01234", "56789"], zone: undefined
  } as Cost
}
const CostsFormWithCost = () => {
  return <CostsForm tenderCode={"12345"} driverCode={"67890"}
             fsu={true} cost={selectedCost()}
             onSave={jest.fn()}
             onCancel={jest.fn()}/>;
}

const capResponse = {
   content: Array<CapDto>()
} as CapResponseDto

describe("CostsForm Test", () => {

  const dispatchMockFn = jest.fn();
  const retrieveCapsMockFn = jest.fn((inputText:string) => Promise.resolve(capResponse));
  const retrieveCapsSpy = jest.spyOn(paperChannelApi, "retrieveCaps");

  beforeEach(() => {
    const dispatchSpy = jest.spyOn(reactRedux, "useAppDispatch");
    dispatchSpy.mockReturnValue(dispatchMockFn);
    retrieveCapsSpy.mockImplementation(retrieveCapsMockFn);
  });
  afterEach(cleanup);


  it("whenCostsFormWithoutCost", () => {
    reducer(<CostsFormWithoutCost/>);
    const textfields = screen.getAllByRole("textbox");
    for(let textfield of textfields) {
      expect(textfield.getAttribute("value")).toEqual("");
    }
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  })

  it("whenCostsFormWithCost", () => {
    reducer(<CostsFormWithCost/>);

    const textfields = screen.getAllByRole("textbox");
    for(let textfield of textfields) {
      expect(textfield.getAttribute("name")).not.toEqual("");
    }

    const buttons = screen.getAllByRole("button");
    for(let button of buttons) {
      expect(button.getAttribute("value")).toEqual(fieldsCosts.type.label);
    }

    // const capButton = within(buttons).getByText(fieldsCosts.type.label);
    // fireEvent.click(capButton)


    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  })

})