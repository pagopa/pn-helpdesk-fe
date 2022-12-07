/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'
import { fireEvent, RenderResult, waitFor, screen, render } from '@testing-library/react';
import AggregateDetailPage from '../AggregateDetailPage';
import { Provider } from 'react-redux';
import apiRequests from '../../../api/apiRequests';
import configureMockStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom';
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import { act } from 'react-test-renderer';
import { renderWithProviders } from '../../../__tests__/testReducer';
import * as router from 'react-router'
import * as routes from '../../../navigation/routes';
import { aggregate, usage_plan_list, pa_list } from '../../../api/mock_agg_response';

const navigate = jest.fn();

describe("AggregateDetailPage MODIFY", () => {
    let result: RenderResult | undefined;
    let mockData1 = { ...usage_plan_list };
    let mockData2 = { ...aggregate };
    let mockData3 = { ...pa_list }

    beforeEach(async () => {
        let apiSpyUsagePlans = jest.spyOn(apiRequests, 'getUsagePlans');
        apiSpyUsagePlans.mockImplementation(() => {
            return Promise.resolve(mockData1)
        })
        let apiSpyAggregate = jest.spyOn(apiRequests, 'getAggregateDetails');
        apiSpyAggregate.mockImplementation((params: any) => {
            return Promise.resolve(mockData2)
        })
        let apiSpyAssociatedPa = jest.spyOn(apiRequests, 'getAssociatedPaList');
        apiSpyAssociatedPa.mockImplementation((params: any) => {
            return Promise.resolve(mockData3)
        })
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
        jest.spyOn(router, 'useParams').mockImplementation(() => ({ idAggregate: "agg_1" }))
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it("Renders AggregateDetailPage MODIFY", async () => {
        await renderWithProviders(<ConfirmationProvider><AggregateDetailPage email="test@test.com" /></ConfirmationProvider>);

        expect(apiRequests.getUsagePlans).toHaveBeenCalled();
        expect(apiRequests.getAggregateDetails).toHaveBeenCalled();
        
        const save_button = await screen.findByText("Salva");
        const delete_button = await screen.findByText("Elimina");
        expect(save_button).toBeInTheDocument();
        expect(delete_button).toBeInTheDocument();
        expect(screen.getByTestId("aggregate-form")).toBeInTheDocument();
        const pa_table = screen.getByLabelText("Tabella di Pubbliche amministrazioni");
        expect(pa_table).toBeInTheDocument();
        
    })

    it("Click Associa", async () => {
        await renderWithProviders(<ConfirmationProvider><AggregateDetailPage email="test@test.com" /></ConfirmationProvider>);
        const associa_pa_button = await screen.findByRole("button", { name: "Associa PA" });
        expect(associa_pa_button).toBeInTheDocument();
        fireEvent.click(associa_pa_button);
        await waitFor(() => expect(navigate).toHaveBeenCalledWith(routes.ADD_PA, { state: { aggregate: { associatedPa: [] } } }));
    })

    it("Click Trasferisci", async () => {
        await renderWithProviders(<ConfirmationProvider><AggregateDetailPage email="test@test.com" /></ConfirmationProvider>);
        const trasferisci_pa_button = await screen.findByRole("button", { name: "Trasferisci PA" });
        expect(trasferisci_pa_button).toBeInTheDocument();
        fireEvent.click(trasferisci_pa_button);
        await waitFor(() => expect(navigate).toHaveBeenCalledWith(routes.TRANSFER_PA, { state: { aggregate: { id: "agg_1", name: undefined } } }));
    })
})

describe("AggregateDetailPage CREATE", () => {
    it("Renders AggregateDetailPage CREATE", async () => {
        await renderWithProviders(<ConfirmationProvider><AggregateDetailPage email="test@test.com" /></ConfirmationProvider>);
        const create_aggregate_button = await screen.findByRole("button", { name: "Crea" });
        expect(create_aggregate_button).toBeDisabled();
        const pa_table = screen.queryByLabelText("Tabella di Pubbliche amministrazioni");
        const trasferisci_pa_button = screen.queryByRole("button", { name: "Trasferisci PA" });
        const associa_pa_button = screen.queryByRole("button", { name: "Associa PA" });
        expect(pa_table).not.toBeInTheDocument();
        expect(trasferisci_pa_button).not.toBeInTheDocument();
        expect(associa_pa_button).not.toBeInTheDocument();
    })
})

describe("AggregateDetailPage FAILED_PROMISE", () => {
    it("Renders AggregateDetailPage FAILED_PROMISE", async () => {
        let apiSpyUsagePlans = jest.spyOn(apiRequests, 'getUsagePlans');
        apiSpyUsagePlans.mockImplementation(() => {
            return Promise.reject()
        })
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
        await renderWithProviders(<ConfirmationProvider><AggregateDetailPage email="test@test.com" /></ConfirmationProvider>);
        await waitFor(() => expect(apiRequests.getUsagePlans).toHaveBeenCalled());
        await waitFor(() => expect(navigate).toHaveBeenCalledWith(routes.AGGREGATES));
    })
})