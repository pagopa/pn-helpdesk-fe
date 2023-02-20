/**
 * Detail Test
 */

import { act, cleanup, screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import {TenderDetailPage} from "../TenderDetailPage";
import { reducer } from "../../../mocks/mockReducer";
import userEvent from "@testing-library/user-event";
import MonitorPage from "../../monitor/MonitorPage";
import {server} from "../../../mocks/server";
import {rest} from "msw";
import * as reactRedux from '../../../redux/hook'
import configureStore from "redux-mock-store";
import {DeliveryDriver, FilterRequest, Page} from "../../../model";
import {TenderDTO} from "../../../generated";



describe("TenderDetailPage", () => {
    //beforeEach(() => { reducer( <TenderDetailPage></TenderDetailPage>) });
    //afterEach(cleanup);
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    });
    afterEach(() => {
        cleanup()
    });

    const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch')



it("Dettaglio Gara", async () => {
        const state = {
            tender: {
                loading: false,
                allData: {} as Page<TenderDTO>,
                selected: {} as TenderDTO
            },
            deliveries :{loading: false,
                    detail: undefined,
                    allData: {} as Page<DeliveryDriver>,
                    pagination: {
                        page:1,
                        tot:10,
                    } as FilterRequest
                }
        }
        useSelectorMock.mockReturnValue(state);
        const mockStore = configureStore();
        let updatedStore = mockStore(state);
        const mockDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockDispatch);
        updatedStore.dispatch = mockDispatch;

        reducer(<TenderDetailPage/>);
        const DeatilVisualization = await screen.findAllByDisplayValue(
            "Informazioni"
        );


        expect(DeatilVisualization).toBeInTheDocument();
        //eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug(DeatilVisualization)
        expect(DeatilVisualization).toBeInTheDocument();
        const infoVisualization = await screen.findByText("Informazioni");
        expect(infoVisualization).toBeInTheDocument();
        const recapVisualization = await screen.findByText("Recapitisti");
        expect(recapVisualization).toBeInTheDocument();
    });

    it("render data grid, 5 columns must be appear", async () => {
        await act(async () => {
            reducer(<TenderDetailPage/>);
        });

        const grid =  screen.getByTestId("datagrid");

        expect(grid).toBeInTheDocument();
        //eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug(grid)

        const columns = await screen.findAllByRole("columns");
        expect(columns).toHaveLength(5);
    });

    it("render table", async () => {
        await act(async () => {
            reducer(<TenderDetailPage email="" />);
        });

        const table = await screen.findByText(
            "Recapitisti"
        );
        expect(table).toBeInTheDocument();
        //eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug(table)
        expect(table).toBeInTheDocument();
    });

    it("render component failed by mock", async () => {
        server.resetHandlers(
            rest.get("http://localhost:3000/tender/details", (req, res, ctx) =>
                res.networkError("Failed to connect")
            )
        );

        await act(async () => {
            reducer(<TenderDetailPage />);
        });

        expect(
            screen.getByText("informazioni")
        ).toBeInTheDocument();

        const id = screen.queryByRole("columnheader", {
            name: "Identificativo",
        });
        const startDate = screen.queryByRole("columnheader", {
            name: "Data inizio",
        });
        const endDate = screen.queryByRole("columnheader", {
            name: "Data fine",
        });
        const status = screen.queryByRole("columnheader", {
            name: "stato",
        });

        const pendingStatus = screen.queryByRole("button", {
            name: "In corso",
        });

        expect(id).not.toBeInTheDocument();
        expect(startDate).not.toBeInTheDocument();
        expect(endDate).not.toBeInTheDocument();
        expect(pendingStatus).not.toBeInTheDocument();
        expect(status).not.toBeInTheDocument();

    });


})