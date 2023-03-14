import { fireEvent, RenderResult, waitFor, screen } from '@testing-library/react';
import AggregatesPage from '../AggregatesPage';
import { renderWithProviders } from "../../../mocks/mockReducer";
import * as routes from '../../../navigation/router.const';
import * as router from 'react-router'
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';

const navigate = jest.fn();

describe("AggregatesPage test", () => {
    let result: RenderResult | undefined;

    beforeEach(() => {
        // mock navigation
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    });

    it("render", () => {
        result = renderWithProviders(<ConfirmationProvider><AggregatesPage /></ConfirmationProvider>);

        expect(screen.getByText("Gestione Aggregazioni ApiKey")).toBeInTheDocument();
    })

    it("click nuova aggregazione", () => {
        result = renderWithProviders(<ConfirmationProvider><AggregatesPage /></ConfirmationProvider>);

        const nuovaAggregazioneButton = screen.getByRole("button", {name : "Nuova aggregazione"});
        expect(nuovaAggregazioneButton).toBeInTheDocument();
        fireEvent.click(nuovaAggregazioneButton);

        expect(navigate).toBeCalledWith(routes.AGGREGATE);

    })
})