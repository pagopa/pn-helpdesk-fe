/**
 * @jest-environment jsdom
 */

import React from "react";
import 'regenerator-runtime/runtime'
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import ResponseData from '../ResponseData';
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore([]);

describe('ResponseData', () => {

    afterEach(cleanup);
    let store:any;

    beforeEach(() => {
        store = mockStore({
            response: {
                opened: true,
                responseData: {}
            }
        });
    });

    it('renders component', () => {
        render(
            <Provider store={store}>
                <ResponseData />  
            </Provider>
        );
        expect(screen.getByText("Dati di risposta:")).toBeInTheDocument();

    });

});
 


