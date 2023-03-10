import { act, cleanup, fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { reducer } from "../../../mocks/mockReducer";
import React, { useState } from "react";
import { AlertDialog, CostDialog, DriverCostsDialog } from "../index";


jest.mock("../../../components/deliveriesDrivers/CostsTable", () => ({
  CostsTable: () => {
    // @ts-ignore
    return <mock-table data-testid="cost-table-mock"/>;
  },
}));
const DriverCostsDialogCase = () => {
  const [opened, setOpened] = useState(true);
  const onClickNegativeMock = () => (setOpened(false));
  const onClickPositiveMock = jest.fn();

  return <DriverCostsDialog tenderCode={"12345"}
                     driverCode={"67890"}
                     open={opened}
                     onClickNegative={onClickNegativeMock}
                     onClickPositive={onClickPositiveMock} />
};

jest.mock("../../../components/forms/costs/CostsForm", () => ({
  CostsForm: () => {
    // @ts-ignore
    return <mock-table data-testid="cost-form-mock"/>;
  },
}));
const CostDialogCase = () => {
  const [opened, setOpened] = useState(true);
  const onClickNegativeMock = () => (setOpened(false));
  const onClickPositiveMock = () => {};

  return <CostDialog cost={undefined}
                     tenderCode={"12345"}
                     driverCode={"67890"}
                     fsu={true}
                     open={opened}
                     onClickNegative={onClickNegativeMock}
                     onClickPositive={onClickPositiveMock}/>
};

const AlertDialogCase = () => {
  const [opened, setOpened] = useState(true);
  const onClickNegativeMock = () => (setOpened(false));
  const onClickPositiveMock = jest.fn();

  return <AlertDialog
    title={"Alert"}
    message={"This is an error"}
    open={opened}
    onClickNegative={onClickNegativeMock}
    onClickPositive={onClickPositiveMock}/>
};


describe("Dialogs Test", () => {

  afterEach(() => {
    cleanup()
  });

  it("whenCostDialogIsOpened", async () => {
      reducer(<CostDialogCase />);
      const costDialog = screen.getByTestId('cost-dialog');
      expect(costDialog).toBeInTheDocument();
      // @ts-ignore
      fireEvent.click(costDialog["firstChild"])
      await waitForElementToBeRemoved(() => screen.queryByTestId("cost-dialog"))
      await act(async () => {
        await expect(screen.queryByTestId("cost-dialog")).not.toBeInTheDocument()
      })
  });

  it("whenAlertDialogIsOpened", async () => {
    reducer(<AlertDialogCase />);
    const alertDialog = screen.getByTestId('alert-dialog');
    expect(alertDialog).toBeInTheDocument();
    // @ts-ignore
    fireEvent.click(alertDialog["firstChild"])
    await waitForElementToBeRemoved(() => screen.queryByTestId("alert-dialog"))
    await act(async () => {
      await expect(screen.queryByTestId("alert-dialog")).not.toBeInTheDocument()
    })
  });

  it("whenDriverCostsDialogIsOpened", async () => {
    reducer(<DriverCostsDialogCase />);
    const driverCostsDialog = screen.getByTestId('driver-costs-dialog');
    expect(driverCostsDialog).toBeInTheDocument();
    // @ts-ignore
    fireEvent.click(driverCostsDialog["firstChild"])
    await waitForElementToBeRemoved(() => screen.queryByTestId("driver-costs-dialog"))
    await act(async () => {
      await expect(screen.queryByTestId("driver-costs-dialog")).not.toBeInTheDocument()
    })
  });

})