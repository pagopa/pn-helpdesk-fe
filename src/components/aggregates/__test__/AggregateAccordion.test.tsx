import { fireEvent, RenderResult, waitFor, screen, within, act } from '@testing-library/react';
import apiRequests from '../../../api/apiRequests';
import PaList from '../PaList';
import { reducer } from '../../../__tests__/testReducer';
import { aggregate, pa_list_associated } from '../../../api/pa_agg_response';
import AggregateAccordion from '../AggregateAccordion';

describe("AggregateAccordion", () => {
    let result : RenderResult | undefined;
    let mockedAggregate = {...aggregate, associatedPa: pa_list_associated.items};
    beforeEach(async () => {
        await act(async () => {
            result = reducer(<AggregateAccordion aggregate={mockedAggregate} />);
        });
    })

    it("render", () => {
        const aggregateAccordion = result?.queryByTestId('aggregate-accordion');
        expect(aggregateAccordion).toBeInTheDocument();
        const paList = result?.queryByTestId('paList');
        if(mockedAggregate.associatedPa.length > 0)
            expect(paList).toBeInTheDocument();
    })
})