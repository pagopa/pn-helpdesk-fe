/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AggregateForm from '../AggregateForm';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom';
import { ConfirmationProvider } from '../../../../components/confirmationDialog/ConfirmationProvider';
import { act } from 'react-test-renderer';
const mockStore = configureMockStore([]);
const store = mockStore({
    response: {
        opened: false,
        responseData: {}
    },
    snackbar: {
        opened: false
    },
    spinner: {
        opened: false
    }
});

import { usage_plan_list } from '../../../../api/mock_agg_response';

describe("AggregateForm CREATE", () => {
    it("Renders AggregateForm - CREATE", async () => {
        render(
            <Provider store={store}>
                <ConfirmationProvider>
                    <BrowserRouter>
                        <AggregateForm isCreate={true} agg={undefined} usagePlans={usage_plan_list.items} />
                    </BrowserRouter>
                </ConfirmationProvider>
            </Provider>
        )
        const select_usageplan = document.querySelector("input.css-yf8vq0-MuiSelect-nativeInput") as HTMLInputElement;
        const input_rate = document.getElementById("Rate");
        const input_burst = document.getElementById("Burst");
        expect(select_usageplan).toBeInTheDocument();
        expect(select_usageplan).toHaveValue("");
        act(() => {
            fireEvent.change(select_usageplan, { target: { value: "Small" } });
        });
        await waitFor(() => expect(input_rate).toHaveValue("100"))
    })
})