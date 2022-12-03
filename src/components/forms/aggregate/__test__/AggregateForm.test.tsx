/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'
import { fireEvent, act, screen, waitFor } from '@testing-library/react';
import AggregateForm from '../AggregateForm';
import { ConfirmationProvider } from '../../../../components/confirmationDialog/ConfirmationProvider';
import apiRequests from '../../../../api/apiRequests';
import { aggregate, usage_plan_list } from '../../../../api/mock_agg_response';
import { renderWithProviders } from '../../../../__tests__/testReducer';
import * as routes from '../../../../navigation/routes';
import * as router from 'react-router'
const navigate = jest.fn();

describe("AggregateForm CREATE", () => {
    //Override default timeout
    jest.setTimeout(10000);

    const idResponse = "test";
    beforeEach(() => {
        const apiSpyCreateAggregate = jest.spyOn(apiRequests, "createAggregate");
        apiSpyCreateAggregate.mockResolvedValue({id: "test"})
    
        // mock navigation
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })

    it("renders", async () => {
        renderWithProviders(<ConfirmationProvider><AggregateForm isCreate={true} aggregate={undefined} usagePlans={usage_plan_list.items} /></ConfirmationProvider>)
        expect(screen.getByRole("textbox", {name : "Nome Aggregazione"}));
        expect(screen.getByRole("textbox", {name : "Descrizione Aggregazione"}));
        expect(screen.getByTestId("select-usagePlanName"));
    })

    it("Updates Rate and Burst inputs on change of usage plan", async () => {
        renderWithProviders(<ConfirmationProvider><AggregateForm isCreate={true} aggregate={undefined} usagePlans={usage_plan_list.items} /></ConfirmationProvider>)
        const select_usageplan_wrapper = await screen.findByTestId("select-usagePlanName");
        expect(select_usageplan_wrapper).toBeInTheDocument();
        const usageplan_input = select_usageplan_wrapper.querySelector("input");
        const input_rate = screen.getByRole("textbox", {name: "Rate"});
        const input_burst = screen.getByRole("textbox", {name: "Burst"});
        let firstOption = usage_plan_list.items[0];
        await act(() => {fireEvent.change(usageplan_input!, { target: { value: firstOption.name } })})
        
        await waitFor(() => expect(input_rate).toHaveValue(String(firstOption.rate)))
    })

    it("Create aggregate", async () => {
        renderWithProviders(<ConfirmationProvider><AggregateForm isCreate={true} aggregate={undefined} usagePlans={usage_plan_list.items} /></ConfirmationProvider>);
        const aggregate_name_input = screen.getByRole("textbox", {name : "Nome Aggregazione"});
        const aggregate_desc_input = screen.getByRole("textbox", {name : "Descrizione Aggregazione"});
        const select_usageplan_wrapper = screen.getByTestId("select-usagePlanName");

        fireEvent.change(aggregate_name_input, { target: { value: "name" } });

        fireEvent.change(aggregate_desc_input, { target: { value: "desc" } });

        const usageplan_input = select_usageplan_wrapper.querySelector("input");
        const input_rate = screen.getByRole("textbox", {name: "Rate"});
        let firstOption = usage_plan_list.items[0];
        await act(() => { fireEvent.change(usageplan_input!, { target: { value: firstOption.name } })});
        await waitFor(() => expect(input_rate).toHaveValue(String(firstOption.rate)))

        const create_button = screen.getByRole("button", { name: "Crea"});
        await waitFor(() => expect(create_button).not.toBeDisabled());
        fireEvent.click(create_button);

        //Open the confirmation modal
        const confirmButton = await screen.findByRole("button", {name : "Conferma"});

        await act(() => { fireEvent.click(confirmButton); });

        await waitFor(() => expect(navigate).toHaveBeenCalledWith(routes.GET_UPDATE_AGGREGATE_PATH(idResponse)));
    })
})

describe("AggregateForm MODIFY", () => {

    //Override default timeout
    jest.setTimeout(10000);

    beforeEach(() => {
        const apiSpyModifyAggregate = jest.spyOn(apiRequests, "modifyAggregate");
        apiSpyModifyAggregate.mockResolvedValue({id: "test"})

        const apiSpyDeleteAggregate = jest.spyOn(apiRequests, "deleteAggregate");
        apiSpyDeleteAggregate.mockResolvedValue({id: "test"})
    
        // mock navigation
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })

    const mockAggregate = aggregate;

    it("renders with input value defined", async () => { 
        await act(() => { renderWithProviders(<ConfirmationProvider><AggregateForm isCreate={false} aggregate={mockAggregate} usagePlans={usage_plan_list.items} /></ConfirmationProvider>)});
        const aggregate_name_input = screen.getByRole("textbox", {name : "Nome Aggregazione"});
        const aggregate_desc_input = screen.getByRole("textbox", {name : "Descrizione Aggregazione"});
        const select_usageplan_wrapper = screen.getByTestId("select-usagePlanName");
        const usageplan_input = select_usageplan_wrapper.querySelector("input");

        await waitFor(() => expect(aggregate_desc_input).toHaveValue(String(mockAggregate.description)));
        expect(usageplan_input).toHaveValue(String(mockAggregate.usagePlan.name));
        expect(aggregate_name_input).toHaveValue(String(mockAggregate.name));
    })

    it("click modifica button", async () => { 
        renderWithProviders(<ConfirmationProvider><AggregateForm isCreate={false} aggregate={mockAggregate} usagePlans={usage_plan_list.items} /></ConfirmationProvider>);
        const edit_button = screen.getByRole("button", { name: "Salva"});
        await waitFor(() => expect(edit_button).not.toBeDisabled());
        await act(() => {fireEvent.click(edit_button);});

        //Open the confirmation modal
        const confirmButton = await screen.findByRole("button", {name : "Conferma"});

        await act(() => {fireEvent.click(confirmButton)});
        
    })

    it("click delete button", async () => { 
        renderWithProviders(<ConfirmationProvider><AggregateForm isCreate={false} aggregate={mockAggregate} usagePlans={usage_plan_list.items} /></ConfirmationProvider>);
        const delete_button = screen.getByRole("button", { name: "Elimina"});
        await waitFor(() => expect(delete_button).not.toBeDisabled());
        await act(() => {fireEvent.click(delete_button)});

        //Open the confirmation modal
        const confirmButton = await screen.findByRole("button", {name : "Conferma"});

        await act(() => {fireEvent.click(confirmButton)});
        await waitFor(() => expect(navigate).toHaveBeenCalledWith(routes.AGGREGATES));
    })
})