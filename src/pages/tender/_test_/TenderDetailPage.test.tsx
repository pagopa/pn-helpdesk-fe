/**
 * Detail Test
 */

import { cleanup, screen, fireEvent, waitFor, render } from "@testing-library/react";
import "regenerator-runtime/runtime"
import { TenderDetailPage } from "../TenderDetailPage";
import * as reactRedux from '../../../redux/hook'
import configureStore from "redux-mock-store";
import { TenderDTO, TenderDTOStatusEnum } from "../../../api/paperChannel";
import { reducer } from "../../../mocks/mockReducer";

import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import * as router from "react-router";
import React from "react";
import {CREATE_TENDER_ROUTE, TENDERS_TABLE_ROUTE} from "../../../navigation/router.const";


const tender: TenderDTO = {
  code: "1", name: "BRT", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderDTOStatusEnum.Created
}

  describe("TenderDetailPage", () => {
    jest.spyOn(React, "useEffect").mockImplementation(() => jest.fn());
    const navigateMock = jest.fn();
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
    const useNavigate = jest.spyOn(router, 'useNavigate');
    useNavigate.mockReturnValue(navigateMock);
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    mockingStore(tender);
  });

  afterEach(() => {
    cleanup()
  });

  it("whenTenderPageRenderedThenTableShow", async () => {
    reducer(<TenderDetailPage/>);

    const deliveryDriverTable = await screen.findByTestId('delivery-driver-table');
    expect(deliveryDriverTable).toBeInTheDocument();
  });

  it("whenTenderHasInfoThenShowDataInfo", () => {
    reducer(<TenderDetailPage/>);

    const dataInfo = screen.getByTestId('dataInfo');
    expect(dataInfo).toBeInTheDocument();
  });

  it("whenTenderWithNameTitleShowName", () => {
    reducer(<TenderDetailPage/>);

    const titleTenderName = screen.getByTestId("title-tender");
    expect(titleTenderName).toBeInTheDocument();
    expect(titleTenderName.textContent).toEqual(tender.name)
  });

  it("whenTenderWithEmptyNameTitleIsEmpty",  () => {
    const local = {...tender, name: undefined}
    delete local.name
    mockingStore(local);

    reducer(<TenderDetailPage/>);

    const typograhyName = screen.getByTestId('title-tender');
    expect(typograhyName).toBeEmptyDOMElement()
  });

  it("whenTenderIsCreatedStatusEditButtonMustBeRendered", async () => {
    reducer(<TenderDetailPage/>);

    const buttonModify = screen.getByRole(/Button/i, {
      name: "Modifica",
    });
    expect(buttonModify).toBeInTheDocument();
  });

  it("whenTenderIsInProgressEditButtonMustNotBeRendered", async () => {
    const local = {
      ...tender,
      status: TenderDTOStatusEnum.InProgress
    }
    mockingStore(local);

    reducer(<TenderDetailPage/>);

    const buttonModify = screen.queryByRole(/Button/i, {
      name: "Modifica",
    });
    expect(buttonModify).not.toBeInTheDocument();
  });

  it('whenTenderIsUndefinedOrEmptyGoToTendersRoute', () => {
    mockingStore({});

    render(<BrowserRouter >
      <Routes>
        <Route path={"/"} element={<TenderDetailPage />}/>
        <Route path={TENDERS_TABLE_ROUTE} element={<h1 data-testid={"tender-page"}>Tender table route</h1>}/>
      </Routes>
    </BrowserRouter>);

    expect(location.pathname).toEqual(TENDERS_TABLE_ROUTE);
    expect(screen.getByTestId("tender-page")).toBeInTheDocument()
  })


  it("whenClickedEditTenderNavigateToCreateTenderRoute", async () => {
    reducer(<TenderDetailPage />);
    const editButton = screen.getByRole(/Button/i, {
      name: "Modifica",
    });
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    await waitFor(async() => {
      await expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith(CREATE_TENDER_ROUTE+"/"+tender.code);
    })
  });

  it("whenTenderStateNotCreatedHideEditButton", async () => {
    const local = {...tender, status: TenderDTOStatusEnum.Ended}
    mockingStore(local);
    reducer(<TenderDetailPage />);
    const editButton = screen.queryByRole(/Button/i, {
      name: "Modifica",
    });
    expect(editButton).not.toBeInTheDocument()
  });

  it("whenClickBackButtonNavigateToTendersRoute", async () => {
    reducer(<TenderDetailPage />);
    const backButton = screen.getByTestId("back-button-tenders");
    expect(backButton).toBeInTheDocument()
    fireEvent.click(backButton);
    await waitFor(async() => {
      await expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith(TENDERS_TABLE_ROUTE);
    })
  });

})
