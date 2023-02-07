/**
 * Detail Test
 */

import { act, cleanup, screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import {TenderDetailPage} from "../detail";
import { reducer } from "../../../mocks/mockReducer";
import userEvent from "@testing-library/user-event";

describe("TenderDetailPage", () => {
    beforeEach(() => { reducer( <TenderDetailPage></TenderDetailPage>) });
    afterEach(cleanup);

    it("Dettaglio Gara", async () => {
        await act(async () => {
            reducer(<TenderDetailPage/>);
        });
        expect(
            screen.getByRole("heading", {
                name: "Dettaglio Gara",
            })
        ).toBeInTheDocument();
    });

    it("render data grid, 5 columns and 1 row", async () => {
        /*await act(async () => {
            reducer(<TenderDetailPage/>);
        });*/

        const grid =  screen.getByTestId("datagrid");

        expect(grid).toBeInTheDocument();
        //eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug(grid)

        const columns = await screen.findAllByRole("columns");
        expect(columns).toHaveLength(5);
        const rows = await screen.findAllByRole("rows");
        expect(rows).toHaveLength(1);
    });

    it("render table", async () => {
        await act(async () => {
            reducer(<TenderDetailPage email="" />);
        });

        const table = await screen.findByText(
            "Recapitisti"
        );
        expect(table).toBeInTheDocument();
    });




});