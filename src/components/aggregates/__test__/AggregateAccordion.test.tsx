import { RenderResult } from '@testing-library/react';
import { reducer } from "../../../mocks/mockReducer";
import { aggregate, pa_list_associated } from '../../../api/mock_agg_response';
import AggregateAccordion from '../AggregateAccordion';

describe("AggregateAccordion", () => {
    let result : RenderResult | undefined;
    let mockedAggregate = {...aggregate, associatedPa: pa_list_associated.items};
    beforeEach(async () => {
        result = reducer(<AggregateAccordion aggregate={mockedAggregate} />);
    })

    it("render", () => {
        const aggregateAccordion = result?.queryByTestId('aggregate-accordion');
        expect(aggregateAccordion).toBeInTheDocument();
        const paList = result?.queryByTestId('paList');
        if(mockedAggregate.associatedPa.length > 0)
            expect(paList).toBeInTheDocument();
    })
})