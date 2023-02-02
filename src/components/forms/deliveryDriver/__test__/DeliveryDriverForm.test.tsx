import {cleanup, fireEvent, screen, within} from "@testing-library/react";
import {reducer} from "../../../../mocks/mockReducer";
import React from "react";
import DeliveryDriverFormBox from "../DeliveryDriverForm";


describe(DeliveryDriverFormBox, () => {

  afterEach(cleanup);
  beforeEach(() => {
    reducer(<DeliveryDriverFormBox key={"FSU"} fsu={true}/>);
  });


  it("verify DeliveryDriverForm is rendered", async () => {
    const form = await screen.findByTestId("deliverydriverform");
    expect(form).toBeInTheDocument();
    expect(within(form).getByText('Nuovo FSU')).toBeTruthy();
  })

  // it("verify SingleFileInput value is empty", () => {
  // })

  // it("verify SingleFileInput is not empty", () => {
  // })
})