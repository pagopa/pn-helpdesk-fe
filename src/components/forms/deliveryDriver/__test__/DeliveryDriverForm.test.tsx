import { act, cleanup, screen, within } from "@testing-library/react";
import { reducer } from "../../../../mocks/mockReducer";
import userEvent from "@testing-library/user-event";
import React from "react";
import DeliveryDriverFormBox from "../DeliveryDriverForm";
import { fieldsDriver } from "../fields";
import { errorMessages } from "../../../../helpers/messagesConstants";
import * as paperChannelApi from "../../../../api/paperChannelApi";

const mockDeliveryDriver = {
  tenderCode: "",
  denomination: "",
  businessName: "",
  registeredOffice: "",
  pec: "",
  fiscalCode: "",
  taxId: "",
  phoneNumber: "",
  uniqueCode: "",
  fsu: true
}

const mockCreateDDriver = jest.fn();

describe("DeliveryDriverFormBox", () => {

  afterEach(cleanup);
  beforeEach(() => {
    reducer(<DeliveryDriverFormBox key={"FSU"} fsu={true} tenderCode={"12345"} initialValue={mockDeliveryDriver} />);
  });

  it("verify DeliveryDriverForm is rendered", async () => {
    const form = await screen.findByTestId("deliverydriverform");
    expect(form).toBeInTheDocument();
    expect(within(form).getByText('Nuovo FSU')).toBeTruthy();
  });

  it("tries to submit empty fields and shows error",  async () => {
    const user = userEvent.setup()
    const apiSpyCreateDeliveryDriver = jest.spyOn(paperChannelApi, 'createDeliveryDriver');
    apiSpyCreateDeliveryDriver.mockImplementation(mockCreateDDriver);
    const submitButton = screen.getByRole("button", { name: "Salva"});

    expect(submitButton).toBeInTheDocument();
    await act(async () => {await user.click(submitButton);})
    const errorList = screen.getAllByText(errorMessages.INCORRECT);
    expect(errorList).toHaveLength(2)
    expect(mockCreateDDriver).not.toHaveBeenCalled();
  });

  it.each`
    fieldData                         | text
    ${fieldsDriver.taxId}             | ${""} 
    ${fieldsDriver.businessName}      | ${""} 
    ${fieldsDriver.denomination}      | ${"abc"} 
    ${fieldsDriver.registeredOffice}  | ${"abc"} 
    ${fieldsDriver.fiscalCode}        | ${"abc"} 
    ${fieldsDriver.pec}               | ${"abc"} 
    ${fieldsDriver.phoneNumber}       | ${"abc"} 
    ${fieldsDriver.uniqueCode}        | ${"abc"} 
  `("verify field $fieldData.name to be rendered", async ({ fieldData, text }) => {
    const field = screen.getByRole("textbox", { name: fieldData.label});

    expect(field).toBeInTheDocument();
  });

  // it("verify SingleFileInput is not empty", () => {
  // })
})