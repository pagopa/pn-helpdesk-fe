/**
 * Detail Test
 */

import { act, cleanup, screen, fireEvent, waitFor, render } from "@testing-library/react";
import "regenerator-runtime/runtime"
import { TenderDetailPage } from "../TenderDetailPage";
import * as reactRedux from '../../../redux/hook'
import configureStore from "redux-mock-store";
import { TenderDTO, TenderDTOStatusEnum } from "../../../api/paperChannel";
import { reducer } from "../../../mocks/mockReducer";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import * as router from "react-router";
import userEvent from '@testing-library/user-event';
import { Page } from "../../../model";
import { MemoryRouter, Router, Routes } from "react-router-dom";
import {createMemoryHistory} from 'history'
import React from "react";
import { create } from "react-test-renderer";

describe(TenderDetailPage, () => {

  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  // const useNavigate = jest.spyOn(router, 'useNavigate');//.mockImplementation(() => jest.fn())
  const mockingStore  = (state:any) => {
    useSelectorMock.mockReturnValue(state);
    const mockStore = configureStore();
    let updatedStore = mockStore(state);
    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);
    updatedStore.dispatch = mockDispatch;
  }

  beforeEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
    // useNavigate.mockClear()

    const selectedState = {
      code: "1", name: "BRT", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderDTOStatusEnum.Created
    }
    mockingStore(selectedState);
  });

    afterEach(() => {
      cleanup()
    });

  it("Delivery Driver Table rendered", async () => {
    reducer(<TenderDetailPage/>);

    const deliveryDriverTable = await screen.findByTestId('deliveryDriverTable');
    expect(deliveryDriverTable).toBeInTheDocument();
  });

  it("DataInfo rendered", async () => {
    reducer(<TenderDetailPage/>);

    const dataInfo = await screen.findByTestId('dataInfo');
    expect(dataInfo).toBeInTheDocument();

    const deliveryDriverTable = await screen.findByTestId('deliveryDriverTable');
    expect(deliveryDriverTable).toBeInTheDocument();
  });

  it("Is present typograghy tender name", async () => {
    reducer(<TenderDetailPage/>);

    const typograhyName = await screen.findByTestId('typograghyTenderDetail');
    expect(typograhyName).toBeInTheDocument();
    //TODO RECUPERARE IL NAME DA TYPOGRAPHY
  });

  it("Is not present typograghy tender name", async () => {
    const selectedState = {
      code: "1", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderDTOStatusEnum.Created
    }
    mockingStore(selectedState);

    reducer(<TenderDetailPage/>);

    const typograhyName = await screen.findByTestId('typograghyTenderDetail');
    //TODO RECUPERARE IL NAME DA TYPOGRAPHY
    // expect(typograhyName).not.toBeInTheDocument();
  });

  it("Button modify rendered", async () => {
    reducer(<TenderDetailPage/>);

    const buttonModify = screen.getByRole(/Button/i, {
      name: "Modifica",
    });
    expect(buttonModify).toBeInTheDocument();
  });

  it("Button modify is not rendered", async () => {
    const selectedState = {
      code: "1", name: "BRT", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderDTOStatusEnum.Ended
    }
    mockingStore(selectedState);

    reducer(<TenderDetailPage/>);

    const buttonModify = screen.queryByRole(/Button/i, {
      name: "Modifica",
    });
    expect(buttonModify).not.toBeInTheDocument();
  });

  test('Navigate to tender route', () => {
    const selectedstate =  { selected: {} }
    mockingStore(selectedstate);

    const route = '/tender'
    const wrapper  = create(
      <MemoryRouter initialEntries={[route]}>
        reducer(<TenderDetailPage/>, route);
      </MemoryRouter>
    );
    expect(wrapper.toJSON()).toHaveLength(2);

  })

  it("Modify tender and navigate to tender create route", async () => {
    const route = '/tender/create'
    create(
      <MemoryRouter initialEntries={[route]}>
        reducer(<TenderDetailPage/>, route);
      </MemoryRouter>
    );

    // reducer(<TenderDetailPage />);
    const buttonModifica = screen.getByRole(/Button/i, {
      name: "Modifica",
    });
    const user = userEvent.setup();
    await act(async () => {
      await user.click(buttonModifica);
    });
  });

  it("Displayed current selected tender", async () => {
    reducer(<TenderDetailPage/>);

    const nameDetail = await screen.findAllByText('BRT');
    const startDateDetail = await screen.findAllByText('31-01-2021 00:00');
    const endDateDetail = await screen.findAllByText('31-01-2022 00:00');
    const statusDetail = await screen.findAllByText('BOZZA');

    expect(nameDetail).toBeTruthy();
    expect(startDateDetail).toBeTruthy();
    expect(endDateDetail).toBeTruthy();
    expect(statusDetail).toBeTruthy();
  });
})
