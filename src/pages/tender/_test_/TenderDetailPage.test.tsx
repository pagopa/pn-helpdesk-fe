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

    it("Tender Detail", async () => {
      reducer(<TenderDetailPage/>);

      const allTenders = await screen.findAllByText('Tutte le Gare');
      const infoTender = await screen.findAllByText('Informazioni');
      const tenderDetail = await screen.findAllByText('Dettaglio Gara');
      const nameDetail = await screen.findAllByText('BRT');
      const startDateDetail = await screen.findAllByText('31-01-2021 00:00');
      const endDateDetail = await screen.findAllByText('31-01-2022 00:00');
      const statusDetail = await screen.findAllByText('BOZZA');

      expect(allTenders).toBeTruthy();
      expect(infoTender).toBeTruthy();
      expect(tenderDetail).toBeTruthy();
      expect(nameDetail).toBeTruthy();
      expect(startDateDetail).toBeTruthy();
      expect(endDateDetail).toBeTruthy();
      expect(statusDetail).toBeTruthy();
    });

    // it("tenderstate", async () => {
    //   const tenderstate =  {
    //     tender:{
    //       selected: { code: "1", name: "BRT", startDate: "01-31-2021 00:00", endDate: "01-31-2022 00:00", status: TenderDTOStatusEnum.Created}
    //     }
    //   }
    //   mockingStore(tenderstate);
    //   reducer(<TenderDetailPage/>);
    //
    // });

    it("Modify tender and redirect on the Tender Create route", async () => {
      reducer(<TenderDetailPage />);
      const buttonModifica = screen.getByRole(/Button/i, {
        name: "Modifica",
      });
      const user = userEvent.setup();
      await act(async () => {
        await user.click(buttonModifica);
      });

      // expect result
      // const modifyTender = await waitFor(() => screen.findByText('Modifica Gara'));
      const modifyTender = await screen.findByText('Modifica Gara');
      expect(modifyTender).toBeInTheDocument();

      // const infoTender = await waitFor(() => screen.findByText('Informazione sulla Gara'));
      const infoTender = await screen.findByText('Informazione sulla Gara');
      expect(infoTender).toBeInTheDocument();

      // const modifyTender = await screen.findAllByText('Modifica Gara');
      // const infoTender = await screen.findAllByText('Informazione sulla Gara');
      // expect(modifyTender).toBeInTheDocument();
      // expect(infoTender).toBeInTheDocument();
    });

    it("Table Delivery driver rendered", async () => {
      reducer(<TenderDetailPage />);
      const table = await screen.findByText(
          "Recapitisti"
      );
      expect(table).toBeInTheDocument();
    });

    it("Card Data Info rendered", async () => {
      reducer(<TenderDetailPage />);
      expect(
          screen.getByText("Informazioni")
      ).toBeInTheDocument();
      const id = screen.queryByRole("columnheader", {
          name: "Identificazione",
      });
      const startDate = screen.queryByRole("columnheader", {
          name: "Data inizio",
      });
      const endDate = screen.queryByRole("columnheader", {
          name: "Data fine",
      });
      const status = screen.queryByRole("columnheader", {
          name: "Stato",
      });

      expect(id).not.toBeInTheDocument();
      expect(startDate).not.toBeInTheDocument();
      expect(endDate).not.toBeInTheDocument();
      expect(status).not.toBeInTheDocument();
    });


  it("render data grid, 5 columns must be appear", async () => {
    reducer(<TenderDetailPage/>);
    const grid =  screen.getByTestId("datagrid");
    expect(grid).toBeInTheDocument();
    const columns = await screen.findAllByRole("columnheader");
    expect(columns).toHaveLength(5);
  });

})

//eslint-disable-next-line testing-library/no-debugging-utils
// screen.debug()