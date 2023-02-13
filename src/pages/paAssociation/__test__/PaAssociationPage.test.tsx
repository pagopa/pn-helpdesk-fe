import { RenderResult, waitFor, screen } from '@testing-library/react';
import PaAssociationPage from '../PaAssociationPage';
import { renderWithProviders } from "../../../mocks/mockReducer";
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import { aggregate as mockAggregate } from '../../../api/mock_agg_response';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/example/path",
      state: {aggregate: mockAggregate}
    })
}));

describe("PaAssociationPage test", () => {
    let result: RenderResult | undefined;

    it("render", async () => {
        let Wrapped = <ConfirmationProvider><PaAssociationPage /></ConfirmationProvider>;
        result = renderWithProviders(Wrapped);

        expect(screen.getByTestId("aggregate-accordion")).toBeInTheDocument();
        expect(screen.getByRole("table"));
        expect(screen.getAllByTestId("customCard"));
    })
})