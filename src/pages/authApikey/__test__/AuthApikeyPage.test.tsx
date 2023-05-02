import { renderWithProviders } from "../../../mocks/mockReducer";
import apiRequests from '../../../api/apiRequests';
import AuthApikeyPage from "../AuthApikeyPage";
import { RenderResult, fireEvent, waitFor, within, screen, waitForElementToBeRemoved, act } from "@testing-library/react";
import { api_key, search_pa } from '../../../api/mock_agg_response';
import { ConfirmationProvider } from "../../../components/confirmationDialog/ConfirmationProvider";

const DEFAULT_LIMIT = 10;

describe("AuthApikeyPage tests", () => {
    let result: RenderResult | undefined;

    const mockedPaData = search_pa(DEFAULT_LIMIT, "", "");
    const mockedVkData = api_key;

    beforeEach(() => {
        // mock api
        let apiSpySearchPa = jest.spyOn(apiRequests, 'searchPa');
        apiSpySearchPa.mockImplementation((params) => {
            const { lastEvaluatedId, limit, paName} = params;
            let res = search_pa(limit!, lastEvaluatedId!, paName);
            return Promise.resolve(res);
        });

        let apiSpySearchApiKey = jest.spyOn(apiRequests, 'searchApiKey');
        apiSpySearchApiKey.mockImplementation((params) => {
            let res = api_key;
            return Promise.resolve(res);
        });
    })

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        jest.restoreAllMocks();
        result = undefined;
    });

    it("renders before PA selection", async () => {
        result = renderWithProviders(<ConfirmationProvider><AuthApikeyPage /></ConfirmationProvider>);

        //Render PaSection
        //filter 
        expect(result?.getByRole("textbox", {name: "Nome PA"}));
        expect(result?.getByTestId("apply-filters"));
        expect(result?.getByTestId("clear-filters"));

        //PaList with fetched elements
        await waitFor(() => {
            expect(result?.queryAllByTestId('paList-item')).toHaveLength(DEFAULT_LIMIT);
        });

        //Pagination
        const pageSelector = result?.queryByTestId('pageSelector');
        expect(pageSelector).toBeInTheDocument();

        //Render VirtualKeyTable
        expect(result.getByText("Seleziona un elemento dalla sezione \"Seleziona una PA\" per visualizzare le corrispettive Virtual keys"))
    })

    it("select PA", async () => {
        result = renderWithProviders(<ConfirmationProvider><AuthApikeyPage /></ConfirmationProvider>);

        //Render PaSection
        //filter 
        expect(result?.getByRole("textbox", {name: "Nome PA"}));
        expect(result?.getByTestId("apply-filters"));
        expect(result?.getByTestId("clear-filters"));

        //PaList with fetched elements
        await waitFor(() => {
            expect(result?.queryAllByTestId('paList-item')).toHaveLength(DEFAULT_LIMIT);
        });

        //Pagination
        const pageSelector = result?.queryByTestId('pageSelector');
        expect(pageSelector).toBeInTheDocument();

        //Render VirtualKeyTable
        expect(result.getByText("Seleziona un elemento dalla sezione \"Seleziona una PA\" per visualizzare le corrispettive Virtual keys"))
    
        //Click on first item of PaList
        let firstItem = result?.queryAllByTestId('paList-item')[0];
        fireEvent.click(firstItem);

        //Wait for table to be displayed
        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
        //VirtualKeys fetched and displayed
        await waitFor(() => {
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(mockedVkData.items.length)
        })
    })
})