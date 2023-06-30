import { renderWithProviders } from "../../../mocks/mockReducer";
import apiRequests from '../../../api/apiRequests';
import VirtualKeyTable from "../VirtualKeyTable";
import { RenderResult, fireEvent, waitFor, within, screen, waitForElementToBeRemoved, act } from "@testing-library/react";
import { api_key, modify_pdnd } from '../../../api/mock_agg_response';
import { ConfirmationProvider } from "../../confirmationDialog/ConfirmationProvider";

describe("VirtualKeyTable without selected PA", () => {
    let result: RenderResult | undefined;

    it("renders alert info", () => {
        result = renderWithProviders(<ConfirmationProvider><VirtualKeyTable id="" /></ConfirmationProvider>);

        expect(result.getByText("Seleziona un elemento dalla sezione \"Seleziona una PA\" per visualizzare le corrispettive Virtual keys"))
    })
})

describe("VirtualKeyTable with selected PA", () => {
    let result: RenderResult | undefined;
    let mockData = api_key;

    beforeEach(() => {
        // mock api
        let apiSpySearchApiKey = jest.spyOn(apiRequests, 'searchApiKey');
        apiSpySearchApiKey.mockImplementation((params) => {
            let res = api_key;
            return Promise.resolve(res);
        });

        let apiSpyModifyPdnd = jest.spyOn(apiRequests, 'modifyPdnd');
        apiSpyModifyPdnd.mockImplementation((params) => {
            return Promise.resolve(modify_pdnd); 
        });
    })

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        jest.restoreAllMocks();
        result = undefined;
    });

    it("render", async () => {
        result = renderWithProviders(<ConfirmationProvider><VirtualKeyTable id="001" /></ConfirmationProvider>)
        //Wait for table to be displayed
        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
        
        const pageSelector = result?.queryByTestId('pageSelector');
        expect(pageSelector).toBeInTheDocument();
        const saveButton = result?.queryByRole("button", {name: "Salva modifiche"})
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).toBeDisabled();

        //VirtualKeys fetched and displayed
        await waitFor(() => {
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(mockData.items.length)
        })
    })

    it("click on rows checkbox", async () => {
        result = renderWithProviders(<ConfirmationProvider><VirtualKeyTable id="001" /></ConfirmationProvider>)
        // Wait for table to be displayed
        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
        
        const pageSelector = result?.queryByTestId('pageSelector');
        expect(pageSelector).toBeInTheDocument();
        const saveButton = result?.queryByRole("button", {name: "Salva modifiche"})
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).toBeDisabled();

        // VirtualKeys fetched and displayed
        await waitFor(() => {
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(mockData.items.length)
        })

        // Click on first checkbox
        const firstRowCheckboxMui = result?.getByTestId(`vkTable-row-checkbox-${mockData.items[0].id}`);
        const firstRowCheckboxElement = firstRowCheckboxMui?.querySelector('input[type="checkbox"]');
        fireEvent.click(firstRowCheckboxElement!);

        await waitFor(() => {
            expect(saveButton).not.toBeDisabled();
        })
    })

    it("click on column checkbox", async () => {
        result = renderWithProviders(<ConfirmationProvider><VirtualKeyTable id="001" /></ConfirmationProvider>)
        // Wait for table to be displayed
        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
        
        const pageSelector = result?.queryByTestId('pageSelector');
        expect(pageSelector).toBeInTheDocument();
        const saveButton = result?.queryByRole("button", {name: "Salva modifiche"})
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).toBeDisabled();

        // VirtualKeys fetched and displayed
        await waitFor(() => {
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(mockData.items.length)
        })

        // Click on first checkbox
        const selectAllCheckboxMui = result?.getByTestId(`vkTable-col-checkbox`);
        const selectAllCheckboxElement = selectAllCheckboxMui?.querySelector('input[type="checkbox"]');
        fireEvent.click(selectAllCheckboxElement!);

        await waitFor(() => {
            expect(saveButton).not.toBeDisabled();
        })
    })

    it("click on save button", async () => {
        result = renderWithProviders(<ConfirmationProvider><VirtualKeyTable id="001" /></ConfirmationProvider>)
        // Wait for table to be displayed
        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
        
        const pageSelector = result?.queryByTestId('pageSelector');
        expect(pageSelector).toBeInTheDocument();
        const saveButton = result?.queryByRole("button", {name: "Salva modifiche"})
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).toBeDisabled();

        // VirtualKeys fetched and displayed
        await waitFor(() => {
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(mockData.items.length)
        })

        // Click on first checkbox
        const firstRowCheckboxMui = result?.getByTestId(`vkTable-row-checkbox-${mockData.items[0].id}`);
        const firstRowCheckboxElement = firstRowCheckboxMui?.querySelector('input[type="checkbox"]');
        fireEvent.click(firstRowCheckboxElement!);

        await waitFor(() => {
            expect(saveButton).not.toBeDisabled();
        })

        // Click on save button
        fireEvent.click(saveButton!);

        //Confirmation modal opened
        await waitFor(() => expect("Applica modifiche"))
        const confirmButton = await waitFor(() => screen.getByRole("button", {name : "Conferma"}));
        await act(() => {fireEvent.click(confirmButton)});

        await waitFor(() => {
            //VirtualKeys refetched and displayed
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(mockData.items.length)
        })
    })
})