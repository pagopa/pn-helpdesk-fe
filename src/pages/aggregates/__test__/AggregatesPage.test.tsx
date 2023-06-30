import { fireEvent, RenderResult, screen } from '@testing-library/react';
import AggregatesPage from '../AggregatesPage';
import { renderWithProviders, renderWithProvidersAndPermissions } from "../../../mocks/mockReducer";
import * as routes from '../../../navigation/router.const';
import * as router from 'react-router'
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import { Permission } from '../../../model/user-permission';

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
        result = renderWithProvidersAndPermissions(<ConfirmationProvider><AggregatesPage /></ConfirmationProvider>, [Permission.API_KEY_WRITE]);

        const nuovaAggregazioneButton = screen.getByRole("button", {name : "Nuova aggregazione"});
        expect(nuovaAggregazioneButton).toBeInTheDocument();
        fireEvent.click(nuovaAggregazioneButton);

        expect(navigate).toBeCalledWith(routes.CREATE_AGGREGATE);

    })
})