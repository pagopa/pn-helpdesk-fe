/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import { store } from '../../../../redux/store';
import { Provider } from 'react-redux';
import ChangePasswordForm from "../ChangePasswordForm";


describe('ChangePasswordForm', () => {

  it('renders component', () => {
    render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
    );
    expect(screen.getByTestId("ChangePasswordForm")).toBeTruthy();
  });

  it('renders title', () => {
    render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
    )
    expect(screen.getByText("Cambio password")).toBeTruthy()
  });

  it('renders button', () => {
     render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider> 
     );
    const button = screen.getByRole(/Button/i, {
        name: 'Cambia password',
    });
    expect(button).toBeTruthy()
  });

  it('renders new password field', () => {
   render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
    );
    const field = screen.getByLabelText("Nuova password");
    expect(field).toBeTruthy()
  });

  it('renders confirm new password field', () => {
   render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
    );
    const field = screen.getByLabelText("Conferma password");
    expect(field).toBeTruthy()
  });

  it('click button and show errors',async () => {
    render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
        );
        const button = screen.getByRole(/Button/i, {
            name: 'Cambia password',
        });
        fireEvent.click(button);
        await waitFor(async () => {
            const errors = screen.getAllByText("Password non corretta");
            expect(errors.length).toEqual(2)
        });

    })

  it('fill inputs and click button', async () => {
    render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
        );

    const newPassword = screen.getByLabelText("Nuova password");
    fireEvent.change(newPassword!, { target: { value: "Test_Cognito_2.!" } });
    await waitFor(() => {
        expect(newPassword).toHaveValue("Test_Cognito_2.!");
    });

    const confirmPassword = screen.getByLabelText("Nuova password");
    fireEvent.change(newPassword!, { target: { value: "Test_Cognito_2.!" } });
    await waitFor(() => {
        expect(confirmPassword).toHaveValue("Test_Cognito_2.!");
    });
        
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    button.click();
    })
});
 


