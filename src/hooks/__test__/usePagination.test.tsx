/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react';
import usePagination from '../usePagination';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import { ConfirmationProvider } from '../../components/confirmationDialog/ConfirmationProvider';
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

describe("usePagination", () => {
    it("Tests base route navigation", () => {

    })
})