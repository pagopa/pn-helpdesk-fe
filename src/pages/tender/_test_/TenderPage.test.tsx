import "regenerator-runtime/runtime"
import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";

import TenderPage from "../TenderPage";
import * as router from "react-router";
import {CREATE_TENDER_ROUTE} from "../../../navigation/router.const";
import {reducer} from "../../../mocks/mockReducer";
import * as hookPermission from "../../../hooks/useHasPermissions";


jest.mock("../../../components/deliveriesDrivers/TenderTable",
  () => ({
  TenderTable: () => {
    // @ts-ignore
    return <mock-table data-testid="tender-table-mock"/>;
  },
}));



describe("TenderPageTest", () => {
  const navigateMock = jest.fn();

  const setHasPermission = (value: boolean = true) => {
    const spyUsePermission = jest.spyOn(hookPermission, "useHasPermissions");
    spyUsePermission.mockReturnValue(value)
  }

  beforeEach(() =>{
    jest.spyOn(React, "useEffect").mockImplementation(() => jest.fn());
    const useNavigate = jest.spyOn(router, 'useNavigate');
    useNavigate.mockReturnValue(navigateMock);
    setHasPermission()
  })

  it("whenRenderedPageAndClickedButtonCreateTender", async () => {
    reducer(<TenderPage />)
    const buttonAdded = screen.getByTestId("button-added-tender")
    expect(buttonAdded).toBeInTheDocument()
    const mockTable = screen.getByTestId("tender-table-mock")
    expect(mockTable).toBeInTheDocument()

    fireEvent.click(buttonAdded);
    await waitFor(async() => {
      await expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith(CREATE_TENDER_ROUTE);
    })
  })

  it("whenRenderedPageWithPermissionWriteIsFalse", async () => {
    setHasPermission(false)
    reducer(<TenderPage />)
    expect(screen.queryByTestId("button-added-tender")).not.toBeInTheDocument()
    const mockTable = screen.getByTestId("tender-table-mock")
    expect(mockTable).toBeInTheDocument()

  })

});